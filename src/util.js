import nanoid from "nanoid";

export function generateId() {
  return nanoid();
}

export function copy(data) {
  return JSON.parse(JSON.stringify(data));
}
