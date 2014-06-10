//Construtor

url = "ws://localhost:8080/echo";
w = new WebSocket(url, protocol);

//Métodos

w.send("Mensagem enviada ao servidor");
w.close();

//Eventos

w.onopen = function(){
	log("Abertura de conexão");
	w.send("mensagem enviada ao servidor");
}

w.onmessage = function() {
	log(e.data);
}

w.onclose = function (e) {
	log("closed");
}

w.onerror = function (e) {
	log("error");
}
