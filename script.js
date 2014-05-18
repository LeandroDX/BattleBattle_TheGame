var turn;
var player;
var qntdPlayer = 1;
var SelectionAttack;
var armyAttack;
var fArea = new Array;
var qntdTerritorios = 42;
var armyTranfer = 0;
var vArmy;

var teste;

function teste(){
	// load('index.html'); // carrega todo o arquivos
	// window.location.href = "index.html";

	// alert("teste "+connectArea(3,4));
	// sound(2); //attack	
	$('#heightBar').unbind('change');

}

// $(document).ready(function(){
// 	$("h2").click(function(){					//API JQUERY
// 		$("#armyContinente").css("color","red");		
// 		$("#army"+1).css("border","1px solid #FFF");
// 	})
// });

function initialize(){	
	localStorage.setItem("LS_fasesOfGame", 0); // Fases do Jogo  0-choiceTerritory()/ 1-battle()/ 2-UpdateBonus 
	localStorage.setItem("LS_turn", 1);
	localStorage.setItem("LS_player", 1);

	// Quantidade de exercito e Dominio - TERRITORIO

	for (var i = 0; i < qntdTerritorios; i++) {
		localStorage.setItem("A"+i, 0);	//Qntde exercito
		localStorage.setItem("PlayerA"+i, 0);//dominio player		
	};

	localStorage.setItem("bonusTerritory", 0);	
	localStorage.setItem("bonusContinent", 0);
	localStorage.setItem("bonusCards", 0);

	alert("valores:1vez somente,INITIALIZE");

	reloadTerritory();

}

function choiceTerritory(){	
	var nRandom;
	var i = 0;
	var ArmyCor = 1;

	do{ /* Não esquecer de tratar RANDOM para não repetir numeros*/
		nRandom = Math.floor((Math.random()*qntdTerritorios)); // Random de 0 a 10
		// alert(localStorage.getItem("A"+nRandom));
		
		if (localStorage.getItem("A"+nRandom)== 0){
		 		localStorage.setItem("A"+nRandom, 2);
		 		localStorage.setItem("PlayerA"+nRandom, ArmyCor);//dominio player

				if (ArmyCor == 1){
					ArmyCor = 2;					
				}
				else if (ArmyCor == 2){
					ArmyCor = 1;					
				}
				i++;				
		};	
	}while ( i < qntdTerritorios );
	localStorage.setItem("LS_fasesOfGame", 2);

	reloadTerritory();
}

function changePhases(){ //0-choiceTerritory()/ 1-battle()/ 2-UpdateBonus()
	var vPlayer;

	// load('index.html'); // carrega todo o arquivo

	vPlayer = localStorage.getItem("LS_turn");

	if (localStorage.getItem("LS_fasesOfGame")==2){
		alert("fases do game");
		localStorage.setItem("LS_fasesOfGame", 1);
	}
	else if(localStorage.getItem("LS_fasesOfGame")==1){
		localStorage.setItem("LS_fasesOfGame", 2);
		vPlayer++;
		if (vPlayer>qntdPlayer) {
			vPlayer=1;
		};
		alert("Mudar player");
		localStorage.setItem("LS_turn",vPlayer);
		acceptBonus(vPlayer);

	}

	document.getElementById("showPlayer").innerHTML= "Player: "+localStorage.getItem("LS_turn");
	document.getElementById("showPhase").innerHTML= "Fase: "+localStorage.getItem("LS_fasesOfGame"); 

	alert("Fases: 1-battle()/ 2-UpdateBonus -> "+localStorage.getItem("LS_fasesOfGame"));
	alert("Turno: "+localStorage.getItem("LS_turn"));
	
}

function acceptBonus(player){
	acceptBonusContinent(0,3);	// América do Sul=4
	acceptBonusContinent(4,9);	// Africa=6
	acceptBonusContinent(10,18);	// América do Norte=9
	acceptBonusContinent(19,25);	// Europa=7
	acceptBonusContinent(26,37);	// Ásia=12
	acceptBonusContinent(38,41);	// Oceania=4

	acceptBonusTerritory();

	reloadTerritory();
}

function acceptBonusContinent(ini,fin){
	var accept = 1;
	var i, bonus;

	for (var i = ini; i < fin; i++){
		if (localStorage.getItem("PlayerA"+i) != localStorage.getItem("LS_turn")){
			accept = 0;
		};
	};
	
	if ((fin-ini)>10) {	
		bonus=7;
	}
	else if ((fin-ini)>7){
		bonus=5;
	}
	else if ((fin-ini)>4){
		bonus=3;
	}
	else{
		bonus=2;
	}

	if(accept == 1){
		alert("continente!");
		bonus=bonus+parseInt(localStorage.getItem("bonusContinent"));
		localStorage.setItem("bonusContinent",bonus);
		alert("continente!");
	}
	
	// alert("Nenhum continente domain!");
}

