import { useEntity, useCameraCtx } from 'titanium';

export const useUiCamera = ({
    canvas,
    scale = 0.1
}) => {

    const camera = useCameraCtx({canvas});

    const scaleFocus = {
        actions: {
            update: () => camera.setScale(canvas.getWidth() / 100 * scale)
        }
    };

    const entity = useEntity({
        components: {
            camera,
            scaleFocus
        }
    });

    return {
        ...camera,
        ...entity
    };
};