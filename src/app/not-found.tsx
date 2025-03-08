'use client'
import AppButton from '@/components/ui/app-button'
import { Text } from '@/components/ui/text';
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter();
  
  return (
    <div className="flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8 mt-8">
        <Text className="text-5xl font-bold">Oops!</Text>
        <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <AppButton title={'Return home'} onClick={() => router.push('/')}/>
      </div>
    </div>
  )
}