// 'use strict';
//
// var $buttons  = $('button[type="submit"]');
// var $textarea = $('textarea.markdown');
// var $theme    = $('select[name="theme"]');
// var $title    = $('input.markdown-title');
//
//
// $buttons.on('click', function() {
//   var format = $(this).attr('format');
//   var content = $textarea.val();
//   var title = $title.val();
//   if (!content) return;
//   if (!format) return;
//   $.ajax({
//     type: 'POST',
//     url: '/' + format,
//     data: {
//       content: $textarea.val(),
//       theme: $theme.val()
//     },
//     success: function(req) {
//       var link = document.createElement('a');
//       link.href = req.url;
//         link.target = '_blank';
//         document.body.appendChild(link);
//         link.click();
//     }, 1000);
// });
//     }
//   });
// });
