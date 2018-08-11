<?php

class User extends CI_Controller{

	function __construct()     //load model
	{
		// $this->load->model('UserModel');
		// $this->load->model('User');
		parent::__construct();
	}

	function login() {

		$_POST = json_decode(file_get_contents('php://input'), true);

		$data['result'] = false;
		if($_POST && $_POST['username'] != '' && $_POST['password'] != '')
		{
			$this->load->model('usermodel');
			$username = $this->input->post('username',true);
			$password = $this->input->post('password',true);
			$user = $this->usermodel->login($username, $password);

			if($user)
			{
				$data['result'] = true;
			} else {
				$data['result'] = false;
			}
		}

		echo json_encode($data);
	}

	function check() {

		$this->load->model('usermodel');
		$user = $this->usermodel->getUsers();
		$x = 'milan';
		print_r($user);
	}

	function getNumbers() {
		## todo ##
	}
}

?>