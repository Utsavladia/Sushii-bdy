"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt?: string;
  index: number;
  className?: string;
};

const placeholderGradients = [
  "linear-gradient(135deg, #ffd0e1 0%, #c5a3f7 100%)",
  "linear-gradient(135deg, #ffe4ea 0%, #ffb3c6 100%)",
  "linear-gradient(135deg, #ede0ff 0%, #ffc9d4 100%)",
  "linear-gradient(135deg, #fff3d9 0%, #ffc9d4 100%)",
  "linear-gradient(135deg, #ffc9d4 0%, #d4a85a 100%)",
  "linear-gradient(135deg, #dcc4ff 0%, #ff7a93 100%)",
];

export default function Photo({ src, alt, index, className = "" }: Props) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        role="img"
        aria-label={alt ?? "placeholder photo"}
        className={`relative w-full h-full flex items-center justify-center ${className}`}
        style={{ background: placeholderGradients[index % placeholderGradients.length] }}
      >
        <span className="text-7xl drop-shadow-md">♡</span>
        <span className="absolute bottom-3 right-4 text-xs uppercase tracking-widest text-white/80 font-medium">
          drop /public/photos/{index + 1}.jpg
        </span>
      </div>
    );
  }

  /* eslint-disable-next-line @next/next/no-img-element */
  return (
    <img
      src={src}
      alt={alt ?? `photo ${index + 1}`}
      onError={() => setError(true)}
      className={`block w-full h-auto ${className}`}
    />
  );
}
