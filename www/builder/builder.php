<?php 
/**
 * Copyright 2009 by Jonathan Bomgardner
 * License: MIT-style
 */

session_start();

define('DS',DIRECTORY_SEPARATOR);

$basedir = 'src';
$libs = array();
$src = 'Source';

$licenseFile = 'license.txt';

$deps = $_SESSION['deps'];

if ($_POST['mootools-core'] == 'on'){
	$libs[] = 'core';
}
if ($_POST['mootools-more'] == 'on'){
	$libs[] = 'more';
}
$libs[] = 'jxlib';

//get files, concatenate them into a long string for each one
//first core
$srcString = array();
foreach ($libs as $lib){
	$srcString[$lib] = '';
	foreach ($deps[$lib] as $dir => $files){
		foreach ($files as $file => $arr){
			if (in_array($file,$_POST['files']) || $_POST[$lib] == 'full' ) {
				$path = $basedir . DS . $lib . DS . $src . DS . $dir . DS . $file . '.js';
				$srcString[$lib] .= file_get_contents($path);
			}
		}
	}
}

//put the files together as required
$strFiles = array();
switch ($_POST['numFiles']) {
	case "1":
		$strFiles['jxlib'] = implode("\n",$srcString);
		break;
	case "2":
		$strFiles['jxlib'] = $srcString['jxlib'];
		$strFiles['mootools'] = $srcString['core']."\n".$srcString['more'];
		break;
	case "3":
		$strFiles['jxlib'] = $srcString['jxlib'];
		$strFiles['mootools-core'] = $srcString['core'];
		$strFiles['mootools-more'] = $srcString['more'];
		break;
}

//compress the javascript libs as required
$compressed = array();
switch ($_POST['j-compress']){
	case 'jsmin':
		require_once 'includes/jsmin-1.1.1.php';
		foreach ($strFiles as $key => $script){
			$compressed[$key] = JSMin::minify($script);
		}
		break;
	case 'packer':
		require_once 'includes/class.JavaScriptPacker.php';
		foreach ($strFiles as $key => $script){
			$packer = new JavaScriptPacker($script, $encoding, $fast_decode, $special_char);
  			$compressed[$key] = $packer->pack();
		}
		break;
	default:
		$compressed = $strFiles;
		break;
}

//create the zip/tar archive
$work_dir = 'work'.DS;
$archiveDir = session_id();
$filesToArchive = array();

if (!is_dir($work_dir.$archiveDir)){
	mkdir($work_dir.$archiveDir);
}
foreach ($compressed as $key => $f){
	$name = $work_dir.$archiveDir.DS.$key.".js";
	file_put_contents($name,$f);
	$filesToArchive[] = $name;
}

//add theme and image assets to the file list
$iterator = new RecursiveDirectoryIterator('assets');
$it = new RecursiveIteratorIterator($iterator);
while($it->valid()){
	if (!$it->isDot()){
		$filesToArchive[] = 'assets'.DS.$it->getSubPathName();
	}
	$it->next();
}

$archiveName = '';
$fileName = '';
$archiveSubPath = $archiveDir;
//need zlib and bzip2 compression libraries for this part to work.
switch ($_POST['f-compress']){
	case 'zip':
		$fileName = "jxlib.zip";
		$archiveSubPath .= DS.$fileName;
		$archiveName = $work_dir.$archiveSubPath;
		$archive = new ZipArchive();
		$archive->open($archiveName, ZIPARCHIVE::CREATE);
		foreach ($filesToArchive as $file){
			$sections = explode(DS,$file);
			if ($sections[0] == 'work') {
				$archive->addFile($file,$sections[count($sections)-1]);
			} else {
				$archive->addFile($file);
			}
		}
		$archive->close();
		break;
	case 'gzip':
		require_once 'includes/Tar.php';
		$fileName = "jxlib.tar.gz";
		$archiveSubPath .= DS.$fileName;
		$archiveName = $work_dir.$archiveSubPath;
		$tar = new Archive_Tar($archiveName,'gz');
		foreach ($filesToArchive as $file){
			$sections = explode(DS,$file);
			if ($sections[0] == 'work') {
				$tar->addString($sections[count($sections)-1],file_get_contents($file));
			} else {
				$tar->addString($file, file_get_contents($file));
			}
		}
		break;
	case 'bz2':
		require_once 'includes/Tar.php';
		$fileName = "jxlib.tar.bz2";
		$archiveSubPath .= DS.$fileName;
		$archiveName = $work_dir.$archiveSubPath;
		$tar = new Archive_Tar($archiveName,'bz2');
		foreach ($filesToArchive as $file){
			$sections = explode(DS,$file);
			if ($sections[0] == 'work') {
				$tar->addString($sections[count($sections)-1],file_get_contents($file));
			} else {
				$tar->addString($file, file_get_contents($file));
			}
		}
		break;
}

//remove the files from the server
foreach ($filesToArchive as $file){
	$sections = explode(DS,$file);
	if ($sections[0] == 'work'){
		unlink($file);
	}
}

//setup the return object to send via JSON
$obj = new stdClass();
$obj->success = true;
$obj->filename = $fileName;
$obj->folder = $archiveDir;

echo(json_encode($obj));

?>