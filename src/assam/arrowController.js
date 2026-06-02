import {
    registry,
    input
} from 'titanium';

import {
    gameCamera as camera
} from '../globals';

import { binds } from '../keyBinds';

import { arrowDirection } from './arrow';
import { tileSize } from '../board/board';

const nearEnough = 14;

const isNearEnoughToClick = position => {

    const mousePosition = input().getMousePosition(camera);
    if (!mousePosition) return false;

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

        clearArrows();

        const { moveAssam } = registry().getComponentsByName('assamController')[0];
        moveAssam(direction);
    };

    return {
        actions: {
            update
        }
    };
};
