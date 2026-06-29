"use client";

import { api } from "@/lib/api";
import { Note } from "@/types";
import { useEffect, useState } from "react";
import { SearchBar } from "./search-bar";
import { CreateNoteButton } from "./create-note-button";
import { Spinner } from "@/components/ui/spinner";
import { NoteList } from "./note-list";

export function DashboardView({
  section,
  emptyTitle,
  emptyDescription,
}: {
  section: "mine" | "shared" | "pinned";
  emptyTitle: string;
  emptyDescription: string;
}) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      setLoading(true);
      setError("");

      api
        .getNotes({ section, q: query })
        .then((data) => {
          if (!cancelled) setNotes(data.notes);
        })
        .catch((e) => {
          if (!cancelled) setError(e.message);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, query ? 300 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [section, query]);

  return (
    <div>
      <div>
        <SearchBar value={query} onChange={setQuery} />
        {section === "mine" && <CreateNoteButton />}
      </div>

      {error && <p>{error}</p>}
      {loading ? (
        <Spinner />
      ) : (
        <NoteList
          notes={notes}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
        />
      )}
    </div>
  );
}
