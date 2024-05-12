<?
        $to = "byketch@yandex.ru";
        $subject = 'Новый заказ';
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['name'].'</p>
                        <p>Телефон: '.$_POST['phone'].'</p>
                        <p>Комментарий: '.$_POST['comment'].'</p>
                        <p>Товар: '.$_POST['prod-name'].'</p>
                        <p>Количество: '.$_POST['prod-count'].'</p>
                        <p>Цена за единицу: '.$_POST['prod-one'].'</p>
                        <p>Общая сумма: '.$_POST['prod-total'].'</p>
                        <p>Страница: '.$_POST['ref'].'</p>
                        <p>IP: '.$_POST['ip'].'</p>                                      
                    </body>
                </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
        $headers .= "From: Отправитель <from@example.com>\r\n";
        mail($to, $subject, $message, $headers);
?>