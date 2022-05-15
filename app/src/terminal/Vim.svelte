<script>
import { onMount } from "svelte";
import { VimWasm } from "vim-wasm";
import { status } from "stores/status";
import { CLI } from "terminal/cli";

let elCanvas, elInput;
export let files;  // { "path": "contents" }

$: path = Object.keys($status.vim)[0];

// Initialize vim.wasm
onMount(async () => {
	const vim = new VimWasm({
		canvas: elCanvas,
		input: elInput,
		workerScriptPath: "/vim/vim.js",
	});

	vim.onFileExport = async (fullpath, contents) => {
		console.log(fullpath, contents)
		const blob = new Blob([contents], { type: 'text/plain' });
		console.log(await blob.text());
	}

	vim.onVimInit = () => {
		console.log("onVimInit");
		console.log($status.vim);
	}

	vim.onVimExit = async contents => {
		console.log(path, contents);
		await $CLI.utils.writeFile(path, contents);
		await $CLI.fsSave();
		$status.vim = false;
	};

	// https://github.com/rhysd/vim.wasm/blob/wasm/wasm/README.md#debug-logging
	vim.start({
		files: files,
		cmdArgs: [ Object.keys(files)[0], "-c", 'set guifont=monospace:h17' ],
		// debug: true,
	});
});
</script>

<canvas bind:this={elCanvas} style="height:83vh; max-height:85vh; max-width:100%; overflow:hidden;"></canvas>
<input bind:this={elInput} autocomplete="off" autofocus />
