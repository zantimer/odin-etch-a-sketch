//buttons
const gridSizeBtn = document.querySelector('#gridCount');
const wipeBtn = document.querySelector('#wipe');
const eraserBtn = document.querySelector('#eraser');
const drawBlackBtn = document.querySelector('#black');
const rainbowBtn = document.querySelector('#rainbow');
const shadowBtn = document.querySelector('#shadow');

const gridBox = document.querySelector('.gridBox');
const body = document.querySelector('body');
const middleBody = document.querySelector('.middle');

//modifiable vars
let currentGridSize = 100;
let htmlStyles = window.getComputedStyle(document.querySelector('html'));
let rowNum = parseInt(htmlStyles.getPropertyValue("--rowNum"));
let colNum = parseInt(htmlStyles.getPropertyValue("--colNum"));
let currentColor = '#ffffff';

function makeGrid (n = 100)
{
    console.log(gridBox.childElementCount);
    if (gridBox.childElementCount == 0)
    {
    for (let i = 0; i < n; i++)
    {
        const divs = document.createElement('div');
        divs.classList.add('grid');
        divs.addEventListener('mouseover', colourGrid);
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
    let b = prompt('Provide height/width, ie 100(max) makes a 100x100 grid');
    if (b > 100)
    {
        b=100;
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

function colourGrid() 
{
    switch (currentColor){
        case 'black':
            if (drawBoolean == true)
            {
            this.style.backgroundColor = 'rgba(0, 0, 0, 1)';
            }
            break;
        case 'rainbow':
            let randomColor =() => { return Math.floor(Math.random()*16777215).toString(16)};
            if (drawBoolean == true)
            {
            this.classList.add('rainbow');
            this.style.backgroundColor = '#'+randomColor().toString();
            }
            break;
        case 'shadow':
        if (drawBoolean == true)
        {
            if (this.style.backgroundColor.match(/rgba/)&& this.classList.contains('shadow')) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                }
            } else if (this.style.backgroundColor == 'rgb(0, 0, 0, 1)') {
                return;
            } else if (!this.classList.contains('shadow')) {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                this.classList.add('shadow');
            }
            else if (this.classList.contains('rainbow'))
            {
                this.classList.remove('rainbow');
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }
        }
            break;
        case 'eraser':
            if(drawBoolean == true)
            {
            this.style.backgroundColor ='rgba(0, 0, 0, 0)';
            this.classList.remove('shadow');
            }
            break;
    
    }
};

let drawBoolean = true;
middleBody.addEventListener('mousedown', () =>
{
    drawBoolean = false;
});
middleBody.addEventListener('mouseup', () =>{
    drawBoolean = true;
});

function addBoolListener() 
{
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
gridSizeBtn.addEventListener('click', getGridCount);
rainbowBtn.addEventListener('click', ()=>{currentColor='rainbow'});
drawBlackBtn.addEventListener('click', ()=>{currentColor='black'});
shadowBtn.addEventListener('click', ()=>{currentColor='shadow'});
eraserBtn.addEventListener('click', ()=>{currentColor='eraser'});
wipeBtn.addEventListener('click', wipeGrid);
