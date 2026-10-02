import type { MediaItem } from "../types/post"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

type MediaUrlType = {mediaUrl: string};

const extractImgMediaUrls = (media: MediaItem[]) : MediaUrlType[] => {
    let mediaUrls : MediaUrlType[] = [];

    media.forEach((item) => {
        if(item.type === 'image') {
            const urlItem = {mediaUrl: item.mediaUrl};
            mediaUrls.push(urlItem) ;
        }
    });

    return mediaUrls;
}

export const downloadCarouselPDF = async (shortcode: string, media: MediaItem[], onDownloading: (downloading: boolean) => void) => {
    try {
        onDownloading(true);
        const payload = extractImgMediaUrls(media);
        const response = await fetch(`${API_URL}/pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },  
            body: JSON.stringify({media: payload})
        })
    
        if (!response.ok) {
            throw new Error(`PDF generation failed: ${response.status}`);
        }
    
        const pdfBlob = await response.blob();
        const blobUrl = URL.createObjectURL(pdfBlob);
    
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `snapstack-${shortcode}.pdf`;
        a.target = '_blank';
        a.click();
    
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } finally {
        onDownloading(false);
    }
}

