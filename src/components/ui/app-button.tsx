import React from 'react'
import { Button } from "@/components/ui/button"
import { LoaderCircle, LucideIcon, MoveUpRight } from 'lucide-react';

export default function AppButton({ title, onClick, icon: Icon = MoveUpRight, fullWidth=false, paddingVertical=false, loading=false }: { title: string; onClick?: () => void; icon?: LucideIcon, fullWidth?: boolean, paddingVertical?: boolean, loading?:boolean }) {
  return (
    <Button
      variant="default"
      className={`rounded-xs ${paddingVertical ? 'py-2' : 'py-1.5'} px-1 group ${fullWidth && '!w-full'}`}
      onClick={onClick}
    >
      <span className='pl-3 text-sm font-normal'>{title}</span>
      <div className="bg-red p-1.5 rounded-xs ml-3">
        {loading ? <LoaderCircle className="w-4 h-4 text-white animate-spin"/> : <Icon className="w-4 h-4 text-white group-hover:rotate-[45deg] transition-all" />}
      </div>
    </Button>
  )
}
