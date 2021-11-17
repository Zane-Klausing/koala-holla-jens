console.log( 'js' );

$( document ).ready(onReady); 

function onReady(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}; // end doc ready

function setupClickListeners() {
  console.log('in setupClickListeners')
  $('#addButton').on('click', saveKoala());
    console.log( `Clicked addButton sending ${koalaToSend}`)
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'name',
      age: 'number',
      gender: 'gender',
      readyForTransfer: 'Yes/No',
      notes: 'notes',
    };
        // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }; 


function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
}
