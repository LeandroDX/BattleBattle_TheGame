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
<title> Autenticando...</title>
<script type="text/javascript">
function logado() {
	setTimeout("window.location='paineldecontrole.php?usuario=<?php echo $usuario=$_POST['userName']; ?>'", 3000);
}

function falhalogin() {
	alert ('Usuario e/ou senha invalidos!');
	setTimeout("window.location='index.php'", 1000);
}
</script>
</head>

<body>

<?php
$usuario=$_POST['userName'];
$senha=$_POST['userPwd'];
$sql = mysql_query("SELECT * FROM usuarios WHERE usu_usuario = '$usuario' and usu_senha = '$senha'") or die (mysql_error());
$row = mysql_num_rows($sql);
if($row > 0){
	session_start();
	$_SESSION['userName']=$_POST['userName'];
	$_SESSION['userPwd']=$_POST['userPwd'];
	echo "<script>logado()</script>";
} else{
	echo "<script>falhalogin()</script>";
}
?>

</body>

</html>