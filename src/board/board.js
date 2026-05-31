import {
    usePosition,
    useEntity,
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions
} from 'titanium';

import {
    gameCamera as camera,
    shaders
} from '../globals';

export const useBoard = () => {

    const position = usePosition();

    const sprite = useSpriteSheet({
        shader: shaders.board,
        sliceWidth: 288,
        sliceHeight: 288,
        runs: [
            useSpriteSheetRun()
        ]
    }).default({
        camera,
        position
    });

    const entity = useEntity({
        components: {
            position,
            sprite
        }
    });

    return {
        ...entity
    };
};
