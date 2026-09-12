import 'dotenv/config'
import crypto from 'crypto';

interface MediaTokenPayload {
    mediaUrl: string;
    mediaId: string;
    expiry: number;
}

const secret = process.env.MEDIA_TOKEN_SECRET;
const EXPIRY_TIME = 60 * 60;

const safeCompare = (a:string, b:string) => {
    const buffA = Buffer.from(a, 'base64url');
    const buffB = Buffer.from(b, 'base64url');

    if(buffA.length !== buffB.length)
        return false;

    return crypto.timingSafeEqual(buffA, buffB);
}

export const createMediaToken = (mediaUrl: string, mediaId: string) => {
    if (!secret) {
        throw new Error('MEDIA_TOKEN_SECRET is not configured');
    }

    if(!mediaId) {
        throw new Error('Invalid data: mediaId');
    }

    const payload: MediaTokenPayload = {
        mediaUrl,
        mediaId,
        expiry: Math.floor(Date.now() / 1000) + EXPIRY_TIME,
    };

    const payloadJson = JSON.stringify(payload);
    const encodedPayload = Buffer.from(payloadJson).toString('base64url')

    const signature = crypto
            .createHmac('sha256', secret)
            .update(encodedPayload)
            .digest('base64url');

    return `${encodedPayload}.${signature}`
}

// console.log(createMediaToken("https://instagram.fbom35-1.fna.fbcdn.net/v/t51.71878-15/779201027_2271508066948394_5125643639194489535_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ig_cache_key=Mzk2Nzg1NzAwNDg2OTU5MzM3Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjY0MC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=vppFLNPlD2oQ7kNvwE3_5AY&_nc_oc=AdpihaMNKD_NuT2HBjtknESgj1YNmoYGK0EYmRHA2r7EXwkzbpHwI67SaZivf0hf2XE&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fbom35-1.fna&_nc_gid=-p9Jhq6de1Q7D8G48NNoDw&_nc_ss=7a22e&oh=00_AQIOkqU8ScZw51klH045oKJtY65LkVKTo0CrO04d7pnXBQ&oe=6AA8B868"))

export const verifyMediaToken = (token: string): {mediaUrl: string, mediaId: string} => {
    if (!secret) {
        throw new Error('MEDIA_TOKEN_SECRET is not configured');
    }

    if (!token) {
        throw new Error('Invalid media token');
    }

    const parts = token.split('.');

    if (parts.length !== 2) {
        throw new Error('Invalid media token');
    }

    const [encodedPayload, signature] = parts;

    const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(encodedPayload)
            .digest('base64url')

    const isValid = safeCompare(expectedSignature, signature)

    if(!isValid) {
        throw new Error('Invalid signature');
    }

    const decodedPayload = Buffer
            .from(encodedPayload, 'base64url')
            .toString('utf-8');

    let payload;
    try {
        payload = JSON.parse(decodedPayload);
    } catch {
        throw new Error("Invalid media token payload")
    }

    if (
        typeof payload.mediaId !== 'string' ||
        typeof payload.mediaUrl !== 'string' ||
        typeof payload.expiry !== 'number'
    ) {
        throw new Error('Invalid media token payload');
    }

    const {mediaUrl, mediaId, expiry} = payload;
    if(expiry<=getCurrentTime())
        throw new Error('Media token has expired')

    return {mediaUrl, mediaId};
}

// console.log(verifyMediaToken('eyJ1cmwiOiJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL3AvRGNRcU94ZXpDa2QiLCJleHBpcnkiOjE3ODkwNjIyMjV9.R9DqcSRY_COClOCsQWK-FTWz0cz0H3oq_t5vjNSXljY'))
// console.log(getCurrentTime());

function getCurrentTime() {
    return Math.floor(Date.now()/1000);
}