<?php
$host = "mysql.hostinger.com.br";
$user = "u836130317_rafah";
$pass = "battle2";
$banco = "u836130317_bat";
$conexao = mysql_connect($host, $user, $pass) or die (mysql_error());
mysql_select_db($banco)or die (mysql_error());
?>
<html>

<head>
<title> Excluindo...</title>
<script type="text/javascript">
function saindo() {
	setTimeout("window.location='index.php'", 1000);
}
</script>
</head>

<body>

<?php
$usuario=$_GET['usuario'];
$sql = mysql_query("DELETE FROM usuarios WHERE usu_usuario = '$usuario'");
echo "Deletado com sucesso!";
echo "<script>saindo()</script>";
?>


</body>

</html>