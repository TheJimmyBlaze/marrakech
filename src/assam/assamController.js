import { registry } from 'titanium';

import { assamObjectiveId } from './assamObjective';

export const useAssamController = ({
    position
}) => {
    
    const update = () => {

        const objective = registry().getEntityById(assamObjectiveId);
        const objectivePosition = objective.components.position;

        const {x, y} = objectivePosition.getPosition();

        position.lerpTo(x, y, 0.25);
    };

    return {
        actions: {
            update
        }
    };
};
