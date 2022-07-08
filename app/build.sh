#!/bin/bash

ENV=${1}

# Add build date and commit ID
echo "Adding build info to index.html..."
echo "<!-- Build: $(TZ=America/Los_Angeles date); $(git rev-parse HEAD) -->" >> public/index.html

# Create mock routes (only used for local testing; there's a router server-side to handle this)
echo "Creating mock routes..."
PAGES=("tutorials" "playground" "sandboxes" "rosalind")
for page in ${PAGES[@]}; do
	mkdir -p "public/$page"
	cp public/index.html public/$page/index.html
done

# Copy over data we need to be available via URL for mounting data as URLs, and for IGV.js
echo "Copying over sample data to public/data..."
mkdir -p public/data
for tutorial in $(ls -d src/tutorials/*/);
do
	[[ ! -e $tutorial/data ]] && continue;
	dest=public/data/$(basename $tutorial)
	mkdir -p $dest
	cp $tutorial/data/* $dest
done


# ----------------------------------------------------------------------
# Generate a copy of biowasm CDN for local development
# ----------------------------------------------------------------------

[[ "$ENV" != "dev" ]] && exit;
echo "Generating local copy of biowasm CDN for local development..."
cd public/biowasm

function download() {
	destination=$1
	source=$2
	flags=$3

	# No need to download again (could use curl -C to make sure file size is right but this is just for local dev so not necessary)
	[[ -f "$destination" ]] && return
	curl -s -o $flags $destination $source 2>/dev/null
}

URL_CDN="https://cdn.biowasm.com/v2"
AIOLI_DIR=aioli/2.4.0-rc2

# First download Aioli separately
mkdir -p $AIOLI_DIR
download $AIOLI_DIR/aioli.js $URL_CDN/$AIOLI_DIR/aioli.js
download $AIOLI_DIR/aioli.worker.js $URL_CDN/$AIOLI_DIR/aioli.worker.js

# Download each tool from biowasm (based on https://github.com/biowasm/biowasm/blob/main/deploy.sh#L35)
curl -s -o tools.json "https://raw.githubusercontent.com/biowasm/biowasm/main/config/tools.json"
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

	# Download js/wasm/data
	mkdir -p ${toolName}/${toolVersion}/
	download ${toolName}/${toolVersion}/config.json "${URL_CDN}/${toolName}/${toolVersion}/config.json"
	for program in "${toolPrograms[@]}"; do
		# If you already have js/wasm, probably don't need data (save time)
		tryDownloadingDataFile=0
		[[ ! -f ${toolName}/${toolVersion}/${program}.js ]] && \
			[[ ! -f ${toolName}/${toolVersion}/${program}.wasm ]] && \
			tryDownloadingDataFile=1

		download ${toolName}/${toolVersion}/${program}.js "${URL_CDN}/${toolName}/${toolVersion}/${program}.js"
		download ${toolName}/${toolVersion}/${program}.wasm "${URL_CDN}/${toolName}/${toolVersion}/${program}.wasm"
		# ignore .data failures since not all tools have .data files
		if [[ "$tryDownloadingDataFile" == "1" ]]; then
			download ${toolName}/${toolVersion}/${program}.data "${URL_CDN}/${toolName}/${toolVersion}/${program}.data" --fail
		fi
	done
done

cd -
