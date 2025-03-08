import React, { ReactElement } from 'react';
import Breadcrumb from '@/components/Breadcrumb'
import Container from '@/components/sections/Container'
import ServicesItemSection from '@/components/sections/services/ServicesItemSection';
import ServiceTopSection from '@/components/sections/services/ServiceTopSection';
import { client } from '@/lib/utils/sanity-client';
import { SanityDocument } from '@sanity/client';

// Fetch service page data from Sanity CMS
const servicePage = await client.fetch<SanityDocument[]>(`*[_type == "page" && title == 'Services']{
  title,
  slug,
  content[]{
    content[]{
    title,
    subtitle,
    services[]->{
      'id': _id,
      title,
      subtitle,
      description,
      slug,
      image
    },
    rotatingTextTitle,
    rotatingTexts
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

// Destructure relevant data from the fetched service page
const {
  slug,
  content,
  isIndexed,
  metaTitle,
  metaDescription,
  keywords,
  previewDescription,
  previewTitle,
  openGraphImageUrl, } = servicePage[0];

const { content: pageContent } = content[0];

// Define metadata for the page
export const metadata = {
  title: `${metaTitle} | deckardtyler`,
  description: `${metaDescription}`,
  keywords: `${keywords}`,
  openGraph: {
    title: `${previewTitle} | deckardtyler`,
    description: `${previewDescription}`,
    images: [
      {
        url: `${openGraphImageUrl.asset.url}`,
        width: 1200,
        height: 630,
        alt: 'deckardtyler services'
      }
    ]
  }
};

const serviceContent = pageContent[0];

// Define the ServicesPage component
export default function ServicesPage(): ReactElement{
  
  const { services, rotatingTextTitle, rotatingTexts, subtitle, title } = serviceContent;

    return (
        <Container>
            <>
            <Breadcrumb title={title} link={slug.current} />
            <ServiceTopSection services={services} title={title} subtitle={subtitle} rotatingTextTitle={rotatingTextTitle} rotatingTexts={rotatingTexts}/>
            <ServicesItemSection items={services} /> 
            </>
        </Container>
    )
}
