import Breadcrumb from "@/components/Breadcrumb";
import Divider from "@/components/Divider";
import Container from "@/components/sections/Container";
import { Text } from "@/components/ui/text";
import { client } from "@/lib/utils/sanity-client";
import { ReactElement } from "react";
import Image from 'next/image'
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types'
import PortableTextComponent from '@/components/PortableTextComponent';
import { SanityDocument } from "@sanity/client";

// Define TypeScript interface for blog post data
interface BlogPostData {
    title?: string;
    excerpt?: string;
    content?: any; // Add more specific types based on your Sanity schema
}

// Fetch data at build time
async function getBlogPost(slug: string) {
    const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    category->{
        title,
        slug
    },
    author->{
        teamMember->{
        bio,
        name,
        position
        }
    },
    body,
    _createdAt,
    mainImage{
        asset->{
        url,
        creditLine
    }
    }
    }`;
    return await client.fetch<SanityDocument>(query, { slug });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> {
    const resolvedParams = await params;
    const post = await getBlogPost(resolvedParams.slug);
    
    // Format slug for display
    const formattedTitle = resolvedParams.slug.split('-').join(' ');

    const { title, author, mainImage: postImage, body } = post;

    return (
        <Container>
            <Breadcrumb 
                title="blog"
                link="/blog"
                secondaryLink={resolvedParams?.slug}
                secondaryTitle={formattedTitle}
            />
            <div className="w-full flex flex-start flex-col space-y-4 my-8 animate-fade-in">
                <Text size="heading" className="!leading-tight transition-all duration-300">
                    {title || formattedTitle.toUpperCase()}
                </Text>
                <div className="w-full flex justify-between items-center transition-transform duration-300">
                    <Text className="transition-colors duration-300 hover:text-red/90 !text-sm md:!text-lg">
                        Author: {author.teamMember.name}
                    </Text>
                    <Text className="transition-colors duration-300 hover:text-red/90 !text-sm md:!text-lg">
                        {new Date(post._createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long', 
                            day: 'numeric'
                        })}
                    </Text>
                </div>
                {postImage?.asset?.url && (
                    <div className="w-full h-[500px] relative transition-transform duration-500">
                        <Image 
                            src={postImage.asset.url} 
                            alt={postImage.asset.url}
                            width={1200}
                            height={500}
                            className="object-cover w-full h-full transition-all duration-500"
                        />
                        {postImage.asset.creditLine && (
                            <Text size="sm" className="absolute bottom-2 right-2 text-white/80 transition-opacity duration-300 hover:opacity-100">
                                {postImage.asset.creditLine}
                            </Text>
                        )}
                    </div>
                )}
                <div className='w-full my-4 animate-slide-up'>
                    <PortableText
                        value={body}
                        components={PortableTextComponent}
                    />
                </div>
            </div>
            <Divider />
        </Container>
    );
}