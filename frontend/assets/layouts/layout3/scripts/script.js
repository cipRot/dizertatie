// Script

var $layer_0 = $('.layer-0'),
    $layer_1 = $('.layer-1'), // Astronaut
    $layer_2 = $('.layer-2'), // Cofee
    $layer_3 = $('.layer-3'), // Glasses
    $layer_4 = $('.layer-4'), // donut
    $layer_5 = $('.layer-5'), // donut
    $container = $('body'),
    container_w = $container.width(),
    container_h = $container.height();

$(window).on('mousemove.parallax', function(event) {
  var pos_x = event.pageX,
      pos_y = event.pageY,
      left  = 0,
      top   = 0;
      right = 0;
 
  right = container_w / 10 - pos_x;
  left = container_w / 2 - pos_x;
  top  = container_h / 2 - pos_y;
  TweenMax.to(
    $layer_5, // Donut
    1, 
    { 
      css: { 
        transform: 'translateX(' + right / 9 + 'px) translateY(' + top / 7 + 'px)' 
      }, 
      ease:Expo.easeOut, 
      overwrite: 'all' 
    });  
  TweenMax.to(
    $layer_4, // Donut
    1, 
    { 
      css: { 
        transform: 'translateX(' + right / 9 + 'px) translateY(' + top / 7 + 'px)' 
      }, 
      ease:Expo.easeOut, 
      overwrite: 'all' 
    });
  TweenMax.to(
    $layer_3, // Glasses
    1, 
    { 
      css: { 
        transform: 'translateX(' + right / 9 + 'px) translateY(' + top / 7 + 'px)' 
      }, 
      ease:Expo.easeOut, 
      overwrite: 'all' 
    });
  
  TweenMax.to(
    $layer_2, // Cofee
    1, 
    { 
      css: { 
        transform: 'translateX(' + left / 9 + 'px) translateY(' + top / 7 + 'px)' 
      }, 
      ease:Expo.easeOut, 
      overwrite: 'all' 
    });
  
  TweenMax.to(
    $layer_1, // Astronaut
    1, 
    { 
      css: { 
        transform: 'translateX(' + left / 16 + 'px) translateY(' + top / 10 + 'px)' 
      }, 
      ease:Expo.easeOut, 
      overwrite: 'all' 
    });
  
  TweenMax.to(
    $layer_0,
    10,
    {
      css: {
        transform: 'rotate(' + left / 200 + 'deg)'
      },
      ease: Expo.easeOut,
      overwrite: 'none'
    }
  )
});