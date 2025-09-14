import { makeAutoObservable } from "mobx";

export class HomeStore {
	greeting = "";
	visits = 0;
	constructor(initial = {}) {
		Object.assign(this, initial);
		makeAutoObservable(this);
	}
}

export function createHomeStore(initial) {
	return new HomeStore(initial);
}
