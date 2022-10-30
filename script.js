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
    document.documentElement.style.setProperty("--gridHeight", b);
    console.log(currentGridSize);
}
gridSizeBtn.addEventListener('click', getGridCount);
makeGridBtn.addEventListener('click', makeGrid);



