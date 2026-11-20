/** Build a sized image URL from a Google Play image base URL. */
export function playImg(base: string, size: string) {
  if (!base || !base.includes("googleusercontent.com")) return base;
  return `${base}=${size}`;
}

/** Only show download counts once they are worth bragging about (100+). */
export function showDownloads(d?: string) {
  if (!d) return false;
  const n = parseFloat(d.replace(/,/g, ""));
  return /[KMB]/i.test(d) || n >= 100;
}
