uniform float velToggle;
uniform float boundToggle;
uniform float dt;


out vec4 fragColor;
void main()
{
	vec4 pt = texture(sTD2DInputs[0], vUV.st);
	vec4 shapes = texture(sTD2DInputs[1], vUV.st);
	vec4 images = texture(sTD2DInputs[2], vUV.st);
	vec4 words = texture(sTD2DInputs[3], vUV.st);
	vec4 multitouch = texture(sTD2DInputs[4], vUV.st);
	vec4 noise = texture(sTD2DInputs[5], vUV.st);

	float shapesMult = rgb2bch(shapes.rgb).x;
	float imgMult = rgb2bch(images.rgb).x;
	float wordMult = rgb2bch(words.rgb).x;

	float boundaryMixed = shapesMult + imgMult + wordMult;
	boundaryMixed = clamp(boundaryMixed, 0., 1.);

	vec2 velocity = pt.xy;
	velocity.xy += (noise.xy * boundaryMixed * dt * .1);
	velocity *= velToggle;

	// !! Always add multitouch velocity !!
	velocity += multitouch.xy * 100.;


	float bound = boundaryMixed * boundToggle;

	vec4 cd = vec4(velocity.x, velocity.y, bound, 1.);

	fragColor = cd;
}
