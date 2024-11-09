const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(node => node.id === textNodeIndex);
  storyElement.innerText = textNode.text;

  while (choicesElement.firstChild) {
    choicesElement.removeChild(choicesElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.addEventListener("click", () => selectOption(option));
      choicesElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "Você acorda em uma floresta escura. Existe um caminho à frente.",
    options: [
      {
        text: "Seguir pelo caminho",
        nextText: 2
      },
      {
        text: "Explorar a floresta",
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: "Você encontra uma vila. As pessoas parecem amigáveis.",
    options: [
      {
        text: "Conversar com os moradores",
        nextText: 4
      },
      {
        text: "Ignorar a vila e seguir em frente",
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: "Você se perde na floresta e é atacado por um lobo. Fim de jogo.",
    options: [
      {
        text: "Recomeçar",
        nextText: -1
      }
    ]
  },
  {
    id: 4,
    text: "Os moradores te dão abrigo e comida. Você venceu!",
    options: [
      {
        text: "Jogar novamente",
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: "Você encontra um rio e decide descansar. Fim de jogo.",
    options: [
      {
        text: "Recomeçar",
        nextText: -1
      }
    ]
  }
];

startGame();
