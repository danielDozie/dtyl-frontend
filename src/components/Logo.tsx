'use client'
import React from 'react'
import DtylIcon from './ui/icons/dtyl';
import { Text } from './ui/text';

export default function Logo({ isAnimated }: { isAnimated : boolean}) {
  return (
      <><div className='flex items-center gap-2'>
          <DtylIcon size={38} isAnimated={isAnimated} />
          <span className='flex'>
              <Text size='lg'  className='!text-red'>deckard</Text>
              <Text size='lg' weight='bold'>tyler</Text>
          </span>
      </div></>
  )
}
