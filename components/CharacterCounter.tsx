"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import TextStats from "@/components/TextStats";
import LetterDensity from "@/components/LetterDensity";
import { useTheme } from "@/components/hooks/useTheme";
import { useTextAnalysis } from "@/components/hooks/useTextAnalysis";

export default function CharacterCounter() {
  const [text, setText] = useState(
    "Design is the silent ambassador of your brand. Simplicity is key to effective communication, creating clarity in every interaction. A great design transforms complex ideas into elegant solutions, making them easy to understand. It blends aesthetics and functionality seamlessly."
  );
  const [excludeSpaces, setExcludeSpaces] = useState(true);
  const [characterLimit, setCharacterLimit] = useState<number | null>(300);
  const [isCharacterLimitEnabled, setIsCharacterLimitEnabled] = useState(true);
  const [textareaHeight, setTextareaHeight] = useState("120px");

  const { isDark, toggleTheme } = useTheme();
  const {
    getCharacterCount,
    getWordCount,
    getSentenceCount,
    getLetterDensity,
  } = useTextAnalysis(text, excludeSpaces);

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    const minHeight = 120;
    const maxHeight = 400;
    element.style.height = "auto";
    const scrollHeight = element.scrollHeight;
    element.style.height = `${Math.min(
      Math.max(scrollHeight, minHeight),
      maxHeight
    )}px`;
    setTextareaHeight(
      `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`
    );
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-[#12131A] text-white" : "bg-white text-[#12131A]"
      } p-4 sm:p-6 relative transition-colors duration-300 bg-noise`}
      style={
        {
          "--noise-opacity-before": isDark ? "0.4" : "0.2",
          "--noise-opacity-after": isDark ? "0.5" : "0.3",
          "--noise-mix-blend-mode": isDark ? "soft-light" : "multiply",
        } as React.CSSProperties
      }
    >
      <div
        className={`relative z-10 ${
          isDark ? "bg-[#12131A]/70" : "bg-white/70"
        } p-4 sm:p-6 rounded-xl backdrop-blur-sm max-w-5xl mx-auto`}
      >
        <Header isDark={isDark} toggleTheme={toggleTheme} />

        <main className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-center mb-2 sm:mb-4">
            Analyze your text
          </h1>
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-6 sm:mb-12">
            in real-time.
          </h2>

          <div className="relative mb-4">
            <Textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                adjustTextareaHeight(e.target as HTMLTextAreaElement);
              }}
              className={`min-h-[120px] max-h-[300px] sm:max-h-[400px] overflow-y-auto rounded-xl border-2 p-3 sm:p-4 resize-none text-sm sm:text-base ${
                isCharacterLimitEnabled &&
                characterLimit &&
                getCharacterCount() > characterLimit
                  ? "border-[#DA3701]"
                  : isDark
                  ? "border-[#2A2B37] bg-[#1E1F2A]"
                  : "border-[#E5E4EF] bg-white"
              } focus:ring-0 focus:border-[#C27CF8] transition-colors`}
              style={{ height: textareaHeight }}
              placeholder="Enter your text here..."
            />
            {isCharacterLimitEnabled &&
              characterLimit &&
              getCharacterCount() > characterLimit && (
                <p className="text-[#DA3701] text-sm mt-2 flex items-center gap-2">
                  <span className="inline-block w-4 h-4">⚠️</span>
                  Limit reached! Your text exceeds {characterLimit} characters.
                </p>
              )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={excludeSpaces}
                  onCheckedChange={(checked) => setExcludeSpaces(!!checked)}
                  className={isDark ? "border-[#2A2B37]" : "border-[#E5E4EF]"}
                />
                <span className="text-sm">Exclude Spaces</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={isCharacterLimitEnabled}
                  onCheckedChange={(checked) => {
                    setIsCharacterLimitEnabled(!!checked);
                    if (!checked) {
                      setCharacterLimit(null);
                    } else if (characterLimit === null) {
                      setCharacterLimit(300);
                    }
                  }}
                  className={isDark ? "border-[#2A2B37]" : "border-[#E5E4EF]"}
                />
                <span className="text-sm">Set Character Limit</span>
                <Input
                  type="number"
                  value={characterLimit ?? ""}
                  onChange={(e) =>
                    setCharacterLimit(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  className={`w-16 bg-transparent ${
                    isDark ? "border-[#2A2B37]" : "border-[#E5E4EF]"
                  } rounded-lg text-xs sm:text-sm px-2 py-1`}
                />
              </label>
            </div>
            <span
              className={`text-sm ${
                isDark ? "text-[#404254]" : "text-[#404254]"
              } mt-2 sm:mt-0`}
            >
              Approx. reading time:{" "}
              {(() => {
                const wordCount = getWordCount();
                if (wordCount === 0) return "<1 minute";
                const minutes = Math.ceil(wordCount / 200);
                return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
              })()}
            </span>
          </div>

          <TextStats
            characterCount={getCharacterCount()}
            wordCount={getWordCount()}
            sentenceCount={getSentenceCount()}
            isDark={isDark}
            excludeSpaces={excludeSpaces}
            className="mb-6 sm:mb-8"
          />

          <LetterDensity letterDensity={getLetterDensity()} isDark={isDark} />
        </main>
      </div>
    </div>
  );
}
