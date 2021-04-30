const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1500;
canvas.height = 600;

//default variables
let draw_color = 'black';
let line_width = 5;
let isDrawing = false;
let restore_array = [];
let index = -1;

//when mouse is clicked
canvas.addEventListener('mousedown', (e) => {
	ctx.beginPath();
	ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
	isDrawing = true;
});

//when mouse is released
canvas.addEventListener('mouseup', () => {
	if (isDrawing) {
		isDrawing = false;
		ctx.closePath();
		index++;
		restore_array[index] = ctx.getImageData(0, 0, canvas.width, canvas.height);
		console.log(restore_array);
	}
});
canvas.addEventListener('mouseout', () => {
	if (isDrawing) {
		isDrawing = false;
		ctx.closePath();
		index++;
		restore_array[index] = ctx.getImageData(0, 0, canvas.width, canvas.height);
	}
});

//when mouse is clicked and dragged
canvas.addEventListener('mousemove', (e) => {
	if (isDrawing) {
		ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
		ctx.strokeStyle = draw_color;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.lineWidth = line_width;
		ctx.stroke();
	}
});

const clearBtn = document.getElementById('clear');
const undoBtn = document.getElementById('undo');
const redColor = document.getElementById('red');
const blueColor = document.getElementById('blue');
const greenColor = document.getElementById('green');
const purpleColor = document.getElementById('purple');
const colorPicker = document.getElementById('color-picker');
const strokeWidth = document.getElementById('stroke-width');

//clear whiteboard
clearBtn.addEventListener('click', clear);
function clear(e) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	restore_array = [];
	index = -1;
	e.preventDefault();
}

//color buttons
redColor.addEventListener('click', (e) => {
	draw_color = 'red';
	e.preventDefault();
});
blueColor.addEventListener('click', (e) => {
	draw_color = 'blue';
	e.preventDefault();
});
greenColor.addEventListener('click', (e) => {
	draw_color = 'green';
	e.preventDefault();
});
purpleColor.addEventListener('click', (e) => {
	draw_color = 'purple';
	e.preventDefault();
});

//custom color picker
colorPicker.addEventListener('change', () => {
	draw_color = colorPicker.value;
});

//change line width
strokeWidth.addEventListener('change', () => {
	line_width = strokeWidth.value;
});

//undo action
undoBtn.addEventListener('click', (e) => {
	if (index > 0) {
		restore_array.pop();
		index--;
		ctx.putImageData(restore_array[index], 0, 0);
	} else {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		restore_array = [];
		index = -1;
	}

	e.preventDefault();
});

//touch screen
//when touch is clicked
canvas.addEventListener('touchstart', (e) => {
	ctx.beginPath();
	ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
	isDrawing = true;
});

//when mouse is released
canvas.addEventListener('touchend', () => {
	if (isDrawing) {
		isDrawing = false;
		ctx.closePath();
		index++;
		restore_array[index] = ctx.getImageData(0, 0, canvas.width, canvas.height);
		console.log(restore_array);
	}
});
canvas.addEventListener('touchcancel', () => {
	if (isDrawing) {
		isDrawing = false;
		ctx.closePath();
		index++;
		restore_array[index] = ctx.getImageData(0, 0, canvas.width, canvas.height);
	}
});

//when mouse is clicked and dragged
canvas.addEventListener('touchmove', (e) => {
	if (isDrawing) {
		ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
		ctx.strokeStyle = draw_color;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.lineWidth = line_width;
		ctx.stroke();
	}
});
