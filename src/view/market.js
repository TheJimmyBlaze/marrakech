import {
    useRegistry,
    setRegistry,
    usePerformanceDisplay
} from 'titanium';

import {
    uiCanvas,
    gameCamera,
    uiCamera,
    profiler,
    gameCanvas
} from '../globals';

import style from '../style';

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
    };

    return {
        initialize
    };
};