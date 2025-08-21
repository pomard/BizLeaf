import './globals.css'

export const metadata = {
  title: 'BizLeaf - 営業効率化ダッシュボード',
  description: 'ビジネスの成長を育てる営業管理システム',
  icons: {
    icon: '/Futaba.png',
    shortcut: '/Futaba.png',
    apple: '/Futaba.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}