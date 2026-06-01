import {
    registry,
    input
} from 'titanium';

import {
    gameCamera as camera
} from '../globals';

import { binds } from '../keyBinds';

import { assamObjectiveId } from './assamObjective';
import { arrowDirection } from './arrow';
import { tileSize } from '../board/board';

const nearEnough = 12;

const isNearEnoughToClick = position => {

    const mousePosition = input().getMousePosition(camera);

    const {x: mouseX, y: mouseY} = mousePosition.getPosition();
    const {x, y} = position.getPosition();

    const distX = Math.abs(mouseX - x);
    const distY = Math.abs(mouseY - y);

    const dist = Math.hypot(Math.pow(distX, 2) + Math.pow(distY, 2));

    return dist <= nearEnough;
};

export const useArrowController = ({
    position,
    direction,
    setActive
}) => {

    const moveAssam = () => {

        const objective = registry().getEntityById(assamObjectiveId);
        const objectivePosition = objective.components.position;

        switch (direction) {
            case arrowDirection.up:
                objectivePosition.move(0, -tileSize);
                break;
            case arrowDirection.down:
                objectivePosition.move(0, tileSize);
                break;
            case arrowDirection.left:
                objectivePosition.move(-tileSize, 0);
                break;
            case arrowDirection.right:
                objectivePosition.move(tileSize, 0);
                break;
        }
    };
    
    const clearArrows = () => {

        const components = registry().getComponentsByName('arrowFlag');

        components.forEach(components => {

            const entity = registry().getEntityById(components.entityId);
            registry().deregister(entity);
        });
    };

    const update = () => {

        const active = isNearEnoughToClick(position);
        setActive(active);

        if (!active) return;
        if (!input().wasPressed(binds.leftClick, true)) return;

        moveAssam();
        clearArrows();
    };

    return {
        actions: {
            update
        }
    };
};
