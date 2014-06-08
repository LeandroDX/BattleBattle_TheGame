
var sorteio = Array;
 sorteio = [];
var num=-1;
var armyCor = 1;

function animationScroll(){
	// var place = $("#army"+army);
		// document.getElementById("country").innerHTML = $("#army"+sorteio[num]).attr('title');
	window.setTimeout(function() {
		num+=1;

		var place = $("#army"+sorteio[num]);
		var position = place.position();
		var top, left;
		top = position.top;
		left = position.left;

		document.getElementById("country").innerHTML = $("#army"+sorteio[num]).attr('title');
		document.getElementById("country").setAttribute('style', 'margin-left: '+left+'px;	margin-top: '+top+'px;'+
																  'transition-duration: 0.4s;opacity: 1.0;'+
																  'background-color: '+whatYourColor(armyCor)+';'+
																  'width: 100px; font-size: 18px; opacity: 0.8'
																  );
		localStorage.setItem("A"+sorteio[num],2);
 		localStorage.setItem("PlayerA"+sorteio[num], armyCor);//dominio player
 		// animationScroll(territory[nRandom]);
 		// reloadTerritory();

		armyCor++;
		if (armyCor > qntdPlayer){
			armyCor = 1;					
		};
		
		if (num<sorteio.length) {
			animationScroll();			
		};
		if(num>=sorteio.length-1){
			window.setTimeout(function() {
				loadingPage();
			}, 480);
		};
		window.setTimeout(function() {
			sound(5);
		}, 400);

	}, 500);

	window.setTimeout(function() {
		// document.getElementById("country").setAttribute('style', 'display: block;');
		document.getElementById("country").setAttribute('style', 'margin-left: 725px; margin-top: 260px; opacity: 1.0;');
		document.getElementById("country").innerHTML = $("#army"+sorteio[num+1]).attr('title');
		reloadTerritory();
	}, 490);
		
}


// var transicao=750;
// function animationScroll(army){
// 	// position(army);

// 	window.setTimeout(function() {

// 		var place = $("#army"+army);
// 		var position = place.position();
// 		var top, left;
// 		top = position.top;
// 		left = position.left;

// 		// document.getElementById("country").setAttribute('style', 'margin-top:'+transicao+'px;');
// 		document.getElementById("country").setAttribute('style', 'margin-left:'+transicao+'px;');

// 		// alert(transicao+" <T--Top> "+top);
		
// 		if (transicao > top) {
// 			transicao-=100;
// 			animationScroll(army);
// 		};

// 	}, 500);