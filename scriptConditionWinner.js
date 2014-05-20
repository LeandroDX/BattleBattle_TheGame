function conditionWinner(player,objective){

	switch (objective) {
		case 0:
			return mission0(player); 	break;
		case 1:
			return mission1(player); 	break;
	}

}

/*Abaixo seguem todos os objetivos do jogo:
		- Conquistar na totalidade a EUROPA, a OCEANIA e mais um terceiro.
		- Conquistar na totalidade a ASIA e a AMÉRICA DO SUL.
		- Conquistar na totalidade a EUROPA, a AMÉRICA DO SUL e mais um terceiro.
		- Conquistar 18 TERRITÓRIOS e ocupar cada um deles com pelo menos dois exércitos.
		- Conquistar na totalidade a ASIA e a ÁFRICA.
		- Conquistar na totalidade a AMÉRICA DO NORTE e a ÁFRICA.
		- Conquistar 24 TERRITÓRIOS à sua escolha.
		- Conquistar na totalidade a AMÉRICA DO NORTE e a OCEANIA.
		- Destruir totalmente OS EXÉRCITOS AZUIS.
		- Destruir totalmente OS EXÉRCITOS AMARELOS.
		- Destruir totalmente OS EXÉRCITOS VERMELHOS.
		- Destruir totalmente OS EXÉRCITOS PRETOS.
		- Destruir totalmente OS EXÉRCITOS BRANCO.
		- Destruir totalmente OS EXÉRCITOS VERDES.
*/

function mission0(player){	// Conquistar o mundo! by Pink e Cerebro
	var i,winner=true;


	for (i=0; i<=3; i++) {	// América do Sul
		if (localStorage.getItem("PlayerA"+i)!=player){
			return false;
		};
	};

	for (i=4; i<=9; i++) {	// África
		if (localStorage.getItem("PlayerA"+i)!=player){
			return false;
		};
	};

	for (i=10; i<=18; i++) {	// América do Norte
		if (localStorage.getItem("PlayerA"+i)!=player){
			return false;
		};
	};

	for (i=19; i<=25; i++) {	// Europa
		if (localStorage.getItem("PlayerA"+i)!=player){
			return false;
		};
	};

	for (i=26; i<=37; i++) {	// Ásia
		if (localStorage.getItem("PlayerA"+i)!=player){
			return false;
		};
	};

	for (i=38; i<=41; i++) {	// Oceania
		if (localStorage.getItem("PlayerA"+i)!=player){
			return false;
		};
	};

	return true;
}

function mission1(player){	// Conquistar na totalidade a EUROPA, a OCEANIA e mais um terceiro.
	var i,winner=true;




	// for (i=19; i<=25; i++) {	// Europa
	// 	if (localStorage.getItem("PlayerA"+i)!=player){
	// 		return false;
	// 	};
	// };

	// for (i=38; i<=41; i++) {	// Oceania
	// 	if (localStorage.getItem("PlayerA"+i)!=player){
	// 		return false;
	// 	};
	// };

	// return true;
}