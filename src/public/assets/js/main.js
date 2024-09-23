$(document).ready(function(){
    $('body').append(`
         <div class="modal fade" id="alert_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body d-flex flex-column justify-content-center align-items-center px-5">
                <div id="alert_message" class="py-3 px-5 fs-5 text-center">

                </div>
                <div class="pb-3 pt-5">
                  <button type="button" class="btn text-white  bg-col-primary rounded-4 px-5 me-3" id="alert_button">Save changes</button>
                  <button type="button" class="btn  bg-col-secondary rounded-4 px-5 col-primary" data-bs-dismiss="modal" id="alert_close_button">Close</button>
                </div>
              </div>
          
            </div>
          </div>
        </div>
    `);
});

function showAlert(obj){
    $('#alert_modal').modal('show');
    $('#alert_close_button').text(obj.closeText!=undefined ? obj.closeText :'close');
    $('#alert_button').text(obj.acceptText != undefined ? obj.acceptText : 'accept');
    $('#alert_message').text(obj.message != undefined ? obj.message :'Are you sure you want to proceed ?');

    $('#alert_button').click(function(){
        if(obj.acceptFunction != undefined){
            obj.acceptFunction();
        }
        $('#alert_button').off('click');
        $('#alert_modal').modal('hide');
    });
    $('#alert_close_button').click(function(){
        if(obj.closeFunction != undefined){
            obj.closeFunction();
        }
        $('#alert_close_button').off('click');
    });
  }