// Steps
import Intro from "./steps/Intro.md";
import Step1 from "./steps/Step1.md";
import Step2 from "./steps/Step2.md";
import Step3 from "./steps/Step3.md";
import Step4 from "./steps/Step4.md";
import Step5 from "./steps/Step5.md";
import Step6 from "./steps/Step6.md";
import Step7 from "./steps/Step7.md";
import Conclusion from "./steps/Conclusion.md";

export const config = {
	id: "viral-amplicon",
	pwd: "viral-amplicon",
	name: "Viral Amplicon Sequencing",
	subtitle: `by <a href="https://niema.net/" target="_blank">Niema Moshiri</a>`,
	description: "Analyze viral amplicon sequence data using a real SARS-CoV-2 dataset.",
	tags: ["ivar", "minimap", "samtools"],
	tools: ["ivar", "ls", "echo"],
	difficulty: ["intermediate"],
	steps: [
		{ name: "Viral Amplicon Sequencing", component: Intro },
		{ name: "The Data", component: Step1 },
		{ name: "Data Analysis", component: Step2, subtitle: "Align the reads", header: true },
		{ name: "Data Analysis", component: Step3, subtitle: "Trim the reads" },
		{ name: "Data Analysis", component: Step4, subtitle: "Sort the trimmed reads" },
		{ name: "Data Analysis", component: Step5, subtitle: "Generate a pileup" },
		{ name: "Data Analysis", component: Step6, subtitle: "Call variants" },
		{ name: "Data Analysis", component: Step7, subtitle: "Generate consensus sequence" },
		{ name: "The end", component: Conclusion, subtitle: "Conclusion", header: true }
	],
	files: [
		"data/viral-amplicon/primer.bed",
		"data/viral-amplicon/reference.fasta",
		"data/viral-amplicon/reference.gff3",
		"data/viral-amplicon/reads_R1.fq",
		"data/viral-amplicon/reads_R2.fq",
	],
	init: "REF_FASTA=reference.fasta; REF_GFF=reference.gff3; PRIMER_BED=primer.bed"
};
