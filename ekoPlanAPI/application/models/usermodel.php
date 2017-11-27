<?php

class usermodel extends CI_Model {

	// public function __construct()
 //    {
 //        parent::__construct();
 //    }

	function login($username, $password) {
		$where = array(
			'username'=>$username,
			'password'=>$password 
			);
		$this->db->select()->from('user')->where($where);
		$query=$this->db->get();
		return $query->first_row('array');
	}

	function getUsers() {
		$this->db->select();
		$this->db->from('user');

		$query = $this->db->get();
		$result = $query->result_array();
		return $result;
	}
}

?>