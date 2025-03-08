import React, { ReactElement } from 'react';
import Breadcrumb from '@/components/Breadcrumb'
import Container from '@/components/sections/Container'
import ClientSection from "@/components/sections/clients/ClientSection"
import Image from 'next/image';
import { client, urlFor } from '@/lib/utils/sanity-client';
import { SanityDocument } from '@sanity/client';

// Fetch clients page data
const clientsPage = await client.fetch<SanityDocument[]>(`*[_type == "page" && title == "Clients"]{
  slug,
  content,
  'clientsData': *[_type == 'client'],
  isIndexed,
  metaTitle,
  metaDescription,
  keywords,
  previewDescription,
  previewTitle,
  'openGraphImageUrl': openGraphImage{
    asset->{
      url
    }
  }
}`);

// Destructure metadata from fetched clients page
const {
  slug,
  content,
  clientsData,
  metaTitle,
  metaDescription,
  keywords,
  previewTitle,
  previewDescription,
  openGraphImageUrl
} = clientsPage[0];

const { content: pageContent } = content[0];

// Define metadata for the page
export const metadata = {
    title: `${metaTitle} | deckardtyler`,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
        title: `${previewTitle} | deckardtyler`,
        description: previewDescription,
        images: [
            {
                url: openGraphImageUrl.asset.url,
                width: 1200,
                height: 630,
                alt: 'deckardtyler clients'
            }
        ]
    }
};


export default function ClientPage(): ReactElement{
    const { title, subtitle, headerImage, description } = pageContent[0];
    
    return (
        <Container>
            <>
                <Breadcrumb title={metaTitle} link={slug} />
                <ClientSection 
                  title={title} 
                  subtitle={subtitle} 
                  description={description}
                  headerImage={headerImage} 
                  clientsData={clientsData} 
                />
            </>
        </Container>
    )
}