function acceptBonusTerritory(){
	var bonus = 0;
	for (var i = 0; i < qntdTerritorios; i++){
		if (localStorage.getItem("PlayerA"+i)==localStorage.getItem("LS_turn")){
			bonus+= parseInt(localStorage.getItem("A"+i));
		};
	};
	bonus=(bonus/2)+parseInt(localStorage.getItem("bonusTerritory"));
	localStorage.setItem("bonusTerritory",bonus);

}

function whatYourColor(army){
	var cor;
	if (localStorage.getItem("PlayerA"+army)==1){
		cor = "red";
	}
	if (localStorage.getItem("PlayerA"+army)==2) {
		cor = "blue";
	};

	return cor;

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
			whatYourColor(i);			
			document.getElementById("army"+i).setAttribute('style', ' background-color:'+whatYourColor(i)+' ;');
		};

			//Total de Territorios de cada jogador
		for (var i=0; i<qntdTerritorios; i++){
			if (localStorage.getItem("PlayerA"+i) == 1){
				totalArmyPlayer[1] = parseInt(localStorage.getItem("A"+i))+ totalArmyPlayer[1];
				document.getElementById("totalArmy").innerHTML = totalArmyPlayer[1];
			}
			else if (localStorage.getItem("PlayerA"+i) == 2){ //Bonus por territórios divide por 2
				totalArmyPlayer[2] = parseInt(localStorage.getItem("A"+i))+ totalArmyPlayer[2];
				// document.getElementById("totalArmy").innerHTML = totalArmyPlayer[2];
			};
		};


		///localStorage.setItem("bonusTerritory",parseInt( parseInt(document.getElementById("totalArmy1").innerHTML) /2 ) ); //Qtos irá ganhar no próximo turno 
		
		document.getElementById("armyNextPhase1").innerHTML= localStorage.getItem("bonusTerritory");
		
		document.getElementById("armyContinente").innerHTML = localStorage.getItem("bonusContinent");

		document.getElementById("armyBonusCard").innerHTML = localStorage.getItem("bonusCards");

		// load('index.html'); // carrega todo o arquivos
		// alert("valores:,REALOADTERRITORY");
	
}

function updateTerritory(army){
	alert("update");
	var valor;
	var valueFinalUpdate;
										//Falta connect area****************
	if (armyTranfer == 1){ // Tranferir exercito próprio para outra área 
		alert("VARMY: "+vArmy+" Army: "+army);
		reloadTerritory();
		reluzTransfer(army);
		$('#heightBar').unbind('mousemove');//Reseta evento do heightbar

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
			armyTranfer = 0;
			$('#valueBar').unbind('click');	
			$('#heightBar').unbind('mousemove');
			reloadTerritory();
		});
	}
	$('.bonus').unbind('click');

	$(".bonus").click(function(){	
		var heightBar= document.getElementById("heightBar");
		valor=($(this).attr("value"));
		heightBar.value= "0";
		document.getElementById("valueBar").innerHTML = 0;

		if ( (valor==1)&&(localStorage.getItem("A"+army)>1) ) { //Transfer
			armyTranfer = 1;
			vArmy = army;
			alert("Selecionado Transfer");
			document.getElementById("heightBar").max= localStorage.getItem("A"+vArmy)-1;
		}

		if( ($(".bonus[value="+valor+"] span").html()>0)&&(armyTranfer==0) ){ //Normal update

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
				reloadTerritory();
			});		

		}

	});

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
		diceAnimation(valueDice[i],"Attack"); 		
	}
	for (i=4; i <= (diceD+3); i++){
	 	valueDice[i]= rollTheDice();
	 	diceAnimation(valueDice[i],"Defenser");		
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
	var qts,vArmy,qtsLose=0;	
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
		else{	//Defesa ganhou
			vArmy = parseInt(localStorage.getItem("A"+armyAttack))-1;
			localStorage.setItem("A"+armyAttack,vArmy);
			qtsLose++;
					alert("Atack Lost");
		}
	}

	if (localStorage.getItem("A"+armyDefender)==0) {
		vArmy = parseInt(localStorage.getItem("A"+armyAttack))-(diceA-qtsLose);
		localStorage.setItem("A"+armyAttack,vArmy);
		localStorage.setItem("A"+armyDefender,(diceA-qtsLose));
		localStorage.setItem("PlayerA"+armyDefender,(localStorage.getItem("LS_turn")));
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
			alert("Ataccckk");

			if (localStorage.getItem("A"+armyDefender)== 1) {
				qntdDiceDefender = 1;
			}
			else if(localStorage.getItem("A"+armyDefender)== 2){
				qntdDiceDefender = 2;
			}
			else if(localStorage.getItem("A"+armyDefender)> 2){
				qntdDiceDefender = 3;
			}
			
			compareDice(qntdDiceAttack,qntdDiceDefender,armyAttack,armyDefender);

			SelectionAttack=false;
			$('#btnAttck').unbind('click');
			document.getElementById("qntdYourAttack").options.length = 0;

		});
	
}

