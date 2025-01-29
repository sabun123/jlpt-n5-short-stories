import { ref, onMounted, computed } from "vue";

export const useAudio = () => {
  const isSupported = ref(false);
  const error = ref<string | null>(null);
  const synth = ref<SpeechSynthesis | null>(null);
  const voices = ref<SpeechSynthesisVoice[]>([]);
  const selectedVoice = ref<SpeechSynthesisVoice | null>(null);
  let currentUtterance: SpeechSynthesisUtterance | null = null;
  const currentWordIndex = ref(-1);
  const isSpeaking = ref(false); // Add this new ref

  const isSafari = computed(() => {
    if (typeof window === "undefined") return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  });

  const isEdge = computed(() => {
    if (typeof window === "undefined") return false;
    return /edg/i.test(navigator.userAgent);
  });

  const loadVoices = () => {
    if (!synth.value) return;

    const availableVoices = synth.value.getVoices();
    if (availableVoices.length === 0) {
      // Wait for voices to load
      setTimeout(loadVoices, 100);
      return;
    }

    voices.value = availableVoices;

    // Priority order for voice selection:
    // 1. Safari Japanese voices (Kyoko or Otoya)
    // 2. Microsoft Edge Japanese voices (Microsoft Ayumi, Microsoft Haruka, Microsoft Ichiro)
    // 3. Google Japanese voice
    // 4. Any Japanese voice
    let preferredVoice = null;

    if (isSafari.value) {
      // Look for high-quality Safari voices first
      preferredVoice = availableVoices.find(
        (v) =>
          (v.name === "Kyoko" || v.name === "Otoya") && v.lang.startsWith("ja")
      );
    }

    if (!preferredVoice && isEdge.value) {
      // Look for Microsoft voices in order of preference
      const msVoices = [
        "Microsoft Nanami Online (Natural) - Japanese (Japan)",
        "Microsoft Ayumi",
        "Microsoft Haruka",
        "Microsoft Ichiro",
        "Kyoko",
      ];
      preferredVoice = availableVoices.find(
        (v) => msVoices.includes(v.name) && v.lang.startsWith("ja-JP")
      );
    }

    if (!preferredVoice) {
      // Try Google voice next
      preferredVoice = availableVoices.find((v) => v.name === "Google 日本語");
    }

    if (!preferredVoice) {
      // Fallback to any Japanese voice
      preferredVoice = availableVoices.find((v) => v.lang.startsWith("ja"));
    }

    if (preferredVoice) {
      selectedVoice.value = preferredVoice;
      isSupported.value = true;
    } else {
      error.value = "No Japanese voice found";
      isSupported.value = false;
    }
  };

  onMounted(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synth.value = window.speechSynthesis;

      // Improved voice loading strategy
      const loadVoicesAndRetry = () => {
        loadVoices();
        if (!isSupported.value && voices.value.length === 0) {
          // Retry after a short delay if no voices are found
          setTimeout(loadVoicesAndRetry, 100);
        }
      };

      loadVoicesAndRetry();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      error.value = "Speech synthesis not supported";
    }
  });

  const speak = async (
    text: string,
    words: string[],
    onWordChange?: (index: number) => void
  ) => {
    try {
      if (!synth.value || !selectedVoice.value) {
        throw new Error("Speech synthesis not ready");
      }

      stop();
      currentWordIndex.value = -1;
      isSpeaking.value = true; // Set speaking to true when starting

      // Filter out non-speakable items and create utterances
      const utterances = words
        .map((word, index) => {
          // Skip punctuation and whitespace
          if (/^[、。\s]$/.test(word)) {
            return null;
          }

          const utterance = new SpeechSynthesisUtterance(word);
          utterance.voice = selectedVoice.value!;
          utterance.lang = "ja-JP";
          utterance.rate = isSafari.value ? 0.7 : 0.8;

          utterance.onstart = () => {
            isSpeaking.value = true;
            currentWordIndex.value = index;
            onWordChange?.(index);
          };

          utterance.onend = () => {
            if (index === words.length - 1) {
              isSpeaking.value = false;
              currentWordIndex.value = -1;
              onWordChange?.(-1);
            }
          };

          return utterance;
        })
        .filter(
          (utterance): utterance is SpeechSynthesisUtterance =>
            utterance !== null
        );

      // Queue valid utterances
      utterances.forEach((utterance) => synth.value!.speak(utterance));

      return new Promise((resolve, reject) => {
        const lastUtterance = utterances[utterances.length - 1];
        lastUtterance.onend = () => {
          isSpeaking.value = false;
          currentWordIndex.value = -1;
          onWordChange?.(-1);
          resolve(true);
        };
        lastUtterance.onerror = (e) => {
          isSpeaking.value = false;
          currentWordIndex.value = -1;
          onWordChange?.(-1);
          reject(e);
        };
      });
    } catch (e) {
      isSpeaking.value = false;
      error.value = e instanceof Error ? e.message : "Unknown error";
      throw e;
    }
  };

  const stop = () => {
    if (synth.value?.speaking) {
      synth.value.cancel();
      currentUtterance = null;
      currentWordIndex.value = -1;
      isSpeaking.value = false; // Make sure to reset speaking state
    }
  };

  // Update isPlaying to use our isSpeaking ref
  const isPlaying = computed(() => isSpeaking.value);

  return {
    speak,
    stop,
    isSupported,
    error,
    isPlaying,
    currentWordIndex,
  };
};
