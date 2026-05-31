import {
    usePosition,
    useEntity
} from 'titanium';

import {
    gameCamera as camera,
    shaders
} from '../globals';

import { useAssamState } from './assamState';
import { useAssamAnimator } from './assamAnimator';

export const useAssam = () => {

    const position = usePosition();

    const state = useAssamState({
        position
    });

    const animator = useAssamAnimator({
        position,
        state,
        camera
    });

    const entity = useEntity({
        components: {
            position,
            state,
            animator
        }
    });

    return {
        ...entity
    };
};
