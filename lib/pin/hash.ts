const encoder = new TextEncoder();

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPin(pin: string, parentUserId: string): Promise<string> {
  const normalizedPin = pin.trim();
  const saltedValue = `${parentUserId}:${normalizedPin}`;
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(saltedValue));

  return bytesToHex(digest);
}

export async function verifyPin(pin: string, parentUserId: string, expectedHash: string): Promise<boolean> {
  const hash = await hashPin(pin, parentUserId);

  return hash === expectedHash;
}
