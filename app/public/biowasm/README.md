## CORS/COEP/CORP issue

Only used for development on localhost due to issue with CORS/COEP/CORP interaction:

`vim.wasm` uses `SharedArrayBuffer`, so it needs the following headers to be set:

```
Cross-Origin-Embedder-Policy=require-corp
Cross-Origin-Opener-Policy=same-origin
```

But, once we set those headers, then fetching from biowasm doesn't work anymore due to CORS?

Interestingly, it works for fetching `aioli.worker.js` (runs in main thread), but not getting `base.js` (runs in WebWorker).


## Generate a copy of biowasm CDN

```bash
while read file; do
	[[ -z "$file" ]] && continue;
	mkdir -p $(dirname $file)
	curl -o $file "https://cdn.biowasm.com/v2/${file}"
done < files.txt
```
