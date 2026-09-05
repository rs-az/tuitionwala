import {
  onValue,
  push,
  ref,
  remove,
  set,
  update,
  get,
  child,
} from 'firebase/database';

export function toList(snapshotVal) {
  if (!snapshotVal) return [];
  return Object.entries(snapshotVal).map(([id, value]) => ({ id, ...value }));
}

export function subscribeList(db, path, onData, onError) {
  const r = ref(db, path);
  return onValue(
    r,
    (snap) => {
      onData(toList(snap.val()));
    },
    (err) => {
      if (onError) onError(err);
    },
  );
}

export async function createItem(db, path, value) {
  const r = ref(db, path);
  const newRef = await push(r);
  await set(newRef, value);
  return newRef.key;
}

export async function setItem(db, path, value) {
  await set(ref(db, path), value);
}

export async function updateItem(db, path, partial) {
  await update(ref(db, path), partial);
}

export async function deleteItem(db, path) {
  await remove(ref(db, path));
}

export async function getValue(db, path) {
  const snap = await get(child(ref(db), path));
  return snap.val();
}

export function subscribeValue(db, path, onData, onError) {
  const r = ref(db, path);
  return onValue(
    r,
    (snap) => {
      onData(snap.val());
    },
    (err) => {
      if (onError) onError(err);
    },
  );
}

