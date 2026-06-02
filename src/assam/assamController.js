import {
    registry,
    usePosition
} from 'titanium';

import {
    arrowDirection,
    useArrow
} from './arrow';
import { getMovement } from './assamMovermentResolver';
import { tileSize } from '../board/board';

export const spawnArrows = (
    position,
    direction = null
) => {

    direction !== arrowDirection.down && registry().register(useArrow({
        position,
        direction: arrowDirection.up
    }));
    direction !== arrowDirection.up && registry().register(useArrow({
        position,
        direction: arrowDirection.down
    }));
    direction !== arrowDirection.right && registry().register(useArrow({
        position,
        direction: arrowDirection.left
    }));
    direction !== arrowDirection.left && registry().register(useArrow({
        position,
        direction: arrowDirection.right
    }));
};

export const useAssamController = ({
    position
}) => {

    spawnArrows(position);

    const objectivePosition = usePosition();
    
    const moveQueue = [];
    
    const pushMove = moveCallback => moveQueue.push(moveCallback);
    const getNextMove = () => moveQueue.shift();
    
    const moveAssam = direction => {

        const moves = getMovement(objectivePosition, direction);
        moves.forEach(move => {
            pushMove(() => objectivePosition.move(move.x * tileSize, move.y * tileSize));
        });

        getNextMove()();
        pushMove(() => spawnArrows(position));
    };
    
    const update = () => {
        const {x, y} = objectivePosition.getPosition();
        position.lerpTo(x, y, 0.1);
    };

    return {
        actions: {
            update
        },
        objectivePosition,
        pushMove,
        getNextMove,
        moveAssam
    };
};
