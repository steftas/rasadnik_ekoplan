<?php

class Root extends CI_Controller{

	function __construct()     //load model
	{
		parent::__construct();
	}

	function index()
	{
		print_r('EKO PLAN API');

		// $x = array(
		// 	'name' => 'milan',
		// 	'lastname' => 'zdravkovic'
		// );

		// echo json_encode($x);

		// $redirect_url = 'assets/test.txt';
		// header('Location: '. $redirect_url);

		$list = array (
		    array('aaa', 'bbb', 'ccc', 'dddd'),
		    array('123', '456', '789'),
		    array('"aaa"', '"bbb"')
		);
		$redirect_url = 'assets/file.csv';

		$fp = fopen('assets/file.csv', 'w');

		foreach ($list as $fields) {
		    fputcsv($fp, $fields);
		}

		fclose($fp);

		header('Location: '. $redirect_url);
	}

	function test() 
	{
		// print_r('root');

		$x = array(
			'name' => 'Marko',
			'lastname' => 'Milosevic'
		);

		echo json_encode($x);

	}
}

?>