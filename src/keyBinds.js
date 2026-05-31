import { 
    useInputAccess,
    setInput
} from 'titanium';

const input = useInputAccess();
setInput(input);

export const binds = {
    leftClick: 'mouse.click.left',
    rightClick: 'mouse.click.right'
};

input.setBind({
    alias: binds.leftClick,
    primary: {
        mouseButton: 0
    }
});
input.setBind({
    alias: binds.rightClick,
    primary: {
        mouseButton: 2
    }
});