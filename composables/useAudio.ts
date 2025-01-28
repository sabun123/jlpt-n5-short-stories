import { ref, onMounted, computed } from "vue";

export const useAudio = () => {
  const isSupported = ref(false);
  const error = ref<string | null>(null);
  const synth = ref<SpeechSynthesis | null>(null);
  const voices = ref<SpeechSynthesisVoice[]>([]);
  const selectedVoice = ref<SpeechSynthesisVoice | null>(null);
  let currentUtterance: SpeechSynthesisUtterance | null = null;

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
      console.log("Available voices:", availableVoices);
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
      console.log("Selected voice:", preferredVoice.name);
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

      // Handle both immediate and async voice loading
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      error.value = "Speech synthesis not supported";
    }
  });

  const speak = async (text: string) => {
    try {
      if (!synth.value || !selectedVoice.value) {
        throw new Error("Speech synthesis not ready");
      }

      stop(); // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice.value;
      utterance.lang = "ja-JP";

      // Adjust rate and pitch based on browser
      if (isSafari.value) {
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
      } else if (isEdge.value) {
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
      } else {
        utterance.rate = 0.9;
        utterance.pitch = 1;
      }

      currentUtterance = utterance;
      synth.value.speak(utterance);

      return new Promise((resolve, reject) => {
        utterance.onend = () => {
          currentUtterance = null;
          resolve(true);
        };
        utterance.onerror = (e) => {
          currentUtterance = null;
          reject(e);
        };
      });
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Unknown error";
      throw e;
    }
  };

  const stop = () => {
    if (synth.value?.speaking) {
      synth.value.cancel();
      currentUtterance = null;
    }
  };

  const isPlaying = computed(() => synth.value?.speaking ?? false);

  return {
    speak,
    stop,
    isSupported,
    error,
    isPlaying,
  };
};
