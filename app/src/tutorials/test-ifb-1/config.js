// Steps
import Step0 from "./steps/step00.md";
import Step1 from "./steps/step01.md";
import Step2 from "./steps/step02.md";
import Step3 from "./steps/step03.md";
import Step4 from "./steps/step04.md";
import Step5 from "./steps/step05.md";
import Step6 from "./steps/step06.md";

export const config = {
	id: "test-ifb-1",
	pwd: "test-ifb-1",
	listed: false,
	name: "Basics of the Unix command line interface",
	subtitle: `by <a href="https://www.france-bioinformatique.fr/en/home/" target="_blank">French Institute of Bioinformatics</a>`,
	description: "Unix, Shell, Terminal & command",
	tags: ["unix", "shell", "terminal"],
	tools: ["ls", "date"],
	difficulty: ["beginner"],
	steps: [
		{ name: "Basics of the Unix command line interface", component: Step0 },
		{ name: "Unix & Command lines", component: Step1 },
		{ name: "The Shell", component: Step2 },
		{ name: "Unix command", component: Step3 },
		{ name: "A simple basic command: ls", component: Step4 },
		{ name: "Getting help", component: Step5 },
		{ name: "The end", component: Step6 },
	],
	files: [
		"data/test-ifb-1/Data/O.tauri_annotation.gff",
		"data/test-ifb-1/Data/O.tauri_genome.fna",
		"data/test-ifb-1/Data/SRR3099585_chr18.fastq",
		"data/test-ifb-1/Data/SRR3099586_chr18.fastq",
		"data/test-ifb-1/Data/SRR3099587_chr18.fastq",
		"data/test-ifb-1/Data/SRR3105697_chr18.fastq",
		"data/test-ifb-1/Data/SRR3105698_chr18.fastq",
		"data/test-ifb-1/Data/SRR3105699_chr18.fastq",
	],
};
