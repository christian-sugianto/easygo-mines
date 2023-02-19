
import _ from 'lodash';
import { DEFAULT_CASHOUT_RATE, NUM_OF_TILES, wait, type CasinoGameMines } from '../../../../../lib/api/game';
import type { RequestEvent, RequestHandler } from './$types';

const minesFields = _.range(0, NUM_OF_TILES);

export const GET = (async ({ params }) => {
    await wait();
    const { betAmount, minesCount } = params; 
    const newRoundTiles = _.shuffle(minesFields);

    const gameData: CasinoGameMines = {
        betAmount: Number(betAmount),
        minesCount: Number(minesCount),
        cashoutRate: DEFAULT_CASHOUT_RATE,
        mines: newRoundTiles.slice(0, Number(minesCount)),
        revealedTiles: [],
        state: "progress"
    };
    return new Response(JSON.stringify(gameData));
    
}) satisfies RequestHandler;