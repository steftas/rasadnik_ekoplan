<?php

class Category extends CI_Controller{

	function __construct()     //load model
	{
		parent::__construct();
	}

	function getCategory() {
		$_POST = json_decode(file_get_contents('php://input'), true);
		$data['result'] = false;

		$this->load->model('categorymodel');
		$categories = $this->categorymodel->getCategory();

		$data['result'] = $categories;

		echo json_encode($data['result']);
	}

	function insertCategory() {
		$_POST = json_decode(file_get_contents('php://input'), true);
		$data['result'] = false;

		if ($_POST) {
			$params = $_POST['data'];
			$params['active'] = 'true';
			$this->load->model('categorymodel');
			$id = $this->categorymodel->insertCategory($params);
			$data['result'] = true;
		}
		echo json_encode($data['result']);
	}

	function insertCategoryImage() {
		$redirect_url = 'http://rasadnikekoplan.com/#!/admin_kategorije';
		$save_file_path = '../assets/img/kategorije/';

		$width = 400;
		$height = 400;

		if ($_FILES['file']['type'] != 'image/png' && $_FILES['file']['type'] != 'image/jpeg') {
			echo 'wrong file format';
			header('Location: '. $redirect_url);
			return;
		}

		print('LOADING...');
		print_r($_FILES);

		$fn = $_FILES['file']['tmp_name'];
		$size = getimagesize($fn);

		$src = imagecreatefromstring(file_get_contents($fn));
		$dst = imagecreatetruecolor($width,$height);
		imagecopyresampled($dst,$src,0,0,0,0,$width,$height,$size[0],$size[1]);
		imagedestroy($src);

		if ($_FILES['file']['type'] == 'image/png')
			imagepng($dst,$_FILES['file']['tmp_name']); // adjust format as needed
		if ($_FILES['file']['type'] == 'image/jpeg')
			imagejpeg($dst,$_FILES['file']['tmp_name']); // adjust format as needed
		imagedestroy($dst);

		// $imageName = $_FILES['file']['size'];
		$fn1 = $_FILES['file']['tmp_name'];
		$size1 = getimagesize($fn1);
		$target_file = $save_file_path  . basename($_FILES['file']['name']);

		if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
			$status = 'success';
		} else {
			$status = 'failed';
		}

		// upload to db
		if ($status == 'success') {

			if (isset($_POST['categoryFirsPage'])) {
				print_r('enter');
				$firstPage = 'true';
			} else {
				$firstPage = 'false';
			}

			$params = array(
				"imageUrl" => 'assets/img/kategorije/' . $_FILES['file']['name'],
				"firstPage" => $firstPage,
				"name" => $_POST['categoryName'],
				"active" => 'true'
			);

			$this->load->model('categorymodel');
			$id = $this->categorymodel->insertCategory($params);
		}

		header('Location: '. $redirect_url);
	}

	function updateCategoryImage() {
		$this->load->model('categorymodel');
		$redirect_url = 'http://rasadnikekoplan.com/#!/admin_kategorije';
		$save_file_path = '../assets/img/kategorije/';

		$width = 400;
		$height = 400;

		print('LOADING...');

		if ($_POST) {
			$params['active'] = 'true';
			$id = $_POST['categoryID'];

			if (isset($_POST['updateName']))
				$params['name'] = $_POST['updateName'];

			if (isset($_POST['updateCategoryFirsPage'])) {
				$params['firstPage'] = 'true';
			} else {
				$params['firstPage'] = 'false';
			}

			$this->categorymodel->updateCategory($id, $params);			
		}

		if ($_FILES) {
			$fn = $_FILES['updateFile']['tmp_name'];
			$size = getimagesize($fn);

			$src = imagecreatefromstring(file_get_contents($fn));
			$dst = imagecreatetruecolor($width,$height);
			imagecopyresampled($dst,$src,0,0,0,0,$width,$height,$size[0],$size[1]);
			imagedestroy($src);

			if ($_FILES['updateFile']['type'] == 'image/png')
				imagepng($dst,$_FILES['updateFile']['tmp_name']); // adjust format as needed
			if ($_FILES['updateFile']['type'] == 'image/jpeg')
				imagejpeg($dst,$_FILES['updateFile']['tmp_name']); // adjust format as needed
			imagedestroy($dst);

			// $imageName = $_FILES['updateFile']['size'];
			$fn1 = $_FILES['updateFile']['tmp_name'];
			$size1 = getimagesize($fn1);
			$target_file = $save_file_path  . basename($_FILES['updateFile']['name']);

			if (move_uploaded_file($_FILES['updateFile']['tmp_name'], $target_file)) {
				$status = 'success';
			} else {
				$status = 'failed';
			}

			if ($status == 'success') {
				$id = $_POST['categoryID'];
				$params['imageUrl'] = 'assets/img/kategorije/' . $_FILES['updateFile']['name'];
				$this->categorymodel->updateCategory($id, $params);
			}
		}
		header('Location: '. $redirect_url);
	}

	function updateCategory() {
		$_POST = json_decode(file_get_contents('php://input'), true);
		$data['result'] = false;

		if ($_POST) {
			$params = $_POST['data'];
			$id = $_POST['id'];
			$params['active'] = 'true';
			$this->load->model('categorymodel');
			$id = $this->categorymodel->updateCategory($id, $params);
			$data['result'] = true;
		}
		echo json_encode($data['result']);
	}

	function deleteCategory() {
		$_POST = json_decode(file_get_contents('php://input'), true);
		$data['result'] = false;

		if ($_POST) {
			$id = $_POST['id'];
			$this->load->model('categorymodel');
			$id = $this->categorymodel->deleteCategory($id);
			$data['result'] = true;
		}
		echo json_encode($data['result']);
	}
}

?>