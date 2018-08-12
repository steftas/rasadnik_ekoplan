<?php

class Product extends CI_Controller{

	function __construct()     //load model
	{
		parent::__construct();
	}

	function getProducts() {
		$_POST = json_decode(file_get_contents('php://input'), true);
		$data['result'] = false;

		$this->load->model('productmodel');
		$products = $this->productmodel->getProduct();

		$productSorted = array();
		foreach ($products as $product) {
			if ($product['prodavnicaOdabrano'] == 'true') {
				$productSorted[] = $product;
			}
		}
		foreach ($products as $product) {
			if ($product['prodavnicaOdabrano'] != 'true') {
				$productSorted[] = $product;
			}
		}
		$data['result'] = $productSorted;

		echo json_encode($data['result']);
	}

	function getProductByCategory() {
		$_POST = json_decode(file_get_contents('php://input'), true);
		$data['result'] = false;

		if ($_POST) {
			$category = $_POST['category'];
			$this->load->model('productmodel');
			$products = $this->productmodel->getProductByCategory($category);
			$data['result'] = $products;
		}

		echo json_encode($data['result']);
	}

	function getProductById() {
		$_POST = json_decode(file_get_contents('php://input'), true);
		$data['result'] = false;

		if ($_POST) {
			$id = $_POST['id'];
			$this->load->model('productmodel');
			$products = $this->productmodel->getProductById($id);
			$data['result'] = $products;
		}

		echo json_encode($data['result']);
	}

	function deleteProduct() {
		$_POST = json_decode(file_get_contents('php://input'), true);

		$data['result'] = false;
		if ($_POST) {
			$id = $_POST['id'];
			$this->load->model('productmodel');
			$id = $this->productmodel->deleteProduct($id);
			$data['result'] = true;
		}
		echo json_encode($data['result']);
	}

	function insertProduct() {
		$_POST = json_decode(file_get_contents('php://input'), true);		

		$data['result'] = false;
		if ($_POST) {
			$params = $_POST['data'];
			$params['active'] = 'true';
			$this->load->model('productmodel');
			$id = $this->productmodel->insertProduct($params);
			$data['result'] = true;
		}
		echo json_encode($data['result']);
	}

	function updateProduct() {
		$_POST = json_decode(file_get_contents('php://input'), true);		

		$data['result'] = false;
		if ($_POST) {
			$params = $_POST['data'];
			$id = $_POST['id'];
			$params['active'] = 'true';
			$this->load->model('productmodel');
			$id = $this->productmodel->updateProduct($id, $params);
			$data['result'] = true;
		}
		echo json_encode($data['result']);
	}

	function insertProductImage() {
		$this->load->model('productmodel');
		$redirect_url = 'http://rasadnikekoplan.com/#!/admin_proizvodi';
		$save_file_path = '../assets/img/proizvodi/';
		$width = 400;
		$height = 400;
		print('LOADING...');

		// print_r($_POST);

		if ($_POST) {
			$params = array(
				'name' => $_POST['name'],
				'price' => $_POST['price'],
				'categoryID' => 'false',
				'categoryName' => $_POST['categorySelect'],
				'description' => $_POST['description'],
				'stockDesc' => $_POST['stockDesc'],
				'drzava' => $_POST['drzava'],
				'active' => 'true'
			);

			if (isset($_POST['stock'])) {
				$params['stock'] = 'true';			
			} else {
				$params['stock'] = 'false';
			}

			if (isset($_POST['stockDesc']))
				$params['stockDesc'] = $_POST['stockDesc'];

			if (isset($_POST['firstPage'])) {
				$params['firstPage'] = 'true';			
			} else {
				$params['firstPage'] = 'false';
			}

			if (isset($_POST['prodavnicaOdabrano'])) {
				$params['prodavnicaOdabrano'] = 'true';
			} else {
				$params['prodavnicaOdabrano'] = 'false';
			}
		}

		$count = sizeof($_FILES['file']['name']);
		if ($count != 4) {
			echo 'Invalid count of images';
			header('Location: ' . $redirect_url);
			return;
		}

		for ($i = 0; $i < $count; $i++) {

			if ($_FILES['file']['type'][$i] != 'image/png' && $_FILES['file']['type'][$i] != 'image/jpeg') {
				echo 'wrong file format';
				header('Location: '. $redirect_url);
				return;
			}

			$fn = $_FILES['file']['tmp_name'][$i];
			$size = getimagesize($fn);

			$src = imagecreatefromstring(file_get_contents($fn));
			$dst = imagecreatetruecolor($width,$height);
			imagecopyresampled($dst,$src,0,0,0,0,$width,$height,$size[0],$size[1]);
			imagedestroy($src);

			if ($_FILES['file']['type'][$i] == 'image/png')
				imagepng($dst,$_FILES['file']['tmp_name'][$i]); // adjust format as needed
			if ($_FILES['file']['type'][$i] == 'image/jpeg')
				imagejpeg($dst,$_FILES['file']['tmp_name'][$i]); // adjust format as needed
			imagedestroy($dst);

			// $imageName = $_FILES['file']['size'][$i];
			$fn1 = $_FILES['file']['tmp_name'][$i];
			$size1 = getimagesize($fn1);
			$target_file = $save_file_path  . basename($_FILES['file']['name'][$i]);

			if (move_uploaded_file($_FILES['file']['tmp_name'][$i], $target_file)) {
				$status = 'success';
			} else {
				$status = 'failed';
			}

			print($status);

			if ($status == 'failed') {
				echo 'wrong file format';
				header('Location: '. $redirect_url);
				return;
			}

			$num = $i + 1;
			$param = 'image' . $num;
			$params[$param] = 'assets/img/proizvodi/' . $_FILES['file']['name'][$i];
		}

		$this->productmodel->insertProduct($params);

		header('Location: '. $redirect_url);
	}

	function updateProductImage() {
		$this->load->model('productmodel');
		$redirect_url = 'http://rasadnikekoplan.com/#!/admin_proizvodi';
		$save_file_path = '../assets/img/proizvodi/';
		$width = 400;
		$height = 400;
		print('LOADING...');

		// print_r($_POST);

		if ($_POST) {

			$productID = $_POST['productID'];

			if (isset($_POST['name']))
				$params['name'] = $_POST['name'];

			if (isset($_POST['price']))
				$params['price'] = $_POST['price'];

			if (isset($_POST['categorySelect']))
				$params['categoryName'] = $_POST['categorySelect'];

			if (isset($_POST['description']))
				$params['description'] = $_POST['description'];

			if (isset($_POST['drzava']))
				$params['drzava'] = $_POST['drzava'];

			if (isset($_POST['stock'])) {
				$params['stock'] = 'true';			
			} else {
				$params['stock'] = 'false';
			}

			if (isset($_POST['stockDesc']))
				$params['stockDesc'] = $_POST['stockDesc'];

			if (isset($_POST['firstPage'])) {
				$params['firstPage'] = 'true';			
			} else {
				$params['firstPage'] = 'false';
			}

			if (isset($_POST['prodavnicaOdabrano'])) {
				$params['prodavnicaOdabrano'] = 'true';			
			} else {
				$params['prodavnicaOdabrano'] = 'false';
			}

			print($_POST['categorySelect']);
			print($params);
		}

		$count = sizeof($_FILES['file']['name']);
		if ($count != 4) {
			$this->productmodel->updateProduct($productID, $params);
			header('Location: ' . $redirect_url);
			return;
		}

		for ($i = 0; $i < $count; $i++) {

			if ($_FILES['file']['type'][$i] != 'image/png' && $_FILES['file']['type'][$i] != 'image/jpeg') {
				echo 'wrong file format';
				header('Location: '. $redirect_url);
				return;
			}

			$fn = $_FILES['file']['tmp_name'][$i];
			$size = getimagesize($fn);

			$src = imagecreatefromstring(file_get_contents($fn));
			$dst = imagecreatetruecolor($width,$height);
			imagecopyresampled($dst,$src,0,0,0,0,$width,$height,$size[0],$size[1]);
			imagedestroy($src);

			if ($_FILES['file']['type'][$i] == 'image/png')
				imagepng($dst,$_FILES['file']['tmp_name'][$i]); // adjust format as needed
			if ($_FILES['file']['type'][$i] == 'image/jpeg')
				imagejpeg($dst,$_FILES['file']['tmp_name'][$i]); // adjust format as needed
			imagedestroy($dst);

			// $imageName = $_FILES['file']['size'][$i];
			$fn1 = $_FILES['file']['tmp_name'][$i];
			$size1 = getimagesize($fn1);
			$target_file = $save_file_path  . basename($_FILES['file']['name'][$i]);

			if (move_uploaded_file($_FILES['file']['tmp_name'][$i], $target_file)) {
				$status = 'success';
			} else {
				$status = 'failed';
			}

			print($status);

			if ($status == 'failed') {
				echo 'wrong file format';
				header('Location: '. $redirect_url);
				return;
			}

			$num = $i + 1;
			$param = 'image' . $num;
			$params[$param] = 'assets/img/proizvodi/' . $_FILES['file']['name'][$i];
		}

		$this->productmodel->updateProduct($productID, $params);
		header('Location: '. $redirect_url);
	}
}

?>