player = {};
player.kolvoVistrelov = 0;
//двигаться
//функция двигаться
player.moveLeft = function  (){
//новое условие - можно ли двигаться вправо
	if(canRight){
		// увеличим отступ слева
		positionLeft = positionLeft + 5;
		// 
		document.getElementById("igrok-id").style.left = positionLeft + "%";
		// проверить позицицию
		player.checkPosition();
	}
	// запоминаем куда повернут танк
	posledneeNajatie = 'right';
	// меняется картинка - поворачиваем танк визуально
	document.getElementById("igrok-id").style.backgroundImage = "url('player1.png')";
}
player.moveRight = function (){
// проверяем, можно ли влево
	if(canLeft){
		// уменьшим отступ слева
		positionLeft = positionLeft - 5;
		// сдвигаем див
		document.getElementById("igrok-id").style.left = positionLeft + "%";
		// проверяем позицию
		player.checkPosition();
	}
	// запоминаем куда повекрнут танк
	posledneeNajatie = 'left';
	// поворачиваем танк - меняем картинку - фон дива
	document.getElementById("igrok-id").style.backgroundImage = "url('player2.png')";

}
player.positionVzriv = function(){
//новое условие
	if(posledneeNajatie == 'left'){
		x = -4;
	} else {
		x = 10;
	}
	return positionLeft + x + '%';
}

//не таранить противника
// проверим позицию игрока - узнаем куда можно двигаться
player.checkPosition = function(){
// проверим что игрок правее синего (наверно столкнулись)
	if(positionLeft > positionLeftProtivnikBlue - 10){
		// запоминаем что двигаться вправо нельзя 
		canRight = false;
	// наоборот - игрок не правее синего (можно двингаться)
	} else {
		// запоминаем что двигаться вправо можно
		canRight = true;
	}
	// проверим, что игрок левее левого (красного) - значит стокнулись
	if(positionLeft < positionLeftProtivnikRed + 10){
		// запоминаем что двигаться налево нельзя 
		canLeft = false;
	// наоборот - игрок не левее левого (можно двингаться влево)
	} else {
		canLeft = true;
	}
}
player.vistrilil = function() {
  // показываем див-элемент взрыва
  document.getElementById("vistr").style.display='block';
  // передвигаем взрыв на нужную позицию
  document.getElementById("vistr").style.left = player.positionVzriv();
  // временная отсрочка функции "убрать выстрел"
  setTimeout(player.ubratVzrivVistrela, 500);
  
  // проверим что танк смотрит налево
  if(posledneeNajatie == 'left'){
    // переменная с количеством выстрелов увеличивается (счетчик)
    kolvoVistrelovVlevo = kolvoVistrelovVlevo + 1;
	// проверим что количество выстрелов достигло 2
	if(kolvoVistrelovVlevo == 2){
		// в переменную признака жизни красного левого запоминаем Ложь
		redAlive = false;
	}
  // иначе (наоборот) - танк смотрит направо
  } else {
	// прибавляем количество выстрелов
	 kolvoVistrelovVpravo = kolvoVistrelovVpravo + 1;
	 // если выстрелов вправо уже 2
	 if(kolvoVistrelovVpravo == 2){
		// запоминаем что правый синий не жив (ложь)
		blueAlive = false;
	 }
  }

player.kolvoVistrelovVpravo = function() {
	player.kolvoVistrelov = player.kolvoVistrelov + 1;
	console.log('выстрелов в этой игре:', player.kolvoVistrelov);
}
  player.kolvoVistrelovVpravo();
}



function vragBlue (name, top, left){
	this.name = name;
	this.top = top;
	this.left = left;
}



function vragRed (name, top, left){
	this.name = name;
	this.top = top;
	this.left = left;
}

shell = {};



game = {};

//начальный экран
game.start = function() {
	// сохраняем в переменную ссылку на сетИнтервал
	cikl = setInterval(game.reguliarno, 500);
	// убираем элемент с зеленым экраном
	document.getElementById("start-id").style.display='none';
	// убираем конечный экран с красным фоном
	document.getElementById("end-id").style.display='none'; 
	// задаем позицию противников
	positionLeftProtivnikBlue = 90;
	positionLeftProtivnikRed = 1;
	// берем элемент аудио и проигрываем его
	document.getElementById('audio-id').play();
	game.saveCounter();
	
}


//показать конечный экран
game.end = function() {
  // очистка интервала
  clearInterval(cikl);
  // показываем конечный экран
  document.getElementById("end-id").style.display='block';  
  // начальный экран скрываем
  document.getElementById("start-id").style.display='none';
  // звук на паузу
  document.getElementById('audio-id').pause();
 
}


game.saveCounter = function() {
	var x = localStorage.getItem('kolichestvoZapuskov');
	x = parseInt(x);
	x = x + 1;
	localStorage.setItem('kolichestvoZapuskov', x);
	console.log(x);
}
player.ubratVzrivVistrela = function() {
  // скрываем элемент с выстрелом
  document.getElementById("vistr").style.display='none';
  
}



//функция регулярно
game.reguliarno = function(){
// проверим пощицию и узнаем куда можно двигаться
	player.checkPosition();
	// проверим что нельзя налево и нельзя направо
	if(!canLeft && !canRight){
		// конец
		game.end();
	}
	// проверим, что можно налево и жив ли противник красный левый
	if(canLeft && redAlive){
		// переменную с позицией левого красного противника увеличиваем
		positionLeftProtivnikRed = positionLeftProtivnikRed + 1;
		// передвигаем противника правее
		document.getElementById("protivnik-red").style.left = positionLeftProtivnikRed + '%';
	}
	// проверим что можно направо и синий правый жив
	if(canRight && blueAlive){
		// переменную с позицией правого синего умееньшаем
		positionLeftProtivnikBlue = positionLeftProtivnikBlue - 1;
		// передвигаем правого синего левее
		document.getElementById("protivnik-blue").style.left = positionLeftProtivnikBlue + '%';
	}

}
 //выстрел




//позиция игрока
positionLeft = 50;
//позиция противника
positionLeftProtivnikBlue = 90;
//позиция 2 противника
positionLeftProtivnikRed = 1;
//можешь в лево
canLeft = true;
//можешь в право
canRight = true;
//последние нажатие
posledneeNajatie = 'right';
//переменая сдвига взрыва
x = 10;
//количесто выстрелов
kolvoVistrelovVlevo = 0;
//количество выстрелов
kolvoVistrelovVpravo = 0;
// синий противник жив
blueAlive = true;
// красный противник жив
redAlive = true;



tank = new vragRed ('tank', 200, 300);
tank1 = new vragRed ('tank', 250, 350);
tank2 = new vragRed ('tank', 300, 350);



tank = new vragBlue ('tank', 200, 300);
tank1 = new vragBlue ('tank', 250, 350);
tank2 = new vragBlue ('tank', 300, 350);





 
//setInterval(reguliarno, 2000);


//уборка выстрела
