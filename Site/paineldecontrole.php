<?php
$host = "mysql.hostinger.com.br";
$user = "u836130317_rafah";
$pass = "battle2";
$banco = "u836130317_bat";
$conexao = mysql_connect($host, $user, $pass) or die (mysql_error());
mysql_select_db($banco)or die (mysql_error());

$usuario=$_GET['usuario'];
$buscar = mysql_query("SELECT * FROM usuarios WHERE usu_usuario = '$usuario'");
$nome=$buscar['usu_nome'];
echo $nome;
$senha=$_POST['senha'];
$email=$_POST['email'];
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Painel de Controle | Battle&Battle </title>
<link href="css/style_painel.css" rel="stylesheet" type="text/css" media="all" />
<script type='text/javascript' src="jogo/battle/jss/script.js"></script> 
</head>


<body>

<a href="http://www.battlethegame.tk"><img src="images/logo.png" alt="Battle&Battle" id="imagem" /></a>

<h1>Painel de Controle</h1>

<!--Começo Formulario Cadastro-->
<fieldset class="cadastro-form">
	<legend> Atualizar </legend>
        <form name="formcadastro" method="post" action="cadastrar_usuario.php">
                <div>
                <span><label>User</label></span>
                <span><input name="usuario" type="text" class="textboxcad" required="required" value="<?php echo $usuario; ?>" disabled="disabled"></span>
            </div>
            <div>
                <span><label>Nome</label></span>
                <span><input name="nome" type="text" class="textboxcad" required="required" value="<?php echo $nome;?>"></span>
            </div>
            <div>
                <span><label>Senha</label></span>
                <span><input name="senha" type="password" class="textboxcad" required="required" value="<?php echo $senha;?>"></span>
            </div>
            <div>
                <span><label>E-mail</label></span>
                <span><input name="email" type="email" class="textboxcad" required="required" value="<?php echo $email;?>"></span>
            </div>
            <div>
                <span><label>Imagem</label></span>
                <span><input name="foto" type="file" class="textboxcad1"></span>
            </div>
            <div>
                <span><input id="bt_cadastrar" type="submit" value="Atualizar"></span>
            </div>
        </form>
</fieldset>
<!--Fim Formulario Cadastro-->

<fieldset class="desafiar_form">
	<legend> Desafiar Jogador!</legend>
		<form name="desafiar" method="post"  action="enviar_email.php">
          <div>
                <span><input name="email" type="email" class="box_desafiar" required="required" placeholder="Digite o E-mail"></span>
                <span><input id="bt_desafiar" type="submit" value="Desafiar!"></span>
            </div>
	</form>
</fieldset>


<input id="qtd" type ="number" name ="qtd" min ="2" max ="6" />

<input id="bt_play" type="button" name="play" value="Jogar!"  onclick="jogar();"/>
	<script>
		function jogar(){
			localStorage.setItem("LS_qntdplayer", document.getElementById('qtd').value);
			window.location='jogo/battle/thegame.html';
			setTimeout("initialize();", 5000);
		}
		
    </script>

<!--Inicio Botão compatilhar-->
<div id="fb-root"></div>
<script type="text/javascript">
window.fbAsyncInit = function () {
	FB.init({
		appId  : '1402159500070832',
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		xfbml  : true,  // parse XFBML
		oauth  : true // enable OAuth 2.0
	});
};

(function() {
	var e = document.createElement('script');
	e.src = document.location.protocol + '//connect.facebook.net/pt_BR/all.js';
	e.async = true;
	document.getElementById('fb-root').appendChild(e);
}());
</script>

<div id="container">
	<a id="share-button" href="#" title="Facebook Share Button" rel="alternate"><img src="http://1.bp.blogspot.com/-iCNoO3TJqdU/UWFi4X8HkLI/AAAAAAAAHrs/HXJqmlpjM4Y/s1600/facebook_share.png" alt="Facebook Share Button" title="Facebook Share Button" /></a>
</div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript">
$('#share-button').click(function(e){
	e.preventDefault();
	FB.ui({
		method: 'feed',
		name: 'Battle&Battle | The Game',
		link: ' http://www.battlethegame.tk/',
		picture: 'http://www.reverseshot.com/files/images/issue22/battle_of_haditha_01.jpg',
		caption: 'Estou conquistando o mundo!',
		description: 'Estou movendo meus exércitos rumo à conquista!'
	});
});
</script>
<!--Fim Botão compatilhar-->




</body>

<!--Começo Rodapé-->
<footer class="rodape"> 
Todos os direitos estão reservados.Prime Tech/2014. 
</footer>
<!--Começo Rodapé-->

</html>