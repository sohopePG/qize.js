{
    const question = document.getElementById("question")
    const choices = document.getElementById("choices")
    const btn = document.getElementById("btn")
    const result = document.getElementById("result")
    const resultscore = document.getElementById("resultscore");
    const resulttime = document.getElementById("resulttime");
    const timer = document.getElementById("timer")
    const starttext = document.getElementById("starttext");
    const remaining = document.getElementById("remaining");

    const quizset = shuffle([
       {q:"クイズ1",c:["A","B","C"]},
       {q:"クイズ2",c:["D","F","G"]},
                   :
                   :
                   :
    ]);

    let crrentnum = 0;
    let answer;
    let score = 0;
    let startTime;
    let timeoutID;

    //シャッフル関数
    function shuffle(array){
      for(let i =  array.length - 1;i > 0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[j],array[i]] = [array[i],array[j]];
      }
      return array;
    }
    
　//正誤判定
function judgment(li){
  if(answer){
      return;
   }
  answer = true;

if(li.textContent === quizset[crrentnum].c[0]){
  li.classList.add("correct");
  score++;
}else{
  li.classList.add("wrong")
}
btn.classList.remove("disabeled");
    
//クイズをセットする
    function setqize(){
      answer = false;
      question.textContent = quizset[crrentnum].q;
//一度でたクイズは取り除く
   while(choices.firstChild){
     choices.removeChild(choices.firstChild);
   }
      const shufflechoices = shuffle([...quizset[crrentnum].c])
      shufflechoices.forEach(choice=>{
          const li = document.createElement("li");
          li.textContent = choice;
          li.addEventListener("click",()=>{
            judgment(li);
          }),
          choices.appendChild(li);
      })
    }
    
    //クイズをすすめる処理
btn.addEventListener("click",()=>{
  if(btn.classList.contains("disabeled")){
     return;
  }
    starttext.textContent = "";
    btn.textContent = "next";
    remaining.textContent = `${crrentnum}/10`;
    btn.classList.add("disabeled");
  if(crrentnum === 10){
    btn.textContent = "result";
    btn.classList.remove("disabeled");
    result.classList.remove("hedden");
    resultscore.textContent = `Score: ${score}/10`;
    resulttime.textContent = `Time:${timer.textContent}`
    clearTimeout(timeoutID);
  }else if(crrentnum===0){
    crrentnum++;
    setqize();
    countup();
    startTime = Date.now();
  }else{
    crrentnum++;
    setqize();
  }
})
    //タイマー機能
function countup(){
  const d = new Date(Date.now() - startTime);
  const m =  String(d.getMinutes()).padStart(2,"0");
  const s =  String(d.getSeconds()).padStart(2,"0");
  const ms = String(d.getMilliseconds()).padStart(3,"0");
  timer.textContent = `${m}:${s}:${ms}`;
   timeoutID = setTimeout(()=>{
       countup();
   },10);
}
}
