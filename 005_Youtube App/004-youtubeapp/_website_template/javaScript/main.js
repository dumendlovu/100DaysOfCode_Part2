$(document).ready(function() {
  var APIkey ='AIzaSyBLS_Xm8vtt4zyBpv0GEDJNfqblKznbOdw';
  var plLiID ='PL-IVpXTWXdQ2VLSyJaWOkpGA8jR_7nbu0';
  var url ='https://www.googleapis.com/youtube/v3/playlistItems';

  var options = {
    part: 'snippet',
    key: APIkey,
    maxResults: 20,
    playlistId: plLiID
  }

  loadVids();

  function loadVids(){
    $.getJSON(url, options, function(data){
      console.log(data)
      var id = data.items[0].snippet.resourceId.videoId;
      mainVid(id);
      resultsLoop(data);
    })
  }

  function mainVid(id){
    $('#video').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
  }

  function resultsLoop(data) {
    $.each(data.items, function(i, item){
      var thumb = item.snippet.thumbnails.high.url;
      var title = item.snippet.title;
      var desc = item.snippet.description.substring(0, 100);
      var vid =item.snippet.resourceId.videoId;

      $('main').append('<article class="item" data-key="'+vid+'"><img class="thumbnail" src="'+thumb+'"/><div class="details"><h4>'+title+'</h4><p>'+desc+'</p></div></article>');

    });

    $('article').click(function() {
        var id = $('this, article').attr('data-key');
        alert(id);
        mainVid(id);
    });

    // $('main').on('click', 'article', function() {
    //   var id = $('this, .item').attr('data-key');
    //   alert(id);
    //   mainVid(id);
    // });
  }
});
