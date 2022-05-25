function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    background("white");
    canvas.mouseRelesed(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload(){
    classifier = ml5.imageclassifier('DoddleNet');
}

function clearCanvas(){
    background("white");
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);

    }
}

function classifyCanvas(){
    classifier.classify(canvas,gotresults)
}

function gotresults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'label:' + results[0].label;
    document.getElementById('confidence').innerHTML = 'confidence' + Math.round(results[0].confidence * 100) + '%';
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}
