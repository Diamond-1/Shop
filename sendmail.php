<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer-6.2.0/src/Exception.php';
    require 'PHPMailer-6.2.0/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->Charset = 'UTF-8';
    $mail->setLanguage('ru', 'PHPMailer-6.2.0/language/');
    $mail->IsHTML(true);

    $mail->setFrom('qa1717718@gmail.com', 'Хъюстон, прием!');
    $mail->addAddress('321@mail.com');
    $mail->Subject = 'Обратная связь';

    $body = '<h1>Обратная связь</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }

    $mail->Body = $body;

    if($mail->send()){
        $message = 'Ошибка';
    }else{
        $message = 'Данные отправлены!';
    }

$message = 'Данные отправлены!';
    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
    ?>