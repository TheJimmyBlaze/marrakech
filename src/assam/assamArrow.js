import {
    usePosition,
    useEntity
} from 'titanium';

import { tileSize } from '../board/board';

import { useAssamArrowAnimator } from './assamArrowAnimator';

export const arrowDirection = {
    up: 'up',
    down: 'down',
    left: 'left',
    right:' right'
};

export const useAssamArrow = ({
    position: assamPosition,
    direction
}) => {

    let x = 0;
    let y = 0;

    switch (direction) {
        case arrowDirection.left:
            x = -tileSize;
            break;
        case arrowDirection.right:
            x = tileSize;
            break;
        case arrowDirection.up:
            y = -tileSize;
            break;
        case arrowDirection.down:
            y = tileSize;
            break;
    }

    const position = usePosition({
        x, y,
        parent: assamPosition
    });

    let active = false;

    const animator = useAssamArrowAnimator({
        position,
        direction,
        getActive: () => active
    });

    const entity = useEntity({
        components: {
            position,
            animator,
        }
    });

    return {
        ...entity
    };
};
