<?
class Security 
{
	public function clean($value = "")
	{
	    $value = trim($value);
	    $value = stripslashes($value);
	    $value = strip_tags($value);
	    $value = htmlspecialchars($value);
	    return $value;
	}

	public function checkLength($value = "", $min, $max) {
	    $result = (mb_strlen($value) < $min || mb_strlen($value) > $max);
	    return !$result;
	}

	public function resultFunction($fEvent = "", $fName = "", $fPhone = "")
	{
		$event = $this->clean($fEvent);
		$name = $this->clean($fName);
		$phone = $this->clean($fPhone);
		if (!empty($event) && !empty($name) && !empty($phone))
		{
			if ($this->checkLength($event, 1, 100) && $this->checkLength($name, 1, 100) && $this->checkLength($phone, 1, 100))
			{
				$subject = '';
				$text = '';
				if ($event == 'order_call')
				{
					$subject = 'Заказ звонка с сайта!';
					$text = '
Здравствуйте!
С вашего сайта поступил "Заказ звонка".

Имя: '.$name.'
Телефон: '.$phone.'

_______________________________________
Сообщение сгенерированно автоматически.
					';
				}
				if ($event == 'send')
				{
					$subject = 'Заявка с сайта!';
					$text = '
Здравствуйте!
С вашего сайта поступил Заявка.

Имя: '.$name.'
Телефон: '.$phone.'

_______________________________________
Сообщение сгенерированно автоматически.
					';
				}
				$headers  = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'From: freeman.viktor@mail.ru' . "\r\n";
				$headers .= 'Content-type: text/html; charset=UTF-8"' . "\r\n";
				mail('freeman.viktor@mail.ru', $subject, $text, $headers);
				return true;
			}
		}
		return false;
	}
}

if (isset($_POST['EVENT']) && isset($_POST['NAME']) && isset($_POST['PHONE']))
{
	$security = new Security();
	$send = $security->resultFunction($_POST['EVENT'], $_POST['NAME'], $_POST['PHONE']);
	if ($send)
	{
		echo '<br/><br/><br/><br/><br/><div style="text-align:center;font-weight:bold;font-size:21px;font-family:Verdana;color:green;">Спасибо за заявку</div>';
	}
	else
	{
		echo '<br/><br/><br/><br/><br/><div style="text-align:center;font-weight:bold;font-size:21px;font-family:Verdana;color:green;">Не все поля заполненны правильно!<br/>Пожалуйста, <a href="javascript:history.back();">вернитесь назад</a> и попробуйте снова</div>';
	}
}
?>