import { makeAutoObservable } from "mobx";

export class AboutStore {
	info = "Loading...";
	loaded = false;
	constructor(initial = {}) {
		Object.assign(this, initial);
		makeAutoObservable(this);
	}
	setInfo(text) {
		this.info = text;
		this.loaded = true;
	}
}

export function createAboutStore(initial) {
	return new AboutStore(initial);
}
