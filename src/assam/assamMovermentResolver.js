import { tileSize } from '../board/board';
import { arrowDirection } from './arrow';

const topLeftCornerLeft = [
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: 0, y: 1}
];
const topLeftCornerUp = [
    {x: -1, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 0}
];

const bottomRightCornerRight = [
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: 0, y: -1}
];
const bottomRightCornerDown = [
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: -1, y: 0}
];

const leftSideTop = [
    {x: 0, y: 1},
    {x: 1, y: 0}
];
const leftSideBottom = [
    {x: 0, y: -1},
    {x: 1, y: 0}
];

const bottomSideLeft = [
    {x: 1, y: 0},
    {x: 0, y: -1}
];
const bottomSideRight = [
    {x: -1, y: 0},
    {x: 0, y: -1}
];

const rightSideTop = [
    {x: 0, y: 1},
    {x: -1, y: 0}
];
const rightsideBottom = [
    {x: 0, y: -1},
    {x: -1, y: 0}
];

const topSideLeft = [
    {x: 1, y: 0},
    {x: 0, y: 1}
];
const topSideRight = [
    {x: -1, y: 0},
    {x: 0, y: 1}
];

const offBoardMovements = {
    [-4]:{}, [-3]: {}, [-2]: {}, [-1]: {}, 0: {}, 1: {}, 2: {}, 3: {}, 4: {}
};
offBoardMovements[-4][-3] = topLeftCornerLeft;
offBoardMovements[-4][-2] = leftSideTop;
offBoardMovements[-4][-1] = leftSideBottom;
offBoardMovements[-4][0] = leftSideTop;
offBoardMovements[-4][1] = leftSideBottom;
offBoardMovements[-4][2] = leftSideTop;
offBoardMovements[-4][3] = leftSideBottom;
offBoardMovements[-3][4] = bottomSideLeft;
offBoardMovements[-2][4] = bottomSideRight;
offBoardMovements[-1][4] = bottomSideLeft;
offBoardMovements[0][4] = bottomSideRight;
offBoardMovements[1][4] = bottomSideLeft;
offBoardMovements[2][4] = bottomSideRight;
offBoardMovements[3][4] = bottomRightCornerDown;
offBoardMovements[4][3] = bottomRightCornerRight;
offBoardMovements[4][2] = rightsideBottom;
offBoardMovements[4][1] = rightSideTop;
offBoardMovements[4][0] = rightsideBottom;
offBoardMovements[4][-1] = rightSideTop;
offBoardMovements[4][-2] = rightsideBottom;
offBoardMovements[4][-3] = rightSideTop;
offBoardMovements[3][-4] = topSideRight;
offBoardMovements[2][-4] = topSideLeft;
offBoardMovements[1][-4] = topSideRight;
offBoardMovements[0][-4] = topSideLeft;
offBoardMovements[-1][-4] = topSideRight;
offBoardMovements[-2][-4] = topSideLeft;
offBoardMovements[-3][-4] = topLeftCornerUp;

const rollSlippers = () => {

    const dice = [1, 2, 2, 3, 3, 4];
    const diceIndex = Math.floor(Math.random() * 6);

    const roll = dice[diceIndex];
    return roll;
};

const getDirectionalMovement = direction => {

    let x = 0;
    let y = 0;

    switch (direction) {
        case arrowDirection.left:
            x = -1;
            break;
        case arrowDirection.right:
            x = 1;
            break;
        case arrowDirection.up:
            y = -1;
            break;
        case arrowDirection.down:
            y = 1;
            break;
        default:
            //hopefully 3,3 is stange enough for me to notice a bug
            x = 3;
            y = 3;
            break;
    }

    return {x, y};
};

const getOffboardDirection = (x, y) => {

    if (x === -4 && y === -3) return arrowDirection.down;
    if (x === -3 && y === -4) return arrowDirection.right;
    if (x === 4 && y === 3) return arrowDirection.up;
    if (x === 3 && y === 4) return arrowDirection.left;

    if (x === -4) return arrowDirection.right;
    if (x === 4) return arrowDirection.left;
    if (y === -4) return arrowDirection.down;
    if (y === 4) return arrowDirection.up;

    return arrowDirection.up;
};

export const getMovement = (
    position,
    initialDirection,
) => {

    let direction = initialDirection;
    const {x: startX, y: startY} = position.getPosition();

    let trackX = startX / tileSize;
    let trackY = startY / tileSize;

    const moves = [];
    const roll = rollSlippers();

    let {x: deltaX, y: deltaY} = getDirectionalMovement(direction);
    for(let i = 0; i < roll; i++) {

        trackX += deltaX;
        trackY += deltaY;

        moves.push({x: deltaX, y: deltaY});

        const offBoardMoves = offBoardMovements[trackX]?.[trackY];
        if (!offBoardMoves) continue;

        direction = getOffboardDirection(trackX, trackY);
        const newDelta = getDirectionalMovement(direction);
        deltaX = newDelta.x;
        deltaY = newDelta.y;

        for(let j = 0; j < offBoardMoves.length; j++) {

            const offBoard = offBoardMoves[j];

            trackX += offBoard.x;
            trackY += offBoard.y;

            moves.push(offBoard);
        }
    }

    return {
        moves,
        direction
    };
};
