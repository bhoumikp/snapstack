import { getMediaUrl } from "../../lib/media";
import type { PostMetadata } from "../../types/post";
import Button from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function CarouselView({data, currentIndex, setCurrentIndex} : {data: PostMetadata, currentIndex: number, setCurrentIndex: (index: number) => void}) {
    const media = data.media;

    const handlePrevious = (e : React.MouseEvent) => {
        e.preventDefault();
        if(currentIndex > 0)
            setCurrentIndex(--currentIndex);
    }

    const handleNext = (e : React.MouseEvent) => {
        e.preventDefault();
        if(currentIndex >= 0 && currentIndex < data.media.length - 1)
            setCurrentIndex(++currentIndex);
    }

    return (
        <div>
            {media[currentIndex].type === 'image' && (
                <img 
                    src={getMediaUrl(media[currentIndex].mediaUrl)} 
                    alt={`carousel-media-${currentIndex}`} 
                    className="rounded-md"
                />
            )}
            {media[currentIndex].type === 'video' && (
                <video 
                    controls 
                    src={getMediaUrl(media[currentIndex].mediaUrl)}
                    className="rounded-md"
                >
                </video>
            )}

            <div className="flex justify-between py-3">
                <Button
                    disabled={currentIndex <= 0}
                    onClick={(e) => handlePrevious(e)}
                >
                    <ArrowLeft />
                </Button>

                <p>{currentIndex+1}/{data.media.length}</p>

                <Button
                    disabled={currentIndex >= data.media.length - 1}
                    onClick={(e) => handleNext(e)}
                >
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}