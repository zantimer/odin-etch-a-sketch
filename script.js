const makeGridBtn = document.querySelector('#gridMaker');
const gridSizeBtn = document.querySelector('#gridCount');
const wipeBtn = document.querySelector('#wipe');
const eraserBtn = document.querySelector('#eraser');
const drawBlackBtn = document.querySelector('#black');
const rainbowBtn = document.querySelector('#rainbow');

const gridBox = document.querySelector('.gridBox');
const body = document.querySelector('body');
let currentGridSize = 0;
let htmlStyles = window.getComputedStyle(document.querySelector('html'));
let rowNum = parseInt(htmlStyles.getPropertyValue("--rowNum"));
let colNum = parseInt(htmlStyles.getPropertyValue("--colNum"));
let currentColor = 'black';

function makeGrid ()
{
    console.log(gridBox.childElementCount);
    let n = currentGridSize;
    if (gridBox.childElementCount == 0)
    {
    for (let i = 0; i < n; i++)
    {
        const divs = document.createElement('div');
        divs.classList.add('grid');
        divs.addEventListener('mouseover', () =>{
            //divs.classList.add('active');
            divs.style.backgroundColor = currentColor.toString();
            currentColor = 'black';
        });
        gridBox.appendChild(divs);
    };
    };
    
}
function getGridCount () {
    if (gridBox.childElementCount > 0)
    {
        for (let i = gridBox.childElementCount; i > 0; i--)
        {
            gridBox.removeChild(gridBox.firstElementChild);
        }
        
    }
    let b = prompt('Provide grid count, max 100');
    if (b > 10)
    {
        b=10;
    }
    let result = b*b;
    
    currentGridSize = result;
    document.documentElement.style.setProperty("--colNum", b);
    document.documentElement.style.setProperty("--rowNum", b);
    
    console.log(currentGridSize);
};
function LightenDarkenColor(col, amt) {
    col = parseInt(col, 16);
    return (((col & 0x0000FF) + amt) | ((((col >> 8) & 0x00FF) + amt) << 8) | (((col >> 16) + amt) << 16)).toString(16);
  };
function wipeGrid ()
{
    const gridCells = document.getElementsByClassName('grid');
    for (let i = 0; i < gridCells.length; i++)
    {
        gridCells[i].style.backgroundColor = 'white';
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
            gridCells[i].style.backgroundColor = currentColor.toString();
            
        });
    }
};
function drawBlack()
{
    const gridCells = document.getElementsByClassName('grid');
    for (let i = 0; i < gridCells.length; i++)
    {
        gridCells[i].removeEventListener('mouseover', () =>{
            //divs.classList.add('active');
            gridCells[i].style.backgroundColor = currentColor.toString();
        });
        gridCells[i].addEventListener('mouseover', () => {
            currentColor = 'black';
            gridCells[i].style.backgroundColor = currentColor.toString();
        });
    }
};
function rainbowMode ()
{
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    const gridCells = document.getElementsByClassName('grid');
    for (let i = 0; i < gridCells.length; i++)
    {
        gridCells[i].removeEventListener('mouseover', () =>{
            gridCells[i].style.backgroundColor = currentColor.toString();
        })
        gridCells[i].addEventListener('mouseover', () => {
            currentColor = randomColor;
            gridCells[i].style.backgroundColor = currentColor.toString();
            
        });
    }
}
let gridCells = document.getElementsByClassName('grid');

eraserBtn.addEventListener('click', eraser);
drawBlackBtn.addEventListener('click', drawBlack);
wipeBtn.addEventListener('click', wipeGrid);
rainbowBtn.addEventListener('click', rainbowMode);
gridSizeBtn.addEventListener('click', getGridCount);
makeGridBtn.addEventListener('click', makeGrid);



