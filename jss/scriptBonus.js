function acceptBonus(player){
	acceptBonusContinent();
	acceptBonusTerritory();

	reloadTerritory();
}

function acceptBonusContinent(){
	var i, bonus=0;


	if (americaDoSulConquest()) {
		bonus+=2;
	}
	if (americaDoNorteConquest()) {
		bonus+=5;
	}
	if (africaConquest()) {
		bonus+=3;
	}
	if (europaConquest()) {
		bonus+=9;
	}
	if (asiaConquest()) {
		bonus+=9;
	}
	if (oceaniaConquest()) {
		bonus+=2;
	}

	if(localStorage.getItem("LS_turn") == localStorage.getItem("LS_player")){
		alert("continente!");
		bonus=bonus+parseInt(localStorage.getItem("bonusContinent"));
		localStorage.setItem("bonusContinent",bonus);
	}
	
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