import * as React from "react"
import { SVGProps, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface DtylIconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    isAnimated?: boolean;
}

const DtylIcon = ({ size, isAnimated = false, ...props }: DtylIconProps) => {
    const sizeValue = size ? `${size}px` : '1em';
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!isAnimated) return;

        const interval = setInterval(() => {
            setIsAnimating(prev => !prev);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAnimated]);

    const centerX = 827.65;
    const centerY = 430.799;
    const radius = 90;

    const variants = {
        initial: (index: number) => ({
            x: 0,
            y: 0,
            rotate: 0,
        }),
        animate: (index: number) => ({
            x: Math.cos(index * Math.PI / 2) * radius,
            y: Math.sin(index * Math.PI / 2) * radius,
            rotate: index * 90,
            transition: { duration: 1, ease: "easeInOut" }
        })
    };

    return (
        <svg
            width={sizeValue}
            height={sizeValue}
            viewBox="698.713 301.862 257.874 257.874"
            fill="none"
            {...props}
        >
            {[
                { fill: "#F7F7F8", x: 703.713, y: 306.862 },
                { fill: "#BDBFC1", x: 831.65, y: 306.862 },
                { fill: "#373435", x: 831.65, y: 434.799 },
                { fill: "#f00000", x: 703.713, y: 434.799 }
            ].map((rect, index) => (
                <motion.rect
                    key={index}
                    width="120"
                    height="120"
                    fill={rect.fill}
                    stroke="none"
                    strokeOpacity={0}
                    initial="initial"
                    animate={isAnimated ? (isAnimating ? "animate" : "initial") : "initial"}
                    variants={variants}
                    custom={index}
                    x={rect.x}
                    y={rect.y}
                    style={{
                        transformOrigin: `${centerX}px ${centerY}px`,
                    }}
                />
            ))}
        </svg>
    )
}

export default DtylIcon
