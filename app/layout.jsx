import './globals.css'

export const metadata = {
  title: 'The Shraddha Decision Portal',
  description: 'A Very Important Life Proposal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
