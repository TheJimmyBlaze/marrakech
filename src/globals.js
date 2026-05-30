
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

export const gameCanvas = useGameCanvas();
export const uiCanvas = useUiCanvas();

export const gameCamera = useGameCamera({canvas: gameCanvas, scale: 0.25});
export const uiCamera = useUiCamera({canvas: uiCanvas, scale: 0.075 });

export const profiler = useFrameProfiler();

export const images = {
};

export const textures = {
};

export const shaders = {
};