'use client'
import React from 'react';
import { MoveRight } from "lucide-react";
import { Text } from '@/components/ui/text';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BreadCrumbProps {
  title: string;
  link: string;
  secondaryTitle?: string;
  secondaryLink?: string;
}

const Breadcrumb: React.FC<BreadCrumbProps> = ({ title, link, secondaryTitle, secondaryLink }) => {
  return (
    <div className="flex w-full justify-start space-x-4 uppercase font-light mb-8 float-start items-start">
      <Link href={'/'}>
        <Text size={'sm'}>Home</Text>
      </Link>
      <MoveRight size={18} />
      <Link href={link}>
        <Text size={'sm'}>{title}</Text>
      </Link>
      
      {secondaryTitle && secondaryLink && (
        <>
          <MoveRight size={18} />
          <Link href={secondaryLink}>
            <Text size={'sm'}>{secondaryTitle}</Text>
          </Link>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
