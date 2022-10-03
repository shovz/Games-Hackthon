let question = document.getElementById(`bears__Question`);
let plus = document.getElementById(`plus`);
let minus = document.getElementById(`minus`);
let did_I_get_it= document.getElementById(`bears__Equal_Button`);
let mama_Bear_select= document.getElementById(`mama_Bear--select`);
let papa_Bear_select= document.getElementById(`papa_Bear--select`);
let bears_Answer= document.getElementsByClassName(`bear__select`)[2];
let papa_num = Math.floor(Math.random()*10+1);
let mama_num = Math.floor(Math.random()*10);
let answer_sum = papa_num+mama_num;
let rand = Math.round(Math.random());
let reset = document.getElementById('resetButton');



const didIGetIt=()=>{
    if(Number(mama_Bear_select.value)=== answer_sum && plus.checked)
    {
        alert("Yayyy you are correct");
        resetGame();
    
    }
    else if(Number(bears_Answer.value)=== answer_sum && minus.checked) {
        alert("Yayyy you are correct");
        resetGame();
    }
    else{
        alert("Oh noooo you made a mistake!");
    }
    

}


const createOptions= ()=>{
    if(rand==1){
        let option1 = document.createElement(`option`);
        option1.text = `${papa_num}`;
        option1.value = `${papa_num}`;
        papa_Bear_select.append(option1);
        
        let option2 = document.createElement(`option`);
        option2.text = `${mama_num}`;
        option2.value = `${mama_num}`;
        bears_Answer.append(option2);
        for(let i = 0;i<mama_num+papa_num+1;i++)
        {
            let option3 = document.createElement(`option`);
            option3.text = `${i}`;
            option3.value = `${i}`;
            mama_Bear_select.append(option3);
        }
    }
    else if(rand===0){
        let option1 = document.createElement(`option`);
        option1.text = `${papa_num}`;
        option1.value = `${papa_num}`;
        papa_Bear_select.append(option1);
        
        let option2 = document.createElement(`option`);
        option2.text = `${answer_sum}`;
        option2.value = `${answer_sum}`;
        mama_Bear_select.append(option2);
        for(let i = 0;i<answer_sum-papa_num+1;i++)
        {
            let option3 = document.createElement(`option`);
            option3.text = `${i}`;
            option3.value = `${i}`;
            bears_Answer.append(option3);
        }
    }
}

const newQuestion=()=>{
    while(mama_num<=papa_num)
    {
        papa_num = Math.floor((Math.random()*10)+1);
        mama_num = Math.floor(Math.random()*10);
    }
    answer_sum = papa_num+mama_num;
    rand = Math.round(Math.random());
    if(rand){
        let text = document.createTextNode(`
        Papa Bear ate ${papa_num} Cakes, ${answer_sum} Cakes letf how many Mama bear ate?`);
        question.append(text);
    }
    else{
        let text = document.createTextNode(` Mama Bear made ${answer_sum} Cakes
        Papa Bear ate ${papa_num} Cakes, how many Cakes letf?`);
        question.append(text);
    }

}
newQuestion();
createOptions();

did_I_get_it.addEventListener(`click`,didIGetIt);


const resetGame = ()=>{
    if(rand==1){
        papa_Bear_select.remove(papa_Bear_select.firstElementChild);
        bears_Answer.remove(bears_Answer.firstElementChild);
        for(let i = 0;i<mama_num+papa_num+1;i++)
        {
            mama_Bear_select.remove(mama_Bear_select.firstElementChild);
        }
    }
    else if(rand==0){
            papa_Bear_select.remove(papa_Bear_select.firstElementChild);
            mama_Bear_select.remove(mama_Bear_select.firstElementChild);
        for(let i = 0;i<mama_num+papa_num+1;i++)
        {
            bears_Answer.remove(bears_Answer.firstElementChild);
        }
    }
    newQuestion();
    createOptions();
}