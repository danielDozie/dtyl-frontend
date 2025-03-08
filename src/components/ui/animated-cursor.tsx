'use client';

import dynamic from 'next/dynamic';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
    ssr: false,
});

export default function CustomAnimatedCursor() {
    return <AnimatedCursor
        innerSize={8}
        outerSize={35}
        color='220, 38, 38'
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={1.5}
        trailingSpeed={8}
        showSystemCursor
    />;
}