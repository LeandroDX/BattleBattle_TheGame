var turn;
var player;
var SelectionAttack;
var armyAttack;
var fArea = new Array;
var qntdTerritorios = 8;

var teste;

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

	localStorage.setItem("bonusTerritory1", 0);	
	localStorage.setItem("bonusContinent1", 0);
	localStorage.setItem("bonusCards1", 0);

	alert("valores:1vez somente,INITIALIZE");

	reloadTerritory();

}
// function nextTurnBonus(){ //Quantos exercitos cada jogador ira ganhar no próximo turno
// 	document.getElementById("armyNextPhase1").innerHTML=10;
	

// }

function updateterritory(army){
	alert("update");

	localStorage.setItem("A"+army, 5); // Criar funçãopra escolher qtnd, coloquei valor fixo 5
	reloadTerritory();


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
			else if (localStorage.getItem("PlayerA"+i) == "blue"){
				totalArmyPlayer[2] = parseInt(localStorage.getItem("A"+i))+ totalArmyPlayer[2];
				document.getElementById("totalArmy2").innerHTML = totalArmyPlayer[2];
			};


		};


		document.getElementById("armyNextPhase1").innerHTML= parseInt( parseInt(document.getElementById("totalArmy1").innerHTML) /2 ); //Qtos irá ganhar no próximo turno 
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
		nRandom = Math.floor((Math.random()*9)); // Random de 0 a 8
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
			//document.getElementById(army).setAttribute('style', ' opacity: 1.0; background-color: '+cor+';'); //Efeito de seleção de attack
		if (localStorage.getItem("LS_fasesOfGame")==1) {

			if ( (conquest == player)&&(SelectionAttack==false) ){ //selecionado seu territorio como atacante
				
				alert("Territorio seu");			
				SelectionAttack=true;
				armyAttack = army;
				alert("Armyattack: "+armyAttack)
				document.getElementById("army"+army).setAttribute('style', ' background-color: red; border: 3px solid #AEF ;'); //Efeito de seleção atacante
				document.getElementById("attack").setAttribute('style', ' color: '+cor+';');
				document.getElementById("attack").style.display = "block";

			};

			if ( (SelectionAttack==true)&&(conquest != player) ){
				alert("Territorio inimigo");
				if ( connectArea(armyAttack,army) ) { //Verifica se há fronteira entre os territórios
					alert("connectArea: TRUE pode atacar");
					
					document.getElementById("attack").style.display = "none";
				  //Função para batalhar--Criar
					battle(armyAttack,army);
					SelectionAttack=false;
				}

			}		

		}
		else if (localStorage.getItem("LS_fasesOfGame")==2) {

			alert("Fase 2");
			if (conquest == player) {
				updateterritory(army);
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

