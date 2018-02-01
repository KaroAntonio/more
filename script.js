var titles;


$(document).ready(function() {
	//LOAD Text
	titles = Object.keys(words);
	
	$('#loading').hide();
})

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'assets/words.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

var ctr = 0;
var noiseScale=0.02;

function setup() {
	width = window.innerWidth;
	height = window.innerHeight;
	createCanvas(width, height);

	$(document).click(function() {noiseSeed(random()*1000);})
	$(document).mousemove(function() {update_banner()})
}

function update_banner() {
	var w = words[titles[0]],
		i1 = Math.floor(Math.random() * w.length),
		i2 = Math.floor(Math.random() * w.length);	

	$('#banner').html('more '+w[i1])
}

function draw() {
	colorMode(HSB, 256);
	ctr += .4;
	var h = noise((ctr/2)/100)*256
	background(color(h,255,100))


	sat = 100
	hs = 1
	strokeWeight(1)
	translate(width / 2, height / 2);
	rotate(PI *  ( mouseX/(width/2)));
	for (var i = 0; i < width+20; i++) {	
		var noiseVal = noise((mouseX+i+ctr)*noiseScale, (mouseY+ctr)*noiseScale);
		var noiseVal2 = noise((mouseX+i+ctr+1000)*noiseScale, (mouseY+ctr)*noiseScale);
		var h = noise((mouseX+i+ctr/2)/100)*256
		var h2 = noise((i-ctr)/300)*256
		var s = mouseX /width * 255
		var l = mouseY / height * 255
		//h = h2 = 1
		s = 100
		s = sat
		l = 255 
		var c1 = color(h, s, l);
		var c2 = color(h2, s, l);
		var c = lerpColor(c1, c2,0.5)
		stroke(c)
		line((i+noiseVal2*10)*3 -width, -height*hs-noiseVal, (i+noiseVal2*10)*8-width, height*hs+noiseVal )
	}	
	rotate(-PI *  ( mouseX/(width/2)));

	//translate(width / 2, height / 2);
	rotate(PI *  ( mouseY/(height/2)));
	for (var i = 0; i < width+20; i++) {	
		var noiseVal = noise((mouseX+i+ctr)*noiseScale, (mouseY+ctr)*noiseScale);
		var noiseVal2 = noise((mouseX+i+ctr+1000)*noiseScale, (mouseY+ctr)*noiseScale);
		var h = noise((mouseX+i+ctr/2)/100)*256
		s = sat
		l = 255 
		var c = color(h, s, l);
		stroke(c)
		line(i*3 -width - noiseVal*100, -height*hs, i*8-width - noiseVal*50, height*hs )
	}
}
