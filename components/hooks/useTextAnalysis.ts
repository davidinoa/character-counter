export function useTextAnalysis(text: string, excludeSpaces: boolean) {
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

  return { getCharacterCount, getWordCount, getSentenceCount, getLetterDensity }
}

