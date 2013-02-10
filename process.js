$(document).ready(function () {
  var xx = [], 
      $buffer = $('#buffer'), buffer = $buffer[0],
      $canvas = $('#canvas'), canvas = $canvas[0],
      img = new Image(),
      src,
      bctx = buffer.getContext('2d'),
      cctx = canvas.getContext('2d'),
      imgs = ['kings.gif'];

  for(var i = 0; i < 1000; i++) {
    if(Math.floor(Math.random() * 6)) {
      xx.push(i);
    }
  }

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
    var j = 0;

    bctx.drawImage(img, 0, 0, img.width, img.height);

    loop = setInterval(function () {
      var x = 0, l = xx.length, i, p, rbga;
      if(j < img.height) {
        for(; x < l; x += 3) {
          i = xx[x];
          if(i < img.width) {
             cctx.fillStyle = grayscale(bctx.getImageData(i, j, 3, 3).data);
             unit = 2 + Math.floor(Math.random() * 38);
             cctx.fillRect(i * 3 , j * 3, 1, unit);
          } 
        }
        j += 3;
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
//var i, x = 0, l = xx.length - 1, j = 0, p, gr, unit, hex;


  //for(; x < l; x += 1) {
  //i = xx[x];
  //if(i < img.width) {
  //for(j = 0; j < img.height; j += 2) {
  //p = ctx.getImageData(i, j, 2, 2).data;
  //gr = ((p[0] * .21) + (p[1] * .71) + (p[2] * .07));
  //hex = "#fff";
////if(gr < 130) {
//// hex = "#82d0f5";
////} 

//if(gr < 120) {
//hex = "#009fe3";
//} 

//unit = 4 + Math.floor(Math.random() * 36);
//if(hex !== '#fff') {
//rect = paper.rect(yOff + (i * 6) , j * 6 , 2, unit);
//rect.attr({
//fill: hex,
//'stroke-opacity': 0
//});
//}
//}
//}
//}

//if(imgs.length) {
//yOff += 120;
//img.src = imgs.shift();
//} else {
//canvas.parentNode.removeChild(canvas);
//console.log(paper.toSVG());
//} 

