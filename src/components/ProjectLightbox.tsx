"use client";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoPresentation } from "./ui/video-presentation";

function ProjectLightbox({
  projectImages,
  projectPresentations,
}: {
  projectImages: any[];
  projectPresentations?: any[];
}) {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <div className="w-full flex space-x-8 justify-start items-start py-4">
        <Tabs defaultValue="gallery">
          <TabsList>
            <TabsTrigger value="gallery">Project Gallery</TabsTrigger>
            <TabsTrigger value="video">Video Presentation</TabsTrigger>
          </TabsList>
          <TabsContent value="gallery">
            <div
              className="columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4 mt-12 scroll-mt-56"
              id="project-gallery"
            >
              {projectImages &&
                projectImages.map(
                  (
                    item: { src: string; width: number; height: number },
                    index: number
                  ) => (
                    <Image
                      src={item?.src}
                      width={item?.width}
                      height={item?.height}
                      alt={"img"}
                      className="w-full shadow cursor-pointer"
                      key={index}
                      onClick={() => setIndex(index)}
                    />
                  )
                )}
            </div>
          </TabsContent>
          <TabsContent value="video">
            {projectPresentations &&
              projectPresentations.map((item) => (
                <VideoPresentation
                  videoSrc={item?.embedUrl}
                  thumbnailSrc={item.displayImage}
                />
              ))}
          </TabsContent>
        </Tabs>
      </div>
      <Lightbox
        slides={projectImages}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        plugins={[Counter]}
        counter={{ container: { style: { top: 0, bottom: "unset" } } }}
      />
    </>
  );
}

export default ProjectLightbox;
