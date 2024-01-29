varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = floor(vUv.x * 10.0) / 10.0;
    // strength *= floor(vUv.y * 10.0) / 10.0;

    // strength = step(0.8, strength);
    // if(strength < 0.5) strength = 0.0; else strength = 1.0;

    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) / 10.0, 
    //     floor(vUv.y * 10.0) / 10.0
    // );
    // float strength = random(gridUv);

    float strength = length(vUv);

    gl_FragColor = vec4(vec3(strength), 1.0);
}