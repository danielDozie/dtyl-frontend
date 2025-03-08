import Hero from "@/components/Hero";
import BlogSection from "@/components/sections/home/BlogSection";
import FirstSection from "@/components/sections/home/FirstSection";
import ProjectSection from "@/components/sections/home/ProjectSection";
import IndustryServedSection from "@/components/sections/home/IndustryServedSection";
import TeamSection from "@/components/sections/home/TeamSection";
import { ReactElement } from "react";


import { client } from '@/lib/utils/sanity-client';
import { SanityDocument } from "@sanity/client";

// Fetch home page data from Sanity CMS
const homePage = await client.fetch<SanityDocument[]>(`*[_type == "page" && title == 'Home']{
  title,
  slug,
  content[]{
    'heroSection': content[]{
      title,
      yearEstablished,
      heading[],
      socialIcons[],
      hasSocialIcons,
      cta{
        link,
        text
      },
      heroImage,
    },
  'sections': content[]{
      section,
      section2,
      section3{
        bottomText,
        sectionTitle,
        featuredProjects[]->{
        'id': _id,
        title,
        slug{
          current
        },
        location,
        isLeft,
        isStat,
        size,
        statNumber,
        statHeadline,
        displayImage{
          asset->{
            url
            }
          }
        },
        button{
          link,
          text
        }
      },
      section4{
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
      },
      section5{
        sectionTitle,
        button,
        featuredPosts[]->{
          "id": _id,
          title,
          excerpt,
          slug{
            current
          },
          'createdAt': _createdAt,
          'image': mainImage{
            asset->{
              url
            }
          }
        }
      },
      title
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

// Destructure relevant data from the fetched home page
const {
  slug,
  content,
  metaTitle,
  metaDescription,
  keywords,
  openGraphImageUrl,
  previewTitle,
  previewDescription,
} = homePage[0];



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
        alt: 'deckardtyler.com'
      }
    ]
  }
};


export default function Home(): ReactElement {

  //hero section content
  const { heroSection } = content[0];
  //other sections
  const { sections } = content[1];

  //desctructure the sections for each component
  const {
    section: firstSection,
    section2: industrySection,
    section3: projectSection,
    section4: teamSection,
    section5: blogSection
  } = sections[0];

  return (
    <>
      <Hero heroContent={heroSection} />
      <FirstSection firstSectionContent={firstSection} />
      <IndustryServedSection industryServedItem={industrySection} />
      <ProjectSection projectSectionItem={projectSection}/>
      <BlogSection blogSectionContent={blogSection} />
    </>
  );
}
