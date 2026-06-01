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
    useArrow
} from './arrow';

const spawnArrows = position => {

    registry().register(useArrow({
        position,
        direction: arrowDirection.up
    }));
    registry().register(useArrow({
        position,
        direction: arrowDirection.down
    }));
    registry().register(useArrow({
        position,
        direction: arrowDirection.left
    }));
    registry().register(useArrow({
        position,
        direction: arrowDirection.right
    }));
};

export const useAssam = () => {

    const position = usePosition();

    spawnArrows(position);

    const state = useAssamState({
        position,
        stopTrigger: () => spawnArrows(position)
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
