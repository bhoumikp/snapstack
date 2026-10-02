import { useState } from "react";
import type { PostMetadata } from "../../types/post";
import { CarouselView } from "./CarouselView";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";
import { getDownloadUrl, getMediaUrl } from "../../lib/media";
import { downloadCarouselPDF } from "../../lib/pdf";

export function ResultView({data} : {data: PostMetadata}) {
    let [currentIndex, setCurrentIndex] = useState(0);
    let [isPdfDownloading, setIsPdfDownloading] = useState(false);
    const media = data.media[currentIndex];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
            <div className="flex justify-center">
                {data.type === 'image' && (
                    <img 
                        src={getMediaUrl(media.mediaUrl)} 
                        alt="preview" 
                        className="object-contain"
                    />
                )}
                {data.type === 'reel' && (
                    <video 
                        controls 
                        src={getMediaUrl(media.mediaUrl)}
                        poster={getMediaUrl(media.thumbnail)}
                    >
                    </video>
                )}
                
                {data.type === 'carousel' && 
                    <CarouselView 
                        data={data} 
                        currentIndex={currentIndex} 
                        setCurrentIndex={setCurrentIndex} 
                    />
                }
            </div>
                

            <div className="w-full space-y-4">
                <div className=" flex gap-4 overflow-x-auto md:flex-wrap md:overflow-x-hidden">
                    {data.type === 'carousel' && data.media.map((media, index) => (
                        <img 
                            key={index}
                            src={media.type === 'image' ? getMediaUrl(media.mediaUrl) : getMediaUrl(media.thumbnail)} 
                            alt="" 
                            className={cn('w-32 h-32 rounded-md cursor-pointer', currentIndex === index && 'border-3 border-primary')} 
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>

                {/* <p>{data.type}</p> */}
                {/* <p>{data.caption}</p> */}
                <p>{data.media.length} items</p>

                <div className="space-x-4">
                    <Button 
                        onClick={() => window.open(getDownloadUrl(media.mediaUrl))}
                    >
                        Download
                    </Button>

                    {data.type === 'carousel' && (
                        <Button 
                            disabled={isPdfDownloading}
                            onClick={async () => await downloadCarouselPDF(data.shortcode, data.media, setIsPdfDownloading)}
                        >
                            {isPdfDownloading ? "Downloading PDF ..." : "Download All (PDF)"}
                        </Button>
                    )}
                    
                </div>

            </div>
        </div>
    )
}