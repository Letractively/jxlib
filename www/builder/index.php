<?php
/**
 * Copyright 2009 by Jonathan Bomgardner
 * License: MIT-style
 */
session_start();

define('DS',DIRECTORY_SEPARATOR);

$basedir = 'src';
$sdirs = array('core','more','jxlib');
$file = 'Source/scripts.json';
$deps = array();
$depsOut = array();
/**
 * grab all scripts.json files, translate to php data structures
 * We do this so we don't have to manually update this file each time
 * we change the source files. 
 */
foreach($sdirs as $d){
	$path = $basedir . DS . $d . DS . $file; 
	$f = file_get_contents($path);
	$deps[$d] = json_decode($f,true);
}

//flatten the depsOut array
foreach($deps as $key => $arr){
	foreach ($arr as $k => $a){
		$depsOut = array_merge($depsOut,$a);
	}
}
$fout = json_encode($depsOut);
file_put_contents('./work/deps.json',$fout);

$_SESSION['deps'] = $deps;

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>JxLib Download Builder</title>
	<link rel="stylesheet" href="../lib/themes/crispin/jxtheme.css" type="text/css" media="screen" charset="utf-8">
	<link rel="stylesheet" href="../css/home.css" type="text/css" media="screen" charset="utf-8">
	<link rel="stylesheet" href="css/builder.css" type="text/css" media="screen" charset="utf-8">
	
	<!-- Javascript for the builder -->
	<script type="text/javascript" src="../lib/jxlib.js"></script>
	<script type="text/javascript" src="js/builder.js"></script>
	<script type="text/javascript">
		window.addEvent('domready',function(){
			var b = new builder(); 
		});
	</script>
	
</head>
<body>

	<h1>JxLib Downloads Builder</h1>
	
	<p>Introductory text goes here</p>
	
	<!-- Start the actual builder -->
	<form action="builder.php" id="builder-form" method="post">
		<!-- Mootools Core -->
		<div id="moo-core">
			<div class="library">
				<p>Mootools Core</p>
				<div>
					<label>Include this Library:</label>
					<input type="checkbox" name="mootools-core"	id="mootools-core"/>
				</div>
				<br class="clear">
			</div>
			<div class="library-selector" id="core-selector">
				<div>
					<input type="radio" name="core" value="full" id="core-full"/>
					<label>Include full library</label>
				</div>
				<div>
					<input type="radio" name="core" value="deps" id="core-deps"/>
					<label>Include dependencies only</label>
				</div>
				<br class="clear">
			</div>
			<div class="files" id="core-files">
				<table>
					<?php 
						foreach($deps['core'] as $folder => $files){
							echo "<div class=\"folder\">".$folder."</div>";
							foreach($files as $name => $a){
								echo "<div class=\"file\">";
								echo "<span class=\"check\"><input type=\"checkbox\" name=\"files[]\" value=\"".$name."\" id=\"".$name."\" class=\"dep\"></span>";
								echo "<span class=\"name\">".$name."</span>";
								echo "<span class=\"desc\">".$a['desc']."</span>";
								echo "<br class=\"clear\"/>";
								echo "</div>";
							}
						}
					?>
				</table>
			</div>
		</div>
		<!-- Mootools More -->
		<div id="moo-more">
			<div class="library spacer">
				<p>Mootools More</p>
				<div>
					<label>Include this Library:</label>
					<input type="checkbox" name="mootools-more"	id="mootools-more"/>
				</div>
				<br class="clear">
			</div>
			<div class="library-selector" id="more-selector">
				<div>
					<input type="radio" name="more" id="more-full" value="full"/>
					<label>Include full library</label>
				</div>
				<div>
					<input type="radio" name="more" id="more-deps" value="deps"/>
					<label>Include dependencies only</label>
				</div>
				<br class="clear">
			</div>
			<div class="files" id="more-files">
				<table>
					<?php 
						foreach($deps['more'] as $folder => $files){
							echo "<div class=\"folder\">".$folder."</div>";
							foreach($files as $name => $a){
								echo "<div class=\"file\">";
								echo "<span class=\"check\"><input type=\"checkbox\" name=\"files[]\" value=\"".$name."\" id=\"".$name."\" class=\"dep\"></span>";
								echo "<span class=\"name\">".$name."</span>";
								echo "<span class=\"desc\">".$a['desc']."</span>";
								echo "<br class=\"clear\"/>";
								echo "</div>";
							}
						}
					?>
				</table>
			</div>
		</div>
		<!-- JxLib -->
		<div class="library spacer">
			<p>JxLib</p>
			<br class="clear">
		</div>
		<div class="files">
			<table>
				<?php 
					foreach($deps['jxlib']['js'] as $name => $a){
						echo "<div class=\"file\">";
						echo "<span class=\"check\"><input type=\"checkbox\" name=\"files[]\" value=\"".$name."\" id=\"".$name."\" class=\"dep\"></span>";
						echo "<span class=\"name\">".ucfirst($name)."</span>";
						echo "<span class=\"desc\">".$a['desc']."</span>";
						echo "<br class=\"clear\"/>";
						echo "</div>";
					}
				?>
			</table>
		</div>
		
		<div id="options">
			<!-- Optional Dependencies -->
			<h2>Dependencies</h2>
			<div>
				<input type="checkbox" name="opt-deps" id="opt-deps"/><label>Include Optional Dependencies</label>
			</div>
			<!-- Build options -->
			<h2>Build</h2>
			<p>Choose your build configuration:</p>
			<div id="build">
				<div>
					<input type="radio" name="numFiles" id="jxlib" value='1' checked="checked"/><label>All Javascript in one file (jxlib.js)</label>
				</div>			
				<div>
					<input type="radio" name="numFiles" id="jxlib-moo" value='2'/><label>JxLib in one file (jxlib.js), All of Mootools in a separate file (mootools.js)</label>
				</div>
				<div>
					<input type="radio" name="numFiles" id="jxlib-core-more" value='3'/><label>JxLib in one file (jxlib.js), Mootools-core and -more in their own files (mootools-core.js,mootools-more.js)</label>
				</div>
				
			</div>
			<!-- compression options -->
			<h2>Compression</h2>
			<p>Choose one of the following Javascript compression types:</p>
			<div id="j-compress">
				<div>
					<input name="j-compress" type="radio" value="jsmin" checked="checked" /><label>JsMin by Douglas Crockford (default)</label>
				</div>
				<div>
					<input name="j-compress" type="radio" value="packer" /><label>Packer by Dean Edward</label>
				</div>
				<div>
					<input name="j-compress" type="radio" value="none" /><label>No compression at all</label>
				</div>
			</div>
			<p>And also one of the following archive/compression combinations for your downloaded file:</p>
			<div id="f-compress">
				<div>
					<input name="f-compress" type="radio" value="gzip" checked="checked" /><label>Tar archive format with gzip compression - .tar.gz (default)</label>
				</div>
				<div>
					<input name="f-compress" type="radio" value="bz2" /><label>Tar archive format with bz2 compression - .tar.bz2</label>
				</div>
				<div>
					<input name="f-compress" type="radio" value="zip" /><label>Zip archive format - .zip</label>
				</div>
			</div>
		</div>
		<h2>Download</h2>
		<div id='download'></div>
			<!-- Launch builder button -->

	</form>
</body>
</html>