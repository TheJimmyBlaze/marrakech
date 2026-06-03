import {
    usePosition,
    useEntity,
    registry
} from 'titanium';

import { useAssamMovementState } from './assamMovementState';
import { useAssamAnimator } from './assamAnimator';
import { useAssamController } from './assamController';
import { arrowDirection } from './arrow';
import { useAssamDirectionState } from './assamDirectionState';

export const useAssam = () => {

    const position = usePosition();

    const assamController = useAssamController({
        position
    });

    const movementState = useAssamMovementState({
        position,
        objectivePosition: assamController.objectivePosition,
        stopTrigger: () => assamController.getNextMove()?.()
    });

    const directionState = useAssamDirectionState({
        position,
        objectivePosition: assamController.objectivePosition
    });

    const animator = useAssamAnimator({
        position,
        movementState,
        directionState
    });

    const entity = useEntity({
        components: {
            position,
            movementState,
            directionState,
            animator,
            assamController
        }
    });

    return {
        ...entity
    };
};
