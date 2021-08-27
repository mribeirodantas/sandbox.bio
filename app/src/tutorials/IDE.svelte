<script>
let divEditor;
let editor;
let pyodide;
let loading = {
	editor: false,
	pyodide: false,
};

async function initPython(){
	console.log("Initialize Python...")
	if(loading.pyodide)
		return;
	loading.pyodide = true;

	try {
		pyodide = await loadPyodide({
			indexURL : "https://cdn.jsdelivr.net/pyodide/v0.18.0/full/"
		});
		console.log(pyodide.runPython("1 + 2"));
	} catch (error) {
		console.log("Pyodide Failed");
		loading.pyodide = false;
	}
}

async function initEditor()
{
	console.log("Initialize editor...")
	if(loading.editor)
		return;
	loading.editor = true;

	try {
		// require is provided by loader.min.js.
		require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs" }});
		require(["vs/editor/editor.main"], () => {
			editor = monaco.editor.create(divEditor, {
				value: `def test():\n\tprint(123)\n`,
				theme: "vs-light",
				language: "python",
				minimap: { enabled: false }
			});
	
			// Custom keyboard shortcuts
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
					// alert("i'm running => " + ed.getPosition());
					console.log(pyodide.runPython( editor.getValue() + `\n\ntest()` ))
					
					return null;
				}
			});
		});

	} catch (error) {
		console.log("Editor Failed");
		loading.editor = false;
	}
}

async function init()
{
	console.log("init")
	if(!loading.pyodide)
		initPython();
	if(!loading.editor)
		initEditor();
	if(!loading.pyodide || !loading.editor)
		setTimeout(init, 400);
}

init();
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/pyodide/v0.18.0/full/pyodide.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/loader.min.js"></script>
</svelte:head>

<div bind:this={divEditor} id="container-editor" style="height: 50%"></div>

<!-- <button on:click={initEditor}>Run</button> -->
