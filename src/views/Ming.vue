<template>
    <div>
        <h1>2 0 4 8  만 들 기</h1>
        <div class="board"  tabIndex="1">
            <div v-for="r_item in board.cells">
                <cell v-for="c_item in r_item"></cell>
            </div>
            <tile-view v-for="tile in tiles" :tile="tile">
            </tile-view>
            <game-end-overlay :board="board" :onrestart="onRestart"></game-end-overlay>
        </div>
    </div>
</template>

<script>
    import '../assets/scss/style.scss';
    import Cell from '../components/ming/Cell.vue';
    import TileView from '../components/ming/Tile.vue';
    export default {
        data(){
          return {
              board:new Board()
          };
        },
        mounted(){
            window.addEventListener('keydown', this.handleKeyDown.bind(this));
        },
        beforeDestroy(){
            window.removeEventListener('keydown', this.handleKeyDown.bind(this));
        },
        computed:{
          tiles(){
              return this.board.tiles
                      .filter(tile => tile.value != 0);
          }
        },
        methods:{
            // 방향키 핸들러
            handleKeyDown(event){
                if (this.board.hasWon()) {
                    return;
                }
                if (event.keyCode >= 37 && event.keyCode <= 40) {
                    event.preventDefault();
                    var direction = event.keyCode - 37;
                    this.board.move(direction);
                }
            },
            // 재시작
            onRestart(){
                this.board = new Board();
            }
            // 되돌리기 추가
        },
        components: {
            Cell,
            TileView,
            // GameEndOverlay,
        }
    };

var rotateLeft = function (matrix) {
var rows = matrix.length;
var columns = matrix[0].length;
var res = [];
for (var row = 0; row < rows; ++row) {
    res.push([]);
    for (var column = 0; column < columns; ++column) {
        res[row][column] = matrix[column][columns - row - 1];
    }
}
return res;
};

var Tile = function (value, row, column) {
    this.value = value || 0;
    this.row = row || -1;
    this.column = column || -1;
    this.oldRow = -1;
    this.oldColumn = -1;
    this.markForDeletion = false;
    this.mergedInto = null;
    this.id = Tile.id++;
};

Tile.id = 0;

Tile.prototype.moveTo = function (row, column) {
    this.oldRow = this.row;
    this.oldColumn = this.column;
    this.row = row;
    this.column = column;
};

Tile.prototype.isNew = function () {
    return this.oldRow == -1 && !this.mergedInto;
};

Tile.prototype.hasMoved = function () {
    return (this.fromRow() != -1 && (this.fromRow() != this.toRow() || this.fromColumn() != this.toColumn())) ||
        this.mergedInto;
};

Tile.prototype.fromRow = function () {
    return this.mergedInto ? this.row : this.oldRow;
};

Tile.prototype.fromColumn = function () {
    return this.mergedInto ? this.column : this.oldColumn;
};

Tile.prototype.toRow = function () {
    return this.mergedInto ? this.mergedInto.row : this.row;
};

Tile.prototype.toColumn = function () {
    return this.mergedInto ? this.mergedInto.column : this.column;
};

var Board = function () {
    this.tiles = [];
    this.cells = [];
    for (var i = 0; i < Board.size; ++i) {
        this.cells[i] = [this.addTile(), this.addTile(), this.addTile(), this.addTile()];
    }
    this.addRandomTile();
    this.setPositions();
    this.won = false;
};

Board.prototype.addTile = function () {
    var res = new Tile;
    Tile.apply(res, arguments);
    this.tiles.push(res);
    return res;
};

Board.size = 4;

Board.prototype.moveLeft = function () {
    var hasChanged = false;
    for (var row = 0; row < Board.size; ++row) {
        var currentRow = this.cells[row].filter(tile => tile.value != 0);
        var resultRow = [];
        for (var target = 0; target < Board.size; ++target) {
            var targetTile = currentRow.length ? currentRow.shift() : this.addTile();
            if (currentRow.length > 0 && currentRow[0].value == targetTile.value) {
                var tile1 = targetTile;
                targetTile = this.addTile(targetTile.value);
                tile1.mergedInto = targetTile;
                var tile2 = currentRow.shift();
                tile2.mergedInto = targetTile;
                targetTile.value += tile2.value;
            }
            resultRow[target] = targetTile;
            this.won |= (targetTile.value == 2048);
            hasChanged |= (targetTile.value != this.cells[row][target].value);
        }
        this.cells[row] = resultRow;
    }
    return hasChanged;
};

Board.prototype.setPositions = function () {
    this.cells.forEach((row, rowIndex) => {
        row.forEach((tile, columnIndex) => {
            tile.oldRow = tile.row;
            tile.oldColumn = tile.column;
            tile.row = rowIndex;
            tile.column = columnIndex;
            tile.markForDeletion = false;
        });
    });
};

Board.fourProbability = 0.1;

