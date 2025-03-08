import React, {  } from 'react';
import { Text } from '@/components/ui/text';
import Image from 'next/image';
import { urlFor } from '@/lib/utils/sanity-client';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '@/components/PortableTextComponent';

interface Item {
    id: string;
    title: string;
    subtitle: string;
    description: any;
    image: string;
}

interface ServicesItemSectionProps {
    items: Item[];
}

const ServicesItemSection: React.FC<ServicesItemSectionProps> = ({items}) => {

    return (
        items.map((item, index) => (
            <div className='flex flex-col md:flex-row w-full space-x-4 mb-20 md:mb-12' key={item.id}>
                {index % 2 == 0 ? (
                   <div className='w-full flex flex-col md:flex-row'>
                        <div className={`md:w-2/3 w-full bg-gray-50 dark:bg-[#1a1a1a] p-4 md:p-24 space-y-4`}>
                            <Text size={'heading'} className='font-bold'>{item.title}</Text>
                            <Text className='font-light !text-red uppercase'>{item.subtitle}</Text>
                            <PortableText value={item.description} components={PortableTextComponent}  />
                        </div>
                        <div className='w-full md:w-1/3 flex relative md:ml-auto items-center scroll-mt-16' id={item.id}>
                            <Image src={urlFor(item.image).url()} alt={item.title} width={400} height={300} className='md:absolute md:-left-20' style={{width: 400, height: 300, objectFit:'cover'}}/>
                        </div>
                    </div>
                ) : (
                    <div className='w-full flex flex-col-reverse md:flex-row'>
                        <div className='md:w-1/3 w-full flex relative md:mr-auto items-center scroll-mt-16' id={item.id}>
                            <Image src={urlFor(item.image).url()} alt={item.title} width={400} height={300} className='md:absolute md:-right-20' style={{width: 400, height: 300, objectFit: 'cover'}}/>
                        </div>
                        <div className={`md:w-2/3 w-full bg-gray-50 dark:bg-[#1a1a1a] p-4 md:p-24 space-y-4`}>
                            <Text size={'heading'} className='font-bold'>{item.title}</Text>
                            <Text className='font-light !text-red uppercase'>{item.subtitle}</Text>
                            <PortableText value={item.description} components={PortableTextComponent}  />
                        </div>
                    </div>
                )}
            </div>
        ))
    );
}

export default ServicesItemSection;
