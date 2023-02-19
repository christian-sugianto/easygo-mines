<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { GemSvg, MineSvg } from '../../assets';

	interface $$Props extends HTMLButtonAttributes {
		loading?: boolean;
		isMine?: boolean;
		revealed?: boolean;
		ended?: boolean;
		disabled?: boolean;
	}

	export let loading = false;
	export let isMine = false;
	export let revealed = false;
	export let ended = false;
	export let disabled = false;
</script>

<button class="root" class:revealed on:click {disabled}>
	{#if revealed || ended}
		{#if isMine}
			<MineSvg />
		{:else}
			<GemSvg />
		{/if}
	{/if}
</button>

<style lang="scss">
	.root {
		opacity: 0.5;
		background-color: var(--background-tertiary);
		border: none;
		width: 100%;
		height: 100%;
		cursor: pointer;
		border-radius: 10%;
		padding: 20%;
		&:hover {
			background-color: var(--background-tertiary-light);
		}
	}

	.revealed {
		background-color: var(--background-tertiary-dark);
		opacity: 1;
		cursor: default;
		&:hover {
			background-color: var(--background-tertiary-dark);
		}
	}
</style>
