import { Text } from './ui/text'

const BioPortableTextComponent = {
    block: {
        h1: ({ children }: any) => {
            return <Text size='heading' className="!text-4xl font-bold mt-8 mb-4">{children}</Text>
        },
        h2: ({ children }: any) => {
            return <Text size='heading' className="!text-3xl font-bold mt-8 mb-4">{children}</Text>
        },
        h3: ({ children }: any) => {
            return <Text size='heading' className="!text-2xl font-bold mt-8 mb-4">{children}</Text>
        },
        normal: ({ children }: any) => {
            if (children.length === 1 && children[0] === '') {
                return <br />
            }
            return <Text size='body' className="!text-gray-400 !text-sm">{children}</Text>
        },
        blockquote: ({ children }: any) => {
            return (
                <blockquote className="border-l-4 border-red/90 pl-4 my-4 italic">
                    {children}
                </blockquote>
            )
        },
        ul: ({ children }: any) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
        ol: ({ children }: any) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
        li: ({ children }: any) => {
            return <li className="mb-1">{children}</li>
        }
    }
}

export default BioPortableTextComponent
