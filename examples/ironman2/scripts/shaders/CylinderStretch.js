/**
 * @author felixturner / http://airtight.cc/
 *
 * RGB Shift Shader
 * Shifts red and blue channels from center in opposite directions
 * Ported from http://kriss.cx/tom/2009/05/rgb-shift/
 * by Tom Butterworth / http://kriss.cx/tom/
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 */

THREE.CylinderStretchShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"algorithm":     { type: "i", value: 1 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform int algorithm;",
		
		"varying vec2 vUv;",

		"void main() {",

			"vec2 p = vUv;",

		/*
			"if (p.x > .5)",
			//"p.x =  (.5 * pow(p.x + .5,2.0));",
			"p.x = p.x;",
			"else",
			"p.x =  (.5 * pow(p.x + .5,2.0));",
		*/
		//"p.x = pow(p.x + .5, p.x + .5);",
		//"p.x = pow(1.0/p.x, p.x);",
			
			//"p.x = 0.5 + pow(p.x-0.5, 2.0);",
			//left //"p.x =  (.5 * pow(p.x + .5,2.0));",
			//"p.x = .5 * pow(0.5 - p.x,2.0) + 0.5;",
			//"p.x = (p.x * (1.0 - p.x)) / 1.0;",
			//"p.x = 0.5 + pow(p.x-0.5, 2.0);",
			//"p.x = 0.5 + ( (p.x-0.5) * -(p.x-0.5)  );",
			
			//"p.x = pow(p.x-0.5, 2.0) + .5;",
			//"p.x = -2.0* pow(p.x-0.5, 2.0) + 0.5;",
			
			"if(algorithm == 0){",
			"}",
			
			"if(algorithm == 1){",
			//parabolic logarithm
			"if(p.x < 0.5){",
			"p.x = (-1.0* pow(p.x-0.5, 2.0) ) + 0.5;",
			"} else {",
			"p.x = (1.0* pow(p.x-0.5, 2.0) ) + 0.5;",
			"}",			
			"}",
			
			
			"if(algorithm == 2){",
			//hyperbolic sine function
			"float hyper = 28.0;",
			"float baseX = (p.x - 0.5) * hyper;",
			"p.x = ( exp(baseX) - exp(-baseX) ) / 2.0;",
			"p.x = (p.x / hyper) + .5;",
			"}",
			
			
			"if(algorithm == 3){",
			//hyperbolic tangent function
			"float hyper = 22.0;",
			"float baseX = (p.x - 0.5) * hyper;",
			"p.x = ( exp(baseX) - exp(-baseX) ) / ( exp(baseX) + exp(-baseX) );",
			"p.x = (p.x / hyper) + .5;",
			"}",
			
			"if(algorithm == 4){",
			//inverse hyperbolic sine function
			"float hyper = 22.0;",
			"float baseX = (p.x - 0.5) * hyper;",
			"p.x = log( baseX + sqrt(pow(baseX, 2.0) +1.0 ) );",
			"p.x = (p.x / hyper) + .5;",
			"}",
			


			


			"vec4 color = texture2D(tDiffuse, p);",
			"gl_FragColor = color;",

		"}"

	].join("\n")

};
