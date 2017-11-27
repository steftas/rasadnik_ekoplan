<?php

class productmodel extends CI_Model {

	// public function __construct()
 //    {
 //        parent::__construct();
 //    }

	function insertProduct($data) {
		$this->db->insert('product', $data);
		return $this->db->insert_id();
	}

	function getProduct() {
		$this->db->select();
		$this->db->from('product');
		$this->db->where("active = 'true'");
		$this->db->order_by('created_time', 'desc');
		
		$query = $this->db->get();
		return $query->result_array();
	}

	function getProductByCategory($category) {
		$this->db->select();
		$this->db->from('product');
		$this->db->where('categoryName', $category);
		$this->db->where("active = 'true'");
		$this->db->order_by('created_time', 'desc');

		$query = $this->db->get();
		return $query->result_array();
	}

	function getProductById($id) {
		$this->db->select();
		$this->db->from('product');
		$this->db->where('id', $id);

		$query = $this->db->get();
		return $query->first_row('array');
	}

	function updateProduct($id, $data) {
		// $data = array(
		// 	'seen' => 'true'
		// );
		$this->db->where('id', $id);
		$this->db->update('product', $data);

		return true;
	}

	function deleteProduct($id) {

		$data = array(
			'active' => 'false'
		);

		$this->db->where('id', $id);
		$this->db->update('product', $data);

		return true;
	}

}

?>