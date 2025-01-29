export const useTextSegmentation = () => {
  const splitIntoWords = (text: string): string[] => {
    // Define patterns for Japanese word boundaries
    const patterns = {
      // Common honorific prefixes
      honorificPrefixes: /^(お|ご)/,
      // Common word endings
      wordEndings: /(さん|ちゃん|くん|様|殿|たち|ども)$/,
      // Punctuation marks
      punctuation: /[、。]/,
    };

    // First split by punctuation, preserving the punctuation marks
    const segments = text
      .split(/([、。])/)
      .filter(Boolean)
      .map((segment) => segment.trim());

    const result: string[] = [];

    for (const segment of segments) {
      // If it's a punctuation mark, add it directly
      if (patterns.punctuation.test(segment)) {
        result.push(segment);
        continue;
      }

      // Use a sliding window approach to identify words
      let currentWord = "";
      const chars = segment.split("");

      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        currentWord += char;

        // Look ahead to check if we're in the middle of a word
        const nextChar = chars[i + 1] || "";
        const lookAhead = currentWord + nextChar;

        // Conditions to keep building the current word
        const isHonorificPrefix = patterns.honorificPrefixes.test(currentWord);
        const hasWordEnding = patterns.wordEndings.test(lookAhead);
        const isKanjiSequence =
          /[\u4e00-\u9faf]/.test(char) && /[\u4e00-\u9faf]/.test(nextChar);
        const isHiraganaSequence =
          /[\u3040-\u309f]/.test(char) && /[\u3040-\u309f]/.test(nextChar);
        const isKatakanaSequence =
          /[\u30a0-\u30ff]/.test(char) && /[\u30a0-\u30ff]/.test(nextChar);

        // Decide whether to continue building the current word or start a new one
        const shouldContinue =
          isHonorificPrefix ||
          hasWordEnding ||
          isKanjiSequence ||
          isHiraganaSequence ||
          isKatakanaSequence;

        if (!shouldContinue && currentWord) {
          if (currentWord.trim()) {
            result.push(currentWord.trim());
          }
          currentWord = "";
        }
      }

      // Add any remaining word
      if (currentWord.trim()) {
        result.push(currentWord.trim());
      }
    }

    return result;
  };

  return {
    splitIntoWords,
  };
};
