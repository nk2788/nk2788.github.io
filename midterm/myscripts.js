// https://flylib.com/books/en/2.631.1.135/1/
var mylinks= new Array(
  "moodboard1.html",
  "moodboard2.html",
  "moodboard3.html",
  "moodboard4.html",
  "moodboard5.html"
)
  

function picklink(){
  var linkselect= Math.floor(Math.random() * (mylinks.length));
  return (mylinks[linkselect]);
}