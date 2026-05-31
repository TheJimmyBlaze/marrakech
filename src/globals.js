
import {
    useImage,
    useTexture,
    useDataTexture,
    useFrameShader,
    useFrameProfiler
} from 'titanium';

import { useUiCanvas } from './camera/uiCanvas';
import { useGameCanvas } from './camera/gameCanvas';
import { useUiCamera } from './camera/uiCamera';
import { useGameCamera } from './camera/gameCamera';
import { useRugShader } from './shaders/rugShader';

export const gameCanvas = useGameCanvas();
export const uiCanvas = useUiCanvas();

export const gameCamera = useGameCamera({canvas: gameCanvas, scale: 0.15});
export const uiCamera = useUiCamera({canvas: uiCanvas, scale: 0.075 });

export const profiler = useFrameProfiler();

export const images = {
    rug: useImage('/sprites/rug.png'),
    board: useImage('/sprites/board.png'),
    droppers: useImage('/sprites/droppers.png')
};

export const textures = {
    rug: useTexture(gameCamera, images.rug),
    board: useTexture(gameCamera, images.board),
    droppers: useTexture(gameCamera, images.droppers)
};

export const shaders = {
    rug: useRugShader(gameCamera, textures.rug),
    board: useFrameShader(gameCamera, textures.board)
};