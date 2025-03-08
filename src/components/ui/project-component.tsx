'use client'
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Text } from "./text";
import Link from "next/link";
import AppButton from "./app-button";
import { useState } from "react";

/**
 * ProjectProps interface defines the properties for the Project component.
 * @param {('normal' | 'large' | 'small')} size - The size of the project.
 * @param {boolean} isLeft - Indicates if the project is on the left side.
 * @param {string} imageUrl - The URL of the project image.
 * @param {boolean} [isStat] - Optional. Indicates if the project is a statistic.
 * @param {string} [statNumber] - Optional. The number to display if the project is a statistic.
 * @param {string} [statHeadline] - Optional. The headline to display alongside the statistic.
 * @param {string} [title] - Optional. The title of the project.
 * @param {string} [location] - Optional. The location associated with the project.
 * @param {string} [slug] - Optional. The slug for the project URL.
 */
interface ProjectProps {
    id: string;
    title: string;
    description: any; // Adjust type as necessary based on the structure of the description
    slug: {
        current: string;
    };
    size: 'normal' | 'large' | 'small';
    clients: string;
    date: string;
    status: string;
    location: string;
    isLeft: boolean;
    isStat: boolean;
    statNumber?: string;
    statHeadline?: string;
    displayImage: {
        asset: {
            url: string;
        };
    };
    projectGallery: Array<{
        asset: {
            url: string;
        };
    }>;
}

type ProjectItem = {
    projectItems?: ProjectProps[];
};

/**
 * Project component displays a project with an image and optional statistic.
 * @param {ProjectProps} props - The properties for the Project component.
 * @returns {React.ReactElement} The Project component.
 */
const ProjectComponent: React.FC<ProjectItem> = ({projectItems }) => {
    const [loading, setLoading] = useState(false);
    const isStats = projectItems?.map(item => item.isStat);
    const filteredProjectItems = projectItems?.filter(item => !item.isStat);
    const sizes = filteredProjectItems?.map(item => item.size);
    // const position = filteredProjectItems.map(item => item.size);

    const initialOffset = 0;
    const loadBy = 10;
    const [offset, setOffset] = useState(10);

    const [loadedProjects, setLoadedProjects] = useState(filteredProjectItems?.slice(initialOffset, offset) || []);
    const [isMore, setIsMore] = useState(filteredProjectItems!?.length > offset);

    const loadMore = () => {
        setLoading(true);
        setTimeout(() => {
            const newOffset = offset + loadBy;
            setOffset(newOffset);
            setLoadedProjects(filteredProjectItems?.slice(initialOffset, newOffset) || []);
            setIsMore(filteredProjectItems!?.length > newOffset);
            setLoading(false);
        }, 2000);
    };

    console.log({projectItems})
    const isMobile = useMediaQuery('(max-width: 768px)');

    const getWidth = (index:number) => isMobile ? 'w-full' : (sizes && sizes[index] === 'large' ? 'w-[70%]' : sizes && sizes[index] === 'normal' ? (isStats && isStats[index] ? 'w-[47.5%]' : 'w-[47.5%]') : 'w-[25%]');
    const getHeight = (index:number) => (sizes && sizes[index] === 'large' || sizes && sizes[index] === 'normal') ? 'h-[520px]' : 'h-[400px]';
    const getOrder = (position: boolean) => position ? 'order-first' : 'order-last';


    function renderProject(){
        return loadedProjects?.map((item: ProjectProps, index:number) => (
            <Link href={`/projects/${item.slug.current}`} className={`${getWidth(index)} ${getOrder(item.isLeft)} transition-all`} key={item.id}>
                <div className={`w-full ${getHeight(index)} bg-gray-200 mb-4`}>
                    <img src={item.displayImage?.asset?.url} alt="project-image" className="w-full h-full object-cover grayscale-100" />
                </div>
                <Text>{item.title}</Text>
                <Text size={'sm'} className='!text-gray-400 '>Location: {item.location}</Text>
            </Link>
            )
        )
    }

    return (
        <div className="flex flex-col">
            <div className={`flex flex-wrap w-full mb-6 mt-24`}>
                <div className={`flex flex-wrap gap-4`}>
                    {renderProject()}
                </div>
            </div>
        {/* Pagination */}
            <div className="flex justify-center my-16 space-x-16 items-center">
                {isMore && <AppButton title={"Load more"} onClick={loadMore} loading={loading} />}
            </div>
        </div>

    );
};

export default ProjectComponent;