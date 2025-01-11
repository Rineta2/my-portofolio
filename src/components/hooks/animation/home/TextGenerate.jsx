import React, { useState, useEffect, useRef } from "react";

export default function TextGenerate({ text, delay = 0 }) {
  const [displayText, setDisplayText] = useState("");
  const index = useRef(0);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (index.current < text.length) {
          setDisplayText((prev) => prev + text[index.current]);
          index.current += 1;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [text, delay]);

  return (
    <span
      style={{
        opacity: displayText.length > 0 ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {displayText}
    </span>
  );
}
