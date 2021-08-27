<script>
import { tutorials } from "./stores/tutorials";
import Alert from "./components/Alert.svelte";
import IDE from "./IDE.svelte";
import SampleRosalind from "./SampleRosalind.md";

export let id = "bedtools-intro";

// State
let exercise = {
	title: `<img src="/images/rosalind.png" alt="Rosalind.info logo" width="100"><br />Transcribing DNA into RNA`,
	subtitle: ``,
	url: "http://rosalind.info/problems/rna",
	tags: ["String Algorithms"]
};
</script>

<div class="container-fluid pb-3">
	<div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr; height:85vh; max-height:85vh">
		<div class="bg-light border rounded-3 p-2 d-flex align-items-end flex-column">
			<div id="tutorial-sidebar" class="w-100 p-2 mb-auto" style="max-height:80vh; overflow-y:scroll; overflow-x:hidden">
				<h4>{@html exercise.title}</h4>
				{#if exercise.subtitle}
					<h6>{@html exercise.subtitle}</h6>
				{/if}
				<div class="row mb-2">
					<h6>
						{#each exercise.tags as tag}
							<span class="badge bg-primary ms-1">
								{tag}
							</span>
						{/each}
					</h6>
				</div>
				<hr class="border-2 border-top border-secondary" />

				<div id="tutorial-wrapper" class="row" style="overflow-x: hidden">
					<div class="container">
						<Alert>
							Submit your answer on <a href={exercise.url} target="_blank">Rosalind</a>
						</Alert>
						<SampleRosalind />
					</div>
				</div>
			</div>
		</div>
		<div class="border rounded-3 p-2">
			<IDE />
		</div>
	</div>
</div>
