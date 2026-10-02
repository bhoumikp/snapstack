import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import React, { useState } from "react";
import type { PostMetadata } from "../../types/post";
import { fetchPost } from "../../lib/api";
import { ResultView } from "../preview/ResultView";

export function FetchForm () {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<PostMetadata | null>(null)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetchPost(url);

            if(!response.success) {
                return setError(response.message)
            }

            setData(response.data)
        } catch(err) {
           setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false)
        }

    }

    return (
        <div>
            <form 
                onSubmit={(e) => handleSubmit(e)}
                className="flex items-center justify-between gap-4 border px-4 sticky top-0 lg:top-5 glass z-50 bg-background"
            >
                <input 
                    type="text" 
                    placeholder="Paste Instagram Post URL"
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full py-4 outline-none"
                    disabled={loading}
                />
                <Button disabled={loading}>
                    {loading ? "Fetching" : <ArrowRight/>}
                </Button>

            </form>
            {error && (<div>{error}</div>)}
            {data && <ResultView data={data} />}
            {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
        </div>
    )
}