import React from 'react';
import Breadcrumb from '@/components/Breadcrumb'
import Container from '@/components/sections/Container'
import { Text } from '@/components/ui/text'
import RetroGrid from '@/components/ui/retro-grid';
import PdfIcon from '@/components/ui/icons/pdfIcon';
import Divider from '@/components/Divider';

import { ResearchComponent } from '@/components/ResearchComponent';
import { client } from '@/lib/utils/sanity-client';
import { SanityDocument } from '@sanity/client';
import HeaderBanner from '@/components/HeaderBanner';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '@/components/PortableTextComponent';

// Fetch research page data
const researchPage = await client.fetch<SanityDocument[]>(`*[_type == "page" && title == "Research"]{
  slug,
  content[]{
    content[]{
        title,
        subtitle, 
        description,
        headerImage, 
        researchDocument[]->{
          downloadUrl,
          description,
          title,
        }
    }
    },
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

// Destructure metadata from fetched research page
const {
  slug,
  content,
  metaTitle,
  metaDescription,
  keywords,
  previewTitle,
  previewDescription,
  openGraphImageUrl
} = researchPage[0];

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
                alt: 'deckardtyler research'
            }
        ]
    }
};



const ResearchPage: React.FC = () => {

    const {title, subtitle, description, headerImage, researchDocument} = pageContent[0];

    return (
        <Container>
            <>
                <Breadcrumb title={title} link={slug} />
                <div className='w-full flex flex-start flex-col space-y-4 my-8'>
                    <Text size={'heading'}>{title}<span className="text-red font-bold !text-5xl">.</span></Text>
                    <Text size={'xl'}>{subtitle}</Text>
                    <HeaderBanner imageAsset={headerImage.asset} />
                    <PortableText value={description} components={PortableTextComponent} />
                </div>
                <Divider />
                <ResearchComponent researchItems={researchDocument}/>
            </>
        </Container>
    )
}

export default ResearchPage;
