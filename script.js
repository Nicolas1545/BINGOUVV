let bingoBoard = [];
let calledNumbers = [];
const rowCount = 5;
const colCount = 5;

function generateBoard() {
    // Initialize the board
    bingoBoard = [];
    const numbersPerColumn = 15;
    const columns = ['B', 'I', 'N', 'G', 'O'];
    
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
        let start = colIdx * numbersPerColumn + 1;
        let end = start + numbersPerColumn - 1;
        let columnNumbers = [];
        
        for (let num = start; num <= end; num++) {
            columnNumbers.push(num);
        }
        
        // Randomize the order of numbers within each column
        for (let i = columnNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [columnNumbers[i], columnNumbers[j]] = [columnNumbers[j], columnNumbers[i]];
        }
        
        bingoBoard.push(columnNumbers);
    }

    // Render the board
    let boardElement = document.getElementById("bingo-board");
    boardElement.innerHTML = "";
    for (let i = 0; i < rowCount; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < colCount; j++) {
            let td = document.createElement("td");
            td.textContent = bingoBoard[j][i];
            tr.appendChild(td);
        }
        boardElement.appendChild(tr);
    }
}

function callNumber() {
    let remainingNumbers = [];
    for (let i = 1; i <= rowCount * colCount; i++) {
        if (!calledNumbers.includes(i)) {
            remainingNumbers.push(i);
        }
    }

    if (remainingNumbers.length === 0) {
        alert("Todos os números já foram chamados!");
        return;
    }

    const randomNumberIndex = Math.floor(Math.random() * remainingNumbers.length);
    const calledNumber = remainingNumbers[randomNumberIndex];
    calledNumbers.push(calledNumber);

    let calledNumberElement = document.getElementById("called-number");
    calledNumberElement.textContent = `Número chamado: ${calledNumber}`;

    // Marcar o número chamado na cartela
    let tdElements = document.getElementsByTagName("td");
    for (let td of tdElements) {
        if (parseInt(td.textContent) === calledNumber) {
            td.classList.add("selected");
        }
    }

    checkBingo();
}

function checkBingo() {
    let rows = Array.from(document.querySelectorAll("tr"));
    let cols = Array.from(document.querySelectorAll("tr td:nth-child(n)"));

    let diagonals = [
        Array.from(document.querySelectorAll("tr:nth-child(n) td:nth-child(n)")),
        Array.from(document.querySelectorAll("tr:nth-child(n) td:nth-child(-n+5)"))
    ];

    let lines = rows.concat(cols).concat(diagonals);

    for (let line of lines) {
        let isBingo = true;
        for (let td of line) {
            if (!td.classList.contains("selected")) {
                isBingo = false;
                break;
            }
        }
        if (isBingo) {
            alert("Bingo!");
            break;
        }
    }
}
