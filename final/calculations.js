var size= document.getElementById("cacheSize");
var assoc= document.getElementById("assoc");
var blocksize= document.getElementById("blocksize");

function getLines(){
	line= size.value/assoc.value/blocksize.value;
	// alert(line);
	return line;
	
	// return cachesize/assoc/blocksize;
};

var container= document.getElementById("container");
var displayLines= document.getElementById("displayLines");
var text= document.getElementsByClassName("text");
let arr= [[], [], []];

function getLines(){
	line= size.value/assoc.value/blocksize.value;
	// alert(line);
	return line;
	
	// return cachesize/assoc/blocksize;
};

function amountOfLines(){
	container.style.display="none";
	line=getLines();
	displayLines.style.display="block";
	// text.style.textAlign = "center";
	document.getElementById("printline").innerHTML= line;


};


function askUserForAddress(){
	displayLines.style.display="none";
	var promptAddress= document.getElementById("promptAddress");
	promptAddress.style.display="block";

	

	
};

function getTexture(blockid) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  // context.fillStyle = "#ffffff";
  // context.fillRect(0, 0, 64, 32);

  // context.fillStyle = "#D3D3D3";
  context.fillRect(8, 8, 48, 24);
  context.font = "13pt times";
  context.fillStyle="black";
  context.textAlign="center";
  context.textBaseline="top"
  context.fillText(blockid, canvas.width/2, canvas.height/2);

  return new THREE.CanvasTexture(canvas);
}

function renderCache(){
	var calculations= document.getElementById("calculations");
	calculations.style.display="block";
	var address= document.getElementById("address").value;
	blockid = Math.floor(address / blocksize.value);
	document.getElementById("printblockid").innerHTML= address + " // " + blocksize.value + " = " + blockid; 
	index = blockid % getLines();
	document.getElementById("printindex").innerHTML= blockid + " % " + getLines() + " = " + index; 

	const scene = new THREE.Scene();
	scene.background= new THREE.Color( 0xADD8E6);
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const geometry = new THREE.BoxGeometry(1,1,1);
	const material1 = new THREE.MeshBasicMaterial( { color: 0x808080 } );
	const material2 = new THREE.MeshBasicMaterial( { color: 0xA9A9A9 } );


	for (let i=0; i< line; i++){
		const cube= new THREE.Mesh(geometry, material1);
		const cube1= new THREE.Mesh(geometry, material2);
		if (i%2==0){
			scene.add(cube);
			cube.position.y=-i;
			cube.position.x= -4;;
			cube.rotation.y=1;
		}
		else{
			scene.add(cube1);
			cube1.position.y=-i;
			cube1.position.x= -4;
			cube1.rotation.y=1;	
		}
		
	}
	camera.position.z = 5;
	const geometry3 = new THREE.BoxGeometry(4,4,4);
	const cube3= new THREE.Mesh(geometry3, material1);
	scene.add(cube3);
	cube3.rotation.y=1;
	cube3.position.x=7;
	const geometry2 = new THREE.BoxGeometry(0.5,0.5,0.5);
	const material3 = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
	const cube2= new THREE.Mesh(geometry2, material3);
	scene.add(cube2);
	cube2.position.z= -1;
	cube2.rotation.x=-0.5;
	cube2.rotation.y= -2;
	cube2.position.x= -10;
	const animate = function () {
		requestAnimationFrame( animate );
		if (cube2.position.x <-4.5){
			cube2.position.x += 0.02;
			// cube.rotation.y += 0.01;

			renderer.render( scene, camera );
		}
		
	};
	animate();
	// for (let i=0; i<2; i++){
	// 	cube2.position.x += 0.5;
	// 	renderer.render( scene, camera );
	
	// }
	const val =0;
	for (let i =0; i < arr[index].length; i++){
		if (arr[index][i]==blockid){
			scene.background= new THREE.Color( 0x00FF00);
			val =1;
			arr.splice(i, 1);
			const animate = function () {
			requestAnimationFrame( animate );
			cube2.position.x -= 0.02;
			// cube.rotation.y += 0.01;

			renderer.render( scene, camera );
			
			
		};
		animate();
		}
	}
	arr[index].push(blockid);
	if (arr[index].length > assoc.value){
		arr.splice(0, 1);
	}
	if (val == 0){
		scene.background= new THREE.Color( 0xffcccb);
		const animate = function () {
			requestAnimationFrame( animate );
			if (cube2.position.x <5){
				cube2.position.x += 0.02;
				// cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			}
			// else{
			// 	cube2.position.x -= 0.02;
			// 	// cube.rotation.y += 0.01;

			// 	renderer.render( scene, camera );
			// }
			
		};
		animate();
	}

	// const canvas = document.createElement("canvas");
 //  	canvas.width = 128;
 //  	canvas.height = 32;
 //  	const context = canvas.getContext("2d");

 //  	context.fillRect(0, 0, 64, 32);
	// context.font = "13pt times";
 // 	context.fillStyle="black";
 //  	context.textAlign="center";
 //  	context.textBaseline="top"
 //  	context.fillText("123", canvas.width/2, canvas.height/2);

  	// const num = new THREE.MeshLambertMaterial({ map: carFrontTexture });
  	// cube.add(num);

  	for (let i=0; i< line; i++){
		const cube= new THREE.Mesh(geometry, material1);
		const cube1= new THREE.Mesh(geometry, material2);
		if (i%2==0){
			if (i==index){
				console.log("yuh");
				const texture= getTexture(blockid);
				const num = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 12, 24), [
				    new THREE.MeshLambertMaterial({ map: texture }),
				    new THREE.MeshLambertMaterial({ map: texture }),
				    new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
				    new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
				    new THREE.MeshLambertMaterial({ map: texture }),
				    new THREE.MeshLambertMaterial({ map: texture }),
  				]);
  				cube.add(num);
  				scene.add(cube);
				cube.position.y=-i;
				cube.position.x= -4;;
				cube.rotation.y=1;
			}
		}
		else{	
			if (i==index){
				console.log("yuh");
				const texture= getTexture(blockid);
				const num = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 12, 24), [
				    new THREE.MeshLambertMaterial({ map: texture }),
				    new THREE.MeshLambertMaterial({ map: texture }),
				    new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
				    new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
				    new THREE.MeshLambertMaterial({ map: texture }),
				    new THREE.MeshLambertMaterial({ map: texture }),
  				]);
  				cube1.add(num);
  				scene.add(cube1);
				cube1.position.y=-i;
				cube1.position.x= -4;
				cube1.rotation.y=1;
			}
		}
		
	}
	

};
