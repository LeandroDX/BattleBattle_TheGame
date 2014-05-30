var turn;
var player;
var qntdPlayer = 1;
var SelectionAttack;
var armyAttack;
var qntdTerritorios = 42;
var armyTranfer = 0;
var vArmy;

var teste;


function teste(){
	// load('index.html'); // carrega todo o arquivos
	// window.location.href = "index.html";

	// alert("conect "+connectArea(5,8));bonus
	// sound(2); //attack	
	// $('#heightBar').unbind('change');
	// $(".bonus").css("border","1px solid #222 background-color black");

	// $("#die"+1).attr("style"," display: block;");
	// alert( conditionWinner( 1,parseInt(localStorage.getItem("LS_objective")) )  );

//showPhase

	// window.setTimeout("sound(2)",3000);
	
$("#die"+1).attr("style"," opacity: 1.0;"); // Dice Visible

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
	localStorage.setItem("LS_objective", 0);

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
	var armyCor = 1;
	qntdPlayer=6;

	do{ /* Não esquecer de tratar RANDOM para não repetir numeros*/
		nRandom = Math.floor((Math.random()*qntdTerritorios)); // Random

		if (localStorage.getItem("A"+nRandom)== 0){
		 		localStorage.setItem("A"+nRandom, 2);	//qtnd de armys
		 		localStorage.setItem("PlayerA"+nRandom, armyCor);//dominio player
		 		armyCor++;

				if (armyCor > qntdPlayer){
					armyCor = 1;					
				}
				i++;		
		};

	}while ( i < qntdTerritorios );
	localStorage.setItem("LS_fasesOfGame", 2);

	reloadTerritory();
}

function whatYourColor(army){
	var cor;
	if (localStorage.getItem("PlayerA"+army)==1){
		cor = "red";
	}
	if (localStorage.getItem("PlayerA"+army)==2) {
		cor = "blue";
	}
	if (localStorage.getItem("PlayerA"+army)==3) {
		cor = "yellow";
	}
	if (localStorage.getItem("PlayerA"+army)==4) {
		cor = "green";
	}
	if (localStorage.getItem("PlayerA"+army)==5) {
		cor = "white";
	}
	if (localStorage.getItem("PlayerA"+army)==6) {
		cor = "pink";
	};

	return cor;

}

function changePhases(){ //0-choiceTerritory()/ 1-battle()/ 2-UpdateBonus()
	var vPlayer;

	// load('index.html'); // carrega todo o arquivo

	vPlayer = localStorage.getItem("LS_turn");

	if (localStorage.getItem("LS_fasesOfGame")==2){  //UPDATE
		alert("fases do game");
		localStorage.setItem("LS_fasesOfGame", 1);
	}
	else if(localStorage.getItem("LS_fasesOfGame")==1){  //BATTLE
		localStorage.setItem("LS_fasesOfGame", 2);
		vPlayer++;
		if (vPlayer>qntdPlayer) {
			vPlayer=1;
		};
		alert("Mudar player");
		localStorage.setItem("LS_turn",vPlayer);
		acceptBonus(vPlayer);
		conditionWinner( vPlayer,localStorage.getItem("LS_objective") );

	}

	alert("Fases: 1-battle()/ 2-UpdateBonus -> "+localStorage.getItem("LS_fasesOfGame"));
	alert("Turno: "+localStorage.getItem("LS_turn"));

	window.location.href = "index.html"; // carrega toda a pagina
	
}

function acceptBonus(player){
	acceptBonusContinent(0,3);		// América do Sul=4
	acceptBonusContinent(4,9);		// Africa=6
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
	localStorage.setItem("bonusTerritory",parseInt(bonus));

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
		

		explainStatus();



		// window.location.href = "index.html";
		// alert("valores:,REALOADTERRITORY");
	
}

function updateTerritory(army){
	alert("update");
	var valor;
	var valueFinalUpdate;							
							
	if ((armyTranfer == 1)&&(connectArea(vArmy,army)==1) ){ // Tranferir exercito próprio para outra área 
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
		reluzUpdate(this);
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
	var dice1 = document.getElementById("die1");

	var valueDice = new Array();
		valueDice[1]=0;
		valueDice[2]=0;
		valueDice[3]=0;
		valueDice[4]=0;
		valueDice[5]=0;
		valueDice[6]=0;

	// alert("Atack = "+diceA+"\nDefesa = "+ diceD);

	for (i=1; i <= diceA; i++){
		valueDice[i]= rollTheDice();
				//Who Dice //Value Dice
		diceAnimation( i,parseInt(valueDice[i]) );

	}
	for (i=4; i <= (diceD+3); i++){
	 	valueDice[i]= rollTheDice();
	 	document.getElementById("die"+i).innerHTML = parseInt(valueDice[i]);
	 	diceAnimation( i,parseInt(valueDice[i]) );
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
			if(valueDice[i]<valueDice[j]){  //ordena dados de Attack
				swap=valueDice[i];
				valueDice[i]=valueDice[j];
				valueDice[j]=swap;
			}
			if(valueDice[i+3]<valueDice[j+3]){  //ordena dados de Defense
				swap=valueDice[i+3];
				valueDice[i+3]=valueDice[j+3];
				valueDice[j+3]=swap;	
			}
		};		
	};

	for (i=1; i < valueDice.length; i++) {
			document.getElementById("die"+i).innerHTML = valueDice[i];
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
			// sound(2);
			$("#die"+[i+3]).attr("style"," opacity: 0.5;");
					alert("Atack Win");
		}
		else{	//Defesa ganhou
			vArmy = parseInt(localStorage.getItem("A"+armyAttack))-1;
			localStorage.setItem("A"+armyAttack,vArmy);
			qtsLose++;
			// sound(3);
			$("#die"+i).attr("style"," opacity: 0.5;");
					alert("Atack Lost");
		}
	}

	if (localStorage.getItem("A"+armyDefender)==0) {
		vArmy = parseInt(localStorage.getItem("A"+armyAttack))-(diceA-qtsLose);
		localStorage.setItem("A"+armyAttack,vArmy);
		localStorage.setItem("A"+armyDefender,(diceA-qtsLose));
		localStorage.setItem("PlayerA"+armyDefender,(localStorage.getItem("LS_turn")));
	};

	window.setTimeout("loadingPage()",5000);
	// loadingPage();
	// reloadTerritory();

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
		$('#btnAttck').unbind('click');//Reseta evento
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

	$('#army'+army).unbind('click');

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
					SelectionAttack=false;
							    
				}

			}		

		}
		else if (localStorage.getItem("LS_fasesOfGame")==2) { //FASE UPDATE
			alert("Fase 2");
			reloadTerritory();
			if (conquest == player) {
				reluzOn(army);
				document.getElementById("armyYour").innerHTML = document.getElementById("army"+army).innerHTML;
				updateTerritory(army);
			}

		}

	}	

}

