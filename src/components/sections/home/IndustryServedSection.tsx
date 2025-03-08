'use client'
import Divider from '@/components/Divider'
import React, { useState } from 'react'
import { Text } from '@/components/ui/text'
import AppButton from '@/components/ui/app-button';
import Image from 'next/image';
import Container from '../Container';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { NumberTicker } from '@/components/ui/number-ticker';
import  SparklesText  from '@/components/ui/sparkles-text';
import BlurFade from '@/components/ui/blur-fade';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { urlFor } from '@/lib/utils/sanity-client';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '@/components/PortableTextComponent';

export default function IndustryServedSection({industryServedItem}:{industryServedItem: any}) {
    const {button, yearsInService, yearsInServiceDescription, sectionTitle, featureService} = industryServedItem;
    
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const categories = featureService.map((item: any) => item.category).filter(Boolean);
    const { images, descriptions, projectLinks } = featureService.reduce((acc: any, item: any) => {
        if (item.image) acc.images.push(item.image);
        if (item.description) acc.descriptions.push(item.description);
        if (item.projectLink) acc.projectLinks.push(item.projectLink);
        return acc;
    }, { images: [], descriptions: [], projectLinks: [] });

    const handleServiceClick = (index: number) => {
        setCurrentImageIndex(index);
    };


    return (
        <>
            <Divider title={sectionTitle} buttonText={button?.text} onClick={() => router.push(button?.link)} />
            <Container>
                <div className={`flex ${isMobile ? 'flex-col'  : 'flex-row'} w-full gap-8 mb-12`}>
                    {/* First column */}
                    <div className={isMobile ? 'w-full' : 'w-[40%]'}>
                        <div className="relative text-center items-center space-y-1 mt-8">
                            <NumberTicker className='relative text-[20.5rem] font-bold leading-none' value={yearsInService} />
                            {yearsInService && <sup className='font-medium text-7xl absolute top-4 right-20'>+</sup>}
                            <BlurFade delay={.5} inView blur='2px'>
                                <SparklesText turnOffSparkles colors={{ first: '#ef4444', second: '#f87171' }} className="text-5xl !font-semibold" text={yearsInServiceDescription} />
                            </BlurFade>
                        </div>
                    </div>

                    {/* Second column */}
                    <div className={isMobile ? 'w-full' : 'w-[20%]'}>
                        <ul className={`${isMobile ? 'flex overflow-x-auto hide-scrollbar justify-between space-x-4' : 'space-y-24'} mt-10`}>
                            {categories.map((item: any, index: number) => (
                                <li 
                                key={index} 
                                onClick={() => handleServiceClick(index)} 
                                className={`cursor-pointer text-xl font-light ${index === currentImageIndex ? '!font-bold !text-2xl' : ''}`}
                                >
                                    {item === "residential-mixed-use" ? "Residential + Mixed Use" : item && item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() }
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Third column */}
                    <div className={isMobile ? 'w-full' : 'w-[40%]'}>
                        <div className="relative aspect-auto group overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image 
                                        src={urlFor(images[currentImageIndex]).url()} 
                                        alt={`service-section-image-${currentImageIndex + 1}`} 
                                        width={1470} 
                                        height={980} 
                                        className='grayscale cursor-pointer'
                                        onClick={() => router.push(projectLinks[currentImageIndex])}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className='my-6'>
                            <PortableText value={descriptions[currentImageIndex]} components={PortableTextComponent} />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
