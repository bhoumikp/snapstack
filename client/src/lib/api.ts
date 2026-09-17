import type { FetchResponse } from "../types/post";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const fetchPost = async (
    url: string
): Promise<FetchResponse> => {
    const response = await fetch(`${API_URL}/fetch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({url})
    })
    return response.json();
};