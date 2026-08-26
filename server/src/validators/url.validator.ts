import { ALLOWED_PATH_PREFIXES } from "../constants/paths.js";

const ALLOWED_HOSTS = [
    "instagram.com",
    "www.instagram.com"
];

export const validateUrl = (url: string) => {
	if(!url) {
		return {
			valid: false,
			message: "URL is required"  
		}
	}
	
	let parsedUrl: URL;
	try{
		parsedUrl = new URL(url);
	} catch {
		return {
			valid: false,
			message: "Invalid URL"  
		}
	}

	if(parsedUrl.protocol !== 'https:') {
		return {
			valid: false,
			message: "Please provide a valid HTTPS URL"  
		}
	}

	if(!ALLOWED_HOSTS.includes(parsedUrl.hostname)) {
		return {
			valid: false,
			message: "Only Instagram URLs are supported."
		}
	}

	const isSupportedPath = ALLOWED_PATH_PREFIXES.some((prefix) => parsedUrl.pathname.startsWith(prefix));
	if(!isSupportedPath) {
		return {
			valid: false,
			message: "Only Instagram posts or reels URLs are supported."
		}
	}

	return {valid: true}
}