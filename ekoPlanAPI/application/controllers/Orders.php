<?php

class Orders extends CI_Controller{

	function __construct()     //load model
	{
		parent::__construct();
	}

	function getOrders() {
		$_POST = json_decode(file_get_contents('php://input'), true);

		$data['result'] = false;
		$this->load->model('ordermodel');
		$orders = $this->ordermodel->listOfOrders();
		// $updateSeen = $this->ordermodel->updateOrder();

		if ($orders) {
			$data['result'] = $orders;
		}

		echo json_encode($data);
	}

	function deleteOrder() {
		$_POST = json_decode(file_get_contents('php://input'), true);

		$data['result'] = false;
		$deleteOrder = false;
		if($_POST && $_POST['id'] != '') {
			$this->load->model('ordermodel');
			$deleteOrder = $this->ordermodel->deleteOrder($_POST['id']);
		}		

		if ($deleteOrder) {
			$data['result'] = true;
		}

		echo json_encode($data);
	}

	function createOrder() {
		$_POST = json_decode(file_get_contents('php://input'), true);

		$data['result'] = false;

		$customer = $_POST['data'];

		if ($_POST) {

			$order = array(
				'cust_name' => $customer['name'],
				'cust_lname' => $customer['lastname'],
				'cust_adress' => $customer['address'],
				'cust_post' => $customer['zip'],
				'cust_city' => $customer['city'],
				'cust_email' => $customer['email'],
				'price' => $customer['price'],
				'seen' => 'false',
				'active' => 'true'
			);

			if (array_key_exists('custom_added', $customer)) {
			    $order['custom_added'] = $customer['custom_added'];
			} else {
				$order['custom_added'] = 'false';
			}

			if (array_key_exists('order_state', $customer)) {
			    $order['order_state'] = $customer['order_state'];
			}

			if (array_key_exists('phone', $customer)) {
				$order['cust_phone'] = $customer['phone'];
			} else {
				$order['cust_phone'] = 'Nema Broja';
			}

			if (array_key_exists('datum_dospeca', $customer)) {
				$order['datum_dospeca'] = $customer['datum_dospeca'];
			}

			if (array_key_exists('order_text', $customer)) {
				$order['order_text'] = $customer['order_text'];
			}

			$this->load->model('ordermodel');
			$id = $this->ordermodel->insertOrder($order);
			$data['result'] = $id;
		}

		echo json_encode($data);
	}

	function createItemOrders() {
		$_POST = json_decode(file_get_contents('php://input'), true);

		$data['result'] = false;

		$item = $_POST['item'];
		$order_id = $_POST['order_id'];

		if ($_POST) {
			$items = array(
				'name' => $item['name'],
				'price' => $item['price'],
				'quantity' => $item['quantity'],
				'order_id' => $order_id
			);
			$this->load->model('ordermodel');
			$id = $this->ordermodel->insertItemOrder($items);
			$data['result'] = true;
		}
		echo json_encode($data);
	}

	function getListofOrders() {
		$_POST = json_decode(file_get_contents('php://input'), true);

		$data['result'] = false;

		if ($_POST) {
			$id = $_POST['id'];
			$this->load->model('ordermodel');
			$order = $this->ordermodel->getMainOrder($id);

			if ($order['custom_added'] == 'true') {
				$data['result'] = $order['order_text'];
			} else {
				$orders = $this->ordermodel->getOrderOfOrder($id);
				$data['result'] = $orders;
			}

			// $orders = $this->ordermodel->getOrderOfOrder($id);
			// $data['result'] = $orders;

			if ($order['seen'] != 'true')
				$this->ordermodel->updateOrderById($id);			
		}

		echo json_encode($data);
	}

	function sendMailContact() {
		$redirect_url = 'http://rasadnikekoplan.com/#!/mail_success';

		if ($_POST) {
			$name = $_POST['name'];
			$mailfrom = $_POST['email'];
			$message = $_POST['message'];


			$to = 'office@rasadnikekoplan.com';
			$subject = 'Poruka sa kontak strane';

			mail($to, $subject, $message, "From: $name <$mailfrom>");
		}


		header('Location: '. $redirect_url);
	}

