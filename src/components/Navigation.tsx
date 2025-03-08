'use client'
import { iNavItems } from '@/constants'
import Link from 'next/link'
import React from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type MenuItemsProps = {
    text: string;
    internalPage: {
        slug: {
            current: string;
        }
    },
    externalUrl: string;
}

export default function Navigation({ menuItems, onClick }: { menuItems: any[], onClick?: () => void;}) {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const {mainMenuItems} = menuItems[0];

  return (
      <>
          <nav>
              <ul className={`${isMobile ? 'flex flex-col space-y-8' : 'flex space-x-8'}`}>
                  {mainMenuItems?.map((item: MenuItemsProps, idx: number) => (
                      <li key={idx} onClick={onClick}>
                          <Link href={'/' + (item?.internalPage?.slug?.current ??  item?.externalUrl)} className={`flex flex-col text-foreground hover:text-primary transition-colors relative ${isMobile ? 'text-2xl' : ''}`}>
                              <sup className={`text-[10px] ${isMobile ? 'relative mr-2' : 'absolute -top-2 left-0'}`}>{idx+1}</sup>
                              {item.text}
                          </Link>
                          {/* <span className='text-[12px]'>This is a sample description for menu if the menu is on mobile devices</span> */}
                      </li>
                  ))}
              </ul>
          </nav>
      </>
  )
}
