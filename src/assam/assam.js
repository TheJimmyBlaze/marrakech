import {
    usePosition,
    useEntity,
    registry
} from 'titanium';

import { useAssamState } from './assamState';
import { useAssamAnimator } from './assamAnimator';
import { useAssamController } from './assamController';

import {
    arrowDirection,
    useAssamArrow
} from './assamArrow';

const spawnArrows = position => {

    registry().register(useAssamArrow({
        position,
        direction: arrowDirection.up
    }));
    registry().register(useAssamArrow({
        position,
        direction: arrowDirection.down
    }));
    registry().register(useAssamArrow({
        position,
        direction: arrowDirection.left
    }));
    registry().register(useAssamArrow({
        position,
        direction: arrowDirection.right
    }));
};

export const useAssam = () => {

    const position = usePosition();

    spawnArrows(position);

    const state = useAssamState({
        position
    });

    const animator = useAssamAnimator({
        position,
        state
    });

    const controller = useAssamController({
        position
    });

    const entity = useEntity({
        components: {
            position,
            state,
            animator,
            controller
        }
    });

    return {
        ...entity
    };
};
