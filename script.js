document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board'); // 取得棋盤元素
    const cells = []; // 儲存格子的二維數組
    let currentPlayer = 'x'; // 當前玩家

    // 初始化棋盤
    function initializeBoard() {
        board.innerHTML = ''; // 清空現有的棋盤內容

        // 建立棋盤的網格線
        for (let i = 1; i < 15; i++) { // 更新為 15 格
            const hLine = document.createElement('div');
            hLine.classList.add('line', 'horizontal-line');
            hLine.style.top = `${(i * 100) / 15}%`; // 設定水平線的位置
            board.appendChild(hLine);

            const vLine = document.createElement('div');
            vLine.classList.add('line', 'vertical-line');
            vLine.style.left = `${(i * 100) / 15}%`; // 設定垂直線的位置
            board.appendChild(vLine);
        }

        // 建立點擊區域
        for (let i = 0; i < 15; i++) { // 更新為 15 行
            cells[i] = [];
            for (let j = 0; j < 15; j++) { // 更新為 15 列
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i; // 設定格子的行數
                cell.dataset.col = j; // 設定格子的列數
                cell.style.top = `${(i * 100) / 15}%`;
                cell.style.left = `${(j * 100) / 15}%`;
                cell.style.width = `${100 / 15}%`;
                cell.style.height = `${100 / 15}%`;
                cell.addEventListener('click', handleCellClick); // 設定點擊事件監聽器
                board.appendChild(cell);
                cells[i][j] = cell; // 將格子加入二維數組中
            }
        }
    }

    // 處理格子點擊事件
    function handleCellClick(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (cell.hasChildNodes()) return; // 如果格子已經有棋子，則返回

        const piece = document.createElement('div');
        piece.classList.add('piece', currentPlayer); // 設定棋子的樣式

        // 計算每個格子的中心位置
        const cellWidth = board.clientWidth / 15;
        const cellHeight = board.clientHeight / 15;

        // 設定棋子的位置，使其位於格子交叉點上
        piece.style.top = `${row * cellHeight + cellHeight / 2}px`;
        piece.style.left = `${col * cellWidth + cellWidth / 2}px`;
        board.appendChild(piece);

        if (checkWin(row, col)) {
            alert(`${currentPlayer} 贏了！`); // 顯示勝利訊息
            resetBoard();
        }

        currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; // 切換玩家
    }

    // 檢查是否勝利
    function checkWin(row, col) {
        const directions = [
            { x: 1, y: 0 }, { x: 0, y: 1 },
            { x: 1, y: 1 }, { x: 1, y: -1 },
        ];

        for (let d of directions) {
            let count = 1;
            for (let i = 1; i < 5; i++) {
                const newRow = row + i * d.y;
                const newCol = col + i * d.x;
                if (newRow >= 0 && newRow < 15 && newCol >= 0 && newCol < 15 && cells[newRow][newCol].firstChild && cells[newRow][newCol].firstChild.classList.contains(currentPlayer)) {
                    count++;
                } else {
                    break;
                }
            }
            for (let i = 1; i < 5; i++) {
                const newRow = row - i * d.y;
                const newCol = col - i * d.x;
                if (newRow >= 0 && newRow < 15 && newCol >= 0 && newCol < 15 && cells[newRow][newCol].firstChild && cells[newRow][newCol].firstChild.classList.contains(currentPlayer)) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 5) return true; // 如果有五個連續的棋子，返回 true
        }

        return false; // 否則返回 false
    }

    // 重置棋盤
    function resetBoard() {
        currentPlayer = 'x'; // 重置當前玩家
        initializeBoard(); // 重新初始化棋盤
    }

    initializeBoard(); // 初始化棋盤
});
