import { DEFAULT_NUM_OF_MINES, minesBet, minesCashout, minesNext, type CasinoGameMines } from '../api/game';
import { writable, get } from 'svelte/store';

interface IGameStore {
    gameData: CasinoGameMines;
    loading: boolean;
}

function createStore() {
	const gameStore = writable<IGameStore>({
        gameData: {
            minesCount: DEFAULT_NUM_OF_MINES,
            mines: [],
            revealedTiles: [],
            state: 'idle',
            betAmount: 0,
            cashoutRate: 0
        },
        loading: false
    });

    const bet = async () => {
        gameStore.update(state => {return { gameData: state.gameData, loading: true }})

		const numOfMines = get(gameStore).gameData.minesCount;
		const betAmount = get(gameStore).gameData.betAmount;

		const res = await minesBet(betAmount, numOfMines);

        gameStore.set({ gameData: res, loading: false })
	};

	const cashout = async () => {
        gameStore.update(state => { return {...state, loading: true }})
		const res = await minesCashout();
        gameStore.set({ gameData: res, loading: false })
	};

	const next = async (tileToReveal: number) => {
		if (get(gameStore).loading) return;

		gameStore.update(state => { return {...state, loading: true} })
		const res = await minesNext(tileToReveal);
		gameStore.set({ gameData: {...res}, loading: false })

		if (get(gameStore).gameData.state === "busted") {
        	gameStore.set({ gameData: {...res, betAmount: 0}, loading: false })
        } else {
			gameStore.set({ gameData: res, loading: false })
		}
	};

	return {
		subscribe: gameStore.subscribe,
		set: gameStore.set,
		update: gameStore.update,
		bet,
		cashout,
		next
	};
}

export const gameStore = createStore();