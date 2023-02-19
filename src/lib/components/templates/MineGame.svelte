<script lang="ts">
	import { gameStore } from '$lib/stores/gameStore';
	import { InputColumn, Board } from '../organisms';
</script>

<div class="root">
	<InputColumn />
	<Board gameData={$gameStore.gameData} loading={$gameStore.loading} next={gameStore.next} />
</div>

<style>
	.root {
		display: flex;
		flex-direction: column-reverse;
		justify-content: center;
		align-items: center;
	}

	@media (min-width: 900px) {
		.root {
			flex-direction: row;
		}
	}
</style>
