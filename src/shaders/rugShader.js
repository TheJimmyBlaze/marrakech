import {
    compileFragmentShader,
    compileVertexShader
} from 'titanium';

export const useRugShader = (
    camera,
    texture
) => {

    const glx = camera.canvas.glx;

    let program;

    let aPosition;
    let positionBuffer;

    let uResolution;
    let uTranslation;
    let uRotation;
    let uOrigin;
    let uReflection;

    let aTexCoord;
    let texCoordBuffer;

    let uTexResolution;
    let uTexTranslation;

    let uHueShift;
    let uOpacity;

    Promise.all([
        fetch('/shaders/rug.vert').then(raw => raw.text()),
        fetch('/shaders/rug.frag').then(raw => raw.text())
    ]).then(([vertSrc, fragSrc]) => {

        const vert = compileVertexShader(glx, vertSrc);
        const frag = compileFragmentShader(glx, fragSrc);

        program = glx.createProgram();
        glx.attachShader(program, vert);
        glx.attachShader(program, frag);
        glx.linkProgram(program);

        aPosition = glx.getAttribLocation(program, 'a_position');
        positionBuffer = glx.createBuffer();

        uResolution = glx.getUniformLocation(program, 'u_resolution');
        uTranslation = glx.getUniformLocation(program, 'u_translation');
        uRotation = glx.getUniformLocation(program, 'u_rotation');
        uOrigin = glx.getUniformLocation(program, 'u_origin');
        uReflection = glx.getUniformLocation(program, 'u_reflection');

        aTexCoord = glx.getAttribLocation(program, 'a_texCoord');
        texCoordBuffer = glx.createBuffer();

        uTexResolution = glx.getUniformLocation(program, 'u_texResolution');
        uTexTranslation = glx.getUniformLocation(program, 'u_texTranslation');

        uHueShift = glx.getUniformLocation(program, 'u_hueShift');
        uOpacity = glx.getUniformLocation(program, 'u_opacity');
    });

    const draw = ({
        frameX,
        frameY,
        frameWidth,
        frameHeight,
        drawX, drawY,
        drawWidth, drawHeight,
        rotation,
        centerX, centerY,
        mirror,
        flip,
        hueShift,
        opacity
    }) => {

        glx.useProgram(program);

        //Position
        const positions = [
            0, 0,
            drawWidth, 0,
            drawWidth, drawHeight,
            0, drawHeight
        ];

        glx.bindBuffer(glx.ARRAY_BUFFER, positionBuffer);
        glx.bufferData(glx.ARRAY_BUFFER, new Float32Array(positions), glx.STATIC_DRAW);
        glx.vertexAttribPointer(aPosition, 2, glx.FLOAT, false, 0, 0);
        glx.enableVertexAttribArray(aPosition);

        //Resolution
        const viewWidth = camera.getWidth() / 2;
        const viewHeight = -camera.getHeight() / 2;
        glx.uniform2fv(uResolution, [viewWidth, viewHeight]);

        //Translation
        const {x: cameraX, y: cameraY} = camera.position.getPosition();
        const shiftX = drawX - cameraX;
        const shiftY = drawY - cameraY;
        glx.uniform2fv(uTranslation, [shiftX, shiftY]);

        //Rotation
        const radians = -rotation * Math.PI / 180;
        glx.uniform2fv(uRotation, [Math.sin(radians), Math.cos(radians)]);

        //Rotation origin
        glx.uniform2fv(uOrigin, [centerX, centerY]);

        //Reflection
        const reflectX = mirror ? -1 : 1;
        const reflectY = flip ? -1 : 1;
        glx.uniform2fv(uReflection, [reflectX, reflectY]);

        //Texture
        const texPositions = [
            0, 0,
            frameWidth, 0,
            frameWidth, frameHeight,
            0, frameHeight
        ];
    
        glx.bindBuffer(glx.ARRAY_BUFFER, texCoordBuffer);
        glx.bufferData(glx.ARRAY_BUFFER, new Float32Array(texPositions), glx.STATIC_DRAW);
        glx.vertexAttribPointer(aTexCoord, 2, glx.FLOAT, false, 0, 0);
        glx.enableVertexAttribArray(aTexCoord);

        glx.bindBuffer(glx.ARRAY_BUFFER, texCoordBuffer);
        glx.activeTexture(glx.TEXTURE0);
        glx.bindTexture(glx.TEXTURE_2D, texture.texture);

        //Texture resolution
        glx.uniform2fv(uTexResolution, [texture.image.image.width, texture.image.image.height]);

        //Texture translation
        const textureTranslationVector = [frameX, frameY];
        glx.uniform2fv(uTexTranslation, textureTranslationVector);

        //Colour
        glx.uniform1f(uHueShift, hueShift);
        glx.uniform1f(uOpacity, opacity);

        glx.drawArrays(glx.TRIANGLE_FAN, 0, 4);
    };

    return {
        draw
    };
};
