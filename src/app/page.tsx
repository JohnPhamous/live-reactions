"use client";

import {
  RoomProvider,
  useBroadcastEvent,
  useEventListener,
  useMutation,
} from "@/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { useState } from "react";

const REACTIONS = [
  {
    label: "fire",
    display: "🔥",
    color: "bg-sky-500",
    active: "active:bg-sky-700",
  },
  {
    label: "heart",
    display: "❤️",
    color: "bg-violet-500",
    active: "active:bg-violet-600",
  },
  {
    label: "octopus",
    display: "🐙",
    color: "bg-green-500",
    active: "active:bg-green-600",
  },
  {
    label: "clap",
    display: "👏️",
    color: "bg-pink-500",
    active: "active:bg-pink-600",
  },
];

export default function Home() {
  return (
    <RoomProvider
      id="seattlejs-conf-audience"
      initialPresence={{}}
      initialStorage={{
        reactions: new LiveObject({
          fire: 0,
          heart: 0,
          octopus: 0,
          clap: 0,
        }),
      }}
    >
      <Component />
    </RoomProvider>
  );
}

const Component = () => {
  const [mode, setMode] = useState<"presenting" | "finished">("presenting");
  const [counts, setCounts] = useState({
    fire: 0,
    heart: 0,
    octopus: 0,
    clap: 0,
  });

  const broadcast = useBroadcastEvent();

  useEventListener(({ event }) => {
    if (event.type === "finish") {
      setMode("finished");
    }
  });

  const updateCount = useMutation(({ storage }, type: string) => {
    // @ts-expect-error
    const previousCount = storage.get("reactions").get(type);
    // @ts-expect-error
    storage.get("reactions").set(type, previousCount + 1);
  }, []);

  return (
    <>
      {mode === "presenting" ? (
        <main className="grid w-full h-full grid-cols-2 grid-rows-2 gap-4 p-4 bg-slate-300">
          {REACTIONS.map((reaction) => {
            return (
              <button
                className={`text-6xl ${reaction.color} border-8 border-white ${reaction.active} transition-all duration-75 group select-none touch-none`}
                key={reaction.label}
                aria-label={`${reaction.label} reaction`}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
                onClick={() => {
                  setCounts((prev) => ({
                    ...prev,
                    // @ts-expect-error
                    [reaction.label]: prev[reaction.label] + 1,
                  }));
                  updateCount(reaction.label);
                  broadcast({
                    type: "reaction",
                    emoji: reaction.display,
                    emojiId: reaction.label,
                  });
                }}
              >
                <span className="block transition-transform group-active:scale-75">
                  {reaction.display}
                </span>
              </button>
            );
          })}
        </main>
      ) : (
        <main className="w-full h-full bg-slate-900">
          <div className="relative h-full overflow-hidden bg-gray-900 isolate">
            <svg
              className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
              />
            </svg>
            <div
              className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
              aria-hidden="true"
            >
              <div
                className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                style={{
                  clipPath:
                    "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                }}
              />
            </div>
            <div className="px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-32 lg:flex lg:px-8 lg:py-40">
              <div className="flex-shrink-0 max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:pt-8">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Thanks for participating!
                </h1>
                <p className="mt-10 mb-2 text-2xl font-bold tracking-tight text-white sm:text-2xl">
                  Your Stats
                </p>
                <div className="text-2xl text-white">
                  <p>🔥 {counts["fire"]}</p>
                  <p>❤️ {counts["heart"]}</p>
                  <p>🐙 {counts["octopus"]}</p>
                  <p>👏 {counts["clap"]}</p>
                </div>

                <h2 className="mt-10 mb-2 text-2xl font-bold tracking-tight text-white sm:text-2xl">
                  Links
                </h2>

                <ul className="flex flex-col gap-3 text-lg text-white underline">
                  <li>
                    <a href="https://live-reactions-slides.vercel.app/">
                      Slides
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/JohnPhamous/live-reactions">
                      GitHub Repo
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/johnphamous">Twitter</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