function clique(army){
	var valor = document.getElementById("army"+army).innerHTML;		
	var conquest;
	alert("Conquest: "+conquest);
	
			//De quem q é o domínio do território, deve ser feito pelo banco, retornando qual player conquistou
	alert( localStorage.getItem("PlayerA"+army));

	conquest = localStorage.getItem("PlayerA"+army);

	alert("Army: "+army)
	alert("Turno do player? "+localStorage.getItem("LS_turn"));


	if (player == turn){
		if (localStorage.getItem("LS_fasesOfGame")==1) {  //Fase de Batalha

			if ( (conquest == player)&&(localStorage.getItem("A"+army)>1) ){ //selecionado seu territorio como atacante
				alert("Territorio seu");

				SelectionAttack=true;
				armyAttack = army;

				alert($("#army"+armyAttack).attr('title'));
				document.getElementById("b_qntd").innerHTML = localStorage.getItem("A"+armyAttack);
				document.getElementById("b_country").innerHTML = $("#army"+armyAttack).attr('title');

				document.getElementById("attack").style.display = "block";
				reluzOn(army);
				document.getElementById("attack").setAttribute('style', ' color: '+cor+';');

			}
			else if ( (SelectionAttack==true)&&(conquest != player) ){ // Já existe territorio atacante seleciona, agora será do oponente
				alert("Territorio inimigo");
				if ( connectArea(armyAttack,army) ) { //Verifica se há fronteira entre os territórios
					alert("connectArea: TRUE pode atacar");

					document.getElementById("b_qntdE").innerHTML = localStorage.getItem("A"+army);
					document.getElementById("b_countryE").innerHTML = $("#army"+army).attr('title');
					
					document.getElementById("attack").style.display = "none";
				    reluzAttack(army);
					battle(armyAttack,army);
							    
				}

			}		

		}
		else if (localStorage.getItem("LS_fasesOfGame")==2) { //FASE UPDATE
			alert("Fase 2");
			reloadTerritory();
			if (conquest == player) {
				reluzOn(army);
				document.getElementById("armyYour").innerHTML = document.getElementById("army"+army).innerHTML;
				alert("TESTTTTT");			
				updateTerritory(army);
			}

		}

		}	

}

function reluzOn(army){
	reloadTerritory();
	document.getElementById("army"+army).setAttribute('style', 'background-color: gray; border: 4px; solid #A0F ;'); //Efeito de seleção atacante

}

function reluzAttack(army){
	document.getElementById("army"+army).setAttribute('style', 'background-color: yellow; border: 4px; solid #A0F ;');
	document.getElementById("army"+armyAttack).setAttribute('style', 'background-color: white; border: 4px; solid #A0F ;');


}

function reluzTransfer(army){
	reloadTerritory();
	document.getElementById("army"+army).setAttribute('style', 'background-color: yellow; border: 4px; solid #A0F ;');
	document.getElementById("army"+vArmy).setAttribute('style', 'background-color: gray; border: 4px; solid #A0F ;');

}

function diceAnimation(value,who){
	alert(value+" "+who);  //fazer animação dos dados
	sound(2);

}

function connectArea(armyAttack,armyDefender){
				// FRONTEIRA FORMATO MATRIX
	fArea = Array(
			 //0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
		/*0*/ [2,1,1],
		/*1*/ [1,2,1,1],
		/*2*/ [1,1,2,1],
		/*3*/ [0,1,1,2],

		/*4*/ [2,1,1,1],
		/*5*/ [0,1,1,1],
		/*6*/ [2,1,1,1],
		/*7*/ [2,1,1,1],
		/*8*/ [2,1,1,1],
		/*9*/ [2,1,1,1]

	);

	// alert( "attack: "+armyAttack +"defendendo: "+ armyDefender+ "result:  "+fArea[armyAttack][armyDefender]);
	if(fArea[armyAttack][armyDefender]=='undefined'){
		return 0;
	}
	else{
		return fArea[armyAttack][armyDefender];
	}
}

function sound(number){
	switch (number) {
		case 1:
			$("#sound").attr('src','sample 7.wav'); 	break; // sound dice
		case 2:
			$("#sound").attr('src','sample 64.wav');	break;
	}document.getElementById("sound").play();


}