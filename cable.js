var w,l,p,p0,rev,z;

$(function() {
   $(window).on('load', function () {
      if(!w) { w = 20; }
      if(!l) { l = 350; }
      if(!p) { p = 1; }
      if(!rev) { rev = 1 }
      if(!z) { z = 1 }
      rebuildViewport(w,p,l,z,rev);
   });
});

function rebuildViewport(w,p,l,z,rev) {
   $('li').remove();
   $('.viewport').removeClass(p0);
   if(rev < 1) { rev = 1 }
   if(rev > 2) { rev = 2 }
   if(l < 25) { l = 25 }
   if(l > 1000) { l = 1000 }
   if(w < 2) { w = 2 }
   if(w > 60) { w = 60 }
   if(p < 1) { p = 0.5 }
   if(p > 2) { p = 2 }
   if(z == 0) { z = 1 }
   if(z > 3) { z = 3 }
   var f = (l - l/4)/z;
   var s = Math.floor(parseInt(p) + 1);
   $('.viewport').addClass('p' + s);
   $('ul').each(function () {
      var list = $(this);
      for(i = 0; i < w/z; i++) {
         list.append("<li class='active'>");
         var t = list.find('.active');
         if(list.hasClass('bottom') || list.hasClass('left')) {
            var tc = {
               'bottom': (s * i) + 'px',
               'right': (-2 * s * i) + 'px',
            }
         } else {
            var tc = {
               'top': (-s * i) + 'px',
               'left': (2 * s * i) + 'px',
               'z-index': (100 - i)
            }
         }
         t.css(tc);
         if(list.hasClass('cable-flat')) {
            t.css('width', f + 'px');
         }
         t.removeClass('active');
      }
   });
   var cr = {
        "top": Math.round(f*Math.sin(Math.PI/12)) + parseInt($('.cable-flat.top').css('top')) + 'px',
        "left": Math.round(f*Math.cos(Math.PI/12)) + parseInt($('.cable-flat.top').css('left')) + 'px'
   };
   var cl = {
        "bottom": parseInt($('.cable-flat.bottom').css('bottom')) + Math.round(f*Math.sin(Math.PI/12)) + Math.ceil(Math.sin(Math.PI/12)*parseInt($('.cable-connector li').css('height'))/z) + 'px',
        "right": parseInt($('.cable-flat.bottom').css('right')) + Math.round((f - 30/z)*Math.cos(Math.PI/12)) + 30/z + 'px'
   };
   $('.cable-connector.right').css(cr);
   $('.cable-connector.left').css(cl);
   $('.cable-connector li').css('width', 30/z + 'px');
   if(rev == 2) { 
      $('.cable-connector.left').addClass('disabled');
      var r = 'REV';
   } else {
      $('.cable-connector.left').removeClass('disabled');
      var r = '';
   }
   $('.cable-connector').css('visibility', 'visible');
   var c = ' BLFPC ' + 'P' + p + ' ' + w + 'PIN ' + l + 'mm ' + r;
   $('.choice').text(c);
   $("input[name='w']").val(w);
   $("input[name='p']").val(p);
   $("input[name='l']").val(l);
   $("input[name='rev']").val(rev);
   $("input[name='z']").val(z);
   if(l > 25 && l < 100) { $("input[name='l']").attr('step', 5); }
   if(l >= 100 && l < 200) { $("input[name='l']").attr('step', 10); }
   if(l >= 200 && l < 500) { $("input[name='l']").attr('step', 20); }
   if(l >= 500 && l <= 1000) { $("input[name='l']").attr('step', 50); }
   p0 = 'p' + s;
}