function connectArea(armyAttack,armyDefender){
	var area;

				//FRONTEIRAS

	switch (armyAttack) {
		 case 0: area = [1,2]; 		break;
		 case 1: area = [0,2,3,7]; 	break;
		 case 2: area = [0,1,3];	break;
		 case 3: area = [1,2,10]; 	break;

		 case 4: area = [5,6,8]; 	break;
		 case 5: area = [4,6,8]; 	break;
		 case 6: area = [4,5,7,8]; 	break;
		 case 7: area = [1,6,8,9]; 	break;
		 case 8: area = [5,6,7,9]; 	break;
		 case 9: area = [7,8,27]; 	break;

		case 10: area = [3,11,12]; 		break;
		case 11: area = [10,12,14,17]; 	break;
		case 12: area = [10,11,13,14]; 	break;
		case 13: area = [12,14,15,16]; 	break;
		case 14: area = [11,12,13,16,17]; break;
		case 15: area = [13,16,37]; 	break;
		case 16: area = [13,15,18]; 	break;
		case 17: area = [11,14,18]; 	break;
		case 18: area = [16,17,20]; 	break;

		case 19: area = [20,21,22,25];	break;
		case 20: area = [18,19,25]; 	break;
		case 21: area = [7,9,19,22]; 	break;
		case 22: area = [19,21,23]; 	break;
		case 23: area = [7,8,27]; 		break;
		case 24: area = [23,25,27,29,32]; break;
		case 25: area = [19,20,24]; 	break;

		case 26: area = [9,23,24,27,29];	break;
		case 27: area = [26,28,29,30,39]; 	break;
		case 28: area = [27,30,40]; 		break;
		case 29: area = [24,26,27,30,32]; 	break;
		case 30: area = [27,28,29,31,32,33,34,37]; break;
		case 31: area = [30,37]; 			break;
		case 32: area = [24,29,30,33,34]; 	break;
		case 33: area = [30,32,34,35]; 		break;
		case 34: area = [32,33,35]; 		break;
		case 35: area = [33,34,36,37]; 		break;
		case 36: area = [34,35,37]; 		break;
		case 37: area = [15,30,35,36]; 		break;

		case 38: area = [39,40,41]; 	break;
		case 39: area = [27,38]; 		break;
		case 40: area = [28,38,41]; 	break;
		case 41: area = [38,40]; 		break;
	}
	
	for (var i=0; i < area.length; i++) {
		if (armyDefender==area[i]){
			return 1;
		}	
	};	
	return 0;
	

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

function reluzUpdate(bonus){
	$(".bonus").css("border","1px solid #222");
	// document.getElementById("army"+army).setAttribute('style', 'background-color: yellow; border: 4px; solid #A0F ;');

}

function diceAnimation(who,value){
	//fazer animação dos dados

	document.getElementById("die"+who).innerHTML = parseInt(value);
	$("#die"+who).attr("style"," opacity: 1.0;"); // Dice Visible

	window.setTimeout("sound(1)",2000);
}

function sound(number){
	switch (number) {
		case 1:
			$("#sound").attr('src','MEDIA/sample 7.wav'); 	break; // sound dice
		case 2:
			$("#sound").attr('src','MEDIA/sample 64.wav');	break;
		case 3:
			$("#sound").attr('src','MEDIA/sample 27.wav');	break;
	}document.getElementById("sound").play();

}

function loadingPage(){
	window.location.href = "index.html";

}

function explainStatus(){

	document.getElementById("armyNextPhase1").innerHTML= localStorage.getItem("bonusTerritory");	
	document.getElementById("armyContinente").innerHTML = localStorage.getItem("bonusContinent");
	document.getElementById("armyBonusCard").innerHTML = localStorage.getItem("bonusCards");

	document.getElementById("showPlayer").innerHTML= "Player: "+localStorage.getItem("LS_turn");

	if (localStorage.getItem("LS_fasesOfGame")==1) {
		document.getElementById("showPhase").innerHTML= "Phase: "+ "BATTLE";
		
	}
	else if (localStorage.getItem("LS_fasesOfGame")==2) {
		document.getElementById("showPhase").innerHTML= "Phase: "+ "UPDATE";

	}
}