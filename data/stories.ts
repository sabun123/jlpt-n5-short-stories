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
      jp: "わたしの かぞく",
      en: "My Family",
    },
    content:
      "わたしの かぞくは よにんです。おとうさんと おかあさんと いもうとが います。わたしたちは まいしゅう いえで ごはんを たべます。",
    translations: {
      en: "My family has four people. I have a father, mother, and younger sister. We eat meals together at home every week.",
    },
    focusWord: {
      word: "かぞく",
      type: "hiragana",
      meaning: {
        en: "family",
      },
    },
    keywords: ["かぞく", "よにん", "ごはん"],
    questions: [
      {
        id: 1,
        question: {
          en: "How many people are in the family?",
          jp: "かぞくは なんにん いますか。",
        },
        options: {
          en: ["Four people", "Three people", "Five people", "Two people"],
          jp: ["よにん", "さんにん", "ごにん", "ふたり"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What does the family do every week?",
          jp: "かぞくは まいしゅう なにを しますか。",
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
            "こうえんに いきます",
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
  {
    id: 7,
    title: {
      jp: "こわい かいだん",
      en: "The Scary Stairs",
    },
    content:
      "きのう ともだちの いえに いきました。かいだんが ふるくて こわかったです。いま わたしは あたらしい いえに すんでいます。かいだんは あたらしいです。あしたは ともだちが きます。ともだちは この かいだんを みて、「きれい！」と いうでしょう。",
    translations: {
      en: "Yesterday, I went to my friend's house. The stairs were old and scary. Now I live in a new house. The stairs are new. Tomorrow my friend will come. When my friend sees these stairs, they will probably say 'Beautiful!'",
    },
    focusWord: {
      word: "かいだん",
      type: "hiragana",
      meaning: {
        en: "stairs, stairway",
      },
    },
    keywords: ["かいだん", "こわい", "あたらしい", "ふるい", "きれい"],
    questions: [
      {
        id: 1,
        question: {
          en: "What kind of stairs were at the friend's house?",
          jp: "ともだちの いえの かいだんは どうでしたか。",
        },
        options: {
          en: [
            "Old and scary",
            "New and beautiful",
            "Small and dark",
            "Big and bright",
          ],
          jp: [
            "ふるくて こわい",
            "あたらしくて きれい",
            "ちいさくて くらい",
            "おおきくて あかるい",
          ],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What will the friend probably say about the stairs?",
          jp: "ともだちは かいだんを みて なんと いうでしょうか。",
        },
        options: {
          en: ["Beautiful!", "Scary!", "Old!", "Small!"],
          jp: ["きれい！", "こわい！", "ふるい！", "ちいさい！"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "When does the story mention the friend will come?",
          jp: "ともだちは いつ くるといいましたか。",
        },
        options: {
          en: ["Tomorrow", "Today", "Yesterday", "Next week"],
          jp: ["あした", "きょう", "きのう", "らいしゅう"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 8,
    title: {
      jp: "たのしい りょこう",
      en: "A Fun Trip",
    },
    content:
      "きのう、わたしと ともだちが りょこうに いきました。りょこうの さきには うみが あって、いっぱい あそびました。たいてい りょこうは たのしいけど、ときどき つかれる。",
    translations: {
      en: "Yesterday, my friend and I went on a trip. There was an ocean at our travel destination, and we played a lot. Usually, trips are fun, but sometimes they can be tiring.",
    },
    focusWord: {
      word: "りょこう",
      type: "hiragana",
      meaning: {
        en: "travel, trip, journey",
      },
    },
    keywords: ["りょこう", "うみ", "あそびました"],
    questions: [
      {
        id: 1,
        question: {
          en: "Where did the person go on the trip?",
          jp: "その人は りょこうで どこに 行きましたか。",
        },
        options: {
          en: ["To the ocean", "To the mountains", "To a city", "To a forest"],
          jp: ["海に", "山に", "街に", "森に"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What did the person and their friend do during the trip?",
          jp: "その人と ともだちは りょこうで 何を しましたか。",
        },
        options: {
          en: ["Played a lot", "Worked a lot", "Slept a lot", "Studied a lot"],
          jp: [
            "たくさん 遊んだ",
            "たくさん 仕事した",
            "たくさん 寝た",
            "たくさん 勉強した",
          ],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 9,
    title: {
      jp: "はじめての りょこう",
      en: "First Travel",
    },
    content:
      "せんしゅう わたしは ともだちと りょこうに いきませんでした。びょうきでした。でも いま げんきです。あしたから ともだちと おおさかに りょこうに いきます。はじめての りょこうですから、とても たのしみです。ともだちは いま きっぷを かっています。",
    translations: {
      en: "Last week, I didn't go traveling with my friend. I was sick. But now I am well. From tomorrow, I will go traveling to Osaka with my friend. Since it's my first travel, I'm very excited. My friend is now buying the tickets.",
    },
    focusWord: {
      word: "りょこう",
      type: "hiragana",
      meaning: {
        en: "travel, trip, journey",
      },
    },
    keywords: ["りょこう", "びょうき", "げんき", "たのしみ", "きっぷ"],
    questions: [
      {
        id: 1,
        question: {
          en: "Why didn't they go traveling last week?",
          jp: "せんしゅう どうして りょこうに いきませんでしたか。",
        },
        options: {
          en: [
            "Because they were sick",
            "Because of rain",
            "Because they were busy",
            "Because it was expensive",
          ],
          jp: [
            "びょうきでした から",
            "あめでした から",
            "いそがしかった から",
            "たかかった から",
          ],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "Where are they going to travel?",
          jp: "どこに りょこうに いきますか。",
        },
        options: {
          en: ["Osaka", "Tokyo", "Kyoto", "Nagoya"],
          jp: ["おおさか", "とうきょう", "きょうと", "なごや"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "What is their friend doing now?",
          jp: "ともだちは いま なにを していますか。",
        },
        options: {
          en: ["Buying tickets", "Sleeping", "Eating", "Studying"],
          jp: [
            "きっぷを かっています",
            "ねています",
            "たべています",
            "べんきょうしています",
          ],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 10,
    title: {
      jp: "ほしい もの",
      en: "Things I Want",
    },
    content:
      "わたしは たいてい の ゆうがたに お風呂に はいります。そのあと、ゆっくり 本を よんだり お茶を のんだり します。きのう、友達と 話して ほしい プレゼントについて 話しました。たいてい は ゲームや 書籍を ほしい と思います。",
    translations: {
      en: "I usually take a bath in the evening. After that, I read books or drink tea leisurely. Yesterday, I talked with my friend about gifts I want. Usually, I think I want games and books.",
    },
    focusWord: {
      word: "ほしい",
      type: "hiragana",
      meaning: {
        en: "want, desire, wish for",
      },
    },
    keywords: ["ほしい", "お風呂", "本"],
    questions: [
      {
        id: 1,
        question: {
          en: "What does the person usually do in the evening?",
          jp: "その人は たいてい の ゆうがたに 何を しますか。",
        },
        options: {
          en: ["Take a bath", "Go for a walk", "Watch TV", "Cook dinner"],
          jp: ["お風呂に 入る", "散歩する", "テレビを見る", "晩ごはんを 作る"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What does the person usually want as gifts?",
          jp: "その人は たいてい 何を プレゼントとして ほしい と思いますか。",
        },
        options: {
          en: [
            "Games and books",
            "Clothes and shoes",
            "Toys and gadgets",
            "Food and drinks",
          ],
          jp: [
            "ゲームと 書籍",
            "服と 靴",
            "おもちゃと 小物",
            "食べ物と 飲み物",
          ],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 11,
    title: {
      jp: "ねこが ほしい",
      en: "I Want a Cat",
    },
    content:
      "わたしは ねこが ほしいです。でも かぞくは いぬが ほしいと いいました。きのうは ペットショップに いきました。いぬも ねこも かわいかったです。いま おかねが たくさん ありません。らいげつ、ペットを かいたいです。でも なにを かうか まだ わかりません。",
    translations: {
      en: "I want a cat. But my family said they want a dog. Yesterday we went to the pet shop. Both dogs and cats were cute. Now I don't have much money. Next month, I want to buy a pet. But I still don't know what to buy.",
    },
    focusWord: {
      word: "ほしい",
      type: "hiragana",
      meaning: {
        en: "want, desire, wish for",
      },
    },
    keywords: ["ほしい", "ペット", "かわいい", "おかね", "かう"],
    questions: [
      {
        id: 1,
        question: {
          en: "What pet does the speaker want?",
          jp: "はなしている ひとは なにが ほしいですか。",
        },
        options: {
          en: ["A cat", "A dog", "A bird", "A rabbit"],
          jp: ["ねこ", "いぬ", "とり", "うさぎ"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What pet does the family want?",
          jp: "かぞくは なにが ほしいですか。",
        },
        options: {
          en: ["A dog", "A cat", "A bird", "A rabbit"],
          jp: ["いぬ", "ねこ", "とり", "うさぎ"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "Why can't they buy a pet now?",
          jp: "どうして いま ペットを かえませんか。",
        },
        options: {
          en: ["No money", "No time", "No space", "No permission"],
          jp: [
            "おかねが ありません",
            "じかんが ありません",
            "ばしょが ありません",
            "ゆるされません",
          ],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "When do they want to buy a pet?",
          jp: "いつ ペットを かいたいですか。",
        },
        options: {
          en: ["Next month", "Tomorrow", "Next year", "Today"],
          jp: ["らいげつ", "あした", "らいねん", "きょう"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 12,
    title: {
      jp: "たくさんの お金",
      en: "Lots of Money",
    },
    content:
      "きょうは ばんごはんに たくさん お金を つかいました。ともだちの たんじょうびでした。わたしは いま あまり お金が ありません。でも らいしゅう お金が もらえます。きのうも お金を つかいませんでした。だから あしたは スーパーに いって、やさいを かいます。",
    translations: {
      en: "Today I spent a lot of money on dinner. It was my friend's birthday. Now I don't have much money. But next week I will receive money. Yesterday I didn't spend money either. So tomorrow I will go to the supermarket and buy vegetables.",
    },
    focusWord: {
      word: "お金",
      type: "kanji",
      meaning: {
        en: "money",
      },
    },
    keywords: ["お金", "つかう", "もらう", "スーパー", "やさい"],
    questions: [
      {
        id: 1,
        question: {
          en: "Why did they spend money today?",
          jp: "きょう どうして お金を つかいましたか。",
        },
        options: {
          en: ["Friend's birthday dinner", "Shopping", "Travel", "School"],
          jp: [
            "ともだちの たんじょうび の ばんごはん",
            "かいもの",
            "りょこう",
            "がっこう",
          ],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "When will they receive money?",
          jp: "いつ お金を もらえますか。",
        },
        options: {
          en: ["Next week", "Tomorrow", "Today", "Next month"],
          jp: ["らいしゅう", "あした", "きょう", "らいげつ"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "What will they buy tomorrow?",
          jp: "あした なにを かいますか。",
        },
        options: {
          en: ["Vegetables", "Meat", "Fish", "Fruit"],
          jp: ["やさい", "にく", "さかな", "くだもの"],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "Did they spend money yesterday?",
          jp: "きのう お金を つかいましたか。",
        },
        options: {
          en: ["No", "Yes", "Don't know", "A little"],
          jp: ["いいえ", "はい", "わかりません", "すこし"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 13,
    title: {
      jp: "おなじ たべもの",
      en: "The Same Food",
    },
    content:
      "きのう わたしは レストランで カレーを たべました。きょうも おなじ レストランに いきました。そして おなじ カレーを たべました。あした ともだちと いきますが、おなじ カレーは たべません。ともだちは「いつも おなじ たべものは たのしくない」と いいました。",
    translations: {
      en: "Yesterday I ate curry at a restaurant. Today I went to the same restaurant. And I ate the same curry. Tomorrow I will go with my friend, but I won't eat the same curry. My friend said 'Always eating the same food isn't fun.'",
    },
    focusWord: {
      word: "おなじ",
      type: "hiragana",
      meaning: {
        en: "same, identical",
      },
    },
    keywords: ["おなじ", "レストラン", "カレー", "たべもの", "たのしい"],
    questions: [
      {
        id: 1,
        question: {
          en: "What did they eat yesterday and today?",
          jp: "きのうと きょう なにを たべましたか。",
        },
        options: {
          en: ["The same curry", "Different curry", "Ramen", "Sushi"],
          jp: ["おなじ カレー", "ちがう カレー", "ラーメン", "すし"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "Will they eat the same curry tomorrow?",
          jp: "あした おなじ カレーを たべますか。",
        },
        options: {
          en: ["No", "Yes", "Maybe", "Don't know"],
          jp: ["いいえ", "はい", "たぶん", "わかりません"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "What did the friend say about eating the same food?",
          jp: "おなじ たべものについて ともだちは なんと いいましたか。",
        },
        options: {
          en: ["It isn't fun", "It is fun", "It is good", "It is bad"],
          jp: ["たのしくない", "たのしい", "いい", "よくない"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 14,
    title: {
      jp: "あたらしい じてんしゃ",
      en: "New Bicycle",
    },
    content:
      "きのう わたしは じてんしゃを かいました。あかい じてんしゃです。いま がっこうまで じてんしゃで いきます。まえは バスで いきました。あしたは ともだちも じてんしゃで がっこうに きます。わたしたちは いっしょに じてんしゃに のって、こうえんに いくつもりです。",
    translations: {
      en: "Yesterday I bought a bicycle. It's a red bicycle. Now I go to school by bicycle. Before, I went by bus. Tomorrow my friend will also come to school by bicycle. We plan to ride our bicycles together to the park.",
    },
    focusWord: {
      word: "じてんしゃ",
      type: "hiragana",
      meaning: {
        en: "bicycle",
      },
    },
    keywords: ["じてんしゃ", "がっこう", "いっしょに", "こうえん", "のる"],
    questions: [
      {
        id: 1,
        question: {
          en: "What color is the bicycle?",
          jp: "じてんしゃは なんいろ ですか。",
        },
        options: {
          en: ["Red", "Blue", "Green", "White"],
          jp: ["あかい", "あおい", "みどり", "しろい"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "How did they go to school before?",
          jp: "まえは なにで がっこうに いきましたか。",
        },
        options: {
          en: ["By bus", "By train", "By car", "By bicycle"],
          jp: ["バスで", "でんしゃで", "くるまで", "じてんしゃで"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "Where are they planning to go together?",
          jp: "いっしょに どこに いくつもり ですか。",
        },
        options: {
          en: ["Park", "School", "Store", "Library"],
          jp: ["こうえん", "がっこう", "みせ", "としょかん"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 15,
    title: {
      jp: "あたたかい セーター",
      en: "A Warm Sweater",
    },
    content:
      "きのう、わたしは たいてい の ゆうがたに さんぽを しました。てんきは さむかったので、あたたかい セーターを きました。そのあと、おうちに かえって おちゃを のみました。セーターは とても あたたかくて、きもちが よかったです。",
    translations: {
      en: "Yesterday, I usually took a walk in the evening. It was cold, so I wore a warm sweater. After that, I went back home and drank tea. The sweater was very warm and made me feel good.",
    },
    focusWord: {
      word: "セーター",
      type: "katakana",
      meaning: {
        en: "sweater",
      },
    },
    keywords: ["セーター", "さんぽ", "あたたかい"],
    questions: [
      {
        id: 1,
        question: {
          en: "What did the person usually do in the evening?",
          jp: "その人は たいてい の ゆうがたに 何を しますか。",
        },
        options: {
          en: ["Take a walk", "Watch TV", "Read a book", "Cook dinner"],
          jp: [
            "さんぽを する",
            "てれびを みる",
            "ほんを よむ",
            "ごはんを つくる",
          ],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What did the person wear because it was cold?",
          jp: "さむかったので、その人は 何を きましたか。",
        },
        options: {
          en: ["A sweater", "A coat", "A jacket", "A scarf"],
          jp: [
            "セーターを きた",
            "こーとを きた",
            "ジャケットを きた",
            "マフラーを した",
          ],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 16,
    title: {
      jp: "わたしの お金",
      en: "My Money",
    },
    content:
      "きのう わたしは お金を もらいました。いま わたしは お金が あります。あした ともだちに お金を あげます。わたしは お金が すきでは ありません。でも お金が ひつようです。",
    translations: {
      en: "Yesterday I received money. Now I have money. Tomorrow I will give money to my friend. I don't like money. But money is necessary.",
    },
    focusWord: {
      word: "お金",
      type: "kanji",
      meaning: {
        en: "money",
      },
    },
    keywords: ["もらいました", "あります", "あげます", "ひつよう"],
    questions: [
      {
        id: 1,
        question: {
          en: "When did the person receive money?",
          jp: "その人は いつ お金を もらいましたか。",
        },
        options: {
          en: ["Yesterday", "Today", "Tomorrow", "Last week"],
          jp: ["きのう", "きょう", "あした", "せんしゅう"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What will the person do with the money tomorrow?",
          jp: "その人は あした お金を どうしますか。",
        },
        options: {
          en: ["Give it to a friend", "Save it", "Spend it", "Lose it"],
          jp: ["ともだちに あげます", "ためます", "つかいます", "なくします"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "Does the person like money?",
          jp: "その人は お金が すきですか。",
        },
        options: {
          en: ["No", "Yes", "Maybe", "Don't know"],
          jp: ["いいえ", "はい", "たぶん", "わかりません"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 17,
    title: {
      jp: "たのしい 金曜日",
      en: "Fun Friday",
    },
    content:
      "せんしゅうの 金曜日に えいがを みました。こんしゅうの 金曜日は ともだちと レストランで たべます。らいしゅうの 金曜日は びょういんに いきません。わたしは 金曜日が だいすきです。",
    translations: {
      en: "Last Friday I watched a movie. This Friday I will eat at a restaurant with a friend. Next Friday I won't go to the hospital. I really like Friday.",
    },
    focusWord: {
      word: "金曜日",
      type: "kanji",
      meaning: {
        en: "Friday",
      },
    },
    keywords: ["えいが", "レストラン", "びょういん", "だいすき"],
    questions: [
      {
        id: 1,
        question: {
          en: "What did the person do last Friday?",
          jp: "その人は せんしゅうの 金曜日に なにを しましたか。",
        },
        options: {
          en: [
            "Watched a movie",
            "Ate at a restaurant",
            "Went to hospital",
            "Studied",
          ],
          jp: [
            "えいがを みました",
            "レストランで たべました",
            "びょういんに いきました",
            "べんきょうしました",
          ],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What will the person do this Friday?",
          jp: "その人は こんしゅうの 金曜日に なにを しますか。",
        },
        options: {
          en: [
            "Eat at a restaurant",
            "Watch a movie",
            "Go to hospital",
            "Study",
          ],
          jp: [
            "レストランで たべます",
            "えいがを みます",
            "びょういんに いきます",
            "べんきょうします",
          ],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "How does the person feel about Friday?",
          jp: "その人は 金曜日が すきですか。",
        },
        options: {
          en: ["Really likes it", "Doesn't like it", "It's okay", "Hates it"],
          jp: [
            "だいすきです",
            "すきじゃないです",
            "まあまあです",
            "きらいです",
          ],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 18,
    title: {
      jp: "わたしと 金",
      en: "Me and Gold",
    },
    content:
      "きのう おかあさんは 金の ゆびわを なくしました。いま わたしは 金の ネックレスを みています。あした ともだちは 金の とけいを かいます。わたしは 金が すきです。とても きれいです。",
    translations: {
      en: "Yesterday my mother lost her gold ring. Now I am looking at a gold necklace. Tomorrow my friend will buy a gold watch. I like gold. It's very beautiful.",
    },
    focusWord: {
      word: "金",
      type: "kanji",
      meaning: {
        en: "gold",
      },
    },
    keywords: ["ゆびわ", "ネックレス", "とけい", "きれい"],
    questions: [
      {
        id: 1,
        question: {
          en: "What gold item did mother lose?",
          jp: "おかあさんは 金の なにを なくしましたか。",
        },
        options: {
          en: ["Ring", "Necklace", "Watch", "Bracelet"],
          jp: ["ゆびわ", "ネックレス", "とけい", "ブレスレット"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What gold item is the person looking at now?",
          jp: "その人は いま 金の なにを みていますか。",
        },
        options: {
          en: ["Necklace", "Ring", "Watch", "Bracelet"],
          jp: ["ネックレス", "ゆびわ", "とけい", "ブレスレット"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "What does the person think about gold?",
          jp: "その人は 金について どう おもいますか。",
        },
        options: {
          en: [
            "Likes it, thinks it's beautiful",
            "Doesn't like it",
            "Thinks it's expensive",
            "No opinion",
          ],
          jp: [
            "すきで、きれいだと おもいます",
            "すきじゃないです",
            "たかいと おもいます",
            "いけんが ありません",
          ],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 19,
    title: {
      jp: "たんじょうびの プレゼント",
      en: "Birthday Present",
    },
    content:
      "むかし むかし、どんな プレゼントが ほしいか わかりません でした。こんな とけいは きれい です。そんな とけいは たかく ありません。あんな とけいは いい です。いま、わたしは とても うれしい です。あした、わたしは あたらしい とけいを かいに いきます。",
    translations: {
      en: "Long ago, I didn't know what kind of present I wanted. This kind of watch is beautiful. That kind of watch is not expensive. That kind of watch over there is good. Now, I am very happy. Tomorrow, I will go to buy a new watch.",
    },
    focusWord: {
      word: "どんな",
      type: "hiragana",
      meaning: {
        en: "what kind of, what sort of",
      },
    },
    keywords: ["どんな", "こんな", "そんな", "あんな", "とけい"],
    questions: [
      {
        id: 1,
        question: {
          en: "What is the person looking to buy?",
          jp: "その人は なにを かいに いきますか。",
        },
        options: {
          en: ["A watch", "A book", "A bag", "A phone"],
          jp: ["とけい", "ほん", "かばん", "でんわ"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "When will the person go shopping?",
          jp: "その人は いつ かいものに いきますか。",
        },
        options: {
          en: ["Tomorrow", "Today", "Yesterday", "Next week"],
          jp: ["あした", "きょう", "きのう", "らいしゅう"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "Which demonstrative is used to describe an inexpensive watch?",
          jp: "やすい とけいを せつめいする とき、どの ことばを つかいますか。",
        },
        options: {
          en: ["そんな", "こんな", "どんな", "あんな"],
          jp: ["そんな", "こんな", "どんな", "あんな"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 20,
    title: {
      jp: "たのしい かいもの",
      en: "Fun Shopping",
    },
    content:
      "どんな 店が すきですか。こんな 店は やすいです。そんな 店は とおいです。あんな 店は おおきいです。きのう、わたしは あたらしい 店に いきませんでした。きょう、ともだちと 店に いきます。らいしゅう、店で はたらきます。",
    translations: {
      en: "What kind of shop do you like? This kind of shop is cheap. That kind of shop is far. That shop over there is big. Yesterday, I didn't go to the new shop. Today, I will go to the shop with my friend. Next week, I will work at the shop.",
    },
    focusWord: {
      word: "店",
      type: "kanji",
      meaning: {
        en: "shop, store",
      },
    },
    keywords: ["店", "どんな", "やすい", "とおい", "おおきい"],
    questions: [
      {
        id: 1,
        question: {
          en: "When will the person work at the shop?",
          jp: "その人は いつ 店で はたらきますか。",
        },
        options: {
          en: ["Next week", "Yesterday", "Today", "Tomorrow"],
          jp: ["らいしゅう", "きのう", "きょう", "あした"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "Did the person go to the new shop yesterday?",
          jp: "その人は きのう あたらしい 店に いきましたか。",
        },
        options: {
          en: ["No", "Yes", "Don't know", "Maybe"],
          jp: ["いいえ", "はい", "わかりません", "たぶん"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "Who is the person going to the shop with today?",
          jp: "その人は きょう だれと 店に いきますか。",
        },
        options: {
          en: ["Friend", "Family", "Teacher", "Alone"],
          jp: ["ともだち", "かぞく", "せんせい", "ひとり"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 21,
    title: {
      jp: "ともだちと 会う",
      en: "Meeting Friends",
    },
    content:
      "どんな ともだちに 会いたいですか。こんな ともだちに きのう 会いました。そんな ともだちに あした 会いません。あんな ともだちに まいにち 会います。せんしゅう、せんせいに 会いませんでした。らいげつ、かぞくに 会いに いきます。",
    translations: {
      en: "What kind of friend do you want to meet? I met this kind of friend yesterday. I won't meet that kind of friend tomorrow. I meet that friend over there every day. Last week, I didn't meet the teacher. Next month, I will go to meet my family.",
    },
    focusWord: {
      word: "会う",
      type: "kanji",
      meaning: {
        en: "to meet, to see (someone)",
      },
    },
    keywords: ["会う", "会いたい", "まいにち", "せんしゅう", "らいげつ"],
    questions: [
      {
        id: 1,
        question: {
          en: "When will the person meet their family?",
          jp: "その人は いつ かぞくに 会いますか。",
        },
        options: {
          en: ["Next month", "Yesterday", "Tomorrow", "Last week"],
          jp: ["らいげつ", "きのう", "あした", "せんしゅう"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "Who didn't the person meet last week?",
          jp: "その人は せんしゅう だれに 会いませんでしたか。",
        },
        options: {
          en: ["Teacher", "Friend", "Family", "Student"],
          jp: ["せんせい", "ともだち", "かぞく", "がくせい"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "How often does the person meet 'that friend over there'?",
          jp: "その人は あんな ともだちに どのぐらい 会いますか。",
        },
        options: {
          en: ["Every day", "Every week", "Every month", "Every year"],
          jp: ["まいにち", "まいしゅう", "まいつき", "まいとし"],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "Which verb form expresses wanting to meet in the text?",
          jp: "会いたい という ことばは なんの いみですか。",
        },
        options: {
          en: ["Want to meet", "Will meet", "Met", "Don't meet"],
          jp: ["会いたい", "会います", "会いました", "会いません"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 22,
    title: {
      jp: "いそがしい いちにち",
      en: "A Busy Day",
    },
    content:
      "どんな しごとで つかれますか。こんな しごとは とても つかれます。そんな しごとは あまり つかれません。あんな しごとで きのう つかれました。いま、わたしは つかれて います。あした、やすみたいです。まいにち、べんきょうで つかれています。",
    translations: {
      en: "What kind of work makes you tired? This kind of work is very tiring. That kind of work is not very tiring. I got tired from that work over there yesterday. Now, I am tired. Tomorrow, I want to rest. Every day, I'm tired from studying.",
    },
    focusWord: {
      word: "つかれる",
      type: "hiragana",
      meaning: {
        en: "to get tired, to become fatigued",
      },
    },
    keywords: ["つかれる", "つかれて", "やすむ", "しごと", "べんきょう"],
    questions: [
      {
        id: 1,
        question: {
          en: "What makes the person tired every day?",
          jp: "その人は まいにち なにで つかれていますか。",
        },
        options: {
          en: ["Studying", "Working", "Exercise", "Shopping"],
          jp: ["べんきょう", "しごと", "うんどう", "かいもの"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What does the person want to do tomorrow?",
          jp: "その人は あした なにを したいですか。",
        },
        options: {
          en: ["Rest", "Work", "Study", "Exercise"],
          jp: ["やすむ", "はたらく", "べんきょうする", "うんどうする"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "When did the person get tired from 'that work over there'?",
          jp: "その人は いつ あんな しごとで つかれましたか。",
        },
        options: {
          en: ["Yesterday", "Today", "Tomorrow", "Every day"],
          jp: ["きのう", "きょう", "あした", "まいにち"],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "How does the person feel now?",
          jp: "その人は いま どう かんじていますか。",
        },
        options: {
          en: ["Tired", "Happy", "Busy", "Energetic"],
          jp: [
            "つかれて います",
            "うれしいです",
            "いそがしいです",
            "げんきです",
          ],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 23,
    title: {
      jp: "おかねの つかいかた",
      en: "How to Use Money",
    },
    content:
      "どんな ものを よく つかいますか。こんな おかねは きょう つかいません。そんな おかねを きのう つかいました。あんな ものを まいにち つかっています。せんしゅう、たくさん おかねを つかいませんでした。らいしゅう、あたらしい でんわを つかいはじめます。",
    translations: {
      en: "What kind of things do you often use? I won't use this kind of money today. I used that kind of money yesterday. I use that thing over there every day. Last week, I didn't use much money. Next week, I will start using a new phone.",
    },
    focusWord: {
      word: "つかう",
      type: "hiragana",
      meaning: {
        en: "to use, to spend",
      },
    },
    keywords: ["つかう", "つかいます", "おかね", "でんわ", "もの"],
    questions: [
      {
        id: 1,
        question: {
          en: "What will the person start using next week?",
          jp: "その人は らいしゅう なにを つかいはじめますか。",
        },
        options: {
          en: ["New phone", "New money", "New computer", "New car"],
          jp: [
            "あたらしい でんわ",
            "あたらしい おかね",
            "あたらしい パソコン",
            "あたらしい くるま",
          ],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "Did the person use a lot of money last week?",
          jp: "その人は せんしゅう たくさん おかねを つかいましたか。",
        },
        options: {
          en: ["No", "Yes", "Don't know", "Maybe"],
          jp: ["いいえ", "はい", "わかりません", "たぶん"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "How often does the person use 'that thing over there'?",
          jp: "その人は あんな ものを どのぐらい つかっていますか。",
        },
        options: {
          en: ["Every day", "Every week", "Every month", "Every year"],
          jp: ["まいにち", "まいしゅう", "まいつき", "まいとし"],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "When did the person use 'that kind of money'?",
          jp: "その人は いつ そんな おかねを つかいましたか。",
        },
        options: {
          en: ["Yesterday", "Today", "Tomorrow", "Next week"],
          jp: ["きのう", "きょう", "あした", "らいしゅう"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 24,
    title: {
      jp: "ともだちを よぶ",
      en: "Inviting Friends",
    },
    content:
      "どんな ともだちを よびたいですか。こんな ともだちを パーティーに よびました。そんな ひとは よびません。あんな せんせいを よんで います。きのう、かぞくを レストランに よびませんでした。らいしゅう、みんなを いえに よぶつもりです。",
    translations: {
      en: "What kind of friend do you want to invite? I invited this kind of friend to the party. I won't invite that kind of person. I am calling that teacher over there. Yesterday, I didn't invite my family to the restaurant. Next week, I plan to invite everyone to my house.",
    },
    focusWord: {
      word: "よぶ",
      type: "hiragana",
      meaning: {
        en: "to call, to invite",
      },
    },
    keywords: ["よぶ", "よびます", "パーティー", "レストラン", "みんな"],
    questions: [
      {
        id: 1,
        question: {
          en: "Where does the person plan to invite everyone?",
          jp: "その人は みんなを どこに よぶ つもりですか。",
        },
        options: {
          en: ["Home", "Restaurant", "Party", "School"],
          jp: ["いえ", "レストラン", "パーティー", "がっこう"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "Who didn't the person invite to the restaurant yesterday?",
          jp: "その人は きのう だれを レストランに よびませんでしたか。",
        },
        options: {
          en: ["Family", "Friends", "Teacher", "Everyone"],
          jp: ["かぞく", "ともだち", "せんせい", "みんな"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "Where did the person invite 'this kind of friend'?",
          jp: "その人は こんな ともだちを どこに よびましたか。",
        },
        options: {
          en: ["Party", "House", "Restaurant", "School"],
          jp: ["パーティー", "いえ", "レストラン", "がっこう"],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "What is the person doing with 'that teacher over there'?",
          jp: "その人は あんな せんせいを なにを していますか。",
        },
        options: {
          en: [
            "Calling them",
            "Inviting them",
            "Not inviting them",
            "Planning to invite them",
          ],
          jp: ["よんでいます", "よびます", "よびません", "よぶつもりです"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 25,
    title: {
      jp: "かえりに よる",
      en: "Stopping By on the Way Home",
    },
    content:
      "どんな みせに よりますか。こんな コンビニに まいにち よっています。そんな カフェには きのう よりました。あんな スーパーには よりません。せんしゅう、としょかんに よりませんでした。らいしゅう、ともだちの いえに よるつもりです。",
    translations: {
      en: "Which stores do you stop by? I stop by this convenience store every day. I stopped by that cafe yesterday. I won't stop by that supermarket over there. Last week, I didn't stop by the library. Next week, I plan to stop by my friend's house.",
    },
    focusWord: {
      word: "よる",
      type: "hiragana",
      meaning: {
        en: "to stop by, to drop in",
      },
    },
    keywords: ["よる", "よります", "コンビニ", "カフェ", "スーパー"],
    questions: [
      {
        id: 1,
        question: {
          en: "Where does the person stop by every day?",
          jp: "その人は まいにち どこに よっていますか。",
        },
        options: {
          en: ["Convenience store", "Cafe", "Supermarket", "Library"],
          jp: ["コンビニ", "カフェ", "スーパー", "としょかん"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "Where did the person stop by yesterday?",
          jp: "その人は きのう どこに よりましたか。",
        },
        options: {
          en: ["Cafe", "Convenience store", "Supermarket", "Library"],
          jp: ["カフェ", "コンビニ", "スーパー", "としょかん"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "Where is the person planning to stop by next week?",
          jp: "その人は らいしゅう どこに よるつもりですか。",
        },
        options: {
          en: ["Friend's house", "Convenience store", "Cafe", "Supermarket"],
          jp: ["ともだちの いえ", "コンビニ", "カフェ", "スーパー"],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "Where didn't the person stop by last week?",
          jp: "その人は せんしゅう どこに よりませんでしたか。",
        },
        options: {
          en: ["Library", "Cafe", "Convenience store", "Friend's house"],
          jp: ["としょかん", "カフェ", "コンビニ", "ともだちの いえ"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 26,
    title: {
      jp: "おくりもの を わたす",
      en: "Giving Presents",
    },
    content:
      "どんな プレゼントを わたしますか。こんな てがみを せんせいに わたしました。そんな しゅくだいは あした わたします。あんな ほんを ともだちに わたして います。きのう、おかねを わたしませんでした。らいしゅう、カードを かぞくに わたすつもりです。",
    translations: {
      en: "What kind of present will you hand over? I handed this kind of letter to the teacher. I will hand in that homework tomorrow. I am handing that book over there to my friend. Yesterday, I didn't hand over the money. Next week, I plan to give cards to my family.",
    },
    focusWord: {
      word: "わたす",
      type: "hiragana",
      meaning: {
        en: "to hand over, to give, to pass",
      },
    },
    keywords: ["わたす", "わたします", "てがみ", "しゅくだい", "プレゼント"],
    questions: [
      {
        id: 1,
        question: {
          en: "What did the person hand over to the teacher?",
          jp: "その人は せんせいに なにを わたしましたか。",
        },
        options: {
          en: ["Letter", "Homework", "Book", "Money"],
          jp: ["てがみ", "しゅくだい", "ほん", "おかね"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What will the person hand over tomorrow?",
          jp: "その人は あした なにを わたしますか。",
        },
        options: {
          en: ["Homework", "Letter", "Book", "Card"],
          jp: ["しゅくだい", "てがみ", "ほん", "カード"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "To whom is the person handing over the book?",
          jp: "その人は だれに ほんを わたして いますか。",
        },
        options: {
          en: ["Friend", "Teacher", "Family", "Student"],
          jp: ["ともだち", "せんせい", "かぞく", "がくせい"],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "What does the person plan to give to their family next week?",
          jp: "その人は らいしゅう かぞくに なにを わたすつもりですか。",
        },
        options: {
          en: ["Cards", "Books", "Letters", "Money"],
          jp: ["カード", "ほん", "てがみ", "おかね"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 27,
    title: {
      jp: "わすれもの",
      en: "Forgotten Things",
    },
    content:
      "どんな ものを よく わすれますか。こんな しゅくだいを きのう わすれました。そんな かばんを いえに わすれています。あんな ほんを よく わすれます。せんしゅう、えいごの じゅぎょうを わすれませんでした。あした、だいじな メールを わすれないように します。",
    translations: {
      en: "What kind of things do you often forget? I forgot this kind of homework yesterday. I have forgotten that bag at home. I often forget that book over there. Last week, I didn't forget the English class. Tomorrow, I will make sure not to forget the important email.",
    },
    focusWord: {
      word: "わすれる",
      type: "hiragana",
      meaning: {
        en: "to forget, to leave behind",
      },
    },
    keywords: [
      "わすれる",
      "わすれます",
      "しゅくだい",
      "じゅぎょう",
      "わすれもの",
    ],
    questions: [
      {
        id: 1,
        question: {
          en: "What did the person forget yesterday?",
          jp: "その人は きのう なにを わすれましたか。",
        },
        options: {
          en: ["Homework", "Bag", "Book", "Email"],
          jp: ["しゅくだい", "かばん", "ほん", "メール"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "Where has the person forgotten their bag?",
          jp: "その人は かばんを どこに わすれていますか。",
        },
        options: {
          en: ["Home", "School", "Station", "Library"],
          jp: ["いえ", "がっこう", "えき", "としょかん"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "What didn't the person forget last week?",
          jp: "その人は せんしゅう なにを わすれませんでしたか。",
        },
        options: {
          en: ["English class", "Homework", "Book", "Bag"],
          jp: ["えいごの じゅぎょう", "しゅくだい", "ほん", "かばん"],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "What is the person trying not to forget tomorrow?",
          jp: "その人は あした なにを わすれないように しますか。",
        },
        options: {
          en: ["Important email", "English class", "Homework", "Book"],
          jp: ["だいじな メール", "えいごの じゅぎょう", "しゅくだい", "ほん"],
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 28,
    title: {
      jp: "にほんごの べんきょう",
      en: "Studying Japanese",
    },
    content:
      "どんな にほんごが わかりますか。こんな かんじは よく わかります。そんな ぶんぽうは まだ わかりません。あんな ことばが だんだん わかって きました。きのう、せんせいの せつめいが わかりませんでした。らいしゅうの テストは ぜんぶ わかるつもりです。",
    translations: {
      en: "What kind of Japanese do you understand? I understand this kind of kanji well. I don't understand that grammar yet. I gradually came to understand those words over there. Yesterday, I didn't understand the teacher's explanation. I plan to understand everything for next week's test.",
    },
    focusWord: {
      word: "わかる",
      type: "hiragana",
      meaning: {
        en: "to understand, to comprehend",
      },
    },
    keywords: ["わかる", "わかります", "かんじ", "ぶんぽう", "せつめい"],
    questions: [
      {
        id: 1,
        question: {
          en: "What does the person understand well?",
          jp: "その人は なにが よく わかりますか。",
        },
        options: {
          en: ["This kind of kanji", "Grammar", "Words", "Explanation"],
          jp: ["こんな かんじ", "ぶんぽう", "ことば", "せつめい"],
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: {
          en: "What doesn't the person understand yet?",
          jp: "その人は まだ なにが わかりませんか。",
        },
        options: {
          en: ["That grammar", "Kanji", "Test", "Words"],
          jp: ["そんな ぶんぽう", "かんじ", "テスト", "ことば"],
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: {
          en: "What didn't the person understand yesterday?",
          jp: "その人は きのう なにが わかりませんでしたか。",
        },
        options: {
          en: ["Teacher's explanation", "Kanji", "Grammar", "Test"],
          jp: ["せんせいの せつめい", "かんじ", "ぶんぽう", "テスト"],
        },
        correctAnswer: 0,
      },
      {
        id: 4,
        question: {
          en: "What has the person gradually come to understand?",
          jp: "その人は なにが だんだん わかって きましたか。",
        },
        options: {
          en: ["Those words", "Grammar", "Kanji", "Explanation"],
          jp: ["あんな ことば", "ぶんぽう", "かんじ", "せつめい"],
        },
        correctAnswer: 0,
      },
    ],
  },
];
