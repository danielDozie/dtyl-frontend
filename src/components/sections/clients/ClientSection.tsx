'use client'
import React from 'react';
import { Text } from '@/components/ui/text'
import { useTheme } from "next-themes";
import { MagicCard } from '@/components/ui/magic-card';
import Link from 'next/link';
import HeaderBanner from '../../../components/HeaderBanner';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '@/components/PortableTextComponent';

interface ClientSectionProps {
  title: string;
  subtitle: string;
  description: any;
  clientsData?: Array<{
    id: number;
    name: string;
    subtitle1Url: string;
    subtitle2Url: string;
    subtitle1: string;
    subtitle2: string;
  }>;
  headerImage: any;
}

const ClientSection: React.FC<ClientSectionProps> = ({title, subtitle, clientsData, headerImage, description}) => {
    const { theme } = useTheme();

    return (
        <>
            <div className='w-full flex flex-start flex-col space-y-4 my-8'>
                <Text size={'heading'}>{title}<span className="text-red font-bold !text-5xl">.</span></Text>
                <Text size={'xl'}>{subtitle}</Text>
            </div>
           <HeaderBanner imageAsset={headerImage.asset} />
           <div className='my-4'>
                <PortableText value={description} components={PortableTextComponent} />
           </div>
            <div className='my-8'>
                <div className='grid md:grid-cols-4 gap-4'>
                    {clientsData?.map((item, index) => (
                        <MagicCard
                            key={index}
                            className="flex-col items-center justify-center h-[150px] w-full md:w-[280px] relative hover:border-b-4 hover:border-red/10 hover:shadow-lg hover:bg-transparent group"
                            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>
                            <div className='flex flex-col p-4 justify-center items-center'>
                                <Text size={'md'} className='font-semibold group-hover:font-bold'>{item.name}</Text>

                                <Link href={item.subtitle1Url ?? '#'} target="_blank" rel="noopener noreferrer">
                                    <Text className='text-[14px] py-2 !text-center !text-slate-500 hover:!text-red/70'>{item.subtitle1}</Text>
                                </Link>
                                <Link href={item.subtitle2Url ?? '#'} target="_blank" rel="noopener noreferrer">
                                    <Text className='text-[14px] !text-center !text-slate-500 hover:!text-red/70'>{item.subtitle2}</Text>
                                </Link>
                            </div>
                        </MagicCard>
                    ))}
                </div>
            </div>
        </>

    )
}

export default ClientSection;





