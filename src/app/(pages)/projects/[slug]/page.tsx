import Breadcrumb from "@/components/Breadcrumb";
import Divider from "@/components/Divider";
import { client } from "@/lib/utils/sanity-client";
import { SanityDocument } from "@sanity/client";
import { ReactElement } from "react";
import { Text } from "@/components/ui/text";
import Container from "@/components/sections/Container";
import { PortableText } from "@portabletext/react";
import PortableTextComponent from "@/components/PortableTextComponent";
import ProjectLightbox from "@/components/ProjectLightbox";
import { VscProject } from "react-icons/vsc";
import Link from "next/link";
import { GrNext, GrPrevious } from "react-icons/gr";



async function getProjectBySlug(slug: string) {
    const query = `*[_type == "project" && slug.current == $slug][0]{
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
        displayImage{
            asset->{
                url
            }
        },
        projectGallery[]{
            asset->
        },
        projectPresentation[]{
            embedUrl,
            displayImage
        }
    }`;
    return await client.fetch<SanityDocument>(query, { slug });
}

async function getAdjacentProjects(slug: string) {
    const query = `*[_type == "project"] | order(date desc){
        'id': _id,
        title,
        slug{
            current
        },
        date
    }`;
    const projects = await client.fetch<SanityDocument[]>(query, { slug });

    const filteredProjectItems = projects.filter(project => project.title !== null);
    //@ts-ignore
    const currentIndex = filteredProjectItems.findIndex((project) => project?.slug?.current === slug);

    const previousProject = filteredProjectItems[currentIndex - 1];
    const nextProject = filteredProjectItems[currentIndex + 1];

    return { previousProject, nextProject, currentIndex, projects };
}

// Define metadata for the page
export const metadata = {
    title: `Project | deckardtyler`,
    description: 'Explore our projects and their impact on various industries.',
    keywords: 'projects, portfolio, deckardtyler',
    openGraph: {
        title: 'Project | deckardtyler',
        description: 'Discover the innovative projects we have worked on.',
        images: [
            {
                url: 'https://example.com/default-image.jpg', // Replace with a default image URL if necessary
                width: 1200,
                height: 630,
                alt: 'deckardtyler projects'
            }
        ]
    }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> {
    const resolvedParams = await params;
    const project = await getProjectBySlug(resolvedParams.slug);
    const { previousProject, nextProject } = await getAdjacentProjects(resolvedParams.slug);

    const projectImages = project?.projectGallery.map((image: any) => ({
        src: image?.asset?.url,
        width: image?.asset?.metadata?.dimensions?.width,
        height: image?.asset?.metadata?.dimensions?.height,
    }));

    const projectPresentations = project?.projectPresentation?.map((presentation: any) => ({
        embedUrl: presentation?.embedUrl,
        displayImage: presentation?.displayImage.asset

    }));

    return (
        <Container>
            <>
                <Breadcrumb title="Projects"  secondaryTitle={project.title} secondaryLink={`/projects/${project.slug.current}`} link="/projects" />
                <div className="flex w-full justify-start mt-12">
                    <Text size={'heading'} className="leading-tight">{project.title}</Text>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className='w-full md:w-1/4 flex flex-start flex-col space-y-4 my-8'>
                        <Text size={'sm'} className="!text-lg md:!text-sm"><span className="text-red">Location:</span> <span className="text-gray-400">{project.location}</span></Text>
                        <Text size={'sm'} className="!text-lg md:!text-sm"><span className="text-red">Date:</span> <span className="text-gray-400">{project.date}</span></Text>
                        <Text size={'sm'} className="!text-lg md:!text-sm"><span className="text-red">Status:</span> <span className="text-gray-400">{project.status}</span></Text>
                        <Text size={'sm'} className="!text-lg md:!text-sm"><span className="text-red">Client:</span> <span className="text-gray-400">{project.clients}</span></Text>
                    </div>
                    <div className="flex flex-col w-full md:w-3/4 space-y-4 my-8">
                        <PortableText value={project.description} components={PortableTextComponent} />
                    </div>
                </div>
                <Divider />
                
                <ProjectLightbox 
                    projectImages={projectImages} 
                    projectPresentations={projectPresentations}
                />

                {/** Project navigation */}
                <div className="w-full justify-between flex mt-20 mb-12 items-center text-center">
                    <div className="flex items-center text-center w-[45%]">
                        {previousProject && <Link href={`/projects/${previousProject?.slug?.current}`} className="flex items-center group">
                            <GrPrevious size={20} className="group-hover:text-gray-400"/>
                            <Text size={'sm'} className="md:pl-2 group-hover:!text-red">{previousProject.title}</Text>
                        </Link>}
                    </div>
                   <div className="flex w-[10%]">
                        <Link href={'/projects'} className="flex flex-col items-center text-center group">
                            <VscProject size={30} className="group-hover:text-gray-400" /> 
                            {/* <Text size='sm' className="invisible pt-2 !font-semibold group-hover:visible transition-all">All projects</Text> */}
                        </Link>
                   </div>
                    <div className="flex w-[45%] justify-end">
                    {nextProject && <Link href={`/projects/${nextProject?.slug?.current}`} className="flex items-center group">
                        <Text size={'sm'} className="md:pr-2 group-hover:!text-red">{nextProject.title}</Text>
                        <GrNext size={20} className="group-hover:text-gray-400"/>
                    </Link>}
                    </div>

                </div>
            </>
        </Container>
    );
}