// 매턴 타일추가
Board.prototype.addRandomTile = function () {
    var emptyCells = [];
    for (var r = 0; r < Board.size; ++r) {
        for (var c = 0; c < Board.size; ++c) {
            if (this.cells[r][c].value == 0) {
                emptyCells.push({r: r, c: c});
            }
        }
    }
    var index = ~~(Math.random() * emptyCells.length);
    var cell = emptyCells[index];
    var newValue = Math.random() < Board.fourProbability ? 4 : 2;
    this.cells[cell.r][cell.c] = this.addTile(newValue);
};

// 타일 이동
Board.prototype.move = function (direction) {
    // 0 -> left, 1 -> up, 2 -> right, 3 -> down
    this.clearOldTiles();
    for (var i = 0; i < direction; ++i) {
        this.cells = rotateLeft(this.cells);
    }
    var hasChanged = this.moveLeft();
    for (var j = direction; j < 4; ++j) {
        this.cells = rotateLeft(this.cells);
    }
    if (hasChanged) {
        this.addRandomTile();
    }
    this.setPositions();
    return this;
};

// 합쳐진 타일(이전 타일 제거)
Board.prototype.clearOldTiles = function () {
    this.tiles = this.tiles.filter(tile => tile.markForDeletion == false);
    this.tiles.forEach(tile => { tile.markForDeletion = true; });
};

Board.prototype.hasWon = function () {
    return this.won;
};

Board.deltaX = [-1, 0, 1, 0];
Board.deltaY = [0, -1, 0, 1];

Board.prototype.hasLost = function () {
    var canMove = false;
    for (var row = 0; row < Board.size; ++row) {
        for (var column = 0; column < Board.size; ++column) {
            canMove |= (this.cells[row][column].value == 0);
            for (var dir = 0; dir < 4; ++dir) {
                var newRow = row + Board.deltaX[dir];
                var newColumn = column + Board.deltaY[dir];
                if (newRow < 0 || newRow >= Board.size || newColumn < 0 || newColumn >= Board.size) {
                    continue;
                }
                canMove |= (this.cells[row][column].value == this.cells[newRow][newColumn].value);
            }
        }
    }
    return !canMove;
};

export {Board};

</script>


<style scoped>
    body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;
      font-family: sans-serif;
      font-size: 21px;
    }

    .text {
      order: 2;
      padding-top: 40px;
      width: 440px;
      font-weight: bold;
    }

    .board {
      order: 1;
      width: 440px;
      height: 440px;
      padding: 5px;
      background-color: #baa;
      border-radius: 7px;
      outline: none;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    .board .cell, .tile {
      user-select: none;
      cursor: default;
    }

    .cell, .tile {
      width: 100px;
      height: 100px;
      margin: 5px;
      line-height: 90px;
      display: inline-block;
      font-size: 55px;
      font-weight: bold;
      text-align: center;
      vertical-align: middle;
      border-radius: 7px;
      font-family: sans-serif;
      color: #766;
      background-color: #f7fcfd;
    }

    .tile0 {
      background-color: #e0ecf4;
    }

    .tile2 {
      background-color: #bfd3e6;
    }

    .tile4 {
      background-color: #9ebcda;
    }

    .tile8 {
      color: #ffe;
      background-color: #8c96c6;
    }

    .tile16 {
      color: #ffe;
      background-color: #8c6bb1;
    }

    .tile32 {
      color: #ffe;
      background-color: #88419d;
    }

    .tile64 {
      color: #ffe;
      background-color: #810f7c;
    }

    .tile128 {
      color: #ffe;
      background-color: #4d004b;
      font-size: 45px;
    }

    .tile256 {
      color: #ffe;
      background-color: #4d002b;
      font-size: 45px;
    }

    .tile512 {
      color: #ffe;
      background-color: #960028;
      font-size: 45px;
    }

    .tile1024 {
      color: #fff;
      background-color: #0c3b8c;
      font-size: 35px;
    }

    .tile2048 {
      color: #fff;
      background-color: #114f0b;
      font-size: 35px;
    }

    .tile {
      position: absolute;
    }

    .tile.merged {
      display: none;
    }

    .tile.merged.isMoving {
      display: inline;
    }

    .tile.new, .overlay {
      animation-duration: 0.20s;
      animation-name: newTile;
      animation-fill-mode: forwards;
      animation-delay: 0.15s;
      transform: scale(0);
    }

    @keyframes newTile {
      from {
        transform: scale(0);
      }

      to {
        transform: scale(1);
      }
    }

    .overlay {
      position: absolute;
      top: 0px;
      bottom: 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      left: 0px;
      right: 0px;
      font-size: 55px;
      font-weight: bolder;
      background-color: rgba(221, 221, 221, 0.5);
      border-radius: 7px;
    }

    .tryAgain {
      background-color: #876;
      color: #fff;
      height: 40px;
      width: 200px;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      border: none;
      border-radius: 5px;
    }

    .overlay .message {
      color: #666;
    }
</style>
