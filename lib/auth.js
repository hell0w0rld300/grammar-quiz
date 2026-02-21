// Uses Web Crypto API (available in both Edge runtime and Node.js 18+)

const getSecret = () =>
  process.env.ADMIN_SECRET || 'change-this-fallback-secret-in-production';

const getAdminPassword = () =>
  process.env.ADMIN_PASSWORD || 'admin123';

async function sha256Hex(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Token = sha256(password + ":" + secret)
export async function createAdminToken() {
  const raw = `${getAdminPassword()}:${getSecret()}`;
  return sha256Hex(raw);
}

// Constant-time comparison to prevent timing attacks
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function verifyAdminToken(token) {
  if (!token) return false;
  try {
    const expected = await createAdminToken();
    return safeEqual(token, expected);
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password) {
  return safeEqual(password, getAdminPassword());
}
