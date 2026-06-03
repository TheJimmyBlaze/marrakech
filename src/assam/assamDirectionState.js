import { useFiniteStateMachine } from 'titanium';
import { movementStates } from './assamMovementState';

export const directionStates = {
    left: 'assam.state.direction.left',
    right: 'assam.state.direction.right'
};

export const useAssamDirectionState = ({
    position,
    objectivePosition
}) => {

    const machine = useFiniteStateMachine({
        initialState: directionStates.left
    });

    machine.addTransition({
        exitState: directionStates.left,
        enterState: directionStates.right,
        condition: () => objectivePosition.getPosition().x > position.getPosition().x
    });

    machine.addTransition({
        exitState: directionStates.right,
        enterState: directionStates.left,
        condition: () => objectivePosition.getPosition().x < position.getPosition().x
    });

    return machine;
};
