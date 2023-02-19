<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	interface $$Props extends HTMLSelectAttributes {
		label?: string;
	}
	export let label = '';
	export let value = '';
</script>

<div class="root">
	{#if label}
		<label for="text" class="label">{label}</label>
	{/if}
	<select class="select" bind:value {...$$restProps}>
		<slot />
	</select>
</div>

<style>
	.root {
		width: 100%;
	}
	.label {
		font-size: 0.75rem;
		color: var(--text-label);
	}
	.select {
		margin-top: 0.25rem;
		height: 1.5rem;
		width: 100%;
		background-color: var(--background-primary);
		color: var(--grayscale-white);
		font-size: 0.75rem;
		border-radius: 0.25rem;
		padding: 0.25rem;
		border: 0;
	}
</style>
