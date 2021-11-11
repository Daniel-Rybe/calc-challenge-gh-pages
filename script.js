//implementing theme change

$('.theme-toggle').mousedown(e => {
	let targetRect = e.currentTarget.getBoundingClientRect();
	let x = e.pageX - targetRect.left;
	let width = targetRect.width;

	if (x < 0.33 * width) {
		$('.theme-toggle-pin').css('margin-left', '0.4em');
		let body = $('body');
		body.addClass('theme1')
		body.removeClass('theme2 theme3');
		return;
	}

	if (x < 0.66 * width) {
		$('.theme-toggle-pin').css('margin-left', 'calc(50% - 1em + 0.4em)');
		let body = $('body');
		body.addClass('theme2')
		body.removeClass('theme1 theme3');
		return;
	}

	$('.theme-toggle-pin').css('margin-left', 'calc(100% - 2em + 0.4em)');
	let body = $('body');
	body.addClass('theme3')
	body.removeClass('theme1 theme2');
})

//calculator code
let display = $('.display');

function applyOp(a, b, op) {
	switch(op) {
		case '+':
			return a + b;
		case '-':
			return a - b;
		case '*':
			return a * b;
		case '/':
			return a / b;
	}
}

function opFuncGenerator(op_) {
	return e => {
		num = parseFloat(display.html());
		if (isNaN(num)) return;

		if ((buffer || buffer == 0) && op) {
			if (op == '/' && num == 0) {
				display.html('ERROR');
				return;
			}
			num = applyOp(buffer, num, op);
			display.html(num.toString());
		}

		buffer = num;
		op = op_;
		equals_buffer = undefined;
		clearScreen = true;
	}
}

function inputFuncGenerator(input) {
	return e => {
		if (clearScreen) {
			display.html('');
			clearScreen = false;
		}
		display.html(display.html() + input);
	}
}

$('.button-0').click(inputFuncGenerator('0'));
$('.button-1').click(inputFuncGenerator('1'));
$('.button-2').click(inputFuncGenerator('2'));
$('.button-3').click(inputFuncGenerator('3'));
$('.button-4').click(inputFuncGenerator('4'));
$('.button-5').click(inputFuncGenerator('5'));
$('.button-6').click(inputFuncGenerator('6'));
$('.button-7').click(inputFuncGenerator('7'));
$('.button-8').click(inputFuncGenerator('8'));
$('.button-9').click(inputFuncGenerator('9'));
$('.button-dot').click(inputFuncGenerator('.'));

$('.button-del').click(e => {
	if (clearScreen) {
		display.html('');
		clearScreen = false;
	}
	display.html(display.html().slice(0, -1));
	clearScreen = false;
});

$('.button-reset').click(e => {
	display.html('');
	clearScreen = false;
	buffer = undefined;
	op = undefined;
	equals_buffer = undefined;
});

let clearScreen = false;
let buffer = undefined;
let op = undefined;
let equals_buffer = undefined;

$('.button-plus').click(opFuncGenerator('+'));
$('.button-minus').click(opFuncGenerator('-'));
$('.button-mult').click(opFuncGenerator('*'));
$('.button-div').click(opFuncGenerator('/'));

$('.button-equals').click(e => {
	let num = parseFloat(display.html());
	if (isNaN(num) || !op) return;

	if (!equals_buffer && equals_buffer != 0) {
		if (!buffer && buffer != 0) return;
		equals_buffer = num;
		num = buffer;
	}

	if (op == '/' && equals_buffer == 0) {
		display.html('ERROR');
		return;
	}

	let newNum = applyOp(num, equals_buffer, op);

	display.html(newNum.toString());
	clearScreen = true;
	buffer = undefined;
});