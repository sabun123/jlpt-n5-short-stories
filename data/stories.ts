export type WordType = "kanji" | "hiragana" | "katakana";

interface WordReading {
  kunyomi?: string[];
  onyomi?: string[];
}

interface FocusWord {
  word: string;
  type: WordType;
  meaning: {
    [key: string]: string;
  };
  readings?: WordReading; // Optional, only for kanji words
}

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

export interface Story {
  id: number;
  title: {
    [key: string]: string;
  };
  content: string;
  translations: {
    [key: string]: string;
  };
  focusWord: FocusWord;
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
    focusWord: {
      word: "公園",
      type: "kanji",
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
    focusWord: {
      word: "家族",
      type: "kanji",
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
  {
    id: 3,
    title: {
      jp: "わたしの いちにち",
      en: "My Daily Routine",
    },
    content:
      "わたしは たいてい しちじに おきます。あさごはんを たべて、はちじに いえを でます。たいてい でんしゃで かいしゃに いきます。",
    translations: {
      en: "I usually wake up at 7 o'clock. I eat breakfast and leave home at 8 o'clock. I usually go to work by train.",
    },
    focusWord: {
      word: "たいてい",
      type: "hiragana",
      meaning: {
        en: "mostly, usually",
      },
    },
    keywords: ["たいてい", "おきます", "でんしゃ"],
    questions: [
      {
        id: 1,
        question: {
          en: "What time does the person usually wake up?",
          jp: "その人は たいてい 何時に 起きますか。",
        },
        options: {
          en: ["7 o'clock", "6 o'clock", "8 o'clock", "9 o'clock"],
          jp: ["七時", "六時", "八時", "九時"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "How does the person usually go to work?",
          jp: "その人は たいてい どうやって 会社に 行きますか。",
        },
        options: {
          en: ["By train", "By bus", "By car", "By bicycle"],
          jp: ["電車で", "バスで", "車で", "自転車で"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 4,
    title: {
      jp: "おんがくの みせ",
      en: "The Music Store",
    },
    content:
      "わたしは ふるい レコードが すきです。にちようびに レコードの みせに いきます。その みせには たくさんの レコードが あります。",
    translations: {
      en: "I like old records. On Sundays, I go to a record store. That store has many records.",
    },
    focusWord: {
      word: "レコード",
      type: "katakana",
      meaning: {
        en: "record",
      },
    },
    keywords: ["レコード", "みせ", "すき"],
    questions: [
      {
        id: 1,
        question: {
          en: "What kind of records does the person like?",
          jp: "その人は どんな レコードが 好きですか。",
        },
        options: {
          en: ["Old records", "New records", "Jazz records", "Pop records"],
          jp: [
            "古い レコード",
            "新しい レコード",
            "ジャズの レコード",
            "ポップの レコード",
          ],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "When does the person go to the record store?",
          jp: "その人は いつ レコードの 店に 行きますか。",
        },
        options: {
          en: ["On Sundays", "On Saturdays", "On Mondays", "On Fridays"],
          jp: ["日曜日に", "土曜日に", "月曜日に", "金曜日に"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 5,
    title: {
      jp: "たいてい の あさ",
      en: "Most Mornings",
    },
    content:
      "たいてい は げつようびに おきます。あさごはんを たべて、じゅうにふんに いえを でます。たいてい は きょうも いい びより なんだって。",
    translations: {
      en: "I usually wake up on Mondays. I eat breakfast and leave home at 12 minutes past the hour. Usually, today is also going to be a good day.",
    },
    focusWord: {
      word: "たいてい",
      type: "hiragana",
      meaning: {
        en: "mostly, usually",
      },
    },
    keywords: ["たいてい", "おきます", "びより"],
    questions: [
      {
        id: 1,
        question: {
          en: "On which day does the person usually wake up?",
          jp: "その人は たいてい どの 日に 起きますか。",
        },
        options: {
          en: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          jp: ["月曜日", "火曜日", "水曜日", "木曜日"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What does the person usually think about today?",
          jp: "その人は たいてい 今日について どう 思いますか。",
        },
        options: {
          en: [
            "It will be a good day",
            "It will be a bad day",
            "It will rain",
            "It will be cold",
          ],
          jp: ["いい びより だ", "悪い びより だ", "雨が ふる", "寒い"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 6,
    title: {
      jp: "わたしの りょこう",
      en: "My Travel",
    },
    content:
      "わたしは たいてい なつやすみに りょこうに いきます。きのう、わたしたちは しんかんせんで おおさかに いきました。いま、わたしたちは おおさかで たのしく あそんで います。あした、わたしたちは たいてい ふるさとに かえります。",
    translations: {
      en: "I usually travel during the summer vacation. Yesterday, we went to Osaka by Shinkansen. Now, we are having fun in Osaka. Tomorrow, we usually return home.",
    },
    focusWord: {
      word: "たいてい",
      type: "hiragana",
      meaning: {
        en: "mostly, usually",
      },
    },
    keywords: ["たいてい", "りょこう", "しんかんせん"],
    questions: [
      {
        id: 1,
        question: {
          en: "When does the person usually travel?",
          jp: "その人は たいてい いつ りょこうに いきますか。",
        },
        options: {
          en: [
            "During summer vacation",
            "During winter vacation",
            "During spring break",
            "During autumn break",
          ],
          jp: ["なつやすみに", "ふゆやすみに", "はる休みに", "あき休みに"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "How did they go to Osaka yesterday?",
          jp: "きのう、彼らは どうやって おおさかに 行きましたか。",
        },
        options: {
          en: ["By Shinkansen", "By airplane", "By car", "By bus"],
          jp: ["しんかんせんで", "ひこうきで", "くるまで", "バスで"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "Where are they now?",
          jp: "今、彼らは どこに いますか。",
        },
        options: {
          en: ["In Osaka", "At home", "In Tokyo", "In Kyoto"],
          jp: ["おおさかに", "いえに", "とうきょうに", "きょうとに"],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "What will they do tomorrow?",
          jp: "あした、彼らは たいてい どうしますか。",
        },
        options: {
          en: ["Return home", "Go shopping", "Visit a museum", "Stay in Osaka"],
          jp: [
            "ふるさとに かえる",
            "かいものに いく",
            "びじゅつかんに いく",
            "おおさかに とまる",
          ],
        },
        correctAnswer: 0,
      },
    ],
  },
];
