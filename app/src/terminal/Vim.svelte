<script>
import { onMount } from "svelte";
import { VimWasm } from "vim-wasm";
import { status } from "stores/status";
import { CLI } from "terminal/cli";

let elCanvas, elInput;

// Initialize vim.wasm
onMount(async () => {
	const vim = new VimWasm({
		canvas: elCanvas,
		input: elInput,
		workerScriptPath: "/vim/vim.js",
	});

	// When vim exits, save the changes made to the file
	vim.onVimExit = async contents => {
		await $CLI.utils.writeFile($status.vim.pathFSLocal, contents);
		// Make sure to sync FS before <Terminal /> reloads and resets the FS
		await $CLI.fsSave();
		$status.vim = false;
	};

	// Start vim
	// Docs: <https://github.com/rhysd/vim.wasm/blob/wasm/wasm/README.md#program-arguments>
	vim.start({
		files: {
			[$status.vim.pathFSVim]: $status.vim.contents
		},
		cmdArgs: [ $status.vim.pathFSVim, "-c", 'set guifont=Monaco:h15' ],
	});
});
</script>

<canvas bind:this={elCanvas} style="height:85vh; max-height:85vh; max-width:100%; overflow:hidden; padding:10px; background-color:rgb(41,44,51)"></canvas>
<!-- svelte-ignore a11y-autofocus -->
<input bind:this={elInput} autocomplete="off" style="position:absolute; top:0; opacity:0" autofocus />
