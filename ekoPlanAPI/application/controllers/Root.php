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