"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function NavigationFinal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof document === "undefined") return

    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)

      if (pathname === "/") {
        const heroHeight = window.innerHeight
        setIsDarkTheme(scrollY < heroHeight - 100)
      } else {
        setIsDarkTheme(false)
      }
    }

    if (pathname === "/") {
      const heroHeight = window.innerHeight
      setIsDarkTheme(window.scrollY < heroHeight - 100)
    } else {
      setIsDarkTheme(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 300)
  }

  const handleMouseEnter = (label?: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (label) {
      setActiveDropdown(label)
    }
  }

  const navItems = [
    {
      label: "Solutions",
      dropdown: [
        { href: "/solutions/ombuds", label: "Ombuds" },
        { href: "/solutions/mediation", label: "Mediation" },
        { href: "/solutions/arbitration", label: "Arbitration" },
      ],
    },
    {
      label: "People",
      dropdown: [
        { href: "/neutrals", label: "Arbitrators & Mediators" },
        { href: "/ombuds", label: "Ombuds Staff" },
        { href: "/advisors-and-leadership", label: "Leadership & Advisors" },
      ],
    },
    {
      label: "Resources",
      dropdown: [
        { href: "/submit-case", label: "Start Your Case" },
        { href: "/dispute-resolution-clauses", label: "Dispute Resolution Clauses" },
        { href: "/resources/rules", label: "FAIR Rules" },
      ],
    },
    { href: "/blog", label: "Insights" },
  ]

  const shouldUseDarkText = pathname !== "/" || !isDarkTheme

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex-shrink-0" aria-label="FAIR Sports Home">
              <Image src="/assets/fair-favicon-white.svg" alt="FAIR Sports Logo" width={48} height={48} />
            </Link>
            <div className="hidden lg:flex items-center">
              <Button asChild className="bg-white hover:bg-gray-100 text-gray-900 rounded-md font-semibold">
                <Link href="/portal">Case Portal</Link>
              </Button>
            </div>
            <div className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? isDarkTheme && pathname === "/"
              ? "bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/80"
              : "bg-background/80 backdrop-blur-lg border-b border-gray-200/80"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex-shrink-0" aria-label="FAIR Sports Home">
              <Image
                src={
                  isDarkTheme && pathname === "/"
                    ? "/assets/fair-favicon-white.svg"
                    : "/assets/fair-sports-favicon-black.svg"
                }
                alt="FAIR Sports Logo"
                width={48}
                height={48}
              />
            </Link>

            <div className="hidden lg:flex items-center justify-center flex-1">
              <nav className="flex items-center space-x-2" onMouseLeave={handleMouseLeave}>
                {navItems.map((item) => (
                  <div
                    key={item.label || item.href}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.dropdown ? item.label : undefined)}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors ${
                          shouldUseDarkText ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        className={`flex items-center px-4 py-2 rounded-md font-semibold text-sm transition-colors ${
                          shouldUseDarkText ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}

                    {item.dropdown && activeDropdown === item.label && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                        onMouseEnter={() => handleMouseEnter()}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="p-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-text-primary rounded-md hover:bg-gray-100 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="hidden lg:flex items-center">
              <Button
                asChild
                className={`rounded-md font-semibold transition-all duration-300 ${
                  shouldUseDarkText
                    ? "bg-gray-900 hover:bg-gray-800 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-900"
                }`}
              >
                <Link href="/portal">Case Portal</Link>
              </Button>
            </div>

            <div className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
                <Menu className={`h-6 w-6 ${shouldUseDarkText ? "text-gray-900" : "text-white"}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image src="/assets/fair-sports-favicon-black.svg" alt="FAIR Sports Logo" width={48} height={48} />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <div key={item.label || item.href}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block py-2 text-lg font-semibold text-text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <h3 className="font-bold text-lg text-text-primary pt-4 pb-2">{item.label}</h3>
                      {item.dropdown?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-2 text-text-muted hover:text-text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              ))}
              <Button asChild size="lg" className="w-full rounded-md font-semibold transition-all duration-300 mt-8">
                <Link href="/portal">Case Portal</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
