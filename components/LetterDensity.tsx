import { useState } from "react"
import { Button } from "@/components/ui/button"

interface LetterDensityProps {
  letterDensity: Array<{ letter: string; count: number; percentage: string }>
  isDark: boolean
}

export default function LetterDensity({ letterDensity, isDark }: LetterDensityProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  return (
    <section className="mt-6 sm:mt-8">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Letter Density</h3>
      {letterDensity.length > 0 ? (
        <div className="space-y-3">
          {letterDensity.slice(0, isExpanded ? undefined : 5).map(({ letter, count, percentage }) => (
            <div key={letter} className="flex items-center gap-2 sm:gap-4">
              <span className="w-4 text-sm">{letter}</span>
              <div className={`flex-1 h-2 ${isDark ? "bg-[#21222C]" : "bg-[#F2F2F7]"} rounded-full overflow-hidden`}>
                <div className="h-full bg-[#D3A0FA] rounded-full" style={{ width: `${percentage}%` }} />
              </div>
              <span className={`text-xs sm:text-sm ${isDark ? "text-[#404254]" : "text-[#404254]"}`}>
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
      {letterDensity.length > 5 && (
        <Button
          variant="ghost"
          onClick={toggleExpanded}
          className={`mt-4 ${
            isDark
              ? "text-[#C27CF8] hover:text-[#C27CF8] hover:bg-[#C27CF8]/20"
              : "text-[#C27CF8] hover:text-[#C27CF8] hover:bg-[#C27CF8]/10"
          }`}
        >
          {isExpanded ? "See less" : "See more"}
        </Button>
      )}
    </section>
  )
}

