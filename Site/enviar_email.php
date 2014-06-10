<html>

<head>
<title>Enviando e-mail...</title>
<script type="text/javascript">
function enviado() {
	setTimeout("window.location='paineldecontrole.php'", 5000);
}
</script>
</head>

<body>
<?php
$email=$_POST['email'];
?>
<?php
$to = "$email";
$subject = "Você foi desafiado a jogar Battle&Battle!";
$message = ">>>>>>>>>>>>>O mundo está em nossas mãos...>>>>>>>>>>>> Você acaba de ser desafiado a jogar Battle&Battle! 
Para jogar,acesse http://www.battlethegame.tk e mostre que és um consquistador!";
$header = "MIME-Version: 1.0\n";
$header = "Content-type: text/html; charset=iso-8859-1\n";
$header = "From: suporte@battlethegame.tk\n";
mail($to, $subject, $message, $header);
echo"Desafio enviado!!!";
echo "<script>enviado()</script>";
?>

</body>

<html> 