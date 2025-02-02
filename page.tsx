import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sun, Moon } from "lucide-react"

export default function CharacterCounter() {
  const [text, setText] = useState(
    "Design is the silent ambassador of your brand. Simplicity is key to effective communication, creating clarity in every interaction. A great design transforms complex ideas into elegant solutions, making them easy to understand. It blends aesthetics and functionality seamlessly.",
  )
  const [excludeSpaces, setExcludeSpaces] = useState(true)
  const [characterLimit, setCharacterLimit] = useState<number | null>(300)
  const [isCharacterLimitEnabled, setIsCharacterLimitEnabled] = useState(true)
  const [isDark, setIsDark] = useState(true)
  const [textareaHeight, setTextareaHeight] = useState("120px")
  const [isLetterDensityExpanded, setIsLetterDensityExpanded] = useState(false)

  // Text analysis functions
  const getCharacterCount = () => (excludeSpaces ? text.replace(/\s/g, "").length : text.length)
  const getWordCount = () => (text.trim() ? text.trim().split(/\s+/).length : 0)
  const getSentenceCount = () => (text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0)

  const getLetterDensity = () => {
    if (!text.trim()) return []

    const letters = text.toLowerCase().split("")
    const total = letters.length
    const counts: Record<string, number> = {}

    letters.forEach((letter) => {
      if (/[a-z]/.test(letter)) {
        counts[letter] = (counts[letter] || 0) + 1
      }
    })

    return Object.entries(counts)
      .map(([letter, count]) => ({
        letter: letter.toUpperCase(),
        count,
        percentage: ((count / total) * 100).toFixed(2),
      }))
      .sort((a, b) => b.count - a.count)
  }

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    const minHeight = 120
    const maxHeight = 400
    element.style.height = "auto"
    const scrollHeight = element.scrollHeight
    element.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`
    setTextareaHeight(`${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`)
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement | null
    if (textarea) {
      adjustTextareaHeight(textarea)
    }
  }, [text, adjustTextareaHeight]) // Added adjustTextareaHeight to dependencies

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const toggleLetterDensityExpanded = () => {
    setIsLetterDensityExpanded(!isLetterDensityExpanded)
  }

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-[#12131A] text-white" : "bg-white text-[#12131A]"} p-6 relative transition-colors duration-300 bg-noise`}
      style={
        {
          "--noise-opacity-before": isDark ? "0.4" : "0.2",
          "--noise-opacity-after": isDark ? "0.5" : "0.3",
          "--noise-mix-blend-mode": isDark ? "soft-light" : "multiply",
        } as React.CSSProperties
      }
    >
      <div className={`relative z-10 ${isDark ? "bg-[#12131A]/70" : "bg-white/70"} p-6 rounded-xl backdrop-blur-sm`}>
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <svg
              width="33"
              height="40"
              viewBox="0 0 33 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <g id="Group 2">
                <path
                  id="Vector"
                  d="M18.3562 5.82192V0H0V40H18.3562V34.1781C14.5959 34.1781 10.9896 32.6842 8.33074 30.0253C5.67183 27.3664 4.17808 23.7603 4.17808 20C4.17808 16.2397 5.67183 12.6334 8.33074 9.97459C10.9896 7.31568 14.5959 5.82192 18.3562 5.82192Z"
                  fill="#D3A0FA"
                />
                <path
                  id="Vector_2"
                  d="M18.3569 5.8219V34.1781C22.1172 34.1781 25.7235 32.6842 28.3824 30.0253C31.0413 27.3664 32.535 23.7603 32.535 20C32.535 16.2397 31.0413 12.6334 28.3824 9.97457C25.7235 7.31567 22.1172 5.8219 18.3569 5.8219Z"
                  fill="#D3A0FA"
                />
              </g>
            </svg>
            <span className="text-xl font-semibold">Character Counter</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full w-10 h-10 ${isDark ? "bg-[#21222C] text-white" : "bg-[#F2F2F7] text-[#12131A]"}`}
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </header>

        <main className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-4">Analyze your text</h1>
          <h2 className="text-5xl font-bold text-center mb-12">in real-time.</h2>

          <div className="relative mb-4">
            <Textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                adjustTextareaHeight(e.target as HTMLTextAreaElement)
              }}
              className={`min-h-[120px] max-h-[400px] overflow-y-auto rounded-xl border-2 p-4 resize-none ${
                isCharacterLimitEnabled && characterLimit && getCharacterCount() > characterLimit
                  ? "border-[#DA3701]"
                  : isDark
                    ? "border-[#2A2B37] bg-[#1E1F2A]"
                    : "border-[#E5E4EF] bg-white"
              } focus:ring-0 focus:border-[#C27CF8] transition-colors`}
              style={{ height: textareaHeight }}
              placeholder="Enter your text here..."
            />
            {isCharacterLimitEnabled && characterLimit && getCharacterCount() > characterLimit && (
              <p className="text-[#DA3701] text-sm mt-2 flex items-center gap-2">
                <span className="inline-block w-4 h-4">⚠️</span>
                Limit reached! Your text exceeds {characterLimit} characters.
              </p>
            )}
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-6">
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
                    setIsCharacterLimitEnabled(!!checked)
                    if (!checked) {
                      setCharacterLimit(null)
                    } else if (characterLimit === null) {
                      setCharacterLimit(300)
                    }
                  }}
                  className={isDark ? "border-[#2A2B37]" : "border-[#E5E4EF]"}
                />
                <span className="text-sm">Set Character Limit</span>
                <Input
                  type="number"
                  value={characterLimit ?? ""}
                  onChange={(e) => setCharacterLimit(e.target.value ? Number(e.target.value) : null)}
                  className={`w-16 bg-transparent ${isDark ? "border-[#2A2B37]" : "border-[#E5E4EF]"} rounded-lg text-sm px-2 py-1`}
                />
              </label>
            </div>
            <span className={`text-sm ${isDark ? "text-[#404254]" : "text-[#404254]"}`}>
              Approx. reading time: {(() => {
                const wordCount = getWordCount()
                if (wordCount === 0) return "<1 minute"
                const minutes = Math.ceil(wordCount / 200)
                return `${minutes} minute${minutes !== 1 ? "s" : ""}`
              })()}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div
              className={`${isDark ? "bg-[#D3A0FA] bg-opacity-20" : "bg-[#D3A0FA] bg-opacity-10"} rounded-2xl p-6 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#D3A0FA] opacity-10 rounded-full translate-x-8 -translate-y-8"></div>
              <div className="text-6xl font-bold mb-2">{getCharacterCount()}</div>
              <div className="text-sm">Total Characters {excludeSpaces && "(no space)"}</div>
            </div>
            <div
              className={`${isDark ? "bg-[#FF9F00] bg-opacity-20" : "bg-[#FF9F00] bg-opacity-10"} rounded-2xl p-6 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF9F00] opacity-10 rounded-full translate-x-8 -translate-y-8"></div>
              <div className="text-6xl font-bold mb-2">{getWordCount()}</div>
              <div className="text-sm">Word Count</div>
            </div>
            <div
              className={`${isDark ? "bg-[#FE8159] bg-opacity-20" : "bg-[#FE8159] bg-opacity-10"} rounded-2xl p-6 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#FE8159] opacity-10 rounded-full translate-x-8 -translate-y-8"></div>
              <div className="text-6xl font-bold mb-2">{String(getSentenceCount()).padStart(2, "0")}</div>
              <div className="text-sm">Sentence Count</div>
            </div>
          </div>

          <section>
            <h3 className="text-xl font-semibold mb-4">Letter Density</h3>
            {getLetterDensity().length > 0 ? (
              <div className="space-y-3">
                {getLetterDensity()
                  .slice(0, isLetterDensityExpanded ? undefined : 5)
                  .map(({ letter, count, percentage }) => (
                    <div key={letter} className="flex items-center gap-4">
                      <span className="w-4">{letter}</span>
                      <div
                        className={`flex-1 h-2 ${isDark ? "bg-[#21222C]" : "bg-[#F2F2F7]"} rounded-full overflow-hidden`}
                      >
                        <div className="h-full bg-[#D3A0FA] rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className={`text-sm ${isDark ? "text-[#404254]" : "text-[#404254]"}`}>
                        {count} ({percentage}%)
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className={`text-sm ${isDark ? "text-[#404254]" : "text-[#404254]"}`}>
                Enter some text to see letter density analysis.
              </p>
            )}
            {getLetterDensity().length > 5 && (
              <Button
                variant="ghost"
                onClick={toggleLetterDensityExpanded}
                className={`mt-4 ${
                  isDark
                    ? "text-[#C27CF8] hover:text-[#C27CF8] hover:bg-[#C27CF8]/20"
                    : "text-[#C27CF8] hover:text-[#C27CF8] hover:bg-[#C27CF8]/10"
                }`}
              >
                {isLetterDensityExpanded ? "See less" : "See more"}
              </Button>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

