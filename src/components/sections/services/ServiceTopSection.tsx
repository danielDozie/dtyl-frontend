'use client'
import React, { FC, useRef } from 'react'
import { Text } from '@/components/ui/text'
import Image from 'next/image'
import { urlFor } from '@/lib/utils/sanity-client';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '@/components/PortableTextComponent';

type ServiceTopSectionProps = {
    services: any[];
    title: string;
    subtitle?: any;
    rotatingTextTitle?: string;
    rotatingTexts?: string[];
}

const ServiceTopSection: FC<ServiceTopSectionProps> = ({ services, title, subtitle, rotatingTextTitle, rotatingTexts }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className='w-full flex flex-start flex-col space-y-4 my-8'>
                <Text size={'heading'}>{title}<span className="text-red font-bold !text-5xl">.</span></Text>
            </div>
            {/* Services Image scroll */}
            <div className='w-full flex relative flex-col mb-8'>
                <div ref={scrollRef} className='w-full flex'>
                <div className="w-full flex space-x-2 overflow-auto">
                    {services.map((item) => (
                        <div key={item.id} className='relative flex-shrink-0 group transition-transform duration-300 ease-in-out transform hover:scale-105 w-56 h-40 mb-4'>
                            <Link href={`#${item.id}`}>
                                <Image src={urlFor(item.image).url()} alt={`service-image-${item.id}`} fill  className='transition-transform duration-300 ease-in-out' style={{objectFit: "cover"}} />
                            </Link>
                            <Link href={`#${item.id}`}>
                            <div className='absolute bottom-0 left-0 right-0 bg-gray-800/70 p-2 !text-white text-center h-20 hidden group-hover:block transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100'>
                                <Text className="text-sm font-semibold !text-white">{item.title}</Text>
                                <Text className='uppercase text-xs !text-white'>{item.subtitle}</Text>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
                </div>
            </div>
            <div className='mb-24'>
            <PortableText value={subtitle} components={PortableTextComponent} />
            </div>
        </>
    )
}

export default ServiceTopSection