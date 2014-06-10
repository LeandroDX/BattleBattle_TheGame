<!DOCTYPE html>
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
        <form name="formcadastro" method="post" action="atualizar_usuario.php?usuario=<?php echo $usuario=$_POST['userName'];?>">
                <div>
                <span><label>User</label></span>
                <span><input name="usuario" type="text" class="textboxcad" required="required" value="<?php echo $usuario=$_GET['usuario'];?>" disabled="disabled"></span>
            </div>
            <div>
                <span><label>Nome</label></span>
                <span><input name="nome" type="text" class="textboxcad"></span>
            </div>
            <div>
                <span><label>Senha</label></span>
                <span><input name="senha" type="password" class="textboxcad"></span>
            </div>
            <div>
                <span><label>E-mail</label></span>
                <span><input name="email" type="email" class="textboxcad"></span>
            </div>
            <div>
                <span><label>Imagem</label></span>
                <span><input name="foto" type="file" class="textboxcad1"></span>
            </div>
            <div>
                <span><input id="bt_cadastrar" type="submit" value="Atualizar"></span>
                <span><input id="bt_deletar" type="button" value="Excluir" onclick="location.href='deletar.php?usuario=<?php echo $usuario;?>'"></span>
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

<input id="bt_play" type="button" name="play" value="Jogar!" onclick="location.href='jogo/battle/thegame.html'"/>


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