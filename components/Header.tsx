import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

interface HeaderProps {
  isDark: boolean
  toggleTheme: () => void
}

export default function Header({ isDark, toggleTheme }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-12 space-y-4 sm:space-y-0">
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
  )
}

