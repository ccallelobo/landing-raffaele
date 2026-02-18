"use client";

import { useState, useRef, useEffect } from "react";

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
  moreLabel: string;
  className?: string;
}

export default function ExpandableText({
  text,
  maxLines = 3,
  moreLabel,
  className = "",
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    // Compare scroll height vs clamped height
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * maxLines;
    setNeedsTruncation(el.scrollHeight > maxHeight + 2);
  }, [text, maxLines]);

  return (
    <div>
      <p
        ref={textRef}
        className={`${className} transition-all duration-300 ease-out ${
          !expanded && needsTruncation ? `line-clamp-${maxLines}` : ""
        }`}
        style={
          !expanded && needsTruncation
            ? {
                display: "-webkit-box",
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
            : undefined
        }
      >
        {text}
      </p>
      {needsTruncation && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-2 text-gold text-[13px] font-semibold tracking-[0.15em] uppercase hover:text-gold-dark transition-colors duration-300 cursor-pointer"
        >
          {moreLabel} →
        </button>
      )}
    </div>
  );
}
