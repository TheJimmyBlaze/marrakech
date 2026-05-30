
import './globals';

import { useGame } from 'titanium';

import { useMarket } from './view/market';

export const game = useGame();

export const init = async () => {

    const view = useMarket();
    await view.initialize();
};

export const start = async () => {
    
    await init();
    game.start();
};

export const run = () => {
    window.addEventListener('load', () => start());
}