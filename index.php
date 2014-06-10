<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<!--Começo Head-->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Battle&Battle | Official Site</title>
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
</head>
<!--Fim Head-->


<!--Começo Body-->
<body>
<!--Primeira Tela-->
<p><a href="http://www.battlethegame.tk"><img src="images/logo.png"  id="imagem" alt="Battle&Battle" /></a></p>

<!--Começo Menu-->
<nav id="menu">
	<ul>
    	<li id="nav_home"><a href="#home">Home</a></li>
        <li id="nav_sobre"><a href="#sobre">O Jogo</a></li>
        <li id="nav_cadastrar"><a href="#cadastro-form">Cadastrar</a></li>
        <li id="nav_manual"><a href="#manual">Manual</a></li>
        <li id="nav_prime"><a href="#rodape">Prime Tech</a></li>
  </ul>
</nav>
<!--Fim Menu-->

<!--Começo Formulario Login-->

<fieldset class="contact-form">
	<legend id="home"> Login </legend>

	<form  id="form_login" name="formlogin" method="post" action="validar_login.php">
    	<div>
			<span><input name="userName" type="text" class="textbox" placeholder="Usuário" required="required"></span>
		</div>
		<div>
			<span><input name="userPwd" type="password" class="textbox" placeholder="Password" required="required"></span>
		</div>
		<div>
			<span><a href="#login"><input id="bt_login" type="submit" value="Login"></a></span>
		</div>
  	</form>			
</fieldset>
<!--Fim Formulario Login-->
<!--<img src="images/war (2).jpg" name="slideshow" id="slideshow" />-->
<!--Fim Primeira Tela-->


<!--Segunda Tela-->
<!--Começo Formulario Cadastro-->
<fieldset class="cadastro-form">
	<legend> Cadastrar </legend>
        <form name="formcadastro" method="post" action="cadastrar_usuario.php">
            <div>
                <span><label>Nome</label></span>
                <span><input name="nome" type="text" class="textboxcad"  placeholder="Nome"required="required"></span>
            </div>
            <div>
                <span><label>User</label></span>
                <span><input name="usuario" type="text" class="textboxcad" placeholder="Usuário" required="required"></span>
            </div>
            <div>
                <span><label>Senha</label></span>
                <span><input name="senha" type="password" class="textboxcad" placeholder="Password" required="required"></span>
            </div>
            <div>
                <span><label>E-mail</label></span>
                <span><input name="email" type="email" class="textboxcad" placeholder="E-mail" required="required"></span>
            </div>      
            <div>
                <span><label>Imagem</label></span>
                <span><input name="foto" type="file" class="textboxcad1"></span>
            </div>
            <div>
                <span><input id="bt_cadastrar" type="submit" value="Cadastrar>>"></span>
            </div>
        </form>
</fieldset>
<!--Fim Formulario Cadastro-->
<!--Fim Segunda Tela-->

</body>
<!--Fim Body-->



<!--Começo Rodapé-->
<footer class="rodape"> 
Todos os direitos estão reservados.Prime Tech/2014. 
</footer>
<!--Começo Rodapé-->

</html>