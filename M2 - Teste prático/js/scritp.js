function start() {
  newImc();

  // var buttonCalculateImc = document.querySelector('#button-calculate-imc');
  // buttonCalculateImc.addEventListener('click', handleButtonClick);
}

function newImc() {
  render();
}

function render() {
  renderBoard();
  renderButton();
  renderResult();
}

function renderBoard() {
  var divBoard = document.querySelector('#imc-dados');
  divBoard.innerHTML = '';

  var lblWeight = createLabelWeight();
  var iptWeight = creatInputWeight();
  var lblHeight = createLabelHeight();
  var iptHeight = creatInputHeight();

  divBoard.appendChild(document.createElement('p'));
  divBoard.appendChild(lblWeight);
  divBoard.appendChild(document.createElement('br'));
  divBoard.appendChild(iptWeight);

  divBoard.appendChild(document.createElement('p'));
  divBoard.appendChild(lblHeight);
  divBoard.appendChild(document.createElement('br'));
  divBoard.appendChild(iptHeight);
}

function createLabelWeight() {
  var lbl = document.createElement('label');
  lbl.textContent = 'Digite o peso (kg):';
  return lbl;
}

function createLabelHeight() {
  var lbl = document.createElement('label');
  lbl.focus = '#input-Weight';
  lbl.textContent = 'Digite a altura (m):';
  return lbl;
}

function creatInputWeight() {
  var ipt = document.createElement('input');
  ipt.id = 'input-weight';
  ipt.type = Number;
  ipt.value = 0;
  ipt.step = 0.1;
  ipt.textContent = '';
  return ipt;
}

function creatInputHeight() {
  var ipt = document.createElement('input');
  ipt.id = 'input-height';
  ipt.type = Number;
  ipt.value = 0;
  ipt.step = 0.01;
  ipt.textContent = '';
  return ipt;
}

function renderButton() {
  var divButton = document.querySelector('#imc-button');
  divButton.innerHTML = '';

  var buttonCalculate = createButtonCalculate();

  divButton.appendChild(document.createElement('p'));
  divButton.appendChild(buttonCalculate);
}

function renderResult() {
  var divResult = document.querySelector('#imc-resolve');
  divResult.innerHTML = '';

  var lblParagraphResult = createParagraphResult();
  var lblStrongResult = createStrongResult();
  var lblParagraphTable = createParagraphTable();
  var lblStrongTable = createStrongTable();

  divResult.appendChild(document.createElement('p'));
  divResult.appendChild(lblParagraphResult);
  divResult.appendChild(lblStrongResult);

  divResult.appendChild(document.createElement('p'));
  divResult.appendChild(lblParagraphTable);
  divResult.appendChild(lblStrongTable);
}

function createParagraphResult() {
  var lbl = document.createElement('label');
  lbl.textContent = 'O IMC desses dados é: ';
  return lbl;
}

function createParagraphTable() {
  var lbl = document.createElement('label');
  lbl.textContent = 'Este valor considera que você está na faixa: ';
  return lbl;
}

function createStrongResult() {
  var lbl = document.createElement('label');
  lbl.id = 'imc-result';
  lbl.textContent = '???';

  return lbl;
}

function createStrongTable() {
  var lbl = document.createElement('label');
  lbl.id = 'imc-table';
  lbl.textContent = '???';
  return lbl;
}

function calculateIMC(weight, height) {
  var imc = weight / (height * height);

  return imc;
}

function createButtonCalculate() {
  var button = document.createElement('button');
  button.id = 'button-calculate-imc';
  button.textContent = 'Calcular IMC';

  button.addEventListener('click', handleButtonClick);
  return button;
}

function handleButtonClick() {
  var inputWeight = document.querySelector('#input-weight');
  var inputHeight = document.querySelector('#input-height');
  var imcResult = document.querySelector('#imc-result');
  var imcTable = document.querySelector('#imc-table');

  var weight = Number(inputWeight.value);
  var height = Number(inputHeight.value);

  var imc = calculateIMC(weight, height);
  var formattedImc = imc.toFixed(2).replace('.', ',');

  var resultImc = '';
  if (imc < 16) {
    resultImc = 'Valor inválido';
  } else if (imc < 17) {
    resultImc = 'Muito abaixo do peso!';
  } else if (imc < 18.5) {
    resultImc = 'Abaixo do peso';
  } else if (imc < 25) {
    resultImc = 'Peso normal';
  } else if (imc < 30) {
    resultImc = 'Acima do peso';
  } else if (imc < 35) {
    resultImc = 'Obesidade grau I';
  } else if (imc <= 40) {
    resultImc = 'Obesidade grau II';
  } else {
    resultImc = 'Obesidade grau III';
  }

  imcResult.textContent = formattedImc;
  imcTable.textContent = resultImc;
}

start();
