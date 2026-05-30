import { useEntity, useCameraGlx } from 'titanium';

export const useGameCamera = ({
    canvas,
    scale = 0.1
}) => {

    const camera = useCameraGlx({canvas});

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