const makeGridBtn = document.querySelector('#gridMaker');
const gridSizeBtn = document.querySelector('#gridCount');
const gridBox = document.querySelector('.gridBox');
const body = document.querySelector('body');
let currentGridSize = 0;
let htmlStyles = window.getComputedStyle(document.querySelector('html'));
let rowNum = parseInt(htmlStyles.getPropertyValue("--rowNum"));
let colNum = parseInt(htmlStyles.getPropertyValue("--colNum"));

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
        divs.addEventListener('mouseover', changeColor);
        gridBox.appendChild(divs);
        
    }
    }
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
    if (b > 100)
    {
        b=100;
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
function changeColor (color)
{
    
}
gridSizeBtn.addEventListener('click', getGridCount);
makeGridBtn.addEventListener('click', makeGrid);



