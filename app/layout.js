import './globals.css';

export const metadata = {
  title: '英语语法填空练习',
  description: '交互式英语语法填空练习应用，包含多个难度级别的题目和详细的语法讲解',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
