"use client";
import Divider from "@/components/Divider";
import React, { useState } from "react";
import Container from "../Container";
import { Text } from "@/components/ui/text";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../../components/Icon";
import { TeamMemberBio } from "../about/TeamBio";

export default function TeamSection({ teamData }: { teamData: any }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeCategory, setActiveCategory] = useState("All");

  const { sectionTitle, description, teamMembers: members } = teamData;

  const categories = [
    "All",
    ...Array.from(new Set(members.flatMap((member: any) => member.category))),
  ];

  const filteredMembers =
    activeCategory === "All"
      ? members
      : members.filter((member: { category: string[] }) => {
          return member.category.includes(activeCategory);
        });

  return (
    <>
      <Divider title={sectionTitle} />
      <Container>
        <div className="flex flex-col gap-8 mb-12">
          <div className={isMobile ? "w-full" : "w-[65%]"}>
            <Text className="text-xl font-light">{description}</Text>
          </div>

          <div className="w-full justify-between">
            <div className={`w-full ${isMobile ? "flex-col" : "flex"}`}>
              <div className={isMobile ? "w-full my-8" : "w-[15%] mr-4"}>
                <ul
                  className={`${isMobile ? "flex flex-wrap justify-evenly" : "space-y-12"} cursor-pointer text-[20px] font-light ${isMobile ? "items-center" : "justify-center items-center pt-24"}`}
                >
                  {categories.map((category: any, index: number) => (
                    <li
                      key={index}
                      className={`${activeCategory === category ? "font-bold " : ""}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      <Text
                        className={`uppercase text-[16px] ${activeCategory === category ? "font-bold !text-[20px]" : ""}`}
                      >
                        {category.replace("-", " ")}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={
                  isMobile ? "w-full grid grid-cols-2 gap-4 mt-4" : "w-[85%] grid grid-cols-3 gap-10"}>
                <TeamMemberBio members={filteredMembers} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
