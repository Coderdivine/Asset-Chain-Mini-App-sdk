"use client";

const metadata = {
  name: "Starter kit",
  description: "Asset Chain mini app starter kit",
  url: "https://walletconnect.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};


export default function AppKit({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
