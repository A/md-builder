'use strict';

var $buttons  = $('button[type="submit"]');
var $textarea = $('textarea.markdown');
var $theme    = $('select[name="theme"]');


$buttons.on('click', function() {
  var format = $(this).attr('format');
  var content = $textarea.val();
  console.log(format);
  if (!content) return;
  if (!format) return;
  $.ajax({
    type: 'POST',
    url: '/' + format,
    data: {
      content: $textarea.val(),
      theme: $theme.val()
    },
    async: false, // TODO: because of open new window. MAMA IM SO SORRY!!111
    success: function() {
      window.open(res.url);
    }
  });
});
