# 英语语法填空练习应用

一个交互式的英语语法填空练习网页应用，旨在帮助初中学生通过情境化选择与即时反馈，强化复杂句法结构辨析能力。

## 功能特性

### 1. 题目形式
- 提供含空格的英语复合句
- 空格处需选择正确的语法结构
- 支持多个难度级别（初级、中级、高级）

### 2. 交互方式
- 每个空格对应一个正确答案
- 答案以按钮列出，点击可填充
- 选项包含易混淆语法结构：
  - 非谓语动词（to do / doing / done）
  - 从句引导词（that / which / who / where）
  - 连词（because / although / unless 等）

### 3. 提交反馈
- 点击"提交"后即时判断正误
- 高亮显示错误项
- 弹出"详解卡片"说明：
  - 正确答案
  - 语法规则
  - 例句
  - 常见错误辨析

### 4. 教学支持
- 内置 8 个经典题型
- 题目附带难度标签（初级/中级/高级）
- 语法点分类（定语从句、状语从句、独立主格等）

### 5. 界面设计
- 简洁清晰的设计
- 适合课堂投影或学生平板操作
- 完全响应式布局

### 6. 学习激励
- 答题后显示评分（如"8/10"）
- 鼓励语句反馈
- 推荐相关语法复习资源
- 完整练习后显示统计信息

### 7. 目标用户
- 初中英语学生
- 核心价值：通过选择与反馈强化句法结构辨析

## 技术栈

- **框架**: Next.js 14
- **语言**: JavaScript (React)
- **样式**: CSS3（响应式设计）
- **部署**: Vercel

## 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
npm run build
npm start
```

## 部署到 Vercel

### 方式 1: 使用 Vercel Dashboard（推荐）

1. 访问 [Vercel 官网](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击"New Project"
4. 选择此 GitHub 仓库
5. 点击"Deploy"

### 方式 2: 使用 Vercel CLI

```bash
# 全局安装 Vercel CLI
npm i -g vercel

# 部署应用
vercel

# 部署到生产环境
vercel --prod
```

### 方式 3: 自动部署

推送到 GitHub 仓库后，Vercel 会自动部署。

## 项目结构

```
grammar-quiz/
├── app/
│   ├── components/
│   │   ├── Quiz.js              # 单个题目组件
│   │   ├── FeedbackCard.js       # 反馈卡片组件
│   │   ├── QuizList.js           # 题目列表组件
│   │   └── ResultsPage.js        # 结果页面组件
│   ├── globals.css              # 全局样式
│   ├── layout.js                # 根布局
│   └── page.js                  # 首页
├── data/
│   └── quizzes.js               # 题库数据
├── package.json                 # 项目配置
├── next.config.js               # Next.js 配置
├── vercel.json                  # Vercel 部署配置
├── jsconfig.json                # JavaScript 配置
├── .eslintrc.json               # ESLint 配置
├── .gitignore                   # Git 忽略文件
└── README.md                    # 项目说明
```

## 题库扩展

要添加新的题目，编辑 `data/quizzes.js` 文件：

```javascript
{
  id: 9,
  difficulty: "中级",
  category: "定语从句",
  question: "The student ______ scored the highest is my best friend.",
  blanks: [
    {
      id: "blank_9",
      correctAnswer: "who",
      options: ["who", "that", "whom", "which"],
      explanation: {
        correct: "who",
        rule: "解释语法规则",
        correctExample: "示例句子",
        commonMistakes: [
          { wrong: "错误选项", reason: "错误原因" }
        ]
      }
    }
  ],
  score: 0,
  maxScore: 1,
  completed: false
}
```

## 浏览器兼容性

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## 性能优化

- 使用 Next.js 自动代码分割
- CSS-in-JS 优化样式加载
- 响应式图像加载
- 服务端渲染（SSR）

## 许可证

MIT License

## 贡献

欢迎提交 Issues 和 Pull Requests！

## 联系方式

如有问题或建议，请提交 GitHub Issues。
