import { useFiniteStateMachine } from 'titanium';

export const movementStates = {
    stand: 'assam.state.movement.stand',
    walk: 'assam.state.movement.walk'
};

const tileSize = 32;
const nearEnough = 1;

const isNearEnoughToBeStanding = position => {
    
    const {x, y} = position.getPosition();

    const xDist = Math.abs(x) % tileSize;
    const yDist = Math.abs(y) % tileSize;

    const xClose = xDist > tileSize - nearEnough || xDist < nearEnough;
    const yClose = yDist > tileSize - nearEnough || yDist < nearEnough

    return xClose && yClose;
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
