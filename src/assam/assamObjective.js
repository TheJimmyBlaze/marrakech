import {
    useEntity,
    usePosition
} from 'titanium';

export const assamObjectiveId = 'entity.assam.objective';

export const useAssamObjective = () => {

    const position = usePosition();

    const entity = useEntity({
        id: assamObjectiveId,
        components: {
            position
        },
    });

    return {
        ...entity
    };
};
