import React from "react";
import Container from "./sections/Container";
import Divider from "./Divider";
import Logo from "./Logo";
import AppButton from "./ui/app-button";
import { Text } from "./ui/text";
import { Mail } from "lucide-react";
import Navigation from "./Navigation";
import Image from "next/image";
import { FaMobile } from "react-icons/fa";

import edgeImage from "@/assets/images/edge-logo.png";
import gbcnImage from "@/assets/images/gbcn-logo.png";
import pmpImage from "@/assets/images/pmp.png";
import acaImage from "@/assets/images/acaLogo.png";
import TermsAndLegal from "./sections/general/terms-and-legal";
import Link from "next/link";
import { RiInstagramFill, RiTwitterXFill } from "react-icons/ri";
import { MdOutlineFacebook } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaEnvelopesBulk } from "react-icons/fa6";
import { HiMiniCheckBadge } from "react-icons/hi2";
import CustomPopover from "./ui/popover";
import NewsletterSubscription from "./NewsletterSubscription";

export default function Footer({ menuItems }: { menuItems: any[] }) {
  return (
    <footer className="relative w-full md:px-8">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: 'url("")',
        }}
      />
      <div className="relative z-10">
        <Divider title="Start a project" />
        <Container>
          <div className="flex flex-col md:flex-row w-full justify-between">
            <div className="w-full md:w-[20%] mt-8 md:mt-0">
              <h4 className="text-lg font-medium mb-3">Locate us</h4>
              <Link href="https://www.google.com/maps?q=8.995690,7.47689" target="_blank">
              <Text className="hover:!text-red">
                  <strong>304 MIDEL CENTER</strong> <br/>Plot 14 off Oladipo Diya Way Sector Center D
                  <br/>Gudu District.<br/>ABUJA 900110.
              </Text>
              </Link>
              <Link href="https://www.google.com/maps?q=4.80030,7.00338" target="_blank">
              <Text className="py-2 hover:!text-red">
                  <strong>PYALE WORKHUB</strong> <br/>No 21 Bekwere Wosu Street <br/>D-line, Diobu. <br/>PORT
                  HARCOURT 500261.
              </Text>
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <span className="flex items-center space-x-1">
                  <FaMobile />
                  <Link href="tel:+2348057213245">
                    <Text className="hover:!text-red">+234 80 5721 3245</Text>
                  </Link>
                </span>
                <span className="flex items-center space-x-1">
                  <FaMobile />
                  <Link href="tel:+2349092923495">
                    <Text className="hover:!text-red">+234 90 9292 3495</Text>
                  </Link>
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <NewsletterSubscription />
            <div className="w-full md:w-[40%] space-y-6 mt-12 md:mt-0">
              <Logo isAnimated={false} />
              <Text className="">
              Our team brings together a diversity of skills, technical expertise, and experience to ensure an informed, methodical, and effective delivery of projects, regardless of scale, complexity, or type. This intentionally inclusive approach with sustainability in constant view, puts people, planet, and profit at the center.{" "}
              </Text>
              {/* <AppButton title='Contact us' /> */}
              <div className="flex space-x-2">
               <Text className="font-semibold text-xl md:text-base">Certification + Memberships</Text>
               <HiMiniCheckBadge size={24} className="text-gray-400" />
              </div>

              <div className="flex gap-x-6 items-center">
                {certifiedIcons.map((item, index: number) => <div className="w-auto rounded-full flex flex-col group items-center justify-center relative" key={index}>
                  <CustomPopover content={item.name} trigger="hover">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={65}
                    height={65}
                    className="transition-all duration-300 filter grayscale hover:grayscale-0"
                  />
                  </CustomPopover>
                </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center md:justify-between mt-8 md:mt-16 md-2 md:mb-4">
            <div className="relative w-full hidden md:flex">
              <Navigation menuItems={menuItems} />
            </div>
            <div className="flex space-x-4 mt-12 md:mt-0">
              {socialMenu.map((item, index) =>  <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                {item.icon}
              </Link>)}
            </div>
          </div>
        </Container>
        <div className="w-full flex justify-between border-b border-foreground dark:border-foreground" />
        <div className="flex flex-row p-8 justify-center md:justify-between ">
          <span>
            <Text size={"sm"}>
              <span className="text-red">deckard</span><strong>tyler</strong> Limited. &copy; {new Date().getFullYear()}.
            </Text>
          </span>
          <div className="hidden md:flex">
            <TermsAndLegal />
          </div>
        </div>
      </div>
    </footer>
  );
}



const certifiedIcons = [
  {icon: edgeImage, name: 'EDGE Buildings'},
  {icon: gbcnImage, name: 'Green Building Council Nigeria'},
  {icon: pmpImage, name: 'Project Management Professional'},
  {icon: acaImage, name: 'Association of Consulting Architects'}
]

const socialMenu = [
  {icon: <RiInstagramFill className="w-6 h-6" />, name: 'Instagram', link: 'https://www.linkedin.com/company/1618466/'},
  {icon: <MdOutlineFacebook className="w-6 h-6" />, name: 'Facebook', link: 'https://www.facebook.com/Deckard-Tyler-125703474162694/'},
  {icon: <RiTwitterXFill  className="w-6 h-6"/>, name: 'X', link: 'https://twitter.com/DeckardTylerLim'},
  {icon: <IoLogoLinkedin  className="w-6 h-6"/>, name: 'Linkedin', link: 'https://www.linkedin.com/company/1618466/'}
]