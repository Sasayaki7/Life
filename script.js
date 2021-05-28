//Rick Momoi
//Sasayaki7
//5/28/2021

//Made with JavaScript, HTML and CSS
//Project I wanted to do since 7/8th grade

let lifeArr = [];
let checkCell = [];
let id = 0;
let iterations = 0;
const grid_size = {x: 100, y: 100};
const grid_container = document.querySelector('.life-container');
const startButton = document.querySelector('.start')
const iteration_tracker = document.querySelector('.cycle-counter');
let interval = document.getElementById('iteration-speed');
const patternSelector = document.getElementById('pattern-select');

// When true, moving the mouse draws on the canvas
let isMousedown = false;


let configs = {
    "glider": [{x:2, y:4}, {x:3, y:2}, {x:3, y:4}, {x:4, y:4}, {x:4, y:3}],
    "pulsar": [{x:2, y:4}, {x:2, y:5}, {x:2, y:6}, {x:2, y:10}, {x:2, y:11}, {x:2, y:12}, 
        {x:4, y:2}, {x:4, y:7}, {x:4, y:9}, {x:4, y:14},
        {x:5, y:2}, {x:5, y:7}, {x:5, y:9}, {x:5, y:14},
        {x:6, y:2}, {x:6, y:7}, {x:6, y:9}, {x:6, y:14},
        {x:7, y:4}, {x:7, y:5}, {x:7, y:6}, {x:7, y:10}, {x:7, y:11}, {x:7, y:12}, 
        {x:9, y:4}, {x:9, y:5}, {x:9, y:6}, {x:9, y:10}, {x:9, y:11}, {x:9, y:12}, 
        {x:10, y:2}, {x:10, y:7}, {x:10, y:9}, {x:10, y:14},
        {x:11, y:2}, {x:11, y:7}, {x:11, y:9}, {x:11, y:14},
        {x:12, y:2}, {x:12, y:7}, {x:12, y:9}, {x:12, y:14},
        {x:14, y:4}, {x:14, y:5}, {x:14, y:6}, {x:14, y:10}, {x:14, y:11}, {x:14, y:12}],
    "light-spaceship":[{x:3, y:3}, {x:6, y:3}, {x:7, y:4}, {x:3, y:5}, {x:7, y:5},
        {x:4, y:6}, {x:5, y:6}, {x:6, y:6}, {x:7, y:6}],
    "spaceship":[{x:3, y:3}, {x:3, y:4}, {x:3, y:5}, {x:3, y:16}, {x:3, y:17}, {x:3, y:18},
        {x:4, y:3}, {x:4, y:6}, {x:4, y:15}, {x:4, y:18},
        {x:5, y:3}, {x:5, y:18},
        {x:6, y:3}, {x:6, y:7}, {x:6, y:14}, {x:6, y:18},
        {x:7, y:3}, {x:7, y:7}, {x:7, y:14}, {x:7, y:18},
        {x:8, y:4}, {x:8, y:8}, {x:8, y:13}, {x:8, y:17},
        {x:9, y:9}, {x:9, y:12}, {x:10, y:10}, {x:10, y:11},
        {x:11, y:7}, {x:11, y:9}, {x:11, y:12}, {x:11, y:14},
        {x:12, y:7}, {x:12, y:14},
        {x:13, y:8}, {x:13, y:9}, {x:13, y:12}, {x:13, y:13},
        {x:14, y:6}, {x:14, y:7}, {x:14, y:14}, {x:14, y:15},
        {x:15, y:5}, {x:15, y:6}, {x:15, y:7}, {x:15, y:9},{x:15, y:12}, {x:15, y:14}, {x:15, y:15}, {x:15, y:16},
        {x:16, y:4}, {x:16, y:5}, {x:16, y:8}, {x:16, y:13}, {x:16, y:16}, {x:16, y:17},
        {x:17, y:4}, {x:17, y:6}, {x:17, y:15}, {x:17, y:17},
        {x:18, y:5}, {x:18, y:6}, {x:18, y:7}, {x:18, y:14}, {x:18, y:15}, {x:18, y:16},
        {x:19, y:5}, {x:19, y:6}, {x:19, y:7}, {x:19, y:14}, {x:19, y:15}, {x:19, y:16},
        {x:20, y:5}, {x:20, y:6}, {x:20, y:15}, {x:20, y:16}],
    "glider-gun": [{x:3, y:8}, {x:4, y:8}, {x:3, y:9}, {x:4, y:9},
        {x:10, y:8}, {x:11, y:8}, {x:10, y:9}, {x:11, y:9},
        {x:7, y:11}, {x:8, y:11}, {x:7, y:12}, {x:8, y:12},
        {x:25, y:17}, {x:26, y:17}, {x:24, y:18}, {x:24, y:19}, {x:24, y:20}, {x:25, y:20}, {x:26, y:20},
        {x:28, y:17}, {x:29, y:17}, {x:30, y:18}, {x:31, y:19}, {x:30, y:20}, {x:29, y:21},
        {x:34, y:19}, {x:34, y:20}, {x:35, y:19}, {x:35, y:20}, 
        {x:24, y:25}, {x:23, y:25}, {x:23, y:26}, {x:24, y:27}, {x:25, y:27},  {x:26, y:27},  {x:26, y:28}]
    
    }

    //Hack.
    let new_spaceship = [];
    for(let i =0; i < configs.spaceship.length; i++){
        new_spaceship.push({x: 23-configs.spaceship[i].x, y: configs.spaceship[i].y})
    }
    configs.spaceship=new_spaceship;






