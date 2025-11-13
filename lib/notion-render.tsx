// lib/notion-render.ts
import { cached } from "@/lib/cache"

/* ===========================================================
   Generic rich text → HTML (preserves bold/italic/code/links)
   Used by both renderers
=========================================================== */
function renderRichText(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return ""
  return richText
    .map((t: any) => {
      let content = t.plain_text ?? ""
      if (!content) return ""
      if (t.annotations?.bold) content = `<strong>${content}</strong>`
      if (t.annotations?.italic) content = `<em>${content}</em>`
      if (t.annotations?.code) content = `<code>${content}</code>`
      if (t.annotations?.underline) content = `<u>${content}</u>`
      if (t.href) content = `<a href="${t.href}" target="_blank" rel="noopener noreferrer">${content}</a>`
      return content
    })
    .join("")
}

/* ===========================================================
   Generic Notion renderer (blogs, people, etc.)
=========================================================== */
function renderNotionBlocksUncached(blocks: any[]): string {
  if (!Array.isArray(blocks)) return ""
  let html = ""
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]
    switch (b.type) {
      case "paragraph": {
        const text = renderRichText(b.paragraph?.rich_text || [])
        html += text.trim() ? `<p class="mb-6 leading-relaxed">${text}</p>` : `<div class="mb-4"></div>`
        break
      }
      case "heading_1": {
        const t = renderRichText(b.heading_1?.rich_text || [])
        if (t) html += `<h1 class="text-3xl font-black text-navy mb-8 mt-12 first:mt-0">${t}</h1>`
        break
      }
      case "heading_2": {
        const t = renderRichText(b.heading_2?.rich_text || [])
        if (t) html += `<h2 class="text-2xl font-bold text-navy mb-6 mt-10 first:mt-0">${t}</h2>`
        break
      }
      case "heading_3": {
        const t = renderRichText(b.heading_3?.rich_text || [])
        if (t) html += `<h3 class="text-xl font-bold text-navy mb-4 mt-8 first:mt-0">${t}</h3>`
        break
      }
      case "bulleted_list_item": {
        const t = renderRichText(b.bulleted_list_item?.rich_text || [])
        if (t) html += `<ul class="list-disc list-inside mb-6 space-y-2"><li>${t}</li></ul>`
        break
      }
      case "numbered_list_item": {
        const t = renderRichText(b.numbered_list_item?.rich_text || [])
        if (t) html += `<ol class="list-decimal list-inside mb-6 space-y-2"><li>${t}</li></ol>`
        break
      }
      case "quote": {
        const t = renderRichText(b.quote?.rich_text || [])
        if (t) html += `<blockquote class="border-l-4 border-accord pl-6 py-4 mb-6 bg-gray-50 italic text-gray-700">${t}</blockquote>`
        break
      }
      case "code": {
        const t = (b.code?.rich_text || []).map((x: any) => x.plain_text || "").join("")
        if (t) html += `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code>${t}</code></pre>`
        break
      }
      case "divider":
        html += `<hr class="border-gray-300 my-8" />`
        break
      default:
        break
    }
  }
  return html
}

/** Cached wrapper for the generic renderer (used across the site). */
export const renderNotionHTML = (blocks: any[], tag: string) =>
  cached(async () => renderNotionBlocksUncached(blocks), ["notion-html", JSON.stringify(blocks).slice(0, 64)], {
    tags: [tag],
    revalidate: 3600,
  })()

export function renderNotionBlocks(blocks: any[]): string {
  return renderNotionBlocksUncached(blocks)
}

/* ===========================================================
   RULES-ONLY RENDERER (legal lists)
   Hierarchy:  (a) → depth 2
               (1) → depth 3
               (A) → depth 4
   (also accepts "1." as depth 1 if it appears)
=========================================================== */

/** Split a Notion paragraph rich_text into lines and keep spans per line. */
function richTextToLinesWithSpans(richText: any[]): { plainText: string; spans: any[] }[] {
  if (!Array.isArray(richText) || richText.length === 0) return []
  let full = ""
  const boundaries: { start: number; end: number; span: any }[] = []
  for (const span of richText) {
    const txt = span.plain_text ?? ""
    const start = full.length
    const end = start + txt.length
    boundaries.push({ start, end, span })
    full += txt
  }
  const lines = full.split(/\r?\n/)
  const out: { plainText: string; spans: any[] }[] = []
  let pos = 0
  for (const line of lines) {
    const start = pos
    const end = pos + line.length
    const spans: any[] = []
    for (const { start: s, end: e, span } of boundaries) {
      if (s < end && e > start) {
        const ss = Math.max(s, start)
        const ee = Math.min(e, end)
        const text = span.plain_text.slice(ss - s, ee - s)
        if (text) spans.push({ ...span, plain_text: text })
      }
    }
    out.push({ plainText: line, spans })
    pos = end + 1
  }
  return out
}

/** Detect legal prefix and return depth + clean text. */
function detectLegalPrefix(line: string): { depth: number; clean: string } | null {
  const s = line.replace(/\u00A0/g, " ").trim()

  // Optional top-level: "1." → depth 1
  const d1 = s.match(/^(\d+)\.\s*(.*)$/)
  if (d1) return { depth: 1, clean: d1[2] }

  // (a) … → depth 2
  const d2 = s.match(/^\(([a-z])\)\s*(.*)$/)
  if (d2) return { depth: 2, clean: d2[2] }

  // (1) … → depth 3
  const d3 = s.match(/^\((\d+)\)\s*(.*)$/)
  if (d3) return { depth: 3, clean: d3[2] }

  // (A) … → depth 4
  const d4 = s.match(/^\(([A-Z])\)\s*(.*)$/)
  if (d4) return { depth: 4, clean: d4[2] }

  return null
}

