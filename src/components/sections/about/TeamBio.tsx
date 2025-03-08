import Icon from "@/components/Icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { Fragment } from "react";
import { PortableText } from "@portabletext/react";
import BioPortableTextComponent from "@/components/BioPortableText";

export function TeamMemberBio({ members }: { members: any[] }) {
  return members.map((member, index) => (
    <Dialog key={index}>
      <DialogTrigger asChild>
        <div className="flex flex-col group cursor-pointer">
          <div className="aspect-square bg-gray-200 relative">
            <div className="absolute bottom-5 left-3 hidden flex-col items-center z-20 space-y-2 group-hover:flex group">
              <Link
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red"
              >
                <Icon name="CiFacebook" className="h-6 w-6" />
              </Link>
              <Link
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red"
              >
                <Icon name="CiX" className="h-6 w-6" />
              </Link>
              <Link
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red"
              >
                <Icon name="CiInstagram" className="h-6 w-6" />
              </Link>
              <Link
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red"
              >
                <Icon name="CiLinkedin" className="h-6 w-6" />
              </Link>
            </div>
            <div className="w-full absolute hidden h-full top-0 bottom-0 left-0 right-0 bg-background/60 z-10 group-hover:flex"></div>
            <Image
              src={member?.image?.asset?.url}
              alt={`${member.name}`}
              width={400}
              height={400}
              className="object-contain grayscale z-0 group-hover:scale-95 transition-transform duration-200"
            />
          </div>
          <Text className="mt-2 font-light text-[18px]">{member.name}</Text>
          <Text className="font-light !text-gray-400 mt-2 text-[14px] uppercase">
            {member.position
              .split("|")
              .map((part: string, i: number, arr: string[]) => (
                <Fragment key={i}>
                  {i > 0 && <span className="text-red">|</span>}
                  {part}
                </Fragment>
              ))}
          </Text>
        </div>
      </DialogTrigger>
      <DialogOverlay className="DialogOverlay">
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{member.name}</DialogTitle>
          <DialogDescription>
          {member.position
              .split("|")
              .map((part: string, i: number, arr: string[]) => (
                <Fragment key={i}>
                  {i > 0 && <span className="text-red">|</span>}
                  {part}
                </Fragment>
              ))}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 max-h-96 overflow-auto">
          <PortableText value={member.bio} components={BioPortableTextComponent} />
        </div>
      </DialogContent>
      </DialogOverlay>
    </Dialog>
  ));
}

