console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new object
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then ((response)=> {
    $('#viewKoalas').empty();
    console.log('GET /koalas response', response);
    for (let koalas of response) {
      $('#viewKoalas').append(`
        <tr>
          <td>{$koalas.name}</td>
          <td>{$koalas.gender}</td>
          <td>{$koalas.ready_to_transfer}</td>
          <td>{$koalas.notes}</td>
          <td><button class="transferButton">Ready For Transfer</button></td>
        </tr>
      `);
    }
  })
  // ajax call to server to get koalas
  
} // end  getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas - ADAM HERE
    const newKoala = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      transferStatus: $('#readyForTransferIn').val()
      notes: $('#notesIn').val(),
    }
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
