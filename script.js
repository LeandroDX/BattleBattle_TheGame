var turn;
var player;
var SelectionAttack;
var armyAttack;
var fArea = new Array;
var qntdTerritorios = 10;

var teste;

$("<option value='1'>Até 200 mil</option>").appendTo("#qq")

// $(document).ready(function(){
// 	$("h2").click(function(){					//API JQUERY
// 		$("#armyContinente").css("color","red");		
// 		$("#army"+1).css("border","1px solid #FFF");
// 	})
// });

function initialize(){	
	localStorage.setItem("LS_fasesOfGame", 0); // Fases do Jogo  0-choiceTerritory()/ 1-battle()/ 2-colocar exercito
	localStorage.setItem("LS_turn", 1);
	localStorage.setItem("LS_player", 1);

	// Quantidade de exercito e Dominio - TERRITORIO
	localStorage.setItem("A0", 0);	//Qntde exercito
	localStorage.setItem("PlayerA0", null);//dominio player

	localStorage.setItem("A1", 0);	//Qntde exercito
	localStorage.setItem("PlayerA1", null);//dominio player

	localStorage.setItem("A2", 0);	//Qntde exercito
	localStorage.setItem("PlayerA2", null);//dominio player

	localStorage.setItem("A3", 0);	//Qntde exercito
	localStorage.setItem("PlayerA3", null);//dominio player
	
	localStorage.setItem("A4", 0);	//Qntde exercito
	localStorage.setItem("PlayerA4", null);//dominio player

	localStorage.setItem("A5", 0);	//Qntde exercito
	localStorage.setItem("PlayerA5", null);//dominio player
	
	localStorage.setItem("A6", 0);	//Qntde exercito
	localStorage.setItem("PlayerA6", null);//dominio player

	localStorage.setItem("A7", 0);	//Qntde exercito
	localStorage.setItem("PlayerA7", null);//dominio player

	localStorage.setItem("A8", 0);	//Qntde exercito
	localStorage.setItem("PlayerA8", null);//dominio player

	localStorage.setItem("A9", 0);	//Qntde exercito
	localStorage.setItem("PlayerA9", null);//dominio player

	localStorage.setItem("bonusTerritory", 2);	
	localStorage.setItem("bonusContinent", 3);
	localStorage.setItem("bonusCards", 7);

	alert("valores:1vez somente,INITIALIZE");

	reloadTerritory();

}
// function nextTurnBonus(){ //Quantos exercitos cada jogador ira ganhar no próximo turno
// 	document.getElementById("armyNextPhase1").innerHTML=10;
	

// }



function updateTerritory(army){
	alert("update");
	var valor, VArmy;

	$(".bonus").click(function(){
		alert($(this).attr("value"));
		valor=($(this).attr("value"));
		if (valor==2) {
			alert("bonusTerritory");
			VArmy = parseInt(localStorage.getItem("A"+army))+parseInt(localStorage.getItem("bonusTerritory"));
			alert("Varmy"+VArmy);
			localStorage.setItem("A"+army, VArmy);
			localStorage.setItem("bonusTerritory",0);
			$('.bonus').unbind('click');
			reloadTerritory();
		}
		else if (valor==3) {
			alert("bonusContinent");
			VArmy = parseInt(localStorage.getItem("A"+army))+parseInt(localStorage.getItem("bonusContinent"));
			alert("Varmy"+VArmy);
			localStorage.setItem("A"+army, VArmy);
			localStorage.setItem("bonusContinent",0);
			$('.bonus').unbind('click');
			reloadTerritory();
		}
		else if (valor==4) {
			alert("bonusCards");
			VArmy = parseInt(localStorage.getItem("A"+army))+parseInt(localStorage.getItem("bonusCards"));
			alert("Varmy"+VArmy);
			localStorage.setItem("A"+army, VArmy);
			localStorage.setItem("bonusCards",0);
			$('.bonus').unbind('click');
			reloadTerritory();
		};




	});
		
		//Criar Efeito Painel
		// $("h2").click(function(){					//API JQUERY
		// 	$("#armyBonusCard").css("color","#FFF");
		// });
	// document.getElementById("totalArmy1").className = 'bonusUpdateActive';
	// document.getElementById("armyNextPhase1").className = 'bonusUpdateActive';
	// document.getElementById("armyContinente").className = 'bonusUpdateActive';
	// document.getElementById("armyBonusCard").className = 'bonusUpdateActive';

	// $(document).onclick

	// tah osso manooo document.getElementByClassName ==

	
	//reloadTerritory();


}

function changePhases(){  //Temporary
	localStorage.setItem("LS_fasesOfGame", 1); //Fase de Upgrade
	alert(localStorage.getItem("LS_fasesOfGame"));

}

function reloadTerritory(){
	var totalArmyPlayer= new Array();
		totalArmyPlayer[1]=0;
		totalArmyPlayer[2]=0;
			
	if (turn == undefined){
		turn = localStorage.getItem("LS_turn");		
	};

	if (player == undefined){
		player = localStorage.getItem("LS_player");	
	};

	if (SelectionAttack == undefined){
		SelectionAttack = false;
	};




		//Quando Inicializa a Página os valores serão pegos no banco de Dados
			//Setando valores pelo LocalStore
		for (var i=0; i<qntdTerritorios; i++){  //Função prencher valores e dominios
			document.getElementById("army"+i).innerHTML = localStorage.getItem("A"+i);
			document.getElementById("army"+i).setAttribute('style', ' background-color:'
				+localStorage.getItem("PlayerA"+i)+' ;');
		};

			//Total de Territorios de cada jogador
		for (var i=0; i<qntdTerritorios; i++){
			if (localStorage.getItem("PlayerA"+i) == "red"){
				totalArmyPlayer[1] = parseInt(localStorage.getItem("A"+i))+ totalArmyPlayer[1];
				document.getElementById("totalArmy1").innerHTML = totalArmyPlayer[1];
			}
			else if (localStorage.getItem("PlayerA"+i) == "blue"){ //Bonus por territórios divide por 2
				totalArmyPlayer[2] = parseInt(localStorage.getItem("A"+i))+ totalArmyPlayer[2];
				document.getElementById("totalArmy2").innerHTML = totalArmyPlayer[2];
			};
		};


		///localStorage.setItem("bonusTerritory",parseInt( parseInt(document.getElementById("totalArmy1").innerHTML) /2 ) ); //Qtos irá ganhar no próximo turno 
		
		document.getElementById("armyNextPhase1").innerHTML= localStorage.getItem("bonusTerritory");
		
		document.getElementById("armyContinente").innerHTML = localStorage.getItem("bonusContinent");

		document.getElementById("armyBonusCard").innerHTML = localStorage.getItem("bonusCards");

		// alert("valores:,REALOADTERRITORY");

		
}

function connectArea(armyAttack,armyDefender){
				// FRONTEIRA FORMATO MATRIX
	fArea = Array(
		 [2,1,1,0,0,0,0],
		 [1,2,1,1,0,0,0],
		 [1,1,2,1,0,0,0],
		 [0,1,1,2,0,0,0],
		 [0,0,0,0,2,1,1],
	     [0,0,0,0,1,2,0],
		 [0,0,0,0,1,0,2]

	);

	alert( "attack: "+armyAttack +"defendendo: "+ armyDefender+ "result:  "+fArea[armyAttack][armyDefender]);

	return fArea[armyAttack][armyDefender];
}

function qntdDice(attDef){
	//perguntar qtos dados usar??
	alert("Perngutar");
	return 1;
}

function rollTheDice(){
	
	return Math.floor((Math.random()*6)+1); //Valor de 1 a 6 Simulando um dado	
}

function battle(armyAttack, armyDefender){ //Verificar se territorios fazem fronteira e rolar os dados
	var qntdDiceAttack=0;
	var qntdDiceDefender=0;
	var i;
	var valueDice = new Array();
		valueDice[1]=0;
		valueDice[2]=0;
		valueDice[3]=0;
		valueDice[4]=0;
		valueDice[5]=0;
		valueDice[6]=0;

	// alert("esta atacando->"+armyAttack);
	// alert("esta defendendo->"+armyDefender);

	// document.getElementById('qntdYourAttack').options[1] = new Option(Arms, 1);

	qntdDiceAttack = qntdDice(0); //attack
	qntdDdiceDefender = qntdDice(1); //Defender



	for (i=1; i<=qntdDiceAttack; i++){
		valueDice[i]=rollTheDice();			
	};
	for (i=4; i<=qntdDiceAttack+3; i++){
		valueDice[i]=rollTheDice();		
	};

	

	alert("Valor dadoA: "+valueDice[1]);
	alert("Valor dadoD: "+valueDice[4]);

	// alert(rollTheDice()); Criar função para rolar dados repetição pela qntidade
	

	//localStorage.getItem("A"+armyAttack);

	
	//document.getElementById("army1").innerHTML= localStorage.getItem("A1");	

}

