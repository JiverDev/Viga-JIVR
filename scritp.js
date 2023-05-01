  
var pantalla = document.getElementById("miCanvas");
var pincel = pantalla.getContext("2d");

var Lviga = document.getElementById("longitud").value || 6;
var xcp = document.getElementById("posicion-carga-puntual").value;
var xm = document.getElementById("posicion-momento").value;
var xap = document.getElementById("posicion-apoyo").value;
var x1cd = document.getElementById("x1cd").value;
var y1cd = document.getElementById("y1cd").value;
var x2cd = document.getElementById("x2cd").value;
  var y2cd = document.getElementById("y2cd").value;




function dibujarviga(){
  var Lviga = parseFloat(document.getElementById("longitud").value)*100 || 6;
  var xcp1 = parseFloat(document.getElementById("posicion-carga-puntual").value)*100;
  var xcp = (600*xcp1)/(Lviga);
  var xm1 = parseFloat( document.getElementById("posicion-momento").value)*100;
  var xm = (600*xm1)/(Lviga);
  var xap1 = parseFloat(document.getElementById("posicion-apoyo").value)*100;
  var xap = (600*xap1)/(Lviga);
  var x1cd1 = parseFloat( document.getElementById("x1cd").value)*100;
  var x1cd = (600*x1cd1)/(Lviga);
  var y1cd1 = parseFloat(document.getElementById("y1cd").value)*100;
  var y1cd = (600*y1cd1)/(Lviga);
  var x2cd1 = parseFloat(document.getElementById("x2cd").value)*100;
  var x2cd = (600*x2cd1)/(Lviga);
  var y2cd1 = parseFloat(document.getElementById("y2cd").value)*100;
  var y2cd = (600*y2cd1)/(Lviga);


  //pintar toda la pantalla de canvas
  pincel.fillStyle = "lightgrey";  //propiedad
  pincel.fillRect(0,0,600,400);  //funcion

  //viga
  pincel.fillStyle = "gray";  //propiedad
  pincel.fillRect(0,250,600,50);  //funcion
  pincel.strokeRect(0,250,600,50);
  
  cargapuntual(xcp);
  momento(xm);
  apoyos(xap);
  cargadistribuida(x1cd, y1cd, x2cd, y2cd);
}

function cargapuntual(xcp){
  //carga puntual
  pincel.fillStyle = "blue";  //propiedad
  pincel.fillRect(xcp,250,15,-100);  //funcion
}

function momento(xm){
  //para momentos
  pincel.beginPath();
  pincel.arc(xm, 275, 10, 0, 2 *Math.PI);
  pincel.fillText
  pincel.fillStyle = "red";
  pincel.fill();   
}

function apoyos(xap){
  // para apoyos
  pincel.beginPath();
  pincel.moveTo(xap-25, 325);
  pincel.lineTo(xap, 300);
  pincel.lineTo(xap+25, 325);
  pincel.fillStyle = 'green';
  pincel.fill(); 
}

function cargadistribuida(x1cd, y1cd, x2cd, y2cd){
  //carga distribuida trapecio
  pincel.beginPath();
  pincel.moveTo(x1cd, 250);
  pincel.lineTo(x1cd, 250-y1cd);
  pincel.lineTo(x2cd, 250-y2cd);
  pincel.lineTo(x2cd, 250);
  pincel.fillStyle = 'lightblue';
  pincel.fill();  
}
/*
function dibujarviga(){
  
  //pintar toda la pantalla de canvas
  pincel.fillStyle = "lightgrey";  //propiedad
  pincel.fillRect(0,0,600,400);  //funcion



 
  



  // para apoyos
  pincel.beginPath();
  pincel.moveTo(50, 50);
  pincel.lineTo(75, 25);
  pincel.lineTo(100, 50);
  pincel.fillStyle = 'green';
  pincel.fill();


  

  

  
  
}
*/
dibujarviga();



/*
// Obtener elementos del DOM
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d")
const lengthInput = document.getElementById("length");
const addLoadButton = document.getElementById("addLoad");
const clearButton = document.getElementById("clear");

// Inicializar variables
let length = 5;
let loads = [];

function dibujarbandera(){
  
  pincel.fillStyle = "lightgrey";  //propiedad
  pincel.fillRect(0,0,600,400);  //funcion

  pincel.fillStyle = "yellow";  //propiedad
  pincel.fillRect(0,0,600,200);  //funcion

  pincel.fillStyle = "blue";  //propiedad
  pincel.fillRect(0,200,600,100);  //funcion

  pincel.fillStyle = "red";  //propiedad
  pincel.fillRect(0,300, 600,100);  //funcion
}
dibujarbandera();
// Función para dibujar la viga
function drawBeam(length, loads) {
  // Limpiar el canvas
  pincel.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar la viga
  pincel.beginPath();
  pincel.moveTo(50, 100);
  pincel.lineTo(50 + length * 50, 100);
  pincel.lineWidth = 5;
  pincel.stroke();

  // Dibujar cargas puntuales
  loads.forEach((load) => {
    const x = 50 + load.position * 50;
    const y = 100 - load.value * 10;
    pincel.beginPath();
    pincel.moveTo(x - 10, y - 10);
    pincel.lineTo(x + 10, y + 10);
    pincel.moveTo(x - 10, y + 10);
    pincel.lineTo(x + 10, y - 10);
    pincel.lineWidth = 3;
    pincel.stroke();
  });

  // Dibujar cargas distribuidas
  loads.filter((load) => load.type === "distributed").forEach((load) => {
    const startX = 50 + load.startPosition * 50;
    const endX = 50 + load.endPosition * 50;
    const y = 100 - load.value * 10;
    pincel.beginPath();
    pincel.moveTo(startX, y);
    pincel.lineTo(endX, y);
    pincel.lineWidth = 3;
    pincel.stroke();
  });

  // Dibujar momentos
  loads.filter((load) => load.type === "moment").forEach((load) => {
    const x = 50 + load.position * 50;
    const y = 100 - load.value * 2;
    pincel.beginPath();
    pincel.arc(x, y, 15, 0, 2 * Math.PI);
    pincel.lineWidth = 3;
    pincel.stroke();
  });
}

// Función para actualizar la longitud de la viga
function updateLength() {
  length = parseFloat(lengthInput.value) || 5;
  drawBeam(length, loads);
}

// Función para añadir una carga
function addLoad() {
  const position = parseFloat(prompt("Introduce la posición de la carga (en metros):"));
  const type = prompt("Introduce el tipo de carga (puntual, distribuida o momento):").toLowerCase();
  const value = parseFloat(prompt("Introduce el valor de la carga (en kN/m o kNm):"));

  if (!position || !type || !value) {
    alert("Debes introducir valores válidos");
    return;
  }

  loads.push({ position, type, value });
  drawBeam(length, loads);
}

// Función para eliminar todas las cargas
function clearLoads() {
  loads = [];
  drawBeam(length, loads);
}

// Añadir event listeners
lengthInput.addEventListener("input", updateLength);
addLoadButton.addEventListener("click", addLoad);
clearButton.addEventListener("click", clearLoads);

// Dibujar la viga inicialmente
drawBeam(length, loads);

dibujarbandera();
*/
