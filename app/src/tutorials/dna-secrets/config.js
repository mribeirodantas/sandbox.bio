// Steps
import Intro from "./steps/Intro.md";
import Conclusion from "./steps/Conclusion.md";
import Step1 from "./steps/Step1.md";
import Step2 from "./steps/Step2.md";
import Step3 from "./steps/Step3.md";
import Step4 from "./steps/Step4.md";
import Step5 from "./steps/Step5.md";
import Step6 from "./steps/Step6.md";
import Step7 from "./steps/Step7.md";

export const config = {
	id: "dna-secrets",
	pwd: "dna-secrets",
	name: "Variant calling",
	subtitle: `by <a href="https://robert.bio" target="_blank">Robert Aboukhalil</a>`,
	description: "Use variant calling to decode a secret message stored in sequencing data.",
	tags: ["bowtie2", "bcftools"],
	tools: ["samtools", "bcftools", "bowtie2"],
	difficulty: ["intermediate"],
	steps: [
		{ name: "Your mission: Variant Calling", component: Intro },
		{ name: "The data", component: Step1 },
		{ name: "Data analysis", component: Step2, subtitle: "Align reads to the genome", header: true },
		{ name: "Data analysis", component: Step3, subtitle: "Call variants" },
		{ name: "Data analysis", component: Step4, subtitle: "View the variants" },
		{ name: "Data analysis", component: Step5, subtitle: "Plot twist" },
		{ name: "Data analysis", component: Step6, subtitle: "Extract encoded message" },
		{ name: "Data analysis", component: Step7, subtitle: "Decode the message" },
		{ name: "The end", component: Conclusion, header: true },
	],
	files: [
		"data/dna-secrets/reads.fq",
		"data/dna-secrets/morereads.fq"
	],
	init: `REF=/bowtie2/example/index/lambda_virus; REF_FASTA=/bowtie2/example/reference/lambda_virus.fa; echo "CGGCGAACAGGCCTAGATTAGGCCCTTCTTCCCGGCGGTG" > secret`
};
