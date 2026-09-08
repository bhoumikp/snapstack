import { extractPostMetadata } from './instagram.extractor.js';
import { createInstagramSession } from './instagram.session.js';

const INSTA_METADATA_URL = 'https://www.instagram.com/graphql/query/'; 

const getMetadata = async (url: string) => {
    const session = await createInstagramSession();
    const shortcode = getShortcode(url);

    const response = await session.client.post(
        INSTA_METADATA_URL,
        `variables={"shortcode":"${shortcode}"}&doc_id=24368985919464652`,
        {
            headers: {
                'X-CSRFToken': session.csrfToken,
            },
        }
    );

    const data = extractPostMetadata(response.data.data);

    return data;
};

const getShortcode = (url: string): string => {
    const parsedUrl = new URL(url);

    const parts = parsedUrl.pathname.split('/');
    const shortcode = parts[2];

    if (!shortcode) {
        throw new Error('Instagram shortcode not found');
    }

    return shortcode;
};

export const instagramProvider = {
    getMetadata,
};