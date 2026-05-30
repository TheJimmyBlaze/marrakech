import { useEntity, useCanvasGlx } from 'titanium';

export const useGameCanvas = () => {

    const canvas = useCanvasGlx({
        elementId: 'gameCanvas'
    });

    const entity = useEntity({
        components: {
            canvas
        }
    });

    return {
        ...canvas,
        ...entity
    };
};