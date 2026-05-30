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
import { useRug } from '../rug/rug';

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

        registry.register(useRug({
            position: usePosition()
        }));
    };

    return {
        initialize
    };
};