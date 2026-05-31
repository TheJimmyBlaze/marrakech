import {
    usePosition,
    useEntity,
    input,
    registry
} from 'titanium';

import {
    gameCamera as camera
} from '../globals';

import { binds } from '../keyBinds';

import { useRug } from '../rug/rug';

import { assamObjectiveId } from '../assam/assamObjective';

export const usePlayerController = () => {

    const update = () => {
        if (input().wasPressed(binds.leftClick)) placeRug();
        if (input().wasPressed(binds.rightClick)) moveAssam();
    };

    const placeRug = () => {

        const position = input().getMousePosition(camera);

        const rug = useRug({
            position
        });

        registry().register(rug);
    };

    const moveAssam = () => {

        const objective = registry().getEntityById(assamObjectiveId);
        const position = objective.components.position;

        const newPosition = input().getMousePosition(camera);
        position.moveToPosition(newPosition);
    }

    const entity = useEntity({
        components: {
            playerController: {
                actions: {
                    update
                }
            }
        }
    });

    return {
        ...entity
    };
};