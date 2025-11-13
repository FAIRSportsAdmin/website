import "server-only"
import { Client } from "@notionhq/client"

let notion: Client | null = null

export function getNotionClient(): Client {
  if (!notion) {
    const apiKey = process.env.NOTION_API_KEY
    if (!apiKey) {
      throw new Error("NOTION_API_KEY environment variable is required")
    }
    notion = new Client({
      auth: apiKey,
      notionVersion: "2025-09-03",
    })
  }
  return notion
}

export async function getDataSourceId(databaseId: string, preferredName?: string): Promise<string> {
  try {
    const client = getNotionClient()
    const response = (await client.databases.retrieve({ database_id: databaseId })) as any

    const list = response.data_sources ?? []
    if (list.length === 0) {
      throw new Error(`No data sources found for database ${databaseId}`)
    }

    let ds = preferredName ? list.find((d: any) => (d.name || "").toLowerCase() === preferredName.toLowerCase()) : null

    // Fallback to first data source if not found
    if (!ds) {
      ds = list[0]
    }

    return ds.id
  } catch (error: any) {
    console.error(`Failed to get data source ID for database ${databaseId}:`, {
      error: error.message,
      code: error.code,
      status: error.status,
    })
    throw error
  }
}

export async function getResolvedDataSourceId(
  databaseId: string,
  envDataSourceId?: string,
  preferredName?: string,
): Promise<string> {
  if (envDataSourceId && /^[0-9a-f-]{36}$/i.test(envDataSourceId)) {
    return envDataSourceId
  }

  // Fallback to discovering data source from database
  return getDataSourceId(databaseId, preferredName)
}

export async function queryDataSource(dataSourceId: string, options: any = {}) {
  try {
    const client = getNotionClient()

    const response = await client.request({
      path: `data_sources/${dataSourceId}/query`,
      method: "POST",
      body: options,
    })

    return response
  } catch (error: any) {
    console.error("queryDataSource failed", {
      dataSourceId,
      status: error?.status,
      code: error?.code,
      message: error?.message,
    })
    throw error
  }
}
