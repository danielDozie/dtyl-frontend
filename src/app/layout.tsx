import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from 'next/font/google';
import CustomAnimatedCursor from "@/components/ui/animated-cursor";
import {client} from "@/lib/utils/sanity-client";
import React from "react";
import Script from "next/script";


const menuQuery = `*[_type == 'menu' && title == 'Main menu']{
  'mainMenuItems':items[]{
    text,
    internalPage->{
      slug{
        current
      }
    },
    externalUrl
  }
}`;
const menuItems = await client.fetch(menuQuery);


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "DTYL - deckardtyler",
  description: "Deckard Tyler Limited - Innovative Solutions for Your Business",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex flex-col h-full md:min-h-screen max-w-7xl mx-auto ${inter.className}`}>
        <Script 
          src='/disable-image.js'
          strategy="lazyOnload"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header menuItems={menuItems}/>
          <main className="flex-grow w-full md:px-8">
            {children}
          </main>
          <Footer menuItems={menuItems} />
          <CustomAnimatedCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}

