import axios, { type AxiosInstance } from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

export interface InstagramSession {
    client: AxiosInstance;
    jar: CookieJar;
    csrfToken: string;
}

export const createInstagramSession = async (): Promise<InstagramSession> => {
    const jar = new CookieJar();

    const client = wrapper(
        axios.create({
            jar,
        })
    );

    await client.get('https://www.instagram.com/');

    const cookies = await jar.getCookies(
        'https://www.instagram.com/'
    );

    const csrfCookie = cookies.find(
        (cookie) => cookie.key === 'csrftoken'
    );

    if (!csrfCookie?.value) {
        throw new Error('Instagram CSRF token was not found');
    }

    return {
        client,
        jar,
        csrfToken: csrfCookie.value,
    };
};