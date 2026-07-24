"use client";

import type { RefObject } from "react";
import Link from "next/link";
import type { SearchResult } from "@/lib/search";
import SearchIcon from "@/components/shared/icons/SearchIcon";

// Short, real substrings of catalog category names so every pill returns
// actual results (see lib/search.ts) rather than a curated dead end.
export const POPULAR = ["Lecterns", "Risers", "Pedestals", "Signages"];

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
      <p className="px-5 py-4 font-body text-sm text-text-secondary">
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
          className="flex items-center gap-3 px-5 py-2.5 hover:bg-surface transition-colors duration-150"
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

// Input row + popular pills / results, split out of SearchBar so the
// dropdown's positioning/chrome logic isn't tangled up with its content.
export function SearchPanelBody({
  query,
  setQuery,
  results,
  inputRef,
  onClose,
  onSelect,
}: {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  inputRef: RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onSelect: () => void;
}) {
  return (
    <>
      <div className="flex items-center gap-3 px-5 border-b border-border">
        <SearchIcon size={17} className="text-text-faint shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 font-body text-base text-text-primary placeholder:text-text-faint
                     bg-transparent outline-none py-4 min-w-0"
        />
        <button
          onClick={onClose}
          aria-label="Close search"
          className="w-7 h-7 flex items-center justify-center shrink-0 rounded-full
                     text-text-faint hover:text-text-primary hover:bg-surface transition-colors duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {query.trim() ? (
        <div className="max-h-96 overflow-y-auto py-2">
          <ResultsList results={results} query={query} onSelect={onSelect} />
        </div>
      ) : (
        <div className="px-5 py-5">
          <p className="font-body text-xs uppercase tracking-wider text-text-faint mb-3">
            Popular
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="rounded-full border border-border px-3.5 py-1.5 font-body text-sm text-text-secondary
                           hover:border-text-primary hover:text-text-primary transition-colors duration-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