function choiceTerritory(){	
	var nRandom;
	var i = 0;
	var ArmyCor = "red";


	do{ /* Não esquecer de tratar RANDOM para não repetir numeros*/
		nRandom = Math.floor((Math.random()*qntdTerritorios)); // Random de 0 a 10
		// alert(localStorage.getItem("A"+nRandom));
		
		if (localStorage.getItem("A"+nRandom)== 0){
		 		localStorage.setItem("A"+nRandom, 1);
		 		localStorage.setItem("PlayerA"+nRandom, ArmyCor);//dominio player		 		
				if (ArmyCor == "red"){
					ArmyCor = "blue";
					// alert("blueee");
				}
				else if (ArmyCor == "blue"){
					ArmyCor = "red";
					// alert("reeddd");
				}

				i++;				
		};	
	}while ( i < qntdTerritorios );
	localStorage.setItem("LS_fasesOfGame", 2);

	reloadTerritory();

}

function clique(army){
	var valor = document.getElementById("army"+army).innerHTML;		
	var conquest;
	alert("Conquest: "+conquest);

	

		//De quem q é o domínio do território, deve ser feito pelo banco, retornando qual player conquistou
		if (localStorage.getItem("PlayerA"+army) == "red") {
			conquest = 1;		
		}
		else if(localStorage.getItem("PlayerA"+army) == "blue"){
			conquest = 2;

		}


		alert("Conquest: "+conquest);
		alert("Army: "+army)
		alert("Turno do player? "+localStorage.getItem("LS_turn"));


	if (player == turn){
		if (localStorage.getItem("LS_fasesOfGame")==1) {  //Fase de Batalha

			if ( (conquest == player)&&(SelectionAttack==false) ){ //selecionado seu territorio como atacante
				
				alert("Territorio seu");		
				SelectionAttack=true;
				armyAttack = army;

				alert($("#local"+armyAttack).attr('title'));
				document.getElementById("b_qntd").innerHTML = localStorage.getItem("A"+armyAttack);
				document.getElementById("b_country").innerHTML = $("#local"+armyAttack).attr('title');

				document.getElementById("attack").style.display = "block";
				document.getElementById("army"+army).setAttribute('style', ' background-color: red; border: 3px solid #AEF ;'); //Efeito de seleção atacante
				document.getElementById("attack").setAttribute('style', ' color: '+cor+';');

			}
			else if ( (SelectionAttack==true)&&(conquest != player) ){
				alert("Territorio inimigo");
				if ( connectArea(armyAttack,army) ) { //Verifica se há fronteira entre os territórios
					alert("connectArea: TRUE pode atacar");

					document.getElementById("b_qntdE").innerHTML = localStorage.getItem("A"+army);
					document.getElementById("b_countryE").innerHTML = $("#local"+army).attr('title');
					
					document.getElementById("attack").style.display = "none";
				  //Função para batalhar--Criar
					battle(armyAttack,army);
					SelectionAttack=false;
				}

			}		

		}
		else if (localStorage.getItem("LS_fasesOfGame")==2) { //FASE UPDATE
			alert("Fase 2");
			reloadTerritory();
			if (conquest == player) {
				$("#army"+army).css("border","1px solid #FFF");
				updateTerritory(army);
			}

		}

	}


}

function reluzOn(mapa){	
	document.getElementById(mapa).src = "Q2.png"; //APAGAR Esse é para o mapa inteiro
	//document.getElementById(mapa).setAttribute('style', ' opacity: 1.0; background-color: blue;');

};


function reluzOff(mapa){
	document.getElementById(mapa).src = "Q1.png"; //APAGAR Esse é para o mapa inteiro
	//document.getElementById(mapa).setAttribute('style', 'opacity: 0.5; background-color: blue');

};

