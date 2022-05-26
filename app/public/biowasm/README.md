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
URL_CDN="https://cdn.biowasm.com/v2"
AIOLI_DIR=aioli/2.4.0-rc2

# First download Aioli separately
mkdir -p $AIOLI_DIR
curl -o $AIOLI_DIR/aioli.js $URL_CDN/$AIOLI_DIR/aioli.js
curl -o $AIOLI_DIR/aioli.worker.js $URL_CDN/$AIOLI_DIR/aioli.worker.js

# Download each tool from biowasm (based on https://github.com/biowasm/biowasm/blob/main/deploy.sh#L35)
curl -o tools.json "https://raw.githubusercontent.com/biowasm/biowasm/main/config/tools.json"
allTools=($(jq -rc '.tools[]' tools.json))
for tool in "${allTools[@]}";
do
	# Parse tool info
	toolName=$(jq -rc '.name' <<< $tool)
	toolVersion=$(jq -rc '.version' <<< $tool)
	toolBranch=$(jq -rc '.branch' <<< $tool)
	toolPrograms=$(jq -rc '.programs' <<< $tool)
	[[ "$toolPrograms" == "null" ]] && toolPrograms="[\"$toolName\"]"
	toolPrograms=($(jq -rc '.[]' <<< $toolPrograms))

	echo -e $toolName"\t"$toolVersion;

	mkdir -p ${toolName}/${toolVersion}/
	curl -s -o ${toolName}/${toolVersion}/config.json "${URL_CDN}/${toolName}/${toolVersion}/config.json"
	for program in "${toolPrograms[@]}"; do
		curl -s -o ${toolName}/${toolVersion}/${program}.js "${URL_CDN}/${toolName}/${toolVersion}/${program}.js"
		curl -s -o ${toolName}/${toolVersion}/${program}.wasm "${URL_CDN}/${toolName}/${toolVersion}/${program}.wasm"
		curl -s --fail -o ${toolName}/${toolVersion}/${program}.data "${URL_CDN}/${toolName}/${toolVersion}/${program}.data"  # ignore .data failures since not all tools have .data files
	done
done