// Add the event listeners for mousedown, mousemove, and mouseup
window.addEventListener('mousedown', e => {
    isMousedown = true;
});

window.addEventListener('mousemove', e => {
});

window.addEventListener('mouseup', e => {
    isMousedown = false;
});




function togglecell(element){
    element.classList.toggle('cell-on');
    let x=parseInt(element.getAttribute('x'));
    let y=parseInt(element.getAttribute('y'));
    if(element.classList.contains('cell-on')){
        lifeArr[y][x] = 1;
        addAdjacentCells(getAdjacentCells({x:x, y:y}), checkCell);
        let int = encodeCell({x: x, y:y})
        checkCell.push(int);
    }
    else{
        lifeArr[y][x] = 0;
    }
}



//Function that changes the speed of the simulation
function changeRunSpeed(){
    if (id != 0){
        clearInterval(id);
        id=setInterval(runSimulation, 2000-interval.value);
    }
}




//Function that returns all cells adjacent to the given cell
function getAdjacentCells(coords){
    let adj_cells = [];
    for(let x=Math.max(coords.x-1, 0); x <= Math.min(coords.x+1, lifeArr[0].length-1); x++){
        for(let y=Math.max(coords.y-1, 0); y <= Math.min(coords.y+1, lifeArr.length-1); y++){
            if (!((coords.x == x) && (coords.y == y))){
                adj_cells.push({x: x, y: y});
            }
        }
    }
    return adj_cells;
}


//Function that returns all cells adjacent to the given cell that are 'on'
function getAdjacentOnCells(coords){
    let on_cells = 0;
    let adj_cells = getAdjacentCells(coords);
    for(let i=0; i< adj_cells.length; i++){
        let cell = adj_cells[i];
        if (lifeArr[cell.y][cell.x]){
            on_cells++;
        }
    }
    return on_cells;
}




function createGrid(){
    let cell_size_str='1fr ';
    grid_container.style["grid-template-columns"] = cell_size_str.repeat(grid_size.x);
    grid_container.style["grid-template-rows"] = cell_size_str.repeat(grid_size.y);
    let content = '';
    for(let y=0; y<grid_size.y; y++){
        lifeArr.push([]);
        for(let x=0; x<grid_size.x; x++){
            lifeArr[y].push(0);
            content+=`<div class='life-cell' x=${x} y=${y} onmouseover='test(this)' onclick='togglecell(this)'></div>`
        }
    }
    grid_container.innerHTML = content;

}

