import { urlFor } from '@/lib/utils/sanity-client'
import Image from 'next/image'
import Link from 'next/link'
import { Text } from './ui/text'

const PortableTextComponent = {
    types: {
        image: ({ value }: any) => {
            return (
                <div className="relative w-full h-96 my-8">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Image'}
                        fill
                        className="object-contain"
                    />
                </div>
            )
        }
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
                <Link
                    href={value.href}
                    rel={rel}
                    className="underline decoration-1 hover:text-red/90 transition-colors"
                >
                    {children}
                </Link>
            )
        },
        em: ({ children }: any) => <em>{children}</em>,
        strong: ({ children }: any) => <strong>{children}</strong>,
        code: ({ children }: any) => <code className="bg-gray-100 rounded px-1 py-0.5">{children}</code>,
        underline: ({ children }: any) => <u>{children}</u>
    },
    block: {
        h1: ({ children }: any) => {
            const formattedChildren = formatDeckardTyler(children)
            return <Text size='heading' className="!text-4xl font-bold mt-8 mb-4">{formattedChildren}</Text>
        },
        h2: ({ children }: any) => {
            const formattedChildren = formatDeckardTyler(children)
            return <Text size='heading' className="!text-3xl font-bold mt-8 mb-4">{formattedChildren}</Text>
        },
        h3: ({ children }: any) => {
            const formattedChildren = formatDeckardTyler(children)
            return <Text size='heading' className="!text-2xl font-bold mt-8 mb-4">{formattedChildren}</Text>
        },
        normal: ({ children }: any) => {
            if (children.length === 1 && children[0] === '') {
                return <br />
            }
            const formattedChildren = formatDeckardTyler(children)
            return <Text size='body' className="">{formattedChildren}</Text>
        },
        blockquote: ({ children }: any) => {
            const formattedChildren = formatDeckardTyler(children)
            return (
                <blockquote className="border-l-4 border-red/90 pl-4 my-4 italic">
                    {formattedChildren}
                </blockquote>
            )
        },
        ul: ({ children }: any) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
        ol: ({ children }: any) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
        li: ({ children }: any) => {
            const formattedChildren = formatDeckardTyler(children)
            return <li className="mb-1">{formattedChildren}</li>
        }
    }
}

const formatDeckardTyler = (children: any) => {
    if (typeof children === 'string') {
        if (children.includes('deckardtyler')) {
            return children.split('deckardtyler').map((part, index, array) => {
                if (index === array.length - 1) return part;
                return (
                    <>
                        {part}
                        <>
                            <span className="!text-red">deckard</span>
                            <strong>tyler</strong>
                        </>
                    </>
                );
            });
        }
    }
    if (Array.isArray(children)) {
        return children.map((child) => {
            if (typeof child === 'string') {
                if (child.includes('deckardtyler')) {
                    return child.split('deckardtyler').map((part, index, array) => {
                        if (index === array.length - 1) return part;
                        return (
                            <>
                                {part}
                                <>
                                    <span className="!text-red">deckard</span>
                                    <strong>tyler</strong>
                                </>
                            </>
                        );
                    });
                }
            }
            return child;
        });
    }
    return children;
}

export default PortableTextComponent
