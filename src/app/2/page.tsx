"use client";

import { useState } from "react";

const REACTIONS = [
  { label: "fire", display: "🔥" },
  { label: "heart", display: "❤️" },
  { label: "octopus", display: "🐙" },
  { label: "mountain", display: "🏔️" },
];

export default function Reactions() {
  const [reactions, setReactions] = useState([]);

  return (
    <aside
      className="flex items-center justify-center w-full h-full gap-2 text-4xl"
      role="group"
      aria-label="Live stream reactions"
    >
      {REACTIONS.map(({ display, label }) => {
        return (
          <button
            key={label}
            aria-label={`${label} reaction`}
            className="w-10 h-10"
          >
            {display}
            <div aria-live="polite" role="log">
              <div className="sr-only"></div>
              <div></div>
            </div>
          </button>
        );
      })}
    </aside>
  );
}
