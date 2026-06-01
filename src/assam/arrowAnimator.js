import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions
} from 'titanium';

import {
    gameCamera as camera,
    shaders
} from '../globals';

import { arrowDirection } from './arrow';

const spriteNames = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
    upBright: 'upBright',
    downBright: 'downBright',
    leftBright: 'leftBright',
    rightBright: 'rightBright'
};

export const useArrowAnimator = ({
    position,
    direction,
    getActive
}) => {

    const spriteOptions = useSpriteOptions({
        zIndex: 2000
    });

    const sprites = useSpriteSheet({
        shader: shaders.arrows,
        sliceWidth: 16,
        sliceHeight: 16,
        runs: [
            useSpriteSheetRun({
                name: spriteNames.up,
                x: 0, y: 0
            }),
            useSpriteSheetRun({
                name: spriteNames.down,
                x: 1, y: 0
            }),
            useSpriteSheetRun({
                name: spriteNames.left,
                x: 0, y: 1
            }),
            useSpriteSheetRun({
                name: spriteNames.right,
                x: 1, y: 1
            }),

            useSpriteSheetRun({
                name: spriteNames.upBright,
                x: 2, y: 0
            }),
            useSpriteSheetRun({
                name: spriteNames.downBright,
                x: 3, y: 0
            }),
            useSpriteSheetRun({
                name: spriteNames.leftBright,
                x: 2, y: 1
            }),
            useSpriteSheetRun({
                name: spriteNames.rightBright,
                x: 3, y: 1
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

    let spriteName = '';
    let brightSpriteName = '';
    switch (direction) {
        case arrowDirection.up:
            spriteName = spriteNames.up;
            brightSpriteName = spriteNames.upBright;
            break;
        case arrowDirection.down:
            spriteName = spriteNames.down;
            brightSpriteName = spriteNames.downBright;
            break;
        case arrowDirection.left:
            spriteName = spriteNames.left;
            brightSpriteName = spriteNames.leftBright;
            break;
        case arrowDirection.right:
            spriteName = spriteNames.right;
            brightSpriteName = spriteNames.rightBright;
            break;
    };
    setSprite(spriteName);

    const update = () => {
        if (getActive()) {
            setSprite(brightSpriteName);
        } else {
            setSprite(spriteName);
        }
    };

    const draw = () => sprite.actions.draw();

    return {
        actions: {
            update,
            draw
        }
    };
};