/** Remove prefix from spans (so we keep rich-text formatting like italics). */
function stripPrefixFromSpans(spans: any[], plainText: string): { depth: number; strippedSpans: any[] } {
  const s = plainText.replace(/\u00A0/g, " ").trim()

  let m: RegExpMatchArray | null
  let depth = 0
  let prefixLen = 0

  if ((m = s.match(/^(\d+)\.\s*(.*)$/))) {
    depth = 1
    prefixLen = m[0].length - m[2].length
  } else if ((m = s.match(/^\(([a-z])\)\s*(.*)$/))) {
    depth = 2
    prefixLen = m[0].length - m[2].length
  } else if ((m = s.match(/^\((\d+)\)\s*(.*)$/))) {
    depth = 3
    prefixLen = m[0].length - m[2].length
  } else if ((m = s.match(/^\(([A-Z])\)\s*(.*)$/))) {
    depth = 4
    prefixLen = m[0].length - m[2].length
  }

  if (depth === 0) return { depth: 0, strippedSpans: spans }

  const out: any[] = []
  let toCut = prefixLen
  for (const span of spans) {
    const txt = span.plain_text ?? ""
    const len = txt.length
    if (toCut >= len) {
      toCut -= len
      continue
    } else if (toCut > 0) {
      const kept = txt.slice(toCut)
      if (kept) out.push({ ...span, plain_text: kept })
      toCut = 0
    } else {
      out.push(span)
    }
  }
  return { depth, strippedSpans: out }
}

/** Render the Rules blocks with hierarchical ordered lists + preserved formatting. */
export function renderRulesHTML(blocks: any[]): string {
  if (!Array.isArray(blocks)) return ""

  let html = `<div class="rules-content">`
  const stack: number[] = [] // current open depths

  const closeTo = (targetDepth: number) => {
    while (stack.length > targetDepth) {
      html += `</ol>`
      stack.pop()
    }
  }
  const openIfNeeded = (depth: number) => {
    const top = stack[stack.length - 1] ?? 0
    if (depth > top) {
      html += `<ol class="depth-${depth}">`
      stack.push(depth)
    }
  }

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]

    switch (b.type) {
      case "heading_1": {
        closeTo(0)
        const t = renderRichText(b.heading_1?.rich_text || [])
        if (t) html += `<h1 class="text-3xl font-black text-navy mb-8 mt-12 first:mt-0">${t}</h1>`
        break
      }
      case "heading_2": {
        closeTo(0)
        const t = renderRichText(b.heading_2?.rich_text || [])
        if (t) {
          const ruleMatch = t.replace(/<[^>]+>/g, "").match(/Rule\s+(\d+)/i)
          const id = ruleMatch ? ` id="rule-${ruleMatch[1]}"` : ""
          html += `<h2${id} class="text-2xl font-bold text-navy mb-6 mt-10 first:mt-0">${t}</h2>`
        }
        break
      }
      case "heading_3": {
        closeTo(0)
        const t = renderRichText(b.heading_3?.rich_text || [])
        if (t) html += `<h3 class="text-xl font-bold text-navy mb-4 mt-8 first:mt-0">${t}</h3>`
        break
      }

      case "paragraph": {
        const lines = richTextToLinesWithSpans(b.paragraph?.rich_text || []).filter(
          (l) => l.plainText.trim().length > 0,
        )

        if (lines.length === 0) {
          closeTo(0)
          html += `<div class="mb-4"></div>`
          break
        }

        let anyLegal = false
        for (const { plainText, spans } of lines) {
          const { depth, strippedSpans } = stripPrefixFromSpans(spans, plainText)
          if (depth > 0) {
            anyLegal = true
            const current = stack[stack.length - 1] ?? 0
            if (depth <= current) closeTo(depth - 1)
            openIfNeeded(depth)
            html += `<li>${renderRichText(strippedSpans)}</li>`
          } else {
            // non-legal: close any open lists and print paragraph
            closeTo(0)
            const t = renderRichText(spans)
            if (t.trim()) html += `<p class="mb-6 leading-relaxed">${t}</p>`
          }
        }

        if (!anyLegal) closeTo(0)
        break
      }

      case "bulleted_list_item": {
        closeTo(0)
        const t = renderRichText(b.bulleted_list_item?.rich_text || [])
        if (t) html += `<ul class="list-disc list-inside mb-6 space-y-2"><li>${t}</li></ul>`
        break
      }

      case "numbered_list_item": {
        // Rare in Rules source; if used, treat as depth-1
        const t = renderRichText(b.numbered_list_item?.rich_text || [])
        if (t) {
          openIfNeeded(1)
          html += `<li>${t}</li>`
        }
        break
      }

      case "quote": {
        closeTo(0)
        const t = renderRichText(b.quote?.rich_text || [])
        if (t) html += `<blockquote class="border-l-4 border-accord pl-6 py-4 mb-6 bg-gray-50 italic text-gray-700">${t}</blockquote>`
        break
      }

      case "code": {
        closeTo(0)
        const t = (b.code?.rich_text || []).map((x: any) => x.plain_text || "").join("")
        if (t) html += `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code>${t}</code></pre>`
        break
      }

      case "divider":
        closeTo(0)
        html += `<hr class="border-gray-300 my-8" />`
        break

      default:
        break
    }
  }

  closeTo(0)
  html += `</div>`
  return html
}
