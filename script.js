var turn;
var player;
var SelectionAttack;
var armyAttack;
var fArea = new Array;
var qntdTerritorios = 42;
var armyTranfer = 0;
var vArmy;

var teste;

function teste(){
	alert("Testeee");
}

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

	for (var i = 0; i < qntdTerritorios; i++) {
		localStorage.setItem("A"+i, 0);	//Qntde exercito
		localStorage.setItem("PlayerA"+i, null);//dominio player
	};

	localStorage.setItem("bonusTerritory", 20);	
	localStorage.setItem("bonusContinent", 3);
	localStorage.setItem("bonusCards", 7);

	alert("valores:1vez somente,INITIALIZE");

	reloadTerritory();

}


function updateTerritory(army){
	alert("update");
	var valor;
	var valueFinalUpdate;

	if (armyTranfer == 1){ // Tranferir exercito próprio para outra área 
		alert("VARMY: "+vArmy+" Army: "+army);

		$("#heightBar").mousemove(function(){
			document.getElementById("valueBar").innerHTML= heightBar.value;
			valueFinalUpdate=parseInt(localStorage.getItem("A"+army))+parseInt(heightBar.value);
			document.getElementById("army"+army).innerHTML= valueFinalUpdate;
			document.getElementById("army"+vArmy).innerHTML= parseInt(localStorage.getItem("A"+vArmy))-document.getElementById("valueBar").innerHTML;//Retira army
			document.getElementById("armyYour").innerHTML= document.getElementById("army"+vArmy).innerHTML;
		});
		$("#valueBar").click(function(){  //Confirma Update
			localStorage.setItem("A"+vArmy, document.getElementById("army"+vArmy).innerHTML);
			localStorage.setItem("A"+army, document.getElementById("army"+army).innerHTML);
			document.getElementById("armyYour").innerHTML= document.getElementById("army"+army).innerHTML;
			// $('#valueBar').unbind('click');	
			// $('#heightBar').unbind('change');
			reloadTerritory();

		});

	}

	$(".bonus").click(function(){	
		var heightBar= document.getElementById("heightBar");
		valor=($(this).attr("value"));
		heightBar.value= "0";

		if ( (valor==1)&&(localStorage.getItem("A"+army)>1) ) {
			armyTranfer = 1;
			vArmy = army;
			document.getElementById("heightBar").max= localStorage.getItem("A"+vArmy)-1;

		}

		if( ($(".bonus[value="+valor+"] span").html()>0)&&(armyTranfer==0) ){

			var vBonus
			if (valor==2) {
				vBonus = "bonusTerritory";
				vArmy = "armyNextPhase1";
				alert(vBonus);
			}
			else if (valor==3) {
				vBonus = "bonusContinent";
				vArmy = "armyContinente";
				alert(vBonus);
			}
			else if (valor==4) {
				vBonus = "bonusCards";
				vArmy = "armyBonusCard";
				alert(vBonus);
			}


				document.getElementById("heightBar").max= localStorage.getItem(vBonus);	

				$("#heightBar").mousemove(function(){ // Escolher qntd de bonus para tranferir				
					document.getElementById("valueBar").innerHTML= heightBar.value;
					valueFinalUpdate=parseInt(localStorage.getItem("A"+army))+parseInt(heightBar.value);
					document.getElementById("army"+army).innerHTML= valueFinalUpdate;
					document.getElementById(vArmy).innerHTML= parseInt(localStorage.getItem(vBonus))-document.getElementById("valueBar").innerHTML;//Retira army bonus
					
				});
				$("#valueBar").click(function(){  //Confirma Update
					localStorage.setItem("A"+army,valueFinalUpdate);
					alert("Update Your Army");
					localStorage.setItem(vBonus,parseInt(localStorage.getItem(vBonus))-document.getElementById("valueBar").innerHTML);
					$('#valueBar').unbind('click');	
					$('#heightBar').unbind('change');
					reloadTerritory();
				});		

		}
	});

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
				document.getElementById("totalArmy").innerHTML = totalArmyPlayer[1];
			}
			else if (localStorage.getItem("PlayerA"+i) == "blue"){ //Bonus por territórios divide por 2
				totalArmyPlayer[2] = parseInt(localStorage.getItem("A"+i))+ totalArmyPlayer[2];
				// document.getElementById("totalArmy").innerHTML = totalArmyPlayer[2];
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
		 // [2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		 [2,1,1,1,0,0,0],
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

function rollTheDice(){	
	return Math.floor((Math.random()*6)+1); //Valor de 1 a 6 Simulando um dado	
}

function compareDice(diceA,diceD,armyAttack,armyDefender){ //qntd de dados escolhidos para o embate
	var i, j, swap;
	var valueDice = new Array();
		valueDice[1]=0;
		valueDice[2]=0;
		valueDice[3]=0;
		valueDice[4]=0;
		valueDice[5]=0;
		valueDice[6]=0;

	alert("Atack = "+diceA+"\nDefesa = "+ diceD);

	for (i=1; i <= diceA; i++){
		valueDice[i]= rollTheDice();		
	}
	for (i=4; i <= (diceD+3); i++){
	 	valueDice[i]= rollTheDice();		
	}

	alert("A1 --> "+ valueDice[1] +
		"\nA2 --> "+ valueDice[2] +
		"\nA3 --> "+ valueDice[3] +
		"\nD1 --> "+ valueDice[4] +
		"\nD2 --> "+ valueDice[5] +
		"\nD3 --> "+ valueDice[6] 
	);

	//Lógica para comparação dos Dados
			//Ordenação dos dados, maior p/ menor
	for (i = 1; i <= 2 ; i++) {
		for (j = i+1; j <= 3; j++) {
			if(valueDice[i]<valueDice[j]){
				swap=valueDice[i];
				valueDice[i]=valueDice[j];
				valueDice[j]=swap;
			}
			if(valueDice[i+3]<valueDice[j+3]){
				swap=valueDice[i+3];
				valueDice[i+3]=valueDice[j+3];
				valueDice[j+3]=swap;
			}
		};		
	};

	alert("A1 --> "+ valueDice[1] +
		"\nA2 --> "+ valueDice[2] +
		"\nA3 --> "+ valueDice[3] +
		"\nD1 --> "+ valueDice[4] +
		"\nD2 --> "+ valueDice[5] +
		"\nD3 --> "+ valueDice[6] 
	);

	// Calculos de perdas
	var qts,vArmy;	
	if (diceA < diceD){
		qts=diceA;		
	}
	else{
		qts=diceD;
	}
	for (i = 1; i <= qts; i++) {	
		if(valueDice[i] > valueDice[i+3]){	//Se attack ganhar retira 1 da defenser
			vArmy = parseInt(localStorage.getItem("A"+armyDefender))-1;
			localStorage.setItem("A"+armyDefender,vArmy);
					alert("Atack Win");
		}
		else{
			vArmy = parseInt(localStorage.getItem("A"+armyAttack))-1;
			localStorage.setItem("A"+armyAttack,vArmy);
			alert("Atack Lost");
		}
	}

	if (localStorage.getItem("A"+armyDefender)==0) {
		vArmy = parseInt(localStorage.getItem("A"+armyAttack))-1;
		localStorage.setItem("A"+armyAttack,vArmy);
		localStorage.setItem("A"+armyDefender,1);
		localStorage.setItem("PlayerA"+armyDefender,"red");
	};

	reloadTerritory();


}

function battle(armyAttack, armyDefender){ //Verificar se territorios fazem fronteira e rolar os dados
	var qntdDiceAttack=0;
	var qntdDiceDefender=0;
	var i;

	// alert("esta atacando->"+armyAttack);
	// alert("esta defendendo->"+armyDefender);


	if (localStorage.getItem("A"+armyAttack) == 2 ) {
		document.getElementById('qntdYourAttack').options[0] = new Option( "1 army",1 );
	}
	else if (localStorage.getItem("A"+armyAttack) == 3 ) {
		document.getElementById('qntdYourAttack').options[0] = new Option( "1 army",1 );
		document.getElementById('qntdYourAttack').options[1] = new Option( "2 army's",2 );
	}
	else{
		document.getElementById('qntdYourAttack').options[0] = new Option( "1 army",1 );
		document.getElementById('qntdYourAttack').options[1] = new Option( "2 army's",2 );
		document.getElementById('qntdYourAttack').options[2] = new Option( "3 army's",3 );
	}

		//perguntar qtos dados usar??
		$("#btnAttck").click(function(){ //Evento de clicar no BtnAttck, para escolher qntd de armys atacantes
			qntdDiceAttack = parseInt(document.getElementById("qntdYourAttack").value);

			if (localStorage.getItem("A"+armyDefender)==1) {
				qntdDiceDefender = 1;
			}
			else if(localStorage.getItem("A"+armyDefender)==2){
				qntdDiceDefender = 2;
			}
			else if(localStorage.getItem("A"+armyDefender)>2){
				qntdDiceDefender = 3;
			}
			
			compareDice(qntdDiceAttack,qntdDiceDefender,armyAttack,armyDefender);

		});
	


}

function choiceTerritory(){	
	var nRandom;
	var i = 0;
	var ArmyCor = "red";


	do{ /* Não esquecer de tratar RANDOM para não repetir numeros*/
		nRandom = Math.floor((Math.random()*qntdTerritorios)); // Random de 0 a 10
		// alert(localStorage.getItem("A"+nRandom));
		
		if (localStorage.getItem("A"+nRandom)== 0){
		 		localStorage.setItem("A"+nRandom, 2);
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

				if ( (conquest == player)&&(SelectionAttack==false)&&(localStorage.getItem("A"+army)>1) ){ //selecionado seu territorio como atacante
					
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
					document.getElementById("armyYour").innerHTML = document.getElementById("army"+army).innerHTML
					updateTerritory(army);
				}

			}

		}	

}

// function reluzOn(mapa){	
// 	document.getElementById(mapa).src = "Q2.png"; //APAGAR Esse é para o mapa inteiro
// 	//document.getElementById(mapa).setAttribute('style', ' opacity: 1.0; background-color: blue;');

// };


// function reluzOff(mapa){
// 	document.getElementById(mapa).src = "Q1.png"; //APAGAR Esse é para o mapa inteiro
// 	//document.getElementById(mapa).setAttribute('style', 'opacity: 0.5; background-color: blue');

// };

