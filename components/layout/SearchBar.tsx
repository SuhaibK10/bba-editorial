"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { search, type SearchResult } from "@/lib/search";
import SearchIcon from "@/components/shared/icons/SearchIcon";

function ResultsList({
  results,
  query,
  onSelect,
}: {
  results: SearchResult[];
  query: string;
  onSelect: () => void;
}) {
  if (results.length === 0) {
    return (
      <p className="px-4 py-3 font-body text-sm text-text-secondary">
        No results for &ldquo;{query}&rdquo;
      </p>
    );
  }
  return (
    <>
      {results.map((r) => (
        <Link
          key={`${r.type}-${r.href}-${r.label}`}
          href={r.href}
          onClick={onSelect}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface transition-colors duration-150"
        >
          <span
            className="w-8 h-8 rounded-lg shrink-0"
            style={{ background: r.color }}
            aria-hidden="true"
          />
          <span className="min-w-0">
            <span className="block font-body text-sm font-medium text-text-primary truncate">
              {r.label}
            </span>
            <span className="block font-body text-xs text-text-faint truncate">
              {r.type === "product" ? "Product" : "Industry"}
            </span>
          </span>
        </Link>
      ))}
    </>
  );
}

// Navbar search, all viewports. Desktop: the icon expands into an inline
// input inside the pill. Mobile: no room next to the centered logo, so the
// input lives at the top of the results panel that drops below the icon.
// Plain CSS transitions only — no scroll/entrance animation.
export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);

  const results = search(query);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  useEffect(() => {
    // Focus the inline input on desktop only; the mobile panel's input
    // autofocuses itself on mount instead.
    if (open && window.matchMedia("(min-width: 768px)").matches) {
      desktopInputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative flex items-center">
      <div
        className={`flex items-center rounded-full border
                    transition-[width] duration-200 ease-out overflow-hidden
                    ${open
                      ? "w-9 md:w-56 border-transparent md:border-border md:bg-white"
                      : "w-9 border-transparent bg-transparent"}`}
      >
        <button
          onClick={() => (open ? close() : setOpen(true))}
          aria-label={open ? "Close search" : "Search"}
          aria-expanded={open}
          className="w-9 h-9 flex items-center justify-center shrink-0
                     text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <SearchIcon size={17} />
        </button>
        {/* Desktop inline input; stays collapsed on mobile */}
        <input
          ref={desktopInputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className={`font-body text-sm text-text-primary placeholder:text-text-faint
                      bg-transparent outline-none pr-3 min-w-0
                      transition-opacity duration-150
                      ${open ? "opacity-0 w-0 pointer-events-none md:opacity-100 md:w-full md:pointer-events-auto" : "opacity-0 w-0 pointer-events-none"}`}
        />
      </div>

      {/* Mobile panel: input + results below the icon */}
      {open && (
        <div
          className="md:hidden absolute top-[calc(100%+0.75rem)] right-0 w-[calc(100vw-3rem)] max-w-80
                     rounded-2xl border border-border bg-white shadow-card-hover overflow-hidden z-50"
        >
          <div className="flex items-center gap-2 px-4 border-b border-border">
            <SearchIcon size={14} className="text-text-faint shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="font-body text-sm text-text-primary placeholder:text-text-faint
                         bg-transparent outline-none w-full py-3"
            />
          </div>
          {query.trim() && (
            <div className="max-h-72 overflow-y-auto py-2">
              <ResultsList results={results} query={query} onSelect={close} />
            </div>
          )}
        </div>
      )}

      {/* Desktop results dropdown */}
      {open && query.trim() && (
        <div
          className="hidden md:block absolute top-[calc(100%+0.5rem)] right-0 w-80 max-h-96 overflow-y-auto
                     rounded-2xl border border-border bg-white shadow-card-hover py-2 z-50"
        >
          <ResultsList results={results} query={query} onSelect={close} />
        </div>
      )}
    </div>
  );
}
