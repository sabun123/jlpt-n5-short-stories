export const useTextSegmentation = () => {
  const splitIntoWords = (text: string): string[] => {
    // Split text into words, treating punctuation differently
    const words = text
      .split(
        /([、。])|(?<=[\u3040-\u309F\u30A0-\u30FF])|(?=[\u3040-\u309F\u30A0-\u30FF])/g
      )
      .filter((word) => word?.length > 0) // Remove empty strings but keep whitespace
      .map((word) => word.trim())
      .filter(Boolean); // Remove any remaining empty strings after trim

    // Combine consecutive hiragana/katakana
    const result: string[] = [];
    let current = "";

    for (const word of words) {
      if (/^[\u3040-\u309F\u30A0-\u30FF]$/.test(word)) {
        current += word;
      } else {
        if (current) {
          result.push(current);
          current = "";
        }
        result.push(word);
      }
    }

    if (current) {
      result.push(current);
    }

    return result;
  };

  return {
    splitIntoWords,
  };
};
