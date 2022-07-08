// Test variable support

import { get } from "svelte/store";
import { CLI } from "../src/terminal/cli";
import { TOOLS } from "./utils";

const $CLI = get(CLI);
let observed;

describe("Test variables", () => {
	before(async () => {
		console.log("Initializing Aioli");
		await $CLI.init({ tools: TOOLS });
	});

	it("Set/Read variable", async () => {
		await $CLI.exec(`abc=123`);
		observed = await $CLI.exec(`echo $abc`);
		expect(observed).to.equal("123\n");

		observed = await $CLI.exec(`echo $doesntexist`);
		expect(observed).to.equal("\n");

		await $CLI.exec(`def=456`);
		observed = await $CLI.exec(`env`);
		expect(observed).to.include("abc=123\ndef=456\n");
	});

	it("Concatenate variables", async () => {
		await $CLI.exec(`abc=123`);
		await $CLI.exec(`def=456`);
		observed = await $CLI.exec(`echo "this  $abc is a $def test"`);
		expect(observed).to.equal("this  123 is a 456 test\n");
	});

	it("Redirect to filename stored in variable", async () => {
		await $CLI.exec(`abc=test.txt`);
		await $CLI.exec(`echo 789 > $abc`);
		observed = await $CLI.exec(`cat $abc`);
		expect(observed).to.equal("789\n");
	});

	it("Unset variable", async () => {
		await $CLI.exec(`abc=123`);
		await $CLI.exec(`def=456`);
		await $CLI.exec(`unset def`);
		observed = await $CLI.exec(`env`);
		expect(observed).to.include("abc=123");
		expect(observed).to.not.include("abc=456");
	});
});
