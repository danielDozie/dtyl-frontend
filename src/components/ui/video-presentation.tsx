import {HeroVideoDialog} from "@/components/ui/hero-video-dialog";
import { urlFor } from "@/lib/utils/sanity-client";

export function VideoPresentation({videoSrc, thumbnailSrc}: { videoSrc?: string, thumbnailSrc?: string}) {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="block"
        animationStyle="fade"
        videoSrc={videoSrc!}
        thumbnailSrc={urlFor(thumbnailSrc!).url()}
    />
    </div>
  );
}
