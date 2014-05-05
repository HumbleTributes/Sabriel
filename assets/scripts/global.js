'use strict';

(function() {
	// Global Variables
	var marks = document.getElementById('charter-marks');
	var num = 777;
	var charterMarks = [];

	// Create Charter Marks
	for (var i = 0; i < num; i++) {
		var charterChars = 'abcdefghijklmnopqrstuvwxyz';
		charterChars = charterChars.split('');
		var chosen = charterChars[Math.floor(Math.random() * charterChars.length)];
		charterMarks.push(chosen);
	}

	function charterMark(char) {
		var mark = document.createElement('span');
		var randomX = Math.floor((Math.random()*window.screen.availWidth)+1);
		var randomY = Math.floor((Math.random()*window.screen.availHeight)+1);
		mark.setAttribute('class', 'charter-mark');
		mark.setAttribute('style', 'left: ' + randomX + 'px; top: ' + randomY + 'px;');
		mark.innerHTML = char;

		marks.appendChild(mark);
	}

	for (var i = charterMarks.length - 1; i >= 0; i--) {
		new charterMark(charterMarks[i]);
	}

	//--------------------------------------------//

	var canvas = document.getElementById('master-mark');
	var context = canvas.getContext('2d');
	var mouse = {};

	// Mouse Tracking
	function trackMouse(e) {
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	}
	canvas.addEventListener('mousemove', trackMouse, false);

	// Create Master Mark
	function createMasterMark(mark) {
		// Create Master Mark
		context.fillStyle = '#D77510';
		context.font = '600px "Charter Marks", cursive';
		var textWidth = context.measureText(mark).width;

		context.fillText(mark, (canvas.width/2) - (textWidth / 2), (canvas.height/2) + 150);
	}

	//Resize Canvas when screen is resized
	function resizeCanvas() {
		// Setting Canvas Size
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

        createMasterMark('s');
    }
    window.addEventListener('resize', resizeCanvas, false);

    resizeCanvas();
})();