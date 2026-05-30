import { useEntity, useCanvasCtx } from 'titanium';

export const useUiCanvas = () => {

    const canvas = useCanvasCtx({
        elementId: 'uiCanvas'
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