export const useTextSegmentation = () => {
  const splitIntoWords = (text: string): string[] => {
    // Split text into words, keeping punctuation
    const words = text
      .split(
        /([、。\s])|(?<=[\u3040-\u309F\u30A0-\u30FF])|(?=[\u3040-\u309F\u30A0-\u30FF])/g
      )
      .filter((word) => word?.trim())
      .map((word) => word.trim());

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
        if (word) {
          result.push(word);
        }
      }
    }

    if (current) {
      result.push(current);
    }

    // Debug output
    console.log("Text segmentation result:", result);
    return result;
  };

  return {
    splitIntoWords,
  };
};
