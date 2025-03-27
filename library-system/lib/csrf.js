export async function generateToken() {
  // generation of random secret
  const secretArray = new Uint8Array(16);
  crypto.getRandomValues(secretArray);
  const secret = Array.from(secretArray)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // token using the secret
  const encoder = new TextEncoder();
  const data = encoder.encode("csrf-token");
  const keyData = encoder.encode(secret);

  // importing the secret as a key
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // signing the data with the key
  const signature = await crypto.subtle.sign("HMAC", key, data);

  // converting the signature to a hexadecimal string
  const token = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return { secret, token };
}

export async function verifyToken(secret, token) {
  if (!secret || !token) return false;

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode("csrf-token");
    const keyData = encoder.encode(secret);

    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, data);

    const expectedToken = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return token === expectedToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}
