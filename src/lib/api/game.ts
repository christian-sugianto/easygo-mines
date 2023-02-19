import _ from "lodash";
import { roundNumberToDecimal } from "../utils";

export const DEFAULT_CASHOUT_RATE = 1.0;
export const NUM_OF_TILES = 25;
export const DEFAULT_NUM_OF_MINES = 5;

type State = "idle" | "progress" | "cashout" | "busted";

export type CasinoGameMines = {
  minesCount: number;
  mines: number[];
  revealedTiles: number[];
  state: State;
  betAmount: number;
  cashoutRate: number;
};

export const wait = () =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, Math.random() * 500 + 200)
  );

let gameData: CasinoGameMines = {
  betAmount: 0,
  minesCount: 5,
  cashoutRate: 1,
  mines: [],
  revealedTiles: [],
  state: "idle"
};

const getGameState = (state: State) => {
  gameData.state = state;
  return gameData;
};

const getCashoutRate = () => {
  const numOfGems = NUM_OF_TILES - gameData.minesCount;
  const winningRate = numOfGems / NUM_OF_TILES;
  const cashoutRate = 1 + 1 / winningRate - 1;

  return cashoutRate;
};

export const setBetAmount = (betAmount: number) => {
  gameData.betAmount = betAmount;
};

export const minesBet = async (betAmount: number, numOfMines: number) => {
  const response = await fetch(`/api/bet/${betAmount.toString()}/${numOfMines.toString()}`, {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    }
});
  const result = await response.json()
  gameData = result

  return getGameState("progress");
};

export const minesNext = async (tileToReveal: number) => {
  await wait();
  gameData.revealedTiles.push(tileToReveal);

  if (gameData.mines.includes(tileToReveal)) {
    gameData.cashoutRate = DEFAULT_CASHOUT_RATE;
    return getGameState("busted");
  }
  gameData.cashoutRate *= roundNumberToDecimal(getCashoutRate());

  return getGameState("progress");
};

export const minesCashout = async () => {
  await wait();
  gameData.betAmount *= gameData.cashoutRate;
  gameData.betAmount = roundNumberToDecimal(gameData.betAmount);

  return getGameState("cashout");
};
