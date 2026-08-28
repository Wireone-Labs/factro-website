"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True only once the component has mounted on the client (post-hydration). */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
