precision lowp float;

uniform sampler2D u_texture;

uniform float u_hueShift;
uniform float u_opacity;

varying vec2 v_texCoord;

void main() {

    const vec4 rgbY = vec4(0.299, 0.587, 0.114, 0.0);
    const vec4 rgbI = vec4(0.596, -0.275, -0.321, 0.0);
    const vec4 rgbQ = vec4(0.212, -0.523, 0.311, 0.0);

    const vec4 yiqR = vec4(1.0, 0.956, 0.621, 0.0);
    const vec4 yiqG = vec4(1.0, -0.272, -0.647, 0.0);
    const vec4 yiqB = vec4(1.0, -1.107, 1.704, 0.0);

    //Sample tex colour
    vec4 colour = texture2D(u_texture, v_texCoord);

    float y = dot(colour, rgbY);
    float i = dot(colour, rgbI);
    float q = dot(colour, rgbQ);

    //Shift
    float hue = atan(q, i);
    float chroma = sqrt(i * i + q * q);

    hue += u_hueShift;

    //Convert
    q = chroma * sin(hue);
    i = chroma * cos(hue);

    vec4 yiq = vec4(y, i, q, 0.0);
    colour.r = dot(yiq, yiqR);
    colour.g = dot(yiq, yiqG);
    colour.b = dot(yiq, yiqB);

    gl_FragColor = colour;
    gl_FragColor.a = min(gl_FragColor.a, u_opacity);
}
