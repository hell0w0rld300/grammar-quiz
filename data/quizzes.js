export const quizzes = [
  {
    id: 1,
    difficulty: "初级",
    category: "非谓语动词",
    question: "______ tired, she still finished the report.",
    blanks: [
      {
        id: "blank_1",
        correctAnswer: "Being",
        options: ["Being", "To be", "Be", "Been"],
        explanation: {
          correct: "Being",
          rule: "独立主格结构（Absolute Phrase）用来表示原因、方式或伴随状态。此处用现在分词 'Being' 作状态描述。",
          correctExample: "Being tired, she still finished the report. 尽管疲惫，她仍然完成了报告。",
          commonMistakes: [
            { wrong: "To be tired", reason: "to do 不定式表目的或将来，这里需要表现在的状态" },
            { wrong: "Be tired", reason: "非谓语动词需要特定的形式，不能直接用原形" },
            { wrong: "Been tired", reason: "过去分词通常表完成或被动，这里需要主动进行" }
          ]
        }
      }
    ],
    score: 0,
    maxScore: 1,
    completed: false
  },
  {
    id: 2,
    difficulty: "初级",
    category: "定语从句",
    question: "The book ______ I borrowed last week is very interesting.",
    blanks: [
      {
        id: "blank_2",
        correctAnswer: "that",
        options: ["that", "which", "who", "where"],
        explanation: {
          correct: "that",
          rule: "定语从句中，当先行词是物体时，可以用 'which' 或 'that'。当前置词后跟从句时，必须用 'which'；其他情况 'that' 和 'which' 都可以用。",
          correctExample: "The book that I borrowed is interesting. 我借的那本书很有趣。",
          commonMistakes: [
            { wrong: "who", reason: "'who' 用于人的先行词，不能用于物体" },
            { wrong: "where", reason: "'where' 用于地点的先行词，这里先行词是 book（物体）" }
          ]
        }
      }
    ],
    score: 0,
    maxScore: 1,
    completed: false
  },
  {
    id: 3,
    difficulty: "初级",
    category: "状语从句",
    question: "______ it rains tomorrow, we will stay at home.",
    blanks: [
      {
        id: "blank_3",
        correctAnswer: "If",
        options: ["If", "Unless", "Although", "Because"],
        explanation: {
          correct: "If",
          rule: "'If' 引导条件状语从句，表示'如果'。'Unless' 表示'除非'（相当于 if not），'Although' 表示'尽管'（让步），'Because' 表示'因为'（原因）。",
          correctExample: "If it rains tomorrow, we will stay at home. 如果明天下雨，我们会待在家里。",
          commonMistakes: [
            { wrong: "Unless it rains", reason: "Unless = if not，句意就变成'除非下雨我们才待在家里'，逻辑不对" },
            { wrong: "Although it rains", reason: "Although 表让步，不符合此处的条件关系" }
          ]
        }
      }
    ],
    score: 0,
    maxScore: 1,
    completed: false
  },
  {
    id: 4,
    difficulty: "中级",
    category: "状语从句",
    question: "______ she was busy, she managed to help us.",
    blanks: [
      {
        id: "blank_4",
        correctAnswer: "Although",
        options: ["Although", "Because", "If", "Unless"],
        explanation: {
          correct: "Although",
          rule: "'Although' 引导让步状语从句，表示'尽管、虽然'。前后两个分句存在相反的逻辑关系。",
          correctExample: "Although she was busy, she still helped us. 尽管她很忙，她仍然帮助了我们。",
          commonMistakes: [
            { wrong: "Because she was busy", reason: "Because 表因果关系，与后半句逻辑矛盾" },
            { wrong: "If she was busy", reason: "If 表条件，不符合此处的让步关系" }
          ]
        }
      }
    ],
    score: 0,
    maxScore: 1,
    completed: false
  },
  {
    id: 5,
    difficulty: "中级",
    category: "非谓语动词",
    question: "I saw him ______ in the park yesterday.",
    blanks: [
      {
        id: "blank_5",
        correctAnswer: "playing",
        options: ["playing", "to play", "play", "played"],
        explanation: {
          correct: "playing",
          rule: "在 'see/watch/hear + 宾语 + ____' 结构中，若表示看到正在进行的动作，用现在分词（-ing）；若表示看到完整的动作，用不定式或原形。",
          correctExample: "I saw him playing football. 我看到他在踢足球。",
          commonMistakes: [
            { wrong: "to play", reason: "to play 强调动作的完整性或目的，不符合'看到正在进行'的含义" },
            { wrong: "play", reason: "原形动词通常只在 make/let/have 等使役动词后使用" }
          ]
        }
      }
    ],
    score: 0,
    maxScore: 1,
    completed: false
  },
  {
    id: 6,
    difficulty: "中级",
    category: "定语从句",
    question: "The person ______ I talked to yesterday turned out to be a famous actor.",
    blanks: [
      {
        id: "blank_6",
        correctAnswer: "whom",
        options: ["whom", "who", "that", "whose"],
        explanation: {
          correct: "whom",
          rule: "在定语从句中，当关系代词在从句中作宾语且前面有前置词时，必须用 'whom'（对于人）。'who' 是主格，只能作主语。",
          correctExample: "The person whom I talked to is a famous actor. 我和他谈过的那个人是一个著名演员。",
          commonMistakes: [
            { wrong: "who", reason: "'who' 作主格，不能作 'to' 的宾语" },
            { wrong: "that", reason: "当前置词直接跟关系代词时，必须用 whom/which，不能用 that" }
          ]
        }
      }
    ],
    score: 0,
    maxScore: 1,
    completed: false
  },
  {
    id: 7,
    difficulty: "高级",
    category: "状语从句",
    question: "______ we achieve success depends on how hard we work.",
    blanks: [
      {
        id: "blank_7",
        correctAnswer: "Whether",
        options: ["Whether", "That", "What", "Which"],
        explanation: {
          correct: "What",
          rule: "在主语从句中，'What' 既有引导作用，又充当从句的宾语。'Whether' 用于条件/选择疑问句，'That' 是纯连接词不做句子成分。",
          correctExample: "What we achieve depends on how hard we work. 我们取得什么样的成就取决于我们的工作有多努力。",
          commonMistakes: [
            { wrong: "Whether", reason: "'Whether' 不能引导主语从句" },
            { wrong: "That", reason: "'That' 不做句子成分，且无意义" }
          ]
        }
      }
    ],
    score: 0,
    maxScore: 1,
    completed: false
  },
  {
    id: 8,
    difficulty: "高级",
    category: "非谓语动词",
    question: "______ all my efforts, I failed the exam.",
    blanks: [
      {
        id: "blank_8",
        correctAnswer: "Despite",
        options: ["Despite", "Although", "In spite of", "However"],
        explanation: {
          correct: "Despite / In spite of",
          rule: "'Despite' 和 'In spite of' 是介词短语，后面跟名词或名词短语；'Although' 是连词，后面跟完整的从句；'However' 是副词，用于表转折但不能引导短语或从句。",
          correctExample: "Despite all my efforts, I failed. / In spite of all my efforts, I failed. 尽管我尽力了，我还是失败了。",
          commonMistakes: [
            { wrong: "Although all my efforts", reason: "Although 需要跟完整从句，如 'Although I made all my efforts'" },
            { wrong: "However", reason: "'However' 是副词，用于连接两个独立句子" }
          ]
        }
      }
    ],
    score: 0,
    maxScore: 1,
    completed: false
  }
];
