$(document).ready(function () {
  var xx = [], 
      $buffer = $('#buffer'), buffer = $buffer[0],
      $canvas = $('#canvas'), canvas = $canvas[0],
      img = new Image(),
      src, paper,
      bctx = buffer.getContext('2d'),
      cctx = canvas.getContext('2d'),
      step = Number(window.location.hash.split('=')[1]) || 4,
      imgs = ['kings.gif'];

  console.log(step);
  

  function grayscale (color) {
    var gr = (Math.round(color[0] * 0.21) + Math.round(color[1] * 0.71) + Math.round(color[2] * 0.07));
    if(! Math.floor(Math.random() * 36)) {
      gr = 255;
    } else {
      if (gr < 255 && gr > 200) {
        gr = 255;
      }
      if (gr < 200 && gr > 150) {
        gr = 200;
      }
      if (gr < 150 && gr > 100) {
        gr = 150;
      }

      if (gr < 100 && gr > 50) {
        gr = 100;
      }

      if (gr < 100) {
        gr = 0;
      }
    }
    return "rgba(" + gr + "," + gr + "," + gr + ",1)";
  }

  function imgLoad () {
    var j = 0, w = img.width, h = img.height;

    for(var i = 0; i < w; i++) {
      if(Math.floor(Math.random() * 9)) {
        xx.push(i);
      }
    }
    $buffer.attr({width: w, height: h});
    bctx.drawImage(img, 0, 0, w, h);

    h *= step
    w *= step

    $canvas.attr({width: w, height: h});

    loop = setInterval(function () {
      var x = 0, l = xx.length, i, p, rbga;
      if(j < h) {
        for(; x < l; x += step) {
          i = xx[x];
          if(i < w) {
             cctx.fillStyle = grayscale(bctx.getImageData(i, j, step, step).data);
             unit = 2 + Math.floor(Math.random() * 38);
             cctx.fillRect(i * step , j * step, 1, unit);
          } 
        }
        j += step;
        console.log('loop: ' + j);
      } else {
        clearInterval(loop);
        console.log('parsed');
        $canvas.remove();
        $buffer.remove();
        src = canvas.toDataURL("image/png");
        document.write('<img src="'+src+'"/>');
      }
    }, 40);
  }   

  img.onload = imgLoad;
  img.src = imgs.shift();
  
});
