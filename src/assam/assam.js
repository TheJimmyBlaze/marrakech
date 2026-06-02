import {
    usePosition,
    useEntity,
    registry
} from 'titanium';

import { useAssamState } from './assamState';
import { useAssamAnimator } from './assamAnimator';
import { useAssamController } from './assamController';

export const useAssam = () => {

    const position = usePosition();

    const assamController = useAssamController({
        position
    });

    const state = useAssamState({
        position,
        objectivePosition: assamController.objectivePosition,
        stopTrigger: () => assamController.getNextMove()?.()
    });

    const animator = useAssamAnimator({
        position,
        state
    });

    const entity = useEntity({
        components: {
            position,
            state,
            animator,
            assamController
        }
    });

    return {
        ...entity
    };
};
