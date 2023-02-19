<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Circle } from 'svelte-loading-spinners';

	type $$Props = HTMLButtonAttributes & {
		loading?: boolean;
	};

	export let loading = false;
</script>

<button class="root" class:disabled={$$restProps.disabled} on:click {...$$restProps}>
	{#if loading}
		<Circle size="15" color="black" unit="px" />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
	.root {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		height: 2.5rem;
		background-color: var(--button-primary);
		font-size: 0.75rem;
		border-radius: 0.25rem;
		border: 0;
		width: 100%;

		&:hover {
			background-color: var(--button-primary-light);
		}
	}
	.disabled {
		cursor: default;
		opacity: 0.7;
	}
	@media only screen and (min-width: 1280px) {
		.primary {
			font-size: 1rem;
		}
	}
</style>
