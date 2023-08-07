import { LiveList, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

type Presence = {};

type Storage = {
  fireReactions: LiveList<{ id: string }>;
  heartReactions: LiveList<{ id: string }>;
  octopusReactions: LiveList<{ id: string }>;
  clapReactions: LiveList<{ id: string }>;
  mode: "presenting" | "finished";
};

type UserMeta = {};

type RoomEvent =
  | {
      type: "react";
      emoji: string;
    }
  | {
      type: "reaction";
      emoji: string;
      emojiId: string;
    }
  | {
      type: "finish";
    };

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
