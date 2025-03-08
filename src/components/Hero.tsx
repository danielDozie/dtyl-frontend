'use client'
import { Minus } from "lucide-react";
import AppButton from "./ui/app-button";
import { Text } from "./ui/text";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {useRouter} from 'next/navigation'
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import BlurFade from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import IconComponent from "@/components/Icon";
import { urlFor } from "@/lib/utils/sanity-client";

const ShinyText = ({ text }: { text: string }) => {
    return (
        <div className="items-center justify-center">
            <AnimatedShinyText className="flex">
                <span>{text}</span>
            </AnimatedShinyText>
        </div>
    );
};

const Hero = ({heroContent}: {heroContent: any[]}) => {

    const {cta, hasSocialIcons, socialIcons, heading, heroImage, title, yearEstablished} = heroContent[0];
    
    const isMobile = useMediaQuery('(max-width: 768px)');
    const router = useRouter();
    return (
        <section className={`flex items-center justify-items-center min-h-[450px] px-4 md:px-8 mb-20 md:mt-20 md:mb-40 ${isMobile ? 'flex-col' : ''}`}>
            <div className={`w-full flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between`}>
            <span className="flex justify-center mt-8 md:hidden">{ShinyText({ text: yearEstablished })}</span>
                <div className={`${isMobile ? 'relative' : 'absolute'} -z-5 mt-8 md:mt-32 left-0 right-0`}>
                    <BlurFade delay={1} inView blur='0px' className="w-full h-full">
                        <Image
                            src={urlFor(heroImage.asset).url()}
                            height={heroImage?.asset?.metadata?.dimensions?.height || 1920}
                            width={heroImage?.asset?.metadata?.dimensions?.width || 1080}
                            alt="hero"
                            className="max-h-[500px] object-cover mx-auto object-center z-10"
                        />
                    </BlurFade>
                </div>
                <div className={`${isMobile ? 'w-full' : 'w-1/2'} justify-start items-start z-20`}>
                    <span className="hidden justify-end md:flex">{ShinyText({ text: yearEstablished })}</span>
                    <span className={`flex flex-col space-y-3 ${isMobile && 'mt-8'}`}>
                        {heading.map((text: string, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 * (index + 1) }}
                            >
                                <Text weight={'bold'} className={`${isMobile ? 'text-5xl text-center mt-1' : 'text-8xl'}`}>{text}</Text>
                            </motion.div>
                        ))}
                   </span>
                </div>
                <div className={`${isMobile ? 'w-full mt-8' : 'w-1/2'}`}>
                    <div className={`flex w-full flex-col ${isMobile ? 'items-center' : 'items-end'}`}>
                        <AppButton title={cta.text} onClick={() => router.push(cta.link)} />
                        <div className="hidden md:flex space-x-4 mt-8">
                            {/* {hasSocialIcons && (
                                <>
                                    {socialIcons.map((icon: any, index: number) => (
                                        <BlurFade key={index} delay={1 + (index * 0.2)} inView>
                                            <a href={icon.link} className="text-foreground hover:text-primary transition-colors">
                                               <IconComponent name={icon.icon} className="w-6 h-6" />
                                            </a>
                                        </BlurFade>
                                    ))}
                                    
                                </>
                            )} */}
                        </div>
                   </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
