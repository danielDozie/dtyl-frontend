'use client'
import Divider from '@/components/Divider'
import React from 'react'
import { Text } from '@/components/ui/text'
import Image from 'next/image'
import BlurFade from '@/components/ui/blur-fade';
import { urlFor } from '@/lib/utils/sanity-client';
import { MagicCard } from '@/components/ui/magic-card';
import { useTheme } from 'next-themes';
import { PortableText } from '@portabletext/react'
import PortableTextComponent from '@/components/PortableTextComponent'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function FirstSection({firstSectionContent}: {firstSectionContent: any}) {

    const { theme } = useTheme();
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    const { contentImage:contentWithImage, heading } = firstSectionContent;

    return (
        <>
            <Divider title=""/>
            <section className='flex flex-col my-12 items-center px-4 md:px-8'>
                <div className='space-y-12 items-center flex flex-col justify-center'>
                    <BlurFade inView delay={.3} blur='0px'>
                        <Text className='text-[28px] md:text-[40px] text-center leading-tight -+max-w-[650px]'>{heading.split('/').map((part: string, i: number, arr: string[]) => (
                            <React.Fragment key={i}>
                                {i > 0 && <span className="text-red">/</span>}
                                {part}
                            </React.Fragment>
                        ))}</Text>
                    </BlurFade>
                </div>
                <div className={`flex gap-6 mt-12 mx-auto ${isMobile && 'flex-col'}`}>

                {contentWithImage.map((item: any, index: number) => (<MagicCard key={index} className="cursor-pointer flex flex-col w-full p-2 h-auto pb-8 hover:border-b-4 hover:border-red/10 hover:shadow-lg hover:bg-transparent group" gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>
                        <Image src={urlFor(item?.image?.asset).url()} alt="Strategy" width={600} height={400} style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }} className='w-full max-h-40 h-40 group-hover:scale-95' />
                        <div className='flex flex-col justify-start px-4'>
                            <Text className='!font-bold text-lg uppercase'>{item?.title}<span className="text-red font-bold !text-5xl">.</span></Text>
                            <Text className='font-semibold !text-gray-400 pb-4'>{item?.subtitle}</Text>
                            <PortableText value={item?.description} components={PortableTextComponent} />
                        </div>
                        
                    </MagicCard>))}
                </div>
                
            </section>
        </>
    )
}
