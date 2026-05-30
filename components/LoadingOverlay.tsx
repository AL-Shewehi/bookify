"use client";

import { BookOpen } from "lucide-react";

interface LoadingOverlayProps {
  title?: string;
  steps?: string[];
}

export default function LoadingOverlay({
  title = "Synthesizing your book…",
  steps = [
    "Parsing PDF content",
    "Extracting text segments",
    "Generating book cover",
    "Configuring AI assistant",
  ],
}: LoadingOverlayProps) {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-[var(--bg-tertiary)] shadow-[var(--shadow-soft-lg)]">
        <div className="loading-shadow">
          {/* Spinning book icon */}
          <div className="relative flex items-center justify-center w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-[var(--border-subtle)] border-t-[#663820] animate-spin" />
            <BookOpen className="w-8 h-8 text-[#663820]" />
          </div>

          <h2 className="loading-title" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
            {title}
          </h2>

          <div className="loading-progress">
            {steps.map((step, i) => (
              <div key={i} className="loading-progress-item">
                <span className="loading-progress-status" />
                <span className="text-[var(--text-secondary)]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
