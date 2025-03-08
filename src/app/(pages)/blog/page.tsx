import Breadcrumb from "@/components/Breadcrumb";
import Divider from "@/components/Divider";
import Container from "@/components/sections/Container";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import { ReactElement } from "react";
import Image from "next/image";

import { client } from '@/lib/utils/sanity-client';
import HeaderBanner from "../../../components/HeaderBanner";
import { PortableText } from "@portabletext/react";
import PortableTextComponent from "@/components/PortableTextComponent";

/**
 * Interface representing a featured blog post
 */
interface FeaturedPost {
  title: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  publishedAt: string;
  excerpt: string;
}

/**
 * Interface representing the content configuration for the blog page
 */
interface BlogPageContent {
  title: string;
  subtitle: string;
  description: any;
  headerImage: any;
  featuredPosts: FeaturedPost[];
  postsPerPage: number;
  showAuthor: boolean;
  showDate: boolean;
}

/**
 * Interface representing a standard blog post
 */
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  createAt: string;
  slug: {
    current: string;
  };
  postImage: {
    asset: {
      url: string;
    };
  };
}

/**
 * Interface representing the full blog page data structure
 */
interface BlogPage {
  slug: string;
  content: [{
    content: BlogPageContent[];
  }];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  previewTitle: string;
  previewDescription: string;
  openGraphImageUrl: {
    asset: {
      url: string;
    };
  };
  posts: BlogPost[];
}

// Fetch blog page data from Sanity CMS
const blogPage = await client.fetch(`*[_type == "page" && title == "Blog"]{
  slug,
  content[]{
    content[]{
      title,
      subtitle,
      headerImage,
      description,
      featuredPosts[]->{
        title,
        slug,
        mainImage{
          asset->{
            url
          }
        },
        publishedAt,
        excerpt
      },
      postsPerPage,
      showAuthor,
      showDate
    }
  },
  isIndexed,
  metaTitle,
  metaDescription,
  keywords,
  'posts': *[_type == "post"][]{
  'id': _id,
  title,
  excerpt,
  'postImage': mainImage{
    asset->{
      url
    }
  },
  'createAt': _createdAt,
},
  previewDescription,
  previewTitle,
  'openGraphImageUrl': openGraphImage{
    asset->{
      url
    }
  }
}`);

// Destructure metadata from fetched blog page
const {
  slug,
  content,
  metaTitle,
  metaDescription, 
  keywords,
  previewTitle,
  previewDescription,
  openGraphImageUrl,
  posts
} = blogPage[0] as BlogPage;


const { content: pageContent } = content[0];

/**
 * Metadata configuration for the blog page
 */
export const metadata = {
    title: `${metaTitle} | deckardtyler`,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
        title: `${previewTitle} | deckardtyler`,
        description: previewDescription,
        images: [
            {
                url: openGraphImageUrl?.asset?.url,
                width: 1200,
                height: 630,
                alt: 'deckardtyler blog'
            }
        ]
    }
};

/**
 * BlogPage component that renders the main blog listing page
 * Displays featured posts and a grid of all blog posts
 * @returns {ReactElement} The rendered blog page
 */
export default function BlogPage(): ReactElement {
    const { title, description, subtitle, showDate, showAuthor, postsPerPage, featuredPosts, headerImage } = pageContent[0];

    return (
        <Container>
            <>
                <Breadcrumb title={metaTitle} link={slug} />
                {/* Header Section */}
                <div className='w-full flex flex-start flex-col space-y-4 my-8'>
                    <Text size={'heading'}>{title}<span className="text-red font-bold !text-5xl">.</span></Text>
                    <Text size={'xl'}>{subtitle}</Text>
                    <HeaderBanner imageAsset={headerImage.asset} />
                    <PortableText value={description} components={PortableTextComponent} />
                </div>

                {/* Featured Posts Section */}
                <div className="w-full flex items-start justify-start mt-16 mb-8">
                    <Text size={'heading'} className="!text-left">Featured.</Text>
                </div>
                <div className="w-full min-h-[450px] flex flex-col md:flex-row space-x-4">
                    {/* Main Featured Post */}
                    <div className="w-full md:w-8/12 flex flex-col">
                        <Link href={'/blog/'+featuredPosts[0].slug.current}>
                            <div className="w-full h-[400px] md:h-[500px] bg-cover bg-center relative group cursor-pointer" style={{ backgroundImage: `url(${featuredPosts[0]?.mainImage?.asset?.url})` }}>
                                <div className="absolute bottom-0 left-0 h-full right-0 bg-background/70 group-hover:bg-background/80 p-6 pt-24 transition-opacity">
                                    {showDate && <Text size="lg" className="text-white mb-2">January 15, 2024</Text>}
                                    <Text className="text-white font-semibold mb-2 text-3xl">{featuredPosts[0].title}</Text>
                                    <Text size="body" className="text-white/90 line-clamp-2">{featuredPosts[0].excerpt}
                                    </Text>
                                </div>
                                {showAuthor && <div className="absolute bottom-6 right-6 flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                    <Text size="lg" className="text-white">John Smith</Text>
                                </div>}
                            </div>
                        </Link>
                            
                    </div>
                    {/* Secondary Featured Posts */}
                    <div className="w-full md:w-4/12 flex flex-row md:flex-col gap-2">
                        {featuredPosts.map((item: FeaturedPost, index: number) => (
                            <Link href={'/blog/'+item.slug.current} key={index}>
                                <div className="w-1/3 md:w-full h-24 md:h-[160px] bg-cover bg-center relative group"
                                    style={{ backgroundImage: `url(${item?.mainImage?.asset?.url})` }}>
                                    <div className="absolute bottom-0 left-0 h-full right-0 bg-background/70 group-hover:bg-background/80 p-3 pt-8 transition-opacity">
                                        <Text size="sm" className="text-white font-medium line-clamp-2">
                                            {item.title}
                                        </Text>
                                        <Text className="text-white/90 line-clamp-2 text-[12px]">
                                            {item.excerpt}
                                        </Text>
                                    </div>
                                    {showAuthor && <div className="absolute bottom-6 right-6 flex items-center space-x-2 cursor-pointer">
                                        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                        <Text className="text-white text-[12px]">John Smith</Text>
                                    </div>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* All Blog Posts Grid Section */}
                <div className="w-full flex items-start justify-start mt-16 mb-8">
                    <Text size={'heading'} className="!text-left">Discover all.</Text>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-6">
                    {posts.map(({id, title, excerpt, createAt, slug, postImage}: BlogPost) => (
                        <Link href={`/blog/${slug?.current}`} key={id}>
                            <div className="flex flex-col space-y-4">
                                <div className="aspect-video w-full relative">
                                    <Image
                                        src={postImage?.asset?.url || '/placeholder.jpg'} 
                                        alt={title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Text size="md" className="!text-gray-400">{new Date(createAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</Text>
                                    <Text size="lg" className="text-lg">
                                        {title}
                                    </Text>
                                    <Text size="body" className="font-light line-clamp-2">
                                        {excerpt ?? ""}
                                    </Text>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        </Container>
    )
}