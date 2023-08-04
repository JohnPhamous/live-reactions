"use client";

const REACTIONS = [
  { label: "fire", display: "🔥" },
  { label: "heart", display: "❤️" },
  { label: "octopus", display: "🐙" },
  { label: "mountain", display: "🏔️" },
];

export default function Reactions() {
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
          </button>
        );
      })}
    </aside>
  );
}
