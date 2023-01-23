var previous_result="";

function setup() {
  canvas = createCanvas(200, 200);
  video = createCapture(VIDEO);
  video.hide();

  classifier=ml5.imageClassifier("MobileNet",modelLoaded);
}

function draw(){
  image(video,0,0,200,200);
  classifier.classify(video,gotResult);
}

function preload(){

}

function modelLoaded(){
  console.log("Model has loaded");
}

function gotResult(error,results){
if (error){
  console.error(error);
}
else{
  if((previous_result!=results[0].label)&&(results[0].confidence>0.5))
  {
    console.log(results);
    previous_result=results[0].label;
    var synth=window.speechSynthesis;
    speak_data="Object detected is: "+results[0].label;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    document.getElementById("result_object_name").innerHTML=results[0].label;
    document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);

  }
}
 
}