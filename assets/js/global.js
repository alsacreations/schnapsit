$(document).ready(function () {

  //  Audio
  var audioplaying = false;

  $('#tts1').on('ended', function () {
    $('.js-audio').val('version audio');
    audioplaying = false;
  });
  $('.js-audio').on('click', function (e) {
    if (audioplaying) {
      $(this).val('version audio');
      $('#tts1').get(0).pause();
      $('#tts1').get(0).currentTime = 0;
      audioplaying = false;
    } else {
      $(this).val('stop');
      $('#tts1').get(0).play();
      audioplaying = true;
    }
  });

});
