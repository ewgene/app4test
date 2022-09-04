var w,l,p,m,m0,rev;

$(function() {
   $(window).on('load', function () {
      if(!w) { w = 20; }
      if(!l) { l = 350; }
      if(!p) { p = 1; }
      if(!m) { m = 3; }
      if(!rev) { rev = 1 }
      rebuildViewport(w,p,l,m,rev);
   });
});

function rebuildViewport(w,p,l,m,rev) {
   $('li').remove();
   $('.viewport').removeClass(m0);
   if(rev < 1) { rev = 1 }
   if(rev > 2) { rev = 2 }
   if(l < 25) { l = 25 }
   if(l > 1000) { l = 1000 }
   if(w < 2) { w = 2 }
   if(w > 60) { w = 60 }
   if(p < 1) { p = 0.5 }
   if(p > 2) { p = 2 }
   if(((w > 30 && l > 50) || p == 2 || l > 400) && m > 2) { m = 2 }
   if(((w > 45 && l > 100) || l > 600) && m > 1) { m = 1 }
   var f = l/3 + 20;
   $('.viewport').addClass('m' + m);
   $('ul').each(function () {
      var list = $(this);
      for(i = 0; i < Math.floor((w * p)/2) + 1; i++) {
         list.append("<li class='active'>");
         var t = list.find('.active');
         if(list.hasClass('bottom')) {
            var tc = {
               'bottom': (m * i) + 'px',
               'right': (-2 * m * i) + 'px',
               'z-index': (100 - i)
            }
         } else {
            var tc = {
               'top': (-m * i) + 'px',
               'left': (2 * m * i) + 'px',
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
        "bottom": parseInt($('.cable-flat.bottom').css('bottom')) + Math.floor(f*Math.sin(Math.PI/12)) + 'px',
        "right": parseInt($('.cable-flat.bottom').css('right')) + Math.floor(f*Math.cos(Math.PI/12)) + 'px'
   };
   $('.cable-connector.right').css(cr);
   $('.cable-connector.left').css(cl);
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
   if(l > 25 && l < 100) { $("input[name='l']").attr('step', 5); }
   if(l >= 100 && l < 200) { $("input[name='l']").attr('step', 10); }
   if(l >= 200 && l < 500) { $("input[name='l']").attr('step', 20); }
   if(l >= 500 && l <= 1000) { $("input[name='l']").attr('step', 50); }
   m0 = 'm' + m;
}