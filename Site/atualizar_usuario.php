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
<title> Atualizando...</title>
<script type="text/javascript">
function logado() {
	setTimeout("window.location='paineldecontrole.php'", 5000);
}
</script>
</head>

<body>

<?php
$ses_id = session_id();
$buscar = mysql_query("SELECT * FROM usuarios WHERE usu_id = '$ses_id'");
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
	echo "Cadastrado com sucesso!";
	echo "<script>logado()</script>";
}

?>


</body>

</html>