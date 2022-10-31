//query const vars
const makeGridBtn = document.querySelector('#gridMaker');
const gridSizeBtn = document.querySelector('#gridCount');
const wipeBtn = document.querySelector('#wipe');
const eraserBtn = document.querySelector('#eraser');
const drawBlackBtn = document.querySelector('#black');
const rainbowBtn = document.querySelector('#rainbow');

const gridBox = document.querySelector('.gridBox');
const body = document.querySelector('body');
const middleBody = document.querySelector('.middle');

//modifiable vars
let currentGridSize = 100;
let htmlStyles = window.getComputedStyle(document.querySelector('html'));
let rowNum = parseInt(htmlStyles.getPropertyValue("--rowNum"));
let colNum = parseInt(htmlStyles.getPropertyValue("--colNum"));
let currentColor = '#ffffff';

//main functions
function makeGrid (n = 100)
{
    console.log(gridBox.childElementCount);
    if (gridBox.childElementCount == 0)
    {
    for (let i = 0; i < n; i++)
    {
        const divs = document.createElement('div');
        divs.classList.add('grid');
        divs.addEventListener('mouseover', () =>{
            if (drawBoolean==true)
            {
            divs.style.backgroundColor = currentColor.toString();
            currentColor = '#FFFFFF';
            };
        });
        gridBox.appendChild(divs);
    };
    };
    addBoolListener();
    
    
}
function getGridCount () {
    if (gridBox.childElementCount > 0)
    {
        for (let i = gridBox.childElementCount; i > 0; i--)
        {
            gridBox.removeChild(gridBox.firstElementChild);
        }
        
    }
    let b = prompt('Provide height/width, ie 10(max) makes a 10x10 grid');
    if (b > 10)
    {
        b=10;
    }
    let result = b*b;
    
    currentGridSize = result;
    document.documentElement.style.setProperty("--colNum", b);
    document.documentElement.style.setProperty("--rowNum", b);
    
    makeGrid(currentGridSize);
    console.log(currentGridSize);
};

function wipeGrid ()
{
    const gridCells = document.getElementsByClassName('grid');
    for (let i = 0; i < gridCells.length; i++)
    {
        gridCells[i].style.backgroundColor = '#ffffff';
    };
};

function eraser() 
{
    const gridCells = document.getElementsByClassName('grid');
    for (let i = 0; i < gridCells.length; i++)
    {
        gridCells[i].removeEventListener('mouseover', () =>{
            //divs.classList.add('active');
            gridCells[i].style.backgroundColor = currentColor.toString();
        });
        gridCells[i].addEventListener('mouseover', () => {
            currentColor = 'white';
            if(drawBoolean == true)
            {
            gridCells[i].style.backgroundColor = currentColor.toString();
            };
        });
    }
};

function drawBlack()
{
    removeEvListener(currentColor.toString());
    addEvListener('#000000');
    currentColor = '#000000';
    console.log(currentColor);
};

function rainbowMode ()
{
    let randomColor =() => { return Math.floor(Math.random()*16777215).toString(16)};
    const gridCells = document.getElementsByClassName('grid');
    for (let i = 0; i < gridCells.length; i++)
    {
        gridCells[i].removeEventListener('mouseover', () =>{
            gridCells[i].style.backgroundColor = currentColor.toString();
        })
        gridCells[i].addEventListener('mouseover', () => {
            if(drawBoolean == true)
            {
            gridCells[i].style.backgroundColor = '#'+randomColor().toString();
            }
        });
    }
};

//sub functions
// TODO: can't get this one to work - need to revisit when sanity recouperates
function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
};

function addEvListener (col)
{
    const gridCells = document.getElementsByClassName('grid');
    for (let i = 0; i < gridCells.length; i++)
    {
        gridCells[i].addEventListener('mouseover', () =>{
            if (drawBoolean == true)
            {
            gridCells[i].style.backgroundColor = col;
            }
            else if(drawBoolean == false)
            {
                gridCells[i].style.backgroundColor = gridCells[i].style.backgroundColor;
            }
        });
    }
};

function removeEvListener (col)
{
    const gridCells = document.getElementsByClassName('grid');
    for (let i = 0; i < gridCells.length; i++)
    {
        gridCells[i].removeEventListener('mouseover', () =>{
            gridCells[i].style.backgroundColor = col;
        });
    }
}
window.onload = makeGrid(currentGridSize);

let drawBoolean = true;

function addBoolListener() {
    const gridCells = document.getElementsByClassName('grid');
    for (let i = 0; i < gridCells.length; i++)
    {
        gridCells[i].addEventListener('mousedown', () =>{
            drawBoolean = false;
        });
        gridCells[i].addEventListener('mouseup', () =>{
            drawBoolean = true;
        });
    };
};

middleBody.addEventListener('mousedown', () =>
{
    drawBoolean = false;
});
middleBody.addEventListener('mouseup', () =>{
    drawBoolean = true;
});
//button events
eraserBtn.addEventListener('click', eraser);
drawBlackBtn.addEventListener('click', drawBlack);
wipeBtn.addEventListener('click', wipeGrid);
rainbowBtn.addEventListener('click', rainbowMode);
gridSizeBtn.addEventListener('click', getGridCount);



