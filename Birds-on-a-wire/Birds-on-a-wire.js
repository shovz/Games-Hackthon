let birds = Array.from(document.querySelectorAll(".answer__zone--Bird"));
let ropes = Array.from(document.querySelectorAll(".answer__zone--rope >div"));
let birdBox = document.getElementById("answer__zone--selectBird");
let resetButton = document.getElementById(`resetButton`);
let question = document.getElementById("question__zone--Q");
let startGame_button = document.querySelector("#start__Button");
let restartGame_button = document.querySelector("#gameEnds_restart");
let home_button = document.querySelector("#gameEnds_home");
let lives = document.getElementById("question__zone--tries");
let gameEnds = document.getElementsByClassName("end__Box");
let gameStrats = document.getElementsByClassName("start__Box");
let did_I_get_it = document.getElementById("question__zone--done");
let fraction = document.createElement("div");
let Bird_needed;


const homePage = () =>{
    window.location.href="../Main-Page/home.html";
}

const createLives=()=>{
    for(let i=0;i<3;i++){
        let lives_image = document.createElement("img");
        lives_image.setAttribute(`src`,"..//Pictures/Birds-On-a-Wire/Birds-Lives.png");
        lives.append(lives_image);
    }
}

const resetGame=()=>{
    for (let i=0;i<ropes.length;i++){
        while(ropes[i].firstChild)
        {
            ropes[i].removeChild(ropes[i].firstChild);
        }
    }
    if (gameEnds[0].style.display==`flex` && lives.childElementCount==0)
    { 
            gameEnds[0].setAttribute(`style`,`display:none`);
            createLives();
     }
}



const gameLoading=()=>{
    gameStrats[0].remove();
    createLives();
    resetButton.setAttribute("style",`display: block;`)
    const draggingOn = (event)=>{
            event.target.classList.add("dragging_bird");
    }
    const draggingOff= (event)=>{
        event.target.classList.remove("dragging_bird");
    }


    const createNewBird = (typeof_bird)=>{
        // console.log(typeof_bird);
        if(birdBox.childElementCount<3)
        {
            let newBird = document.createElement("div");
            newBird.classList.add(`answer__zone--Bird`,`${typeof_bird}`);
            newBird.setAttribute("draggable",`true`);
            newBird.addEventListener("dragstart",draggingOn);
            newBird.addEventListener("dragend",draggingOff);
            
            switch(typeof_bird)
            {
                case `purple`:
                    birdBox.prepend(newBird);
                break;
                case `Orange`:
                    birdBox.insertBefore(newBird,birdBox.lastElementChild)
                break;
                case `red`:                
                    birdBox.append(newBird);
                break;

            }
            // console.log(birdBox);
        }
        
    }
    const birdsOnRope__style=(event)=>{
            let posLeft =  10.5;
            
            for(let i=0;i<event.target.childNodes.length;i++)
            {
                if(i===0){
                    event.target.firstElementChild.setAttribute("style",`left: ${posLeft}%`);
                    // console.log(posLeft);
                }
                if(i>0){
                    posLeft += 10;
                    event.target.lastElementChild.setAttribute("style",`left: ${posLeft}%`);
                    // console.log(posLeft);
                }
            }
    }
    
    const createBirdOnRope=(event)  =>{
            event.preventDefault();
            // console.log(event.target);
            if(event.target.childNodes.length<8){
                
                let draggingBird = document.querySelector(".dragging_bird");
                draggingBird.classList.add("birdOnRope");
                event.target.appendChild(draggingBird);
                birdsOnRope__style(event);
                createNewBird(draggingBird.classList[1]);
                // console.log(event.target.childNodes);
            }
            else{
                alert("Too many birds on the rope");
            }
            event.target.classList.remove("ropes__glow");
            event.target.setAttribute("style","display:flex;");

    }



    for (let b of  birds){
            b.addEventListener("dragstart",draggingOn);
            b.addEventListener("dragend",draggingOff);
    }
    for (let r of ropes){
            r.addEventListener("dragover",(event)=>{
                event.preventDefault();
            r.classList.add("ropes__glow")

            })
            r.addEventListener("dragleave",(event)=>{
                event.preventDefault();
            r.classList.remove("ropes__glow");
            })
            r.addEventListener("drop",createBirdOnRope);
            
    }



    resetButton.addEventListener("click",resetGame);

    const createFraction=()=>{
        let numtop = Math.floor(Math.random()*10+1);
        let numbottom = Math.floor(Math.random()*10+1);
        while(numtop>=numbottom){
            numtop = Math.floor(Math.random()*10+1);
            numbottom = Math.floor(Math.random()*10+1);
        }
        return `${numtop}/${numbottom}`
    }

    const question_paragraph = ()=>{
        let Bird_index=  Math.floor(Math.random()*3);
        let fraction_text = document.createTextNode(`${createFraction()}`);
        Bird_needed = birds[Bird_index].classList[1];
        
        if(question.childNodes.length==0){
            fraction.append(fraction_text);
        } else{
            question.removeChild(question.firstChild);
            fraction.textContent="";
            fraction.append(fraction_text);
        }
        let question_Text = document.createTextNode(`
        Put ${fraction.textContent} ${Bird_needed} Birds on the Wires
        `)
        question.append(question_Text);
    }

    const didIGetIt =()=>{
        let sumOf_Birds_total=0;
        let sumOf_Birds_needed=0;
        let asnwer = fraction.textContent.split(`/`)

        for (let i =0;i<ropes.length;i++){
            sumOf_Birds_total+= ropes[i].childElementCount;
            for(let j=0;j<ropes[i].childNodes.length;j++)
            {
                if(ropes[i].childNodes[j].classList[1]==Bird_needed)
                {
                    sumOf_Birds_needed++;
                }
            }
        }
        console.log(sumOf_Birds_needed,sumOf_Birds_total);
        console.log(asnwer[0],asnwer[1]);
        if(sumOf_Birds_needed==asnwer[0] && sumOf_Birds_total==asnwer[1])
        {
            
            alert("yesssssssssssssss");
            resetGame();
            question_paragraph();
        }
        else{
            alert("nooo");
            lives.removeChild(lives.lastElementChild);
            if(lives.childElementCount==0){
                
                gameEnds[0].setAttribute(`style`,`display:flex`);
                
            }
        }

    
        // console.log(sumOf_Birds_total,sumOf_Birds_needed,sumOf_Birds_general);
    }
 
    question_paragraph();
    resetButton.addEventListener("click",question_paragraph);
    did_I_get_it.addEventListener("click",didIGetIt);

}
startGame_button.addEventListener("click",gameLoading);
restartGame_button.addEventListener("click",resetGame);

home_button.addEventListener("click",homePage);
// gameLoading();
// console.log(draggingBird);

