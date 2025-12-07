import "../styles/globals.css"

export const metadata = {
  title: "Dashboard",
  description: "Sistema de gerenciamento de eventos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
