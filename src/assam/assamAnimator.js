import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions
} from 'titanium';

import {
    gameCamera as camera,
    shaders
} from '../globals';

import { movementStates } from './assamMovementState';
import { directionStates } from './assamDirectionState';

const spriteNames = {
    stand: 'stand',
    walk: 'walk'
};

export const useAssamAnimator = ({
    position,
    movementState,
    directionState
}) => {

    const spriteOptions = useSpriteOptions({
        zIndex: 1000,
        mirror: directionState.getState() === directionStates.left
    });

    const sprites = useSpriteSheet({
        shader: shaders.assam,
        sliceWidth: 32,
        sliceHeight: 32,
        runs: [
            useSpriteSheetRun({
                name: spriteNames.stand,
                x: 0, y: 0,
                spriteCount: 1
            }),
            useSpriteSheetRun({
                name: spriteNames.walk,
                x: 1, y: 0,
                spriteCount: 8,
                fps: 12
            })
        ]
    });

    let sprite = null;
    const setSprite = name => {

        if (sprite?.name === name) return;

        sprite = sprites[name]({
            position,
            camera,
            options: spriteOptions
        });
    };
    setSprite(spriteNames.stand);

    const update = () => {
        
        switch(movementState.getState()) {
            case movementStates.stand:
                setSprite(spriteNames.stand);
                break;
            case movementStates.walk:
                setSprite(spriteNames.walk);
                break;
        }

        spriteOptions.setMirror(directionState.getState() === directionStates.left)
    };

    const draw = () => sprite.actions.draw();

    return {
        actions: {
            update,
            draw
        }
    };
};
