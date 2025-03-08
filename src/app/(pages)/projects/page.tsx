import { ReactElement } from "react";
import { Text } from "@/components/ui/text";
import Breadcrumb from "@/components/Breadcrumb";
import Divider from "@/components/Divider";
import Container from "@/components/sections/Container";
import ProjectComponent from "@/components/ui/project-component";
import { client } from "@/lib/utils/sanity-client";
import { SanityDocument } from "@sanity/client";

// Define metadata for the page
export const metadata = {
    title: `Projects | deckardtyler`,
    description: 'Explore our projects and their impact on various industries.',
    keywords: 'projects, portfolio, deckardtyler',
    openGraph: {
        title: 'Our Projects | deckardtyler',
        description: 'Discover the innovative projects we have worked on.',
        // images: [
        //     {
        //         url: 'https://example.com/default-image.jpg', // Replace with a default image URL if necessary
        //         width: 1200,
        //         height: 630,
        //         alt: 'deckardtyler projects'
        //     }
        // ]
    }
}


// type ProjectItem = {
//     id: string;
//     title: string;
//     description: any; // Adjust type as necessary based on the structure of the description
//     slug: {
//         current: string;
//     };
//     size: 'normal' | 'large' | 'small';
//     clients: string;
//     date: string;
//     status: string;
//     location: string;
//     isLeft: boolean;
//     isStat: boolean;
//     statNumber?: string;
//     statHeadline?: string;
//     displayImage: {
//         asset: {
//             url: string;
//         };
//     };
//     projectGallery: Array<{
//         asset: {
//             url: string;
//         };
//     }>;
// };

async function fetchProject(){
    const query = `*[_type == "project"] | order(date desc){
        'id': _id,
        title,
        description,
        slug{
          current
        },
        size,
        clients,
        date,
        status,
        location,
        isLeft,
        isStat,
        statNumber,
        statHeadline,
        displayImage{
          asset->{
            url
          }
        },
        projectGallery[]{
          asset->
        }
    }`;

    const projectItems = await client.fetch<SanityDocument[]>(query);
    //filter to remove project that are stats
    // const filteredProjectItems = projectItems.filter(item => !item.isStat);
    return {
        projectItems,
    };
}


export default async function ProjectPage(): Promise<ReactElement> {
     const {projectItems} = await fetchProject(); 

    return (
        <Container>
            <>
                <Breadcrumb title={'Projects'} link={'/projects'} />
                <div className='w-full flex flex-start flex-col space-y-4 my-8'>
                    <Text size={'heading'} className="text-red">Projects<span className="text-red font-bold !text-5xl">.</span></Text>
                    <Text size={'xl'}>Explore Our Portfolio of Innovative Projects</Text>
                    <Text size={'body'}>Discover our diverse collection of architectural and development projects that showcase our commitment to excellence and sustainable design. From urban planning to architectural innovation, each project reflects our dedication to creating solutions that harmonize functionality, aesthetics, and environmental responsibility. Browse through our carefully curated portfolio to see how we transform visions into reality while prioritizing sustainable solutions and lasting impact.</Text>
                </div>
                <Divider />

                <ProjectComponent 
                    projectItems={projectItems as []}
                />
            </>
        </Container>
    )
}