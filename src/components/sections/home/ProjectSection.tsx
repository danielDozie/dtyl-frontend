'use client'
import Divider from '@/components/Divider'
import React from 'react'
import Container from '../Container';
import { Text } from '@/components/ui/text';
import AppButton from '@/components/ui/app-button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Link from 'next/link';
import ProjectComponentHome from '../../../components/ui/project-component-home';



/**
 * ProjectSection component displays a section of projects.
 * @returns {React.ReactElement} The ProjectSection component.
 */
export default function ProjectSection({projectSectionItem}: {projectSectionItem: any}) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const {bottomText, sectionTitle, button, featuredProjects} = projectSectionItem;
    const projectToShow = isMobile ? featuredProjects.slice(0, 5) : featuredProjects;

    const projectItems = projectToShow.map((item: any) => (
        <ProjectComponentHome 
                size={item.size} 
                isLeft={item.isLeft} 
                imageUrl={item.isStat ? "" : item.displayImage?.asset?.url} 
                isStat={item.isStat} 
                location={item.location}
                title={item.title}
                statNumber={item?.statNumber}
                statHeadline={item?.statHeadline}
                slug={item?.slug?.current}
                key={item.id}
            />
    ));

    return (
        <>
            <Divider title="Recent projects" />
            <Container>
                <div className={`${isMobile ? 'space-y-6' : ''}`}>
                    <div className={`flex flex-wrap gap-4`}>
                        {projectItems}
                    </div>
                </div>
                <div className={`flex flex-col space-y-8 my-16 justify-center items-center`}>
                    <Text className={`text-5xl font-semibold ${isMobile && 'text-4xl text-center'}`}>{bottomText}</Text>
                    <Link href={button.link}>
                        <AppButton title={button.text} />
                    </Link>
                </div>
            </Container>
        </>
    )
}
