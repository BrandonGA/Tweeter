$( document ).ready(function() {

  $('textarea').on('keyup', function() {
    var len = 140 - $(this).val().length
    var counter = $(this).parent().find('.counter')
    counter.text(len)
    if (len === null) {
      $('.goAhead-message').show();
    }
      else if ( len < 0 ) {
        $('.counter').css({'color': 'red'})
        $('.tweet-button').prop('disabled', true);
        $('.warning-message').show();
        $('.goAhead-message').hide()
      } else {
          $('.counter').css({'color': 'black'})
          $('.tweet-button').prop('disabled', false);
          $('.warning-message').hide();
          $('.goAhead-message').hide()
        }
        console.log(len)
  });

});
