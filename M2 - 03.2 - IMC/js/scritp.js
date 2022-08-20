function start() {
  var buttonCalculateImc = document.querySelector('#button-calculate-imc');
  buttonCalculateImc.addEventListener('click', handleButtonClick);

  //Para deixar uma página mais dinâmica, basta liberar esses código. Ele tira a função de clicar no botão que calcula o IMC e conforme o usuário altera os campos, ele já altera o resultado.
  /*var inputWeight = document.querySelector('#input-weight');
  var inputHeight = document.querySelector('#input-height');

  inputHeight.addEventListener('input', handleButtonClick)
  inputWeight.addEventListener('input', handleButtonClick);
  
  handleButtonClick()*/
}

function calculateIMC(weight, height) {
  return weight / (height * height);
}

function handleButtonClick() {
  var inputWeight = document.querySelector('#input-weight');
  var inputHeight = document.querySelector('#input-height');
  var imcResult = document.querySelector('#imc-result');

  var weight = Number(inputWeight.value);
  var height = Number(inputHeight.value);

  var imc = calculateIMC(weight, height);
  var formattedImc = imc.toFixed(2).replace('.', ',');

  imcResult.textContent = formattedImc;
}
start();
