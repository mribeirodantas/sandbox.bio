<script>
import { config } from "./stores/config";
import { status } from "./stores/status";
import { tutorials } from "./stores/tutorials";
import IDE from "./tutorials/IDE.svelte";
import { DropdownItem, Offcanvas } from "sveltestrap";

export let id = "bedtools-intro";
export let step = 0;

// State
const tutorial = $tutorials.find(t => t.id == id);
let tocOpen = false;
let stepInfo = {};
</script>

<div class="container-fluid pb-3">
	<div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr; height:85vh; max-height:85vh">
		<div class="bg-light border rounded-3 p-2 d-flex align-items-end flex-column">
			<div id="tutorial-sidebar" class="w-100 p-2 mb-auto" style="max-height:80vh; overflow-y:scroll; overflow-x:hidden">
				<h4>{stepInfo.name || tutorial.name}</h4>
				{#if stepInfo.subtitle}
					<h6>{@html stepInfo.subtitle}</h6>
				{/if}
				{#if step == 0}
					<div class="row mb-2">
						<h6>
							{#each tutorial.tags as tag}
								<span class="badge bg-primary ms-1">
									{tag}
								</span>
							{/each}
							{#each tutorial.difficulty as tag}
								<span class="badge" class:bg-success={tag == "beginner"} class:bg-danger={tag == "difficult"} style={tag == "intermediate" ? "background-color:#fd7e14" : ""}>{tag}</span>
							{/each}
						</h6>
					</div>
				{/if}
				<hr class="border-2 border-top border-secondary" />

				<div id="tutorial-wrapper" class="row" style="overflow-x: hidden">
					<div class="container">
						<svelte:component this={stepInfo.component} />
					</div>
				</div>
			</div>
		</div>
		<div class="border rounded-3 p-2">
			<IDE />
		</div>
	</div>
</div>
