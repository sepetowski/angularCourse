import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
	selector: 'app-signals',
	templateUrl: './signals.component.html',
	standalone: true,
	imports: [NgFor],
})
export class SignalsComponent {
	actions = signal<string[]>([]);
	counter = signal(0);
	doubleCount = computed(() => this.counter() * 2);

	constructor() {
		//will run when counter changes - just like in vue
		effect(() => console.log(this.counter()));
	}

	increment() {
		this.counter.update((prev) => prev + 1);
		this.actions.update((prev) => [...prev, 'INCREMENT']);
	}

	decrement() {
		this.counter.update((prev) => prev - 1);
		this.actions.update((prev) => [...prev, 'DECREMENT']);
	}
}
