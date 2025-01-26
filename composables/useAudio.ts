import { ref, onMounted } from "vue";

export const useAudio = () => {
  const isSupported = ref(false);
  const error = ref<string | null>(null);

  const speak = (text: string, lang: string = "ja-JP") => {
    if (!("speechSynthesis" in window)) {
      error.value = "Speech synthesis not supported";
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    // Get Japanese voice if available
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(
      (voice) => voice.lang.startsWith("ja") && !voice.localService
    );

    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Check for speech synthesis support
  onMounted(() => {
    isSupported.value = "speechSynthesis" in window;

    // Load voices
    if (isSupported.value) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        const hasJapaneseVoice = voices.some((voice) =>
          voice.lang.startsWith("ja")
        );
        if (!hasJapaneseVoice) {
          error.value = "No Japanese voice found";
        }
      };
    }
  });

  return {
    speak,
    isSupported,
    error,
  };
};
