// @ts-nocheck
"use client";

import {
  generateRandomId,
  getRandomAngle,
  getRandomAnimationCurve,
} from "@/lib/utils";
import { useState } from "react";
import { useInterval } from "usehooks-ts";
import {
  RoomProvider,
  useBroadcastEvent,
  useEventListener,
} from "@/liveblocks.config";

const REACTIONS = [
  { label: "fire", display: "🔥" },
  { label: "heart", display: "❤️" },
  { label: "octopus", display: "🐙" },
  { label: "mountain", display: "🏔️" },
];

/** In milliseconds. */
const ANIMATION_DURATION = 2000;

export default function Reactions() {
  return (
    <RoomProvider id="seattlejs-conf">
      <Component />
    </RoomProvider>
  );
}

const Component = () => {
  const [allLocalReactions, setAllLocalReactions] = useState([]);
  const [allRemoteReactions, setAllRemoteReactions] = useState([]);
  const broadcast = useBroadcastEvent();

  useEventListener(({ event }) => {
    setAllRemoteReactions((prev) => [
      ...prev,
      {
        id: generateRandomId(),
        label: event.emoji,
        timestamp: new Date().getTime(),
        curve: getRandomAnimationCurve(),
        startingAngle: getRandomAngle(),
      },
    ]);
  });

  // Remove stale reactions.
  useInterval(() => {
    const now = new Date().getTime();

    const cleanup = (reactions) =>
      reactions.filter((reaction) => {
        const timePassed = now - reaction.timestamp;

        return timePassed < ANIMATION_DURATION;
      });

    setAllLocalReactions(cleanup);
    setAllRemoteReactions(cleanup);
  }, ANIMATION_DURATION);

  return (
    <aside
      className="flex items-center justify-center w-full h-full gap-2 text-4xl"
      role="group"
      aria-label="Live stream reactions"
    >
      {REACTIONS.map(({ display, label }) => {
        const localReactions = allLocalReactions.filter(
          (reaction) => reaction.label === label
        );
        const remoteReactions = allRemoteReactions.filter(
          (reaction) => reaction.label === label
        );

        return (
          <button
            key={label}
            aria-label={`${label} reaction`}
            className="relative w-10 h-10"
            onClick={() => {
              const newReaction = {
                id: generateRandomId(),
                label,
                timestamp: new Date().getTime(),
                curve: getRandomAnimationCurve(),
                startingAngle: getRandomAngle(),
              };

              setAllLocalReactions((prev) => [...prev, newReaction]);
              broadcast({
                type: "reaction",
                emoji: label,
              });
            }}
          >
            <span className="relative z-10">{display}</span>
            <div aria-live="polite" role="log" aria-atomic>
              <div className="sr-only">
                {localReactions.length + remoteReactions.length} {label}{" "}
                reactions
              </div>
              <div aria-hidden className="absolute inset-0">
                {[...localReactions, ...remoteReactions].map((reaction) => {
                  return (
                    <div
                      key={reaction.id}
                      className={`absolute animate-reaction`}
                      style={{
                        // Sets transform: rotate();
                        "--starting-angle": `${reaction.startingAngle}deg`,
                        animationTimingFunction: reaction.curve,
                      }}
                    >
                      {display}
                    </div>
                  );
                })}
              </div>
            </div>
          </button>
        );
      })}
    </aside>
  );
};
