import { createClient } from "@supabase/supabase-js";

// -----------------------------------------------------------------------------
// Supabase Client (variables are stored as secrets in Cloudflare Worker -- see README)
// -----------------------------------------------------------------------------

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

// Get table name based on environment. Only use this for public.* tables
export function t(tableName) {
	if(ENVIRONMENT !== "prd")
		return `${tableName}_stg`;
	return tableName;
}

// MD5 hash (source: https://stackoverflow.com/a/64795218)
export async function hash(message) {
	const msgUint8 = new TextEncoder().encode(message) // encode as (utf-8) Uint8Array
	const hashBuffer = await crypto.subtle.digest("MD5", msgUint8) // hash the message
	const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string  

	return hashHex;
}
