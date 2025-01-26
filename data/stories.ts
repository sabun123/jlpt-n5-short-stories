interface Question {
  id: number;
  question: {
    [key: string]: string;
  };
  options: {
    [key: string]: string[];
  };
  correctAnswer: number;
}

interface Story {
  id: number;
  title: {
    [key: string]: string;
  };
  content: string;
  translations: {
    [key: string]: string;
  };
  focusKanji: {
    kanji: string;
    meaning: {
      [key: string]: string;
    };
    readings: {
      kunyomi: string[];
      onyomi: string[];
    };
  };
  keywords: string[];
  questions: Question[];
}

export const stories: Story[] = [
  {
    id: 1,
    title: {
      jp: "いぬと公園",
      en: "The Dog and the Park",
    },
    content:
      "むかし、かわいい いぬが いました。その いぬは まいにち 公園に いきました。公園で たくさんの ともだちと あそびました。",
    translations: {
      en: "Once upon a time, there was a cute dog. The dog went to the park every day. At the park, it played with many friends.",
    },
    focusKanji: {
      kanji: "公園",
      meaning: {
        en: "park",
      },
      readings: {
        kunyomi: [],
        onyomi: ["こうえん"],
      },
    },
    keywords: ["公園", "いぬ", "ともだち"],
    questions: [
      {
        id: 1,
        question: {
          en: "Where did the dog go every day?",
          jp: "いぬは まいにち どこに いきましたか。",
        },
        options: {
          en: ["To the park", "To school", "To the store", "To the beach"],
          jp: ["公園に", "がっこうに", "みせに", "うみに"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What did the dog do at the park?",
          jp: "いぬは 公園で なにを しましたか。",
        },
        options: {
          en: ["Played with friends", "Slept", "Ate food", "Read a book"],
          jp: [
            "ともだちと あそびました",
            "ねました",
            "たべました",
            "ほんを よみました",
          ],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 2,
    title: {
      jp: "私の 家族",
      en: "My Family",
    },
    content:
      "私の 家族は 四人です。お父さんと お母さんと 妹が います。私たちは まいしゅう 家で ごはんを たべます。",
    translations: {
      en: "My family has four people. I have a father, mother, and younger sister. We eat meals together at home every week.",
    },
    focusKanji: {
      kanji: "家族",
      meaning: {
        en: "family",
      },
      readings: {
        kunyomi: ["かぞく"],
        onyomi: [],
      },
    },
    keywords: ["家族", "四人", "ごはん"],
    questions: [
      {
        id: 1,
        question: {
          en: "How many people are in the family?",
          jp: "家族は なんにん いますか。",
        },
        options: {
          en: ["Four people", "Three people", "Five people", "Two people"],
          jp: ["四人", "三人", "五人", "二人"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What does the family do every week?",
          jp: "家族は まいしゅう なにを しますか。",
        },
        options: {
          en: [
            "Eat meals together",
            "Go to the park",
            "Watch TV",
            "Play games",
          ],
          jp: [
            "ごはんを たべます",
            "公園に いきます",
            "テレビを みます",
            "ゲームを します",
          ],
        },
        correctAnswer: 0,
      },
    ],
  },
];