function test(ele){
    if (isMousedown){
        togglecell(ele);
    }
}

function resetGrid(){
    lifeArr = [];
    checkCell = [];
    if(id!=0){
        clearInterval(id);
        id=0;
    }

    iterations=0;
    iteration_tracker.innerHTML = `Generation: ${iterations}`;

    startButton.innerHTML = 'Start';
    for(let y=0; y<grid_size.y; y++){
        lifeArr.push([]);
        for(let x=0; x<grid_size.x; x++){
            lifeArr[y].push(0);
        }
    }

    let cellsOn = document.querySelectorAll('.cell-on');
    cellsOn.forEach(function(cell) {
        cell.classList.remove('cell-on');
    });
}



function decodeCellCoords(coord){
    return {x: Math.floor(coord/10000), y: coord%10000}
}

function encodeCell(coordObj){
    return coordObj.x*10000+coordObj.y;
}



function addAdjacentCells(adj_cells, check_cell_list){
    for(let i=0; i < adj_cells.length; i++){
        let coded_cell = encodeCell(adj_cells[i]);
        if (check_cell_list.indexOf(coded_cell) == -1){
            check_cell_list.push(coded_cell);
        }
    }
}





function selectPattern(){
    resetGrid();
    let iteration = configs[patternSelector.value];
    for(let i=0; i < iteration.length; i++){
        let coord = iteration[i];
        lifeArr[coord.y][coord.x] = 1;
        let element = document.querySelector(`[x='${coord.x}'][y='${coord.y}']`);
        element.classList.add('cell-on');
        addAdjacentCells(getAdjacentCells(coord), checkCell);
        checkCell.push(encodeCell(coord));
    }
}


function runSimulation(){
    let new_check_cells = [];
    let changed_cell = [];
    iterations++;
    iteration_tracker.innerHTML = `Generation: ${iterations}`
    for(let i=0; i < checkCell.length; i++){
        let cell = decodeCellCoords(checkCell[i]);
        let counts = getAdjacentOnCells(cell);
        //If cell is alive
        if (lifeArr[cell.y][cell.x] ==1){

            //If counts is < 2 (too low) or > 3 (too high), the cell is now DEAD
            if (counts < 2 || counts > 3){
                changed_cell.push({x: cell.x, y: cell.y, alive: false});
            }


            //Otherwise, the cell remains ALIVE.
            else{
                //Since the cell is alive, we need to check it AND the surrounding cells next generation.
                new_check_cells.push(encodeCell({x: cell.x, y: cell.y}));
                addAdjacentCells(getAdjacentCells(cell), new_check_cells);
            }
        }

        //If the cell is DEAD.
        else{

            //If, and ONLY IF, the cell is surrounded by 3 live cells, the cell can come to life.
            if (counts == 3){
                //Since the cell state CHANGED, we need to record this for later on.
                changed_cell.push({x: cell.x, y: cell.y, alive: true});

                //Since the cell is now alive, we need to check it AND surrounding cells during the next generation.
                new_check_cells.push(encodeCell({x: cell.x, y: cell.y}));
                addAdjacentCells(getAdjacentCells(cell), new_check_cells);
            }
        }
    }

    for (let i =0; i < changed_cell.length; i++){
        let cellObj = changed_cell[i];
        let element = document.querySelector(`[x='${cellObj.x}'][y='${cellObj.y}']`);
        if(cellObj.alive){
            element.classList.add('cell-on');
            lifeArr[cellObj.y][cellObj.x] = 1;
        }
        else{
            element.classList.remove('cell-on');
            lifeArr[cellObj.y][cellObj.x] = 0;
        }
    }

    checkCell = new_check_cells; 
}





function playOrPause(element){
    if (!id){
        id = setInterval(runSimulation, 2000-interval.value);
        element.innerHTML = 'Pause';
    }
    else{
        clearInterval(id);
        id=0;
        element.innerHTML = 'Run';
    }
}
createGrid();