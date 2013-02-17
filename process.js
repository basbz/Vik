$(document).ready(function () {
  var xx = [], 
      $buffer = $('#buffer'), buffer = $buffer[0],
      $canvas = $('#canvas'), canvas = $canvas[0],
      img = new Image(),
      src, paper,
      bctx = buffer.getContext('2d'),
      cctx = canvas.getContext('2d'),
      spec = {}, step, scale,
      imgs = ['kings.gif'];

  window.location.hash.substr(1).split('&').forEach(function (params) {
    var param = params.split('=');
    spec[param[0]] = Number(param[1]);
  });

  step = spec.step || 4;
  scale = spec.scale || 1;

  console.log(step, scale);
  
  function isRed(color) {
    return Number(color[0]) > 127 &&  Number(color[1]) < 127 && Number(color[2]) < 127;
  }

  function grayscale (color) {
    var gr = (Math.round(color[0] * 0.21) + Math.round(color[1] * 0.71) + Math.round(color[2] * 0.07));
    if(! Math.floor(Math.random() * 36) || gr > 235) {
      return "rgba(255, 255, 255, 1)";
    } else {
      return "rgba(0, 0, 0, 1)";
    }
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

    h *= scale;
    w *= scale;

    $canvas.attr({width: w, height: h});

    cctx.fillStyle = '#ffffff'; 
    cctx.fillRect(0, 0, w, h);
    loop = setInterval(function () {
      var x = 0, l = xx.length, i, p, rbga;
      if(j < h) {
        for(; x < l; x += step) {
          i = xx[x];
          if(i < w) {
            p = bctx.getImageData(i, j, step, step).data;
            if(isRed(p)) {
              cctx.fillStyle = "rgba(255, 0, 0,1)";
            } else {
              cctx.fillStyle = grayscale(p);
            }
            unit = 2 + Math.floor(Math.random() * 38);
            cctx.fillRect(i * scale, j * scale, 1, unit);
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
