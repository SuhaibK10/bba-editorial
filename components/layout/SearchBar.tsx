"use client";

import { useEffect, useRef, useState } from "react";
import { search } from "@/lib/search";
import SearchIcon from "@/components/shared/icons/SearchIcon";
import { SearchPanelBody } from "@/components/layout/SearchPanel";

// Command-palette-styled dropdown, anchored directly below the navbar's
// search icon, same on every viewport.
export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = search(query);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? "Close search" : "Search"}
        aria-expanded={open}
        className="w-9 h-9 flex items-center justify-center shrink-0 rounded-full
                   text-text-primary hover:text-accent transition-colors duration-200"
      >
        <SearchIcon size={17} />
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+0.75rem)] right-0 z-50
                     w-72 sm:w-80 max-w-[calc(100vw-2rem)]
                     rounded-2xl border border-border bg-background shadow-card-hover overflow-hidden"
        >
          <SearchPanelBody
            query={query}
            setQuery={setQuery}
            results={results}
            inputRef={inputRef}
            onClose={close}
            onSelect={close}
          />
          <div className="px-5 py-3 border-t border-border">
            <span className="font-body text-xs text-text-faint">Press ESC to close</span>
          </div>
        </div>
      )}
    </div>
  );
}
