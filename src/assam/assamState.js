import { useFiniteStateMachine } from 'titanium';

export const movementStates = {
    stand: 'assam.state.movement.stand',
    walk: 'assam.state.movement.walk'
};

const tileSize = 32;
const nearEnough = 1;

const isNearEnoughToBeStanding = position => {
    
    const {x, y} = position.getPosition();

    const xDist = x % tileSize;
    const yDist = y % tileSize;

    const dist = Math.sqrt(
        Math.pow(xDist, 2) +
        Math.pow(yDist, 2)
    );

    return -nearEnough > dist && dist > -nearEnough;
};

export const useAssamState = ({
    position
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
        condition: () => isNearEnoughToBeStanding(position)
    });

    return machine;
};
