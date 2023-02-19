<script lang="ts">
	import { MineGame } from '../lib/components/templates';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="root">
	<MineGame />
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2rem;
		align-items: center;
		font-family: sans-serif;
		background-color: var(--background-primary);
		padding: 3rem;
		height: 100vh;
	}
</style>
