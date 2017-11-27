<?php

class categorymodel extends CI_Model {

	// public function __construct()
 //    {
 //        parent::__construct();
 //    }

	function insertCategory($data) {
		$this->db->insert('categories', $data);
		return $this->db->insert_id();
	}

	function getCategory() {
		$this->db->select();
		$this->db->from('categories');
		$this->db->where("active = 'true'");
		$this->db->order_by('time_created', 'desc');
		
		$query = $this->db->get();
		return $query->result_array();
	}

	function updateCategory($id, $data) {
		// $data = array(
		// 	'seen' => 'true'
		// );
		$this->db->where('id', $id);
		$this->db->update('categories', $data);

		return true;
	}

	function deleteCategory($id) {

		$data = array(
			'active' => 'false'
		);

		$this->db->where('id', $id);
		$this->db->update('categories', $data);

		return true;
	}

}

?>