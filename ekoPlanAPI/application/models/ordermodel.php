<?php

class ordermodel extends CI_Model {

	// public function __construct()
 //    {
 //        parent::__construct();
 //    }

	// function listOfOrders() {

	// 	$this->db->select();
	// 	$this->db->from('order, orders');
	// 	$this->db->where('order.id = orders.order_id');
	// 	$this->db->where("active = 'true'");
	// 	$this->db->order_by('order.created_time', 'desc');
		
	// 	$query = $this->db->get();
	// 	return $query->result_array();
	// }

	function listOfOrders() {

		$this->db->select();
		$this->db->from('order');
		$this->db->where("active = 'true'");
		$this->db->order_by('created_time', 'desc');
		
		$query = $this->db->get();
		return $query->result_array();
	}

	function updateOrder() {
		$data = array(
			'seen' => 'true'
		);
		$this->db->update('order', $data);

		return true;
	}

	function deleteOrder($id) {

		$data = array(
			'active' => 'false'
		);

		$this->db->where('id', $id);
		$this->db->update('order', $data);

		return true;
	}

	function insertOrder($customer) {
		$this->db->insert('order', $customer);
		return $this->db->insert_id();
	}

	function insertItemOrder($item) {
		$this->db->insert('orders', $item);
		return $this->db->insert_id();
	}

	function getOrderOfOrder($id) {
		$this->db->select();
		$this->db->from('orders');
		$this->db->where('order_id', $id);
		
		$query = $this->db->get();
		return $query->result_array();
	}

	function getMainOrder($id) {
		$this->db->select();
		$this->db->from('order');
		$this->db->where('id', $id);

		$query = $this->db->get();
		return $query->first_row('array');
	}


	function updateOrderById($id) {
		$data = array(
			'seen' => 'true'
		);
		$this->db->where('id',$id);
		$this->db->update('order', $data);

		return true;
	}

}

?>