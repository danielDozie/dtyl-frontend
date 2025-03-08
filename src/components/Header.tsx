'use client'
import React, { useState, useEffect } from 'react'
import { ModeToggle } from './ui/theme-toggle'
import Logo from './Logo'
import { AnimatePresence, motion } from 'framer-motion'
import Navigation from './Navigation'
import TermsAndLegal from './sections/general/terms-and-legal'
import Link from 'next/link'

export default function Header({menuItems}: {menuItems: any[]}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const headerHeight = 80;

  //     if (prevScrollPos > headerHeight) {
  //       setIsScrolled(true);
  //     } else if (scrollPosition < prevScrollPos){
  //       setIsScrolled(false);
  //     }
  //     setPrevScrollPos(scrollPosition <= 0 ? 0 : scrollPosition);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [prevScrollPos]);

  const NavigationStyle = ({ isScrolled }:{isScrolled: boolean}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const headerClass = isScrolled
        ? "fixed top-0 left-0 right-0 flex max-w-7xl mx-auto h-20 items-center justify-center bg-background/70 backdrop-blur-sm z-50"
        : "flex w-full max-w-7xl md:mx-auto h-20 md:items-center md:justify-center z-50";

    useEffect(() => {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [mobileMenuOpen]);

    return (
        <motion.header
            //@ts-ignore
            className={headerClass}
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            // transition={{ duration: 0.3 }}
        >
          <div className={`w-full h-full md:mx-8 ${isScrolled ? 'border-b border-gray-300' : 'border-b border-foreground dark:border-foreground'}`}>
            <div className="w-full h-full px-4 md:px-8 flex justify-between items-center">
              <Link href='/'>
                <Logo isAnimated={true} />
              </Link>
              <div className='space-x-12 items-center hidden md:flex'>
                <Navigation menuItems={menuItems} />
                <ModeToggle />
              </div>
              {/* Mobile menu */}
              <div className="md:hidden flex space-x-2 justify-center items-center">
                <ModeToggle />
                <button
                    className="p-2 text-foreground focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                  ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                  )}
                </button>
              </div>
              {mobileMenuOpen && (
                  <AnimatePresence>
                    {mobileMenuOpen && (
                        //@ts-ignore
                        <motion.div className="absolute inset-0 bg-background top-0 left-0 bottom-0 right-0 z-50 flex flex-col justify-center items-center !h-screen px-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="absolute top-4 left-4">
                            <Link href='/' onClick={() => setMobileMenuOpen(false)}>
                              <Logo isAnimated={true} />
                            </Link>
                          </div>
                          <div className="w-full text-left">
                            <Navigation menuItems={menuItems} onClick={() => setMobileMenuOpen(false)} />
                            {/* <div className="mt-8">
                              
                            </div> */}
                            {/* <div className='w-full absolute flex bottom-10 mx-auto md:hidden'>
                              <TermsAndLegal />
                            </div> */}
                          </div>
                          <button
                              className="absolute top-4 right-4 p-2 text-foreground"
                              onClick={() => setMobileMenuOpen(false)}
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </motion.div>
                    )}
                  </AnimatePresence>
              )}
            </div>
          </div>
        </motion.header>
    )
  }

  return (
      <>
        <AnimatePresence>
          <NavigationStyle isScrolled={isScrolled} />
        </AnimatePresence>
      </>
  )
}
