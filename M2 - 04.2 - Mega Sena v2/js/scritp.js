var state = { board: [], currentGame: [], savedGames: [] };

//iniciar o jogo
function start() {
  //imprime os jogos salvos no navegador na tela
  readLocalStorage();

  //cria a combinação
  createBoard();

  //faz um novo jogo
  newGame();
}

//gravar os jogos na memoria do navegador
function readLocalStorage() {
  if (!window.localStorage) {
    return;
  }

  var savedGamsFromLocalStorage = window.localStorage.getItem('saved-games');

  if (savedGamsFromLocalStorage) {
    state.savedGames = JSON.parse(savedGamsFromLocalStorage);
  }
}

//resgata os jogos salvos no navegador
function writeToLocalStorage() {
  window.localStorage.setItem('saved-games', JSON.stringify(state.savedGames));
}

//criar a combinação de números, no caso, 60 números da megasena
function createBoard() {
  //zera o jogo
  state.board = [];

  //cria a sequencia de numeros
  for (var i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}

//adicionar um número ao jogo
function addNumberToGame(numberToAdd) {
  //verificar se o número está entre 1 e 60
  if (numberToAdd < 1 || numberToAdd > 60) {
    console.error('Número inválido', numberToAdd);
    return;
  }

  //verificar o tamanho do jogo
  if (state.currentGame.length >= 6) {
    console.error('O jogo já está completo.');
    return;
  }

  //verificar se um número adicionado já está no jogo
  if (isNumberInGame(numberToAdd)) {
    console.error('Este número já está no jogo', numberToAdd);
    return;
  }

  //depois das verificações adiciona o número ao jogo
  state.currentGame.push(numberToAdd);
}

//remove um número do jogo
function removeNumberFromGame(numberToRemove) {
  //verifica se o número está dentro do intervalo
  if (numberToRemove < 1 || numberToRemove > 60) {
    console.error('Número inválido', numberToRemove);
    return;
  }
  //cria a variável de novo jogo
  var newGame = [];

  //verifica se o número está dentro do jogo
  for (var i = 0; i < state.currentGame.length; i++) {
    var currentNumber = state.currentGame[i];

    //se o número está dentro do jogo, remove ele
    if (currentNumber === numberToRemove) {
      continue;
    }

    //atualiza o jogo
    newGame.push(currentNumber);
  }

  state.currentGame = newGame;
}

//verifica se o número já foi adicionado ao jogo
function isNumberInGame(numberToCheck) {
  // if (state.currentGame.includes(numberToCheck)) {
  //   return true;
  // }

  // return false;

  return state.currentGame.includes(numberToCheck);
}

//verifica se o jogo está completo
function saveGame() {
  if (!isGameComplete()) {
    console.error('O jogo não está completo!');
    return;
  }

  state.savedGames.push(state.currentGame);
  writeToLocalStorage();
  newGame();
}

//verifica se no jogo possui 6 números
function isGameComplete() {
  return state.currentGame.length === 6;
}

//reinicia o jogo
function resetGame() {
  state.currentGame = [];
}

//inicia um novo jogo
function newGame() {
  resetGame();
  render();
}

//renderiza o jogo
function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

//renderiza os números do jogo
function renderBoard() {
  //chama a div onde será feito o board do jogo
  var divBoard = document.querySelector('#megasena-board');

  //limpa o board do jogo
  divBoard.innerHTML = '';

  //define a criação de uma lista
  var ulNumbers = document.createElement('ul');
  ulNumbers.classList.add('numbers');

  //verifica o tamanho do boars
  for (var i = 0; i < state.board.length; i++) {
    var currentNumber = state.board[i];

    //cria a linha adicionando o número do elemento da mega
    var liNumber = document.createElement('li');
    liNumber.textContent = currentNumber;
    liNumber.classList.add('number');

    //funcionalidade de click no número
    liNumber.addEventListener('click', handleNumberClick);

    if (isNumberInGame(currentNumber)) {
      liNumber.classList.add('selected-number');
    }

    //cria a estrutura da lista
    ulNumbers.appendChild(liNumber);
  }

  //imprime na tela a lista de números
  divBoard.appendChild(ulNumbers);
}

//ação ao clicar em um número para add ou remover o número
function handleNumberClick(event) {
  var value = Number(event.currentTarget.textContent);

  //verifica se o número está ou não no jogo
  if (isNumberInGame(value)) {
    removeNumberFromGame(value);
  } else {
    addNumberToGame(value);
  }

  render();
}

//renderiza os botões do jogo
function renderButtons() {
  var divButtons = document.querySelector('#megasena-buttons');
  divButtons.innerHTML = '';

  var buttonNewGame = createNewGameButton();
  var buttonRandomGame = createRandomGameButton();
  var buttonSaveGame = createSaveGameButton();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
}

//criar o botão Novo Jogo
function createNewGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Novo jogo';

  button.addEventListener('click', newGame);

  return button;
}

//cria o botão Random
function createRandomGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Jogo Aleatório';

  button.addEventListener('click', randomGame);

  return button;
}

//cria o jogo randomizado para colocar no botão
function randomGame() {
  resetGame();

  while (!isGameComplete()) {
    var randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }

  render();
}

//cria o botão Salvar Jogo
function createSaveGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Salvar Jogo';
  button.disabled = !isGameComplete();

  button.addEventListener('click', saveGame);

  return button;
}

//renderiza os jogos salvos
function renderSavedGames() {
  var divSavedGames = document.querySelector('#megasena-saved-games');
  divSavedGames.innerHTML = '';

  if (state.savedGames.length === 0) {
    divSavedGames.innerHTML = '<p>Nenhum jogo salvo</p>';
  } else {
    var ulSavedGames = document.createElement('ul');

    for (var i = 0; i < state.savedGames.length; i++) {
      var currentGame = state.savedGames[i];
      var liGame = document.createElement('li');
      liGame.textContent = currentGame.join(', ');

      ulSavedGames.appendChild(liGame);
    }
    divSavedGames.appendChild(ulSavedGames);
  }
}

start();
