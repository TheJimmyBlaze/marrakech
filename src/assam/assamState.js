import { registry, useFiniteStateMachine } from 'titanium';

import { tileSize } from '../board/board'; 
import { assamObjectiveId } from './assamObjective';

export const movementStates = {
    stand: 'assam.state.movement.stand',
    walk: 'assam.state.movement.walk'
};

const nearEnough = 4;

const isNearEnoughToBeStanding = position => {
    
    const objective = registry().getEntityById(assamObjectiveId);
    const objectivePosition = objective.components.position;

    const {x: objectiveX, y: objectiveY} = objectivePosition.getPosition();
    const {x, y} = position.getPosition();

    const distX = Math.abs(objectiveX - x);
    const distY = Math.abs(objectiveY - y);

    const dist = Math.hypot(Math.pow(distX, 2) + Math.pow(distY, 2));

    return dist <= nearEnough;
};

export const useAssamState = ({
    position,
    stopTrigger
}) => {

    const machine = useFiniteStateMachine({
        initialState: movementStates.stand
    });

    machine.addTransition({
        exitState: movementStates.stand,
        enterState: movementStates.walk,
        condition: () => !isNearEnoughToBeStanding(position)
    });
    
    machine.addTransition({
        exitState: movementStates.walk,
        enterState: movementStates.stand,
        condition: () => isNearEnoughToBeStanding(position),
        trigger: stopTrigger
    });

    return machine;
};
