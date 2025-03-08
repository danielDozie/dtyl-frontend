import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Text } from "./text";
import Link from "next/link";

/**
 * ProjectProps interface defines the properties for the Project component.
 * @property {('normal' | 'large' | 'small')} size - The size of the project.
 * @property {boolean} isLeft - Indicates if the project is on the left side.
 * @property {string} imageUrl - The URL of the project image.
 * @property {boolean} [isStat] - Optional. Indicates if the project is a statistic.
 */
interface ProjectProps {
    title: string;
    slug: {
        current: string;
    };
    size: 'normal' | 'large' | 'small';
    location: string;
    isLeft: boolean;
    isStat: boolean;
    statNumber?: string;
    statHeadline?: string;
    imageUrl: string;
}

/**
 * Project component displays a project with an image and optional statistic.
 * @param {ProjectProps} props - The properties for the Project component.
 * @returns {React.ReactElement} The Project component.
 */
const ProjectComponentHome: React.FC<ProjectProps> = ({ size, isLeft, imageUrl, isStat, location, title, statHeadline, statNumber, slug }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const width = isMobile ? 'w-full' : (size === 'large' ? 'w-[70%]' : size === 'normal' ? (isStat ? 'w-[47.5%]' : 'w-[47.5%]') : 'w-[25%]');
    const height = (size === 'large' || size === 'normal') ? 'h-[520px]' : 'h-[400px]';
    const order = isLeft ? 'order-first' : 'order-last';

    if (isStat) {
        const normalWidth = 'w-[47.5%]'; // Set width to normal size
        return (
            <div className={`${normalWidth} ${order} flex flex-col items-center ${isMobile && '!w-full !py-8'}`}>
                <Text className={`relative text-[15rem] md:text-[26rem] font-bold leading-none`}>{statNumber}</Text>
                <Text className="text-center text-[2rem] md:text-[3rem] font-bold">{statHeadline}</Text>
            </div>
        );
    }

    return (
        <Link href={`/projects/${slug}`} className={`${width} ${order}`}>
            <div className={`w-full ${height} bg-gray-200 mb-4`}>
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>
            <Text>{title}</Text>
            <Text size={'sm'} className='font-light'>Location: {location}</Text>
        </Link>
    );
};


export default ProjectComponentHome;