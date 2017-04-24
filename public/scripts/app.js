 /*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 // Test / driver code (temporary). Eventually will get this from the server.

 function createTweetElement (tweetD) {
   let tweet = `<article class='tweets'>
   <header>
   <img src="${tweetD.user.avatars.small}" alt="">
   <h1>${tweetD.user.name}</h1>
   <span>${tweetD.user.handle}</span>
   </header>
   <p class="tweet-input">${tweetD.content.text}</p>
   <footer>
   <span>${tweetD.created_at}</span>
   <span class="icons"> <i class="fa fa-flag" aria-hidden="true"></i>       <i class="fa fa-retweet" aria-hidden="true"></i>           <i class="fa fa-heart" aria-hidden="true"></i></span>
   </footer>
   </article>`
   return tweet;
 }

function renderTweets (tweets) {
 let render_html = ''
 tweets.forEach(function(tweet){
   render_html += createTweetElement(tweet)
 })
 $('#tweets').html(render_html)
}

$(document).ready(function() {

  $( ".new-tweet" ).slideUp()
  $( ".compose-button" ).on("click", function(event) {
  $( ".new-tweet" ).slideToggle();
  $( ".textarea" ).focus();
  });

  loadTweets()



var $form = $('.new-tweet form');
$form.on('submit', function(ev) {
  ev.preventDefault();
  console.log($form.serialize());
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: $form.serialize(),
    datatype: 'JSON',
    success: function (tweet){
      $('section.new-tweet textarea').val('');
      $(".counter").text('140')
      console.log('Success: ', tweet);
      $('section#tweets').prepend(createTweetElement(tweet))
    }
  });
});

  function loadTweets () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      datatype: 'JSON',
      success: function (tweets) {
        renderTweets(tweets)
        console.log('success: ', tweets);

      }
    })
  }
});
