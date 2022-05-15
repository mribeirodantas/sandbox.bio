// App-wide status. Keep this separate from config.js to avoid circular dependencies.
import { writable } from "svelte/store";

export const status = writable({
	app: null,         // Set to false if app is not yet initialized; set to true once envInit() done running
	terminal: null,    // Set to "execDone" whenever a command finishes running
	offscreen: false,  // Set to true if currently offscreen (e.g. running vim)
	vim: false,        // Set to false if vim is closed, otherwise { path: contents } when vim is open
});
