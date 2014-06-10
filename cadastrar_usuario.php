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
	setTimeout("window.location='paineldecontrole.php?usuario=<?php echo $usuario=$_POST['usuario']; ?>'", 3000);
}

function falhalogin() {
	alert ('Cadastro existente!');
	setTimeout("window.location='index.php'", 1000);
}
</script>
</head>

<body>

<?php
$usuario=$_POST['usuario'];
$buscar = mysql_query("SELECT * FROM usuarios WHERE usu_usuario = '$usuario'");
$total = mysql_num_rows($buscar);
if ($total > 0) {
	echo "<script>falhalogin()</script>";
} else {
	$nome=$_POST['nome'];
	$usuario=$_POST['usuario'];
	$senha=$_POST['senha'];
	$email=$_POST['email'];
	$foto=$_POST['foto'];
	$sql = mysql_query("INSERT INTO usuarios(usu_nome, usu_usuario, usu_senha, usu_email, usu_foto) VALUES ('$nome', '$usuario', '$senha', '$email', '$foto')");
	session_start();
	$_SESSION['usuario']=$_POST['usuario'];
	$_SESSION['senha']=$_POST['senha'];
	echo "Cadastrado com sucesso!";
	echo "<script>logado()</script>";
}


?>


</body>

</html>
