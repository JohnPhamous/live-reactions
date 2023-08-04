// @ts-nocheck
"use client";

import { generateRandomId } from "@/lib/utils";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

const REACTIONS = [
  { label: "fire", display: "🔥" },
  { label: "heart", display: "❤️" },
  { label: "octopus", display: "🐙" },
  { label: "mountain", display: "🏔️" },
];

/** In milliseconds. */
const ANIMATION_DURATION = 2000;

export default function Reactions() {
  const [allReactions, setAllReactions] = useState([]);

  // Remove stale reactions.
  useInterval(() => {
    const now = new Date().getTime();

    setAllReactions((reactions) =>
      reactions.filter((reaction) => {
        const timePassed = now - reaction.timestamp;

        return timePassed < ANIMATION_DURATION;
      })
    );
  }, ANIMATION_DURATION);

  return (
    <aside
      className="flex items-center justify-center w-full h-full gap-2 text-4xl"
      role="group"
      aria-label="Live stream reactions"
    >
      {REACTIONS.map(({ display, label }) => {
        const reactions = allReactions.filter(
          (reaction) => reaction.label === label
        );

        return (
          <button
            key={label}
            aria-label={`${label} reaction`}
            className="w-10 h-10"
            onClick={() => {
              setAllReactions((prev) => [
                ...prev,
                {
                  id: generateRandomId(),
                  label,
                  timestamp: new Date().getTime(),
                },
              ]);
            }}
          >
            {display}
            <div aria-live="polite" role="log" aria-atomic>
              <div className="sr-only">
                {reactions.length} {label} reactions
              </div>
              <div aria-hidden>
                {reactions.map((reaction) => {
                  return <div key={reaction.id}>{display}</div>;
                })}
              </div>
            </div>
          </button>
        );
      })}
    </aside>
  );
}
