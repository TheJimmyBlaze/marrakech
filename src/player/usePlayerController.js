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
        if (input().wasPressed(binds.rightClick)) placeRug();
    };

    const placeRug = () => {

        const position = input().getMousePosition(camera);

        const rug = useRug({
            position
        });

        registry().register(rug);
    };

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