player = {};
player.kolvoVistrelov = 0;
//���������
//������� ���������
player.moveLeft = function  (){
//����� ������� - ����� �� ��������� ������
	if(canRight){
		// �������� ������ �����
		positionLeft = positionLeft + 5;
		// 
		document.getElementById("igrok-id").style.left = positionLeft + "%";
		// ��������� ���������
		player.checkPosition();
	}
	// ���������� ���� �������� ����
	posledneeNajatie = 'right';
	// �������� �������� - ������������ ���� ���������
	document.getElementById("igrok-id").style.backgroundImage = "url('player1.png')";
}
player.moveRight = function (){
// ���������, ����� �� �����
	if(canLeft){
		// �������� ������ �����
		positionLeft = positionLeft - 5;
		// �������� ���
		document.getElementById("igrok-id").style.left = positionLeft + "%";
		// ��������� �������
		player.checkPosition();
	}
	// ���������� ���� ��������� ����
	posledneeNajatie = 'left';
	// ������������ ���� - ������ �������� - ��� ����
	document.getElementById("igrok-id").style.backgroundImage = "url('player2.png')";

}
player.positionVzriv = function(){
//����� �������
	if(posledneeNajatie == 'left'){
		x = -4;
	} else {
		x = 10;
	}
	return positionLeft + x + '%';
}

//�� �������� ����������
// �������� ������� ������ - ������ ���� ����� ���������
player.checkPosition = function(){
// �������� ��� ����� ������ ������ (������� �����������)
	if(positionLeft > positionLeftProtivnikBlue - 10){
		// ���������� ��� ��������� ������ ������ 
		canRight = false;
	// �������� - ����� �� ������ ������ (����� ����������)
	} else {
		// ���������� ��� ��������� ������ �����
		canRight = true;
	}
	// ��������, ��� ����� ����� ������ (��������) - ������ ����������
	if(positionLeft < positionLeftProtivnikRed + 10){
		// ���������� ��� ��������� ������ ������ 
		canLeft = false;
	// �������� - ����� �� ����� ������ (����� ���������� �����)
	} else {
		canLeft = true;
	}
}
player.vistrilil = function() {
  // ���������� ���-������� ������
  document.getElementById("vistr").style.display='block';
  // ����������� ����� �� ������ �������
  document.getElementById("vistr").style.left = player.positionVzriv();
  // ��������� �������� ������� "������ �������"
  setTimeout(player.ubratVzrivVistrela, 500);
  
  // �������� ��� ���� ������� ������
  if(posledneeNajatie == 'left'){
    // ���������� � ����������� ��������� ������������� (�������)
    kolvoVistrelovVlevo = kolvoVistrelovVlevo + 1;
	// �������� ��� ���������� ��������� �������� 2
	if(kolvoVistrelovVlevo == 2){
		// � ���������� �������� ����� �������� ������ ���������� ����
		redAlive = false;
	}
  // ����� (��������) - ���� ������� �������
  } else {
	// ���������� ���������� ���������
	 kolvoVistrelovVpravo = kolvoVistrelovVpravo + 1;
	 // ���� ��������� ������ ��� 2
	 if(kolvoVistrelovVpravo == 2){
		// ���������� ��� ������ ����� �� ��� (����)
		blueAlive = false;
	 }
  }

player.kolvoVistrelovVpravo = function() {
	player.kolvoVistrelov = player.kolvoVistrelov + 1;
	console.log('��������� � ���� ����:', player.kolvoVistrelov);
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

//��������� �����
game.start = function() {
	// ��������� � ���������� ������ �� �����������
	cikl = setInterval(game.reguliarno, 500);
	// ������� ������� � ������� �������
	document.getElementById("start-id").style.display='none';
	// ������� �������� ����� � ������� �����
	document.getElementById("end-id").style.display='none'; 
	// ������ ������� �����������
	positionLeftProtivnikBlue = 90;
	positionLeftProtivnikRed = 1;
	// ����� ������� ����� � ����������� ���
	document.getElementById('audio-id').play();
	game.saveCounter();
	
}


//�������� �������� �����
game.end = function() {
  // ������� ���������
  clearInterval(cikl);
  // ���������� �������� �����
  document.getElementById("end-id").style.display='block';  
  // ��������� ����� ��������
  document.getElementById("start-id").style.display='none';
  // ���� �� �����
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
  // �������� ������� � ���������
  document.getElementById("vistr").style.display='none';
  
}



//������� ���������
game.reguliarno = function(){
// �������� ������� � ������ ���� ����� ���������
	player.checkPosition();
	// �������� ��� ������ ������ � ������ �������
	if(!canLeft && !canRight){
		// �����
		game.end();
	}
	// ��������, ��� ����� ������ � ��� �� ��������� ������� �����
	if(canLeft && redAlive){
		// ���������� � �������� ������ �������� ���������� �����������
		positionLeftProtivnikRed = positionLeftProtivnikRed + 1;
		// ����������� ���������� ������
		document.getElementById("protivnik-red").style.left = positionLeftProtivnikRed + '%';
	}
	// �������� ��� ����� ������� � ����� ������ ���
	if(canRight && blueAlive){
		// ���������� � �������� ������� ������ ����������
		positionLeftProtivnikBlue = positionLeftProtivnikBlue - 1;
		// ����������� ������� ������ �����
		document.getElementById("protivnik-blue").style.left = positionLeftProtivnikBlue + '%';
	}

}
 //�������




//������� ������
positionLeft = 50;
//������� ����������
positionLeftProtivnikBlue = 90;
//������� 2 ����������
positionLeftProtivnikRed = 1;
//������ � ����
canLeft = true;
//������ � �����
canRight = true;
//��������� �������
posledneeNajatie = 'right';
//��������� ������ ������
x = 10;
//��������� ���������
kolvoVistrelovVlevo = 0;
//���������� ���������
kolvoVistrelovVpravo = 0;
// ����� ��������� ���
blueAlive = true;
// ������� ��������� ���
redAlive = true;



tank = new vragRed ('tank', 200, 300);
tank1 = new vragRed ('tank', 250, 350);
tank2 = new vragRed ('tank', 300, 350);



tank = new vragBlue ('tank', 200, 300);
tank1 = new vragBlue ('tank', 250, 350);
tank2 = new vragBlue ('tank', 300, 350);





 
//setInterval(reguliarno, 2000);


//������ ��������
