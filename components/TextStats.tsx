interface TextStatsProps {
  characterCount: number
  wordCount: number
  sentenceCount: number
  isDark: boolean
  excludeSpaces: boolean
  className?: string
}

export default function TextStats({
  characterCount,
  wordCount,
  sentenceCount,
  isDark,
  excludeSpaces,
  className,
}: TextStatsProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
      <div
        className={`${isDark ? "bg-[#D3A0FA] bg-opacity-20" : "bg-[#D3A0FA] bg-opacity-10"} rounded-2xl p-4 sm:p-6 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-[#D3A0FA] opacity-10 rounded-full translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8"></div>
        <div className="text-4xl sm:text-6xl font-bold mb-1 sm:mb-2">{characterCount}</div>
        <div className="text-xs sm:text-sm">Total Characters {excludeSpaces && "(no space)"}</div>
      </div>
      <div
        className={`${isDark ? "bg-[#FF9F00] bg-opacity-20" : "bg-[#FF9F00] bg-opacity-10"} rounded-2xl p-4 sm:p-6 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-[#FF9F00] opacity-10 rounded-full translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8"></div>
        <div className="text-4xl sm:text-6xl font-bold mb-1 sm:mb-2">{wordCount}</div>
        <div className="text-xs sm:text-sm">Word Count</div>
      </div>
      <div
        className={`${isDark ? "bg-[#FE8159] bg-opacity-20" : "bg-[#FE8159] bg-opacity-10"} rounded-2xl p-4 sm:p-6 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-[#FE8159] opacity-10 rounded-full translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8"></div>
        <div className="text-4xl sm:text-6xl font-bold mb-1 sm:mb-2">{String(sentenceCount).padStart(2, "0")}</div>
        <div className="text-xs sm:text-sm">Sentence Count</div>
      </div>
    </div>
  )
}

