/*globals app */

/** v-- Insert into script.js? --v **/
app.openModal = function(modal) {
  $('#modal').show();
  $(modal).show();
};

app.closeModal = function(modal) {
  $('#modal').hide();
  $(modal).hide();
};