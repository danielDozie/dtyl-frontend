import React from 'react'
import { Text } from '@/components/ui/text'

export default function TermsAndLegal() {
  return (
      <>
          <span>
          <ul className='space-x-4 flex'>
              <li><Text size={'sm'}>Terms of use</Text></li>
              <li><Text size={'sm'}> • </Text></li>
              <li><Text size={'sm'}>Privacy policy</Text></li>
              <li><Text size={'sm'}> • </Text></li>
              <li><Text size={'sm'}>Legal</Text></li>
          </ul>
      </span></>
  )
}
