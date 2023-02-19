<script lang="ts">
	import { BoardTile } from '../molecules';
	import type { CasinoGameMines } from '../../api/game';
	import GemAudio from '../../assets/gem.mp3';
	import MineAudio from '../../assets/mine.mp3';

	export let gameData: CasinoGameMines;
	export let next: (tileToReveal: number) => Promise<void>;
	export let loading: boolean | undefined;

	let selectedTile: number;
	let gemAudio: HTMLAudioElement;
	let mineAudio: HTMLAudioElement;

	const handleTileClick = async (selectedIndex: number, isMine?: boolean) => {
		selectedTile = selectedIndex;
		if (gameData?.state !== 'progress' || loading) return;

		await next(selectedIndex);
		if (isMine) {
			await mineAudio.play();
		} else {
			await gemAudio.play();
		}
	};
</script>

<div class="root">
	{#each Array(25) as tile, i}
		<BoardTile
			isMine={gameData?.mines.includes(i)}
			revealed={gameData?.revealedTiles.includes(i)}
			loading={selectedTile === i && loading}
			ended={gameData?.state === 'busted' || gameData?.state === 'cashout'}
			disabled={gameData?.revealedTiles.includes(i)}
			on:click={async () => await handleTileClick(i, gameData?.mines.includes(i))}
		/>
	{/each}
	<audio src={GemAudio} bind:this={gemAudio} />
	<audio src={MineAudio} bind:this={mineAudio} />
</div>

<style>
	.root {
		display: grid;
		background-color: var(--background-secondary);
		padding: 1rem;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
		border-radius: 0.5rem 0.5rem 0 0;
		gap: 0.5rem;
		height: 18.75rem;
		width: 18.75rem;
	}

	@media (min-width: 900px) {
		.root {
			height: 30rem;
			width: 30rem;
			border-radius: 0 0.5rem 0.5rem 0;
		}
	}
</style>
