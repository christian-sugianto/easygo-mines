<script lang="ts">
	import { NUM_OF_TILES } from '../../api/game';
	import { gameStore } from '$lib/stores/gameStore';
	import { roundNumberToDecimal } from '$lib/utils';
	import { Button, Select } from '../atoms';
	import Input from '../atoms/Input.svelte';

	const { bet, cashout } = gameStore;
</script>

<div class="root">
	<Input
		id="betAmount"
		type="number"
		label="Bet Amount ($)"
		bind:value={$gameStore.gameData.betAmount}
		disabled={$gameStore.gameData.state === 'progress'}
	/>
	<Select
		id="numOfMines"
		label="Mines"
		bind:value={$gameStore.gameData.minesCount}
		disabled={$gameStore.gameData.state === 'progress'}
	>
		{#each Array(NUM_OF_TILES) as option, i}
			<option value={i + 1}>
				{i + 1}
			</option>
		{/each}
	</Select>

	{#if $gameStore.gameData.state === 'progress'}
		<Input
			id="totalProfit"
			type="number"
			label={`Total Profit (x${roundNumberToDecimal($gameStore.gameData.cashoutRate)})`}
			bind:value={$gameStore.gameData.betAmount}
			disabled={$gameStore.gameData.state === 'progress'}
		/>
		<Button on:click={async () => await cashout()}>Cashout</Button>
	{:else}
		<Button on:click={async () => await bet()}>Bet</Button>
	{/if}
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem;
		background-color: var(--background-tertiary);
		border-radius: 0 0 0.5rem 0.5rem;
		width: 18.75rem;
	}

	@media (min-width: 900px) {
		.root {
			border-radius: 0.5rem 0 0 0.5rem;
			width: auto;
			min-width: 10rem;
			height: 30rem;
		}
	}
</style>
