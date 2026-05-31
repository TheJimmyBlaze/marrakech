import {
    useRegistry,
    setRegistry,
    usePerformanceDisplay,
    usePosition
} from 'titanium';

import {
    uiCanvas,
    gameCamera,
    uiCamera,
    profiler,
    gameCanvas
} from '../globals';

import style from '../style';
import { usePlayerController } from '../player/usePlayerController';
import { useBoard } from '../board/board';

export const useMarket = () => {

    const initialize = async () => {

        const registry = useRegistry();
        setRegistry(registry);
        
        registry.register(gameCanvas);
        registry.register(gameCamera);
        registry.register(uiCanvas);
        registry.register(uiCamera);
        
        registry.register(profiler);
        registry.register(usePerformanceDisplay({
            profiler,
            style,
            drawCamera: uiCamera
        }));

        registry.register(useBoard());
        registry.register(usePlayerController());
    };

    return {
        initialize
    };
};