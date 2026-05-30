import {
    usePosition,
    useEntity,
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions,
} from 'titanium';

import {
    gameCamera as camera,
    shaders
} from '../globals';

export const useRug = ({
    position,
    //hueShift
}) => {

    const spriteOptions = useSpriteOptions({
        hueShift: 0.0
    });

    const sprite = useSpriteSheet({
        shader: shaders.rug,
        sliceWidth: 64,
        sliceHeight: 32,
        runs: [
            useSpriteSheetRun()
        ]
    }).default({
        camera,
        position,
        options: spriteOptions
    });

    const update = () => {
        
        const { hueShift } = spriteOptions.getOptions();
        spriteOptions.setOptions({
            hueShift: hueShift + 0.01
        });
    };

    const entity = useEntity({
        components: {
            position,
            sprite,
            hueShifter: {
                actions: {
                    update
                }
            }
        }
    });

    return {
        ...entity
    };
};
