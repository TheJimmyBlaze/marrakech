import { registry, useFiniteStateMachine } from 'titanium';

import { tileSize } from '../board/board'; 

export const movementStates = {
    stand: 'assam.state.movement.stand',
    walk: 'assam.state.movement.walk'
};

const nearEnough = 4;

const isNearEnoughToBeStanding = (
    position,
    objectivePosition
 ) => {
    
    const {x: objectiveX, y: objectiveY} = objectivePosition.getPosition();
    const {x, y} = position.getPosition();

    const distX = Math.abs(objectiveX - x);
    const distY = Math.abs(objectiveY - y);

    const dist = Math.hypot(Math.pow(distX, 2) + Math.pow(distY, 2));

    return dist <= nearEnough;
};

export const useAssamState = ({
    position,
    objectivePosition,
    stopTrigger
}) => {

    const machine = useFiniteStateMachine({
        initialState: movementStates.stand
    });

    machine.addTransition({
        exitState: movementStates.stand,
        enterState: movementStates.walk,
        condition: () => !isNearEnoughToBeStanding(position, objectivePosition)
    });
    
    machine.addTransition({
        exitState: movementStates.walk,
        enterState: movementStates.stand,
        condition: () => isNearEnoughToBeStanding(position, objectivePosition),
        trigger: stopTrigger
    });

    return machine;
};
