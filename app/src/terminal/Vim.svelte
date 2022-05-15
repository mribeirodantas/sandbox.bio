<script>
import { onMount } from "svelte";
import { VimWasm } from "vim-wasm";
import { status } from "stores/status";
import { CLI } from "terminal/cli";

let elCanvas, elInput;
export let files;  // { "path": "contents" }

// Assume the file we're editing is the first one we see
$: path = Object.keys($status.vim)[0];

// Initialize vim.wasm
onMount(async () => {
	const vim = new VimWasm({
		canvas: elCanvas,
		input: elInput,
		workerScriptPath: "/vim/vim.js",
	});

	// When vim exits, save the changes made to the file
	vim.onVimExit = async contents => {
		await $CLI.utils.writeFile(path, contents);
		// Make sure to sync FS before <Terminal /> reloads and resets the FS
		await $CLI.fsSave();
		$status.vim = false;
	};

	// Start vim
	// Docs: <https://github.com/rhysd/vim.wasm/blob/wasm/wasm/README.md#program-arguments>
	vim.start({
		files: files,
		cmdArgs: [ Object.keys(files)[0], "-c", 'set guifont=monospace:h15' ],
	});
});
</script>

<canvas bind:this={elCanvas} style="height:83vh; max-height:85vh; max-width:100%; overflow:hidden;"></canvas>
<input bind:this={elInput} autocomplete="off" autofocus />
