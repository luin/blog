"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ textAlign: "center", padding: "4rem 0" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>出错了！</h2>
      <p style={{ marginBottom: "2rem" }}>抱歉，页面加载时出现了错误。</p>
      <button
        onClick={() => reset()}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          backgroundColor: "var(--theme-accent)",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        重试
      </button>
    </div>
  );
}
