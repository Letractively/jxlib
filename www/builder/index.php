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
		if ($key === 'jxlib') {
			array_shift($a);
		}
		$depsOut = array_merge($depsOut,$a);
		
	}
}

//sort dependencies
$depsFinal = NULL;
function includeDependency($key, $all, &$sorted) {
  $dep = $all[$key];
  if (is_array($dep['deps'])) {
    foreach($dep['deps'] as $anotherDep) {
      if (!isset($sorted->$anotherDep)) {
        //prevent recursive inclusion of Core since it depends on itself!
        $sorted->$anotherDep = true;
        includeDependency($anotherDep, $all, $sorted);
      }
    }
  }
  $sorted->$key = $all[$key];
}

foreach($depsOut as $key => $dep) {
  includeDependency($key, $depsOut, $depsFinal);
}

$fout = json_encode($depsFinal);
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
	<script type="text/javascript" src="js/slider.js"></script>
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
	
	<h2>Icon Meanings</h2>
	<ul>
		<li><img alt="gray check mark" src="img/check-gray16.png"> - 
			No files in the section have been selected.</li>
		<li><img alt="blue check mark" src="img/check-blue16.png"> -
			Some, but not all, files in the section have been selected.</li>
		<li><img alt="green check mark" src="img/check-green16.png"> - 
			All of the files in that section have been selected.</li>
	</ul>
	
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
							echo "<div class=\"folder\" id=\"core-".$folder."\"><span class=\"folder-name\">".$folder."</span>";
							echo "<span class=\"toggles\">Select: <span class=\"all\">all</span> | <span class=\"none\">none</span></span></span>";
							echo "</div>";
							echo "<div class=\"filelist\">";
							foreach($files as $name => $a){
								echo "<div class=\"file\">";
								echo "<span class=\"check\"><input type=\"checkbox\" name=\"files[]\" value=\"".$name."\" id=\"".$name."\" class=\"dep\"></span>";
								echo "<span class=\"name\">".$name."</span>";
								echo "<span class=\"desc\">".$a['desc']."</span>";
								echo "<br class=\"clear\"/>";
								echo "</div>";
							}
							echo "</div>";
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
				<?php 
					foreach($deps['more'] as $folder => $files){
						echo "<div class=\"folder\" id=\"more-".$folder."\"><span class=\"folder-name\">".$folder."</span>";
						echo "<span class=\"toggles\">Select: <span class=\"all\">all</span> | <span class=\"none\">none</span></span></span>";
						echo "</div>";
						echo "<div class=\"filelist\">";
						foreach($files as $name => $a){
							echo "<div class=\"file\">";
							echo "<span class=\"check\"><input type=\"checkbox\" name=\"files[]\" value=\"".$name."\" id=\"".$name."\" class=\"dep\"></span>";
							echo "<span class=\"name\">".$name."</span>";
							echo "<span class=\"desc\">".$a['desc']."</span>";
							echo "<br class=\"clear\"/>";
							echo "</div>";
						}
						echo "</div>";
					}
				?>
			
			</div>
		</div>
		<!-- JxLib -->
		<div class="library spacer">
			<p>JxLib</p>
			<br class="clear">
		</div>
		<div class="files">		
			<?php 
				foreach($deps['jxlib'] as $folder => $files){
						echo "<div class=\"folder\" id=\"jxlib-".$folder."\"><span class=\"folder-name\">".$folder;
						echo "<span class=\"toggles\">Select: <span class=\"all\">all</span> | <span class=\"none\">none</span></span></span></span>";
						$desc = array_shift($files);
						echo "<span class=\"description\">".$desc."</span>";
						echo "</div>";
						echo "<div class=\"filelist\">";
						foreach($files as $name => $a){
							echo "<div class=\"file\">";
							echo "<span class=\"check\"><input type=\"checkbox\" name=\"files[]\" value=\"".$name."\" id=\"".$name."\" class=\"dep\"></span>";
							echo "<span class=\"name\">".ucfirst($name)."</span>";
							echo "<span class=\"desc\">".$a['desc']."</span>";
							echo "<br class=\"clear\"/>";
							echo "</div>";
						}
						echo "</div>";
					}
			?>
		</div>
		
		<div id="options">
			<!-- Optional Dependencies -->
			<h2>Dependencies</h2>
			<div id="dependencies">
				<input type="checkbox" name="opt-deps" id="opt-deps"/><label>Include Optional Dependencies</label>
			</div>
			<!-- Build options -->
			<h2 class="toggle">Build  <span class="defaults">- selected: <span id="build-choice">All Javascript in one file (jxlib.js)</span></span></h2>
			<div id="build">
				<p>Choose your build configuration:</p>
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
			<h2 class="toggle">Compression <span class="defaults">- selected: <span id="js-choice">JsMin</span> Compression, <span id="file-choice">.tar.gz</span> file type</span></h2>
			<div id="compression">
				<p>Choose one of the following Javascript compression types:</p>
			
				<div id="j-compress">
					<div>
						<input name="j-compress" type="radio" value="jsmin" checked="checked" /><label><span>JsMin</span> by Douglas Crockford (default)</label>
					</div>
					<div>
						<input name="j-compress" type="radio" value="packer" /><label><span>Packer</span> by Dean Edward</label>
					</div>
					<div>
						<input name="j-compress" type="radio" value="none" /><label><span>No</span> compression at all</label>
					</div>
				</div>
				<p>And also one of the following archive/compression combinations for your downloaded file:</p>
				<div id="f-compress">
					<div>
						<input name="f-compress" type="radio" value="gzip" checked="checked" /><label>Tar archive format with gzip compression - <span>.tar.gz</span> (default)</label>
					</div>
					<div>
						<input name="f-compress" type="radio" value="bz2" /><label>Tar archive format with bz2 compression - <span>.tar.bz2</span></label>
					</div>
					<div>
						<input name="f-compress" type="radio" value="zip" /><label>Zip archive format - <span>.zip</span></label>
					</div>
				</div>
			</div>
		</div>
		<div id='download'></div>
			<!-- Launch builder button -->

	</form>
</body>
</html>