<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {
		label?: string;
		error?: string;
	}

	export let label = '';
	export let error = '';
	export let value = '';
</script>

<div class="root">
	{#if label}
		<label for={$$restProps.id} class="label">{label}</label>
	{/if}
	<input class="input" {...$$restProps} bind:value />
</div>

<style lang="scss">
	.root {
		display: flex;
		flex-direction: column;
	}
	.label {
		font-size: 0.75rem;
		color: var(--text-label);
	}
	.input {
		margin-top: 0.25rem;
		background-color: var(--background-primary);
		color: var(--grayscale-white);
		font-size: 0.75rem;
		border-radius: 0.25rem;
		padding: 0.25rem 0.5rem;
		border: 0;

		&:disabled {
			opacity: 0.7;
		}
	}
</style>
