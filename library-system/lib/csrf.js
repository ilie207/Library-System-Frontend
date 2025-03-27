import Tokens from "csrf";

const tokens = new Tokens();

export function generateToken() {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  return { secret, token };
}

export function verifyToken(secret, token) {
  return tokens.verify(secret, token);
}
