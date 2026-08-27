type UnmutedListener = (activeId: string | null) => void;

let activeUnmutedId: string | null = null;
const listeners = new Set<UnmutedListener>();

export function getActiveUnmutedId(): string | null {
  return activeUnmutedId;
}

export function setActiveUnmutedId(id: string | null): void {
  if (activeUnmutedId === id) return;
  activeUnmutedId = id;
  for (const listener of listeners) {
    listener(activeUnmutedId);
  }
}

export function subscribeUnmuted(listener: UnmutedListener): () => void {
  listeners.add(listener);
  listener(activeUnmutedId);
  return () => {
    listeners.delete(listener);
  };
}
