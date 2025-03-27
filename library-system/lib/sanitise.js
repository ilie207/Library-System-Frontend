import DOMPurify from "isomorphic-dompurify";

// sanitisation of a single string
export function sanitiseString(input) {
  if (!input) return "";
  return DOMPurify.sanitize(input, { USE_PROFILES: { html: false } });
}

// sanitisation for object's string properties
export function sanitiseObject(obj) {
  if (!obj) return {};

  const sanitised = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitised[key] = sanitiseString(value);
    } else {
      sanitised[key] = value;
    }
  }
  return sanitised;
}
