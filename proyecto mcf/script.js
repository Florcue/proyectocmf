const totalCards = 22; // Se duplica para que haya 2 de cada imagen

// Rutas de las imágenes disponibles
const availableCards = [

   '/Imagenes/0.png',
   '/Imagenes/1.png',
   '/Imagenes/2.png',
   '/Imagenes/3.png',
   '/Imagenes/4.png',
   '/Imagenes/5.png',
   '/Imagenes/6.png',
   '/Imagenes/7.png',
   '/Imagenes/8.png',
   '/Imagenes/9.png',
   '/Imagenes/10.png'
];
// Arreglos y variables para el juego
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

// Plantilla HTML para las cartas
let cardTemplate = '<div class="card"><div class="back"><img src="" alt=""></div><div class="face"><img src="" alt="Card"></div></div>';

//Función para manejar el clic en las cartas
function activate(e) {

   // Verificar si se puede hacer un movimiento
   if (currentMove < 2) {

      // Verificar si la carta no está ya seleccionada y no está activa
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         // Si se han seleccionado dos cartas
         if (++currentMove == 2) {

            // Incrementar el número de intentos
            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';


            // Verificar si las cartas seleccionadas son iguales
            if (selectedCards[0].querySelectorAll('.face img')[0].src == selectedCards[1].querySelectorAll('.face img')[0].src) {
               selectedCards = [];
               currentMove = 0;
            }
            else {

               // Si las cartas no son iguales, desactivarlas después de un tiempo
               setTimeout(() => {
                  selectedCards[0].classList.remove('active');
                  selectedCards[1].classList.remove('active');
                  selectedCards = [];
                  currentMove = 0;
               }, 600);
            }

            // Verificar si se ha completado el juego
            if (checkGameCompletion()) {
               alert('¡Felicidades! Has completado el memorama.');
            }
         }
      }
   }
}
// Función para verificar si el juego se ha completado
function checkGameCompletion() {
   let completed = true;
   for (let i = 0; i < totalCards; i++) {
      if (!cards[i].querySelectorAll('.card')[0].classList.contains('active')) {
         completed = false;
         break;
      }
   }
   return completed;
}
// Función para asignar valores aleatorios a las cartas
function randomValue() {
   let rnd = Math.floor(Math.random() * totalCards * 0.5);
   let values = valuesUsed.filter(value => value === rnd);
   if (values.length < 2) {
      valuesUsed.push(rnd);
   }
   else {
      randomValue();
   }
}
// Función para obtener el valor de la cara de la carta
function getFaceValue(value) {
   let rtn = value;
   if (value < availableCards.length) {
      rtn = availableCards[value];
   }
   return rtn;
}
// Crear las cartas y asignarles eventos
for (let i = 0; i < totalCards; i++) {
   let div = document.createElement('div');
   div.innerHTML = cardTemplate;
   cards.push(div);
   document.querySelector('#game').append(cards[i]);
   randomValue();
   cards[i].querySelectorAll('.face img')[0].src = getFaceValue(valuesUsed[i]);
   cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);

   //audio mp3 para que se escuche al iniciar en la pagina . es iterminable 
}
function PlayAudio() {
   document.getElementById("miAudio").play();
}

