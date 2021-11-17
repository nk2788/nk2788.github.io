console.log("javascript!!")

let theButton = document.querySelector("button")
let theBody = document.querySelector("body");
let thePara = document.querySelector("p");
let theHeadline = document.querySelector("h1");
// var theSun= document.getElmentbyId("theSun");


theButton.addEventListener('click', myFunction)

function myFunction(){
    console.log("button clicked!!");
    theButton.style.backgroundColor="black"
    // theSun.style.backgroundColor= "white"
    theBody.style.backgroundColor = "white";
    theBody.style.color = "black";
    thePara.textContent = "Night!!!"
    
}