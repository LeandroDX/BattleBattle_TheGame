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
	setTimeout("window.location='paineldecontrole.php?usuario=<?php echo $usuario=$_GET['usuario']; ?>'", 3000);
}
</script>
</head>

<body>

<?php
$nome=$_POST['nome'];
$usuario=$_GET['usuario'];
$senha=$_POST['senha'];
$email=$_POST['email'];
$foto=$_POST['foto'];
$sql = mysql_query("UPDATE usuarios SET usu_nome = '$nome', usu_email='$email', usu_senha='$senha', usu_foto='$foto' WHERE usu_usuario = '$usuario'");
echo "Atualizado com sucesso!";
echo "<script>logado()</script>";
?>


</body>

</html>