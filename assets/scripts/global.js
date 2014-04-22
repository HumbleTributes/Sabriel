'use strict';

window.onload = function() {
	// Global Variables
	var canvas = document.getElementById('charter-canvas');
	var marks = document.getElementById('charter-marks');
	var mouse = {};
	var num = 300;
	var charterMarks = [];

	// Mouse Tracking
	// canvas.addEventListener('mousemove', trackMouse, false);
	function trackMouse(e) {
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	}

	// Create Charter Marks
	for (var i = 0; i < num; i++) {
		var charterChars = 'abcdefghijklmnopqrstuvwxyz';
		charterChars = charterChars.split('');
		var chosen = charterChars[Math.floor(Math.random() * charterChars.length)];
		charterMarks.push(chosen);
	}

	function charterMark(char) {
		var mark = document.createElement('span');
		mark.setAttribute('class', 'charter-mark');
		mark.setAttribute('style', 'left: ' + Math.random() * 100 + '%; top: ' + Math.random() * 100 + '%;');
		mark.innerHTML = char;

		marks.appendChild(mark);
	}

	for (var i = charterMarks.length - 1; i >= 0; i--) {
		new charterMark(charterMarks[i]);
	}
}