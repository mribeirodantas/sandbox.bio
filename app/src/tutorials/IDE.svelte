<script>
import { onMount } from "svelte";

// 2.2MB

// https://github.com/fudgepop01/svelte-monaco-editor-example/blob/master/src/components/monaco/monaco.js
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

let containerElt;
onMount(() => {
	const editor = monaco.editor.create(containerElt, {
		value: `def test():\n\tprint(123)\n`,
		theme: "vs-light",
		language: "python",
		minimap: { enabled: false }
    });

	editor.addAction({
		id: 'my-unique-id',
		label: 'My Label!!!',
		keybindings: [
			monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
		],
		// A precondition for this action.
		precondition: null,
		// A rule to evaluate on top of the precondition in order to dispatch the keybindings.
		keybindingContext: null,
		contextMenuGroupId: 'navigation',
		contextMenuOrder: 1.5,
		// Method that will be executed when the action is triggered.
		// @param editor The editor instance is passed in as a convinience
		run: function(ed) {
			alert("i'm running => " + ed.getPosition());
			return null;
		}
	});
});

async function main(){
	let pyodide = await loadPyodide({
		indexURL : "https://cdn.jsdelivr.net/pyodide/v0.18.0/full/"
	});
	console.log(pyodide.runPython("1 + 2"));
}

</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/pyodide/v0.18.0/full/pyodide.js"></script>


</svelte:head>

<div bind:this={containerElt} id="container-editor" style="height: 50%"></div>

<button on:click={main}>Run</button>
