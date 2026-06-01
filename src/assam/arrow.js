import {
    usePosition,
    useEntity
} from 'titanium';

import { tileSize } from '../board/board';

import { useArrowAnimator } from './arrowAnimator';
import { useArrowController } from './arrowController';

export const arrowDirection = {
    up: 'up',
    down: 'down',
    left: 'left',
    right:' right'
};

const arrowDist = 26;

export const useArrow = ({
    position: assamPosition,
    direction
}) => {

    let x = 0;
    let y = 0;

    switch (direction) {
        case arrowDirection.left:
            x = -arrowDist;
            break;
        case arrowDirection.right:
            x = arrowDist;
            break;
        case arrowDirection.up:
            y = -arrowDist;
            break;
        case arrowDirection.down:
            y = arrowDist;
            break;
    }

    const position = usePosition({
        x, y,
        parent: assamPosition
    });

    let active = false;

    const controller = useArrowController({
        position,
        direction,
        setActive: value => active = value
    });

    const animator = useArrowAnimator({
        position,
        direction,
        getActive: () => active
    });

    const entity = useEntity({
        components: {
            arrowFlag: {},
            position,
            controller,
            animator
        }
    });

    return {
        ...entity
    };
};