	function sendMailOrder() {
		$_POST = json_decode(file_get_contents('php://input'), true);

		$data['result'] = false;

		$customer = $_POST['customer'];
		$items = $_POST['items'];

		foreach ($items as $item) {
			$itemName = $item['name'];
			$itemPrice = $item['price'];
			$itemQuantity = $item['quantity'];
		}

		print_r($_POST['items']);

		if ($_POST) {

			$order = array(
				'cust_name' => $customer['name'],
				'cust_lname' => $customer['lastname'],
				'cust_adress' => $customer['address'],
				'cust_post' => $customer['zip'],
				'cust_city' => $customer['city'],
				'cust_phone' => $customer['phone'],
				'cust_email' => $customer['email'],
				'price' => $customer['price']
			);

			$name = 'RASADNIK Eko-Plan';
			$mailfrom = 'office@rasadnikekoplan.com';
			$ime = $customer['name'];
			$prezime = $customer['lastname'];
			$adresa = $customer['address'];
			$zip = $customer['zip'];
			$grad = $customer['city'];
			$tel = $customer['phone'];
			$racun = $customer['price'] + 280;

			$to = $customer['email'];
			$subject = 'Narudžbenica sa sajta Eko-plan';
			$message  = "<html>
							<head>
								<title>Račun EKo-plan</title>
								<meta charset='utf-8'>
							</head>
							<body style='background: #7dbc6a; padding: 15px; box-sizing: border-box; margin: 0;color: #2d1604;''>
								<div style='background: #fff;box-sizing: border-box;padding: 10px;border: 1px solid #2d1604;'>
									<img src='http://rasadnikekoplan.com/assets/img/logo.png' width='100' height='100'/>
									<h2>Pozdrav, $ime $prezime</h2>
									<p>Zahvaljujemo se na Vašoj porudžbini na sajtu www.rasadnikekoplan.com</p>
									<h3>Adresa za isporuku i naplatu:</h3>
									<p>$ime $prezime</p>
									<p>$adresa, $zip, $grad</p>								
									<p>Telefon: $tel</p>

									<h2>Vaša porudžbina:</h2>
									<table style='width: 100%; font-size: 18px;'>
										<thead>
											<tr>
												<th style='width: 60%; border-bottom: 1px solid #333; text-align:left;'>Naziv</th>
												<th style='width: 25%; border-bottom: 1px solid #333; text-align:right'>Cena proizvoda</th>
												<th style='width: 15%; border-bottom: 1px solid #333; text-align:right;'>Kolicina</th>
											</tr>
										</thead>
										<tbody>";
			foreach ($items as $item) {
				$itemName = $item['name'];
				$itemPrice = $item['price'];
				$itemQuantity = $item['quantity'];
				$message.= "<tr>
								<td>$itemName</td>
								<td style='text-align: right;'>$itemPrice,00 RSD</td>
								<td style='text-align: right;'>$itemQuantity</td>
							</tr>";
			};									

			$message.= "			</tbody>
										<tfoot>
											<tr>
												<td style='border-top: 1px solid #333;'></td>
												<td style='text-align: right; border-top: 1px solid #333;'>Isporuka</td>
												<td style='text-align: right; border-top: 1px solid #333;'>280,00 RSD</td>
											</tr>
											<tr>
												<td></td>
												<td style='text-align: right;'>Ukupno</td>
												<td style='text-align: right;'>$racun,00 RSD</td>
											</tr>
										</tfoot>
									</table>
									<p><b>Metod isporuke:</b> Dostava brzom poštom.</p>
									<h3>Srdačan pozradv, <br>Vaš EKO-PLAN</h3>
								</div>
							</body>
						</html>";
			
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			$headers .= 'From: <office@rasadnikekoplan.com>' . "\r\n";

			mail($to, $subject, $message, $headers);
			mail($mailfrom, $subject, $message, $headers);
			$data['result'] = true;
		}

		echo json_encode($data);
	}


	function check() {

		$this->load->model('ordermodel');
		$orders = $this->ordermodel->listOfOrders();
		print_r($orders);
	}
}

?>