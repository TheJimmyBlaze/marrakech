precision lowp float;

attribute vec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_translation;
uniform vec2 u_rotation;
uniform vec2 u_origin;
uniform vec2 u_reflection;

attribute vec2 a_texCoord;
uniform vec2 u_texResolution;
uniform vec2 u_texTranslation;

varying vec2 v_texCoord;

void main() {

    vec2 origin = a_position - u_origin;

    vec2 rotate = vec2(
        origin.x * u_rotation.y + origin.y * u_rotation.x,
        origin.y * u_rotation.y - origin.x * u_rotation.x
    );

    vec2 reflect = rotate * u_reflection;
    vec2 position = reflect + u_origin + u_translation;

    vec2 zeroToOne = position / u_resolution;
    gl_Position = vec4(zeroToOne, 0.0, 1.0);

    vec2 texPosition = a_texCoord + u_texTranslation;
    vec2 texZeroToOne = texPosition / u_texResolution;
    v_texCoord = texZeroToOne;
}
