console.log( 'js' );

$( document ).ready(onReady); 

function onReady(){
  console.log( 'JQ' );
  getKoalas();
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load

}; // end doc ready

function setupClickListeners() {
  console.log('in setupClickListeners')
  $('#addButton').on('click', saveKoala);
  $('#viewKoalas').on('click', '.transferButton', shipKoala)
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    // call saveKoala with the new object
  }; 


function getKoalas(){
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then ((response)=> {
    $('#viewKoalas').empty();
    console.log('GET /koalas response', response);
    for (let koalas of response) {
      if (koalas.ready_to_transfer === false){
      $('#viewKoalas').append(`
        <tr>
          <td>${koalas.name}</td>
          <td>${koalas.gender}</td>
          <td>${koalas.age}</td>
          <td>${koalas.ready_to_transfer}</td>
          <td>${koalas.notes}</td>
          <td><button class="transferButton" data-id="${koalas.id}" data-status="${koalas.ready_to_transfer}">Ready For Transfer</button></td>
        </tr>
      `);
      }
      else{
        $('#viewKoalas').append(`
        <tr>
          <td>${koalas.name}</td>
          <td>${koalas.gender}</td>
          <td>${koalas.age}</td>
          <td>${koalas.ready_to_transfer}</td>
          <td>${koalas.notes}</td>
        </tr>
      `);
      }
    }
  })
  // ajax call to server to get koalas
  
} // end  getKoalas

function saveKoala(){
  console.log( 'in saveKoala' );
  // ajax call to server to get koalas - ADAM HERE
    const newKoala = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      transferStatus: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    }
    console.log( 'in saveKoala', newKoala );
    $.ajax({
      type: 'POST',
      url: '/koalas',
      data: newKoala
    }).then((response) => {
      console.log('POST /koalas succeeded')
      $('#nameIn').val('')
      $('#ageIn').val('')
      $('#genderIn').val('')
      $('#readyForTransferIn').val('')
      $('#notesIn').val('')
      getKoalas();
    });
  }

  function shipKoala() {
    const koalaToShip = $(this).data('id');
    const currentStatus = $(this).data('status');
  
    console.log('koalaToShip', koalaToShip);
    console.log('currentStatus', currentStatus);
    $.ajax({
      type: 'PUT',
      url: `/koalas/${koalaToShip}`,
      data: { transferStatus: currentStatus }
    }).then((res) => {
      getKoalas();
    }).catch((err) => {
      console.error(err);
    })
  }