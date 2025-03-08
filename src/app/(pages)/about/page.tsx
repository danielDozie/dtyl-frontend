import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/sections/Container";
import { Text } from "@/components/ui/text";

import { client, urlFor } from "@/lib/utils/sanity-client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { PortableText } from "@portabletext/react";
import PortableTextComponent from "@/components/PortableTextComponent";
import { SanityDocument } from "@sanity/client";
import TeamSection from "@/components/sections/home/TeamSection";
import HeaderBanner from "../../../components/HeaderBanner";
import { TeamMemberBio } from "@/components/sections/about/TeamBio";

// Fetch about page data
const aboutPage = await client.fetch<
  SanityDocument[]
>(`*[_type == "page" && title == "About"]{
  slug,
  content,
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
  },
'teams': *[_type == "page" && title == 'Home']{
  content[]{
  'teamContent': content[]{
      'team': section4{
      description,
      sectionTitle,
      'teamMembers': *[_type == "teamMember"][]{
  'id': _id,
  name,
  bio,
  position,
  slug,
  category,
image{
  asset->{
    url
  }
  }
        }
}
  }
}
}
}`);

// Destructure metadata from fetched about page
const {
  slug,
  content,
  metaTitle,
  metaDescription,
  keywords,
  previewTitle,
  previewDescription,
  openGraphImageUrl,
  teams
} = aboutPage[0];

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
        alt: "deckardtyler about us",
      },
    ],
  },
};

const aboutContent = pageContent[0];
  const teamSection = teams[0].content[1].teamContent[0].team;

const AboutPage: React.FC = () => {
  const {
    title,
    paragraphText,
    paragraphHeading,
    paragraphImage,
    paragraphButton,
    SecondparagraphText,
    features,
    contentBlocks,
  } = aboutContent;

  return (
    <Container>
      <>
        <Breadcrumb title={metaTitle} link={slug} />
        <div className='w-full flex flex-start flex-col space-y-4 my-8'>
            <Text size={'heading'}>{title}<span className="text-red font-bold !text-5xl">.</span></Text>
            <HeaderBanner imageAsset={urlFor(paragraphImage).url()} />
            <PortableText value={paragraphHeading} components={PortableTextComponent} />
            <PortableText value={paragraphText} components={PortableTextComponent} />
        </div>

        <div className="mt-24 mb-16">
          <BentoGrid className="flex flex-col md:flex-row space-y-6 md:space-y-0">
            {features.map((feature: any) => (
              <BentoCard
                key={feature._key}
                className={feature.className ?? ""}
                name={feature.title}
                description={feature.text}
                icon={feature.icon}
                {...features}
              />
            ))}
          </BentoGrid>
        </div>
        {/* Our team */}
        {/* Edit this item from the homepage as the component was recently moved from the home and changes haven't been effected from the backend */}
        <TeamSection teamData={teamSection} />


      </>
    </Container>
  );
};

export default AboutPage;

type Feature = {
  Icon: React.FC;
  name: string;
  description: string;
  href: string;
  cta: string;
  className?: string;
};
