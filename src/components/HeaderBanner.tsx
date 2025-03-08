import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/utils/sanity-client';

interface HeaderBannerProps {
    imageAsset: any;
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({ imageAsset }) => {
    return (
        <div className='flex relative w-full h-[350px]'>
            <Image 
                src={urlFor(imageAsset).url()} 
                alt="header banner" 
                fill
                className="object-cover"
            />
        </div>
    );
};

export default HeaderBanner;
