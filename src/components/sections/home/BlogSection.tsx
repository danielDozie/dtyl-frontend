'use client'
import Divider from '@/components/Divider'
import React, { useState } from 'react'
import Container from '../Container';
import { ArrowUpFromDot, Router } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Text } from "@/components/ui/text";
import { useRouter } from 'next/navigation';
import { urlFor } from '@/lib/utils/sanity-client';
import Link from 'next/link';


export default function BlogSection({blogSectionContent}: {blogSectionContent: any}) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    const {sectionTitle, featuredPosts, button} = blogSectionContent;
    const nextPost = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredPosts.length);
    };

    const prevPost = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredPosts.length) % featuredPosts.length);
    };

    return (
        <>
            <Divider title={sectionTitle} buttonText={button?.text} onClick={() => router.push(button?.link)} />
            <Container>
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
                    {!isMobile && (
                        <div className="md:w-[10%]">
                            <div className="flex flex-col items-start justify-center h-full space-y-10">
                                <ArrowUpFromDot className="h-6 w-6 hover:text-gray-500 transition-colors cursor-pointer" onClick={prevPost} />
                                <ArrowUpFromDot className="h-6 w-6 hover:text-gray-500 transition-colors rotate-180 cursor-pointer" onClick={nextPost} />
                            </div>
                        </div>
                    )}
                    <div className={isMobile ? 'w-full' : 'md:w-[90%]'}>
                        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-8`}>
                            <Link href={`/blog/${featuredPosts[currentIndex]?.slug?.current}`}>
                                <div className="blog-post space-y-1">
                                    <img src={urlFor(featuredPosts[currentIndex].image).url()} alt={`Blog post ${currentIndex + 1}`} className="w-full h-[450px] mb-2 object-cover " />
                                    <Text size="md" className="!text-gray-400">{new Date(featuredPosts[currentIndex].createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                                    <Text size="lg" className="text-lg">{featuredPosts[currentIndex].title}</Text>
                                    <Text size="body" className="font-light line-clamp-2">{featuredPosts[currentIndex].excerpt}</Text>
                                </div>
                            </Link>
                            {!isMobile && (
                                <Link href={`/blog/${featuredPosts[(currentIndex + 1) % featuredPosts?.length]?.slug?.current}`}>
                                    <div className="blog-post space-y-1">
                                        <img src={urlFor(featuredPosts[(currentIndex + 1) % featuredPosts.length].image).url()} alt={`Blog post ${(currentIndex + 2) % featuredPosts.length}`} className="w-full h-[450px] mb-2 object-cover" />
                                        <Text size="md" className="!text-gray-400">{new Date(featuredPosts[(currentIndex + 1) % featuredPosts.length].createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                                        <Text size="lg" className="text-lg">{featuredPosts[(currentIndex + 1) % featuredPosts.length].title}</Text>
                                        <Text size="body" className="font-light line-clamp-2">{featuredPosts[(currentIndex + 1) % featuredPosts.length].excerpt}</Text>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                    {isMobile && (
                        <div className="flex justify-center my-6 space-x-8 md:space-x-6">
                            <ArrowUpFromDot className="h-6 w-6 hover:text-gray-500 transition-colors -rotate-90 cursor-pointer" onClick={prevPost} />
                            <ArrowUpFromDot className="h-6 w-6 hover:text-gray-500 transition-colors rotate-90 cursor-pointer" onClick={nextPost} />
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}
