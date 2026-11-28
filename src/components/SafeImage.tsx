"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

/**
 * A next/image that shows a graceful fallback instead of a broken-image icon
 * when the source fails to load. Google Play serves volatile "preview" image
 * URLs (…/pcsb/AEecph…) for freshly published games that can fail
 * intermittently until Google finishes processing them — this keeps the UI
 * clean in the meantime.
 */
export default function SafeImage({
  fallback,
  ...props
}: ImageProps & { fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (failed || !props.src) return <>{fallback}</>;
  // alt is always supplied by callers via {...props}; the linter can't see it through the spread.
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} onError={() => setFailed(true)} />;
}
