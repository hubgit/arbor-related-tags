<?
function h($text){
  print htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Related Tags</title>
	  
    <link rel="stylesheet" href="app.css">
  </head>
	
  <body>
	<form method="get">
	  <input name="q" value="<? h($_GET['q']); ?>">
	  <input type="submit" value="graph">
	</form>
	
    <canvas id="viewport" width="400" height="400"></canvas>
	
	<script>var args = <?= json_encode((object) $_GET); ?></script>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
	<script src="./arbor.js"></script>
	<!--<script src="./arbor-tween.js"></script>-->
    <script src="./app.js"></script>
  </body>
</html>