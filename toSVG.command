#!/usr/bin/php
<?php 
chdir( dirname ( __FILE__ ) );
$file = 'download.png';

$spec = getimagesize($file);
$w = $spec[0];
$h = $spec[1];

$original = imagecreatefrompng($file);

function fromR($R){
  $R = dechex($R);
  if (strlen($R) < 2) {
     $R = "0$R";
  }
  return "#$R$R$R";
}
$handle = fopen("export/export.svg", "w+");

?>
<svg style="overflow: hidden; position: relative;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="<?php echo $w ?>" version="1.1" height="<?php echo $h ?>">
<?php 
//for($x = 0; $x < $w; $x += 3) {
  //$color = '#ffffff';
  //$off = 0;
  //for($y = 0; $y < $h; $y += 1) {
    //$index = imagecolorat($original, $x, $y);
    //$rgb = imagecolorsforindex($original, $index);
    //$hex = fromR($rgb['red']);
    //if($hex != $color) {
      //if($color != '#ffffff') {
        //$height = $y - $off;
        //echo "<rect transform='matrix(1,0,0,1,0,0)' x='$x' y='$off' width='1' height='$height' r='0' rx='0' ry='0' fill='$color' stroke='#000' stroke-opacity='0'></rect>";
      //}
      //$color = $hex;
      //$off = $y;
    //}
  //}
//};

?>
</svg>
