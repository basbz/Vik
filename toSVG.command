#!/usr/bin/php
<?php 

$step = 1;
fwrite(STDOUT, "Omzetten naar vectoren \r\n");

chdir( dirname ( __FILE__ ) );
$file = 'download.png';
$spec = getimagesize($file);
$w = $spec[0];
$h = $spec[1];

$original = imagecreatefrompng($file);

function fromR($R, $G, $B){
  $R = dechex($R);
  if (strlen($R) < 2) {
     $R = "0$R";
  }
  $G = dechex($G);
  if (strlen($G) < 2) {
     $G = "0$G";
  }
  $B = dechex($B);
  if (strlen($B) < 2) {
     $B = "0$B";
  }
  return "#$R$G$B";
}
$handle = fopen("export/export.svg", "w+");
ob_start();


?>
<svg style="overflow: hidden; position: relative;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="<?php echo $w ?>" version="1.1" height="<?php echo $h ?>">
<?php 
  for($x = 0; $x < $w; $x += $step) {
    $color = '#000000';
    $off = 0;
    fwrite(STDOUT, ".");
    for($y = 0; $y < $h; $y += 1) {

      $index = imagecolorat($original, $x, $y);
      $rgb = imagecolorsforindex($original, $index);
      $hex = fromR($rgb['red'], $rgb['green'], $rgb['blue']);
      if($hex != $color) {
        if($color != '#ffffff') {
          $height = $y - $off;
          echo "<rect transform='matrix(1,0,0,1,0,0)' x='$x' y='$off' width='1' height='$height' r='0' rx='0' ry='0' fill='$color'></rect>";
        }
        $color = $hex;
        $off = $y;
      }
    }
    if($color != '#ffffff') {
      $height = $h - $off;
      echo "<rect transform='matrix(1,0,0,1,0,0)' x='$x' y='$off' width='1' height='$height' r='0' rx='0' ry='0' fill='$color'></rect>";
    }
  };

?>
</svg>
<?php
fwrite($handle, ob_get_clean());
fclose($handle);
?>
