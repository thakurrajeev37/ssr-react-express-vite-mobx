import { makeAutoObservable } from "mobx";

export class AppStore {
	message = "";
	url = "";
	time = "";
	footerText = "";
	constructor(initial = {}) {
		Object.assign(this, initial);
		makeAutoObservable(this);
	}
	setMessage(msg) {
		this.message = msg;
	}
	setUrl(u) {
		this.url = u;
	}
	setTime(t) {
		this.time = t;
	}
	setFooterText(t) {
		this.footerText = t;
	}
	updateFrom(obj = {}) {
		Object.assign(this, obj);
	}
}

export function createAppStore(initial) {
	return new AppStore(initial);
}
