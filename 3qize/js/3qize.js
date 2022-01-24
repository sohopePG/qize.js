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
       {q:"RSの御三家に含まれているポケモンを答えろ",c:["ミズゴロウ","ゼニガメ","ポッチャマ"]},
       {q:"DPの御三家に含まれているポケモンを答えろ",c:["ヒコザル","アチャモ","ヒノアラシ"]},
       {q:"この中で最も攻撃種族値が高いポケモンは？",c:["ラムパルド","アルセウス","ガブリアス"]},
       {q:"クチートのタイプはフェアリータイプと何？",c:["はがね","あく","ノーマル"]},
       {q:"ホウエン地方のリーグチャンピオンは？",c:["ダイゴ","ワタル","シロナ"]},
       {q:"金銀でゲットできるジムバッチは最大で何個？",c:["16","8","24"]},
       {q:"アルセウスの素早さ種族値はどれ？",c:["120","150","80"]},
       {q:"ブラッキーへ進化させるにはどうすればいい？",c:["なつき度MAXで夜にレベルアップ","闇の石を使う","特定の場所でレベルアップする"]},
       {q:"交換で進化するポケモンは？",c:["ゴーリキー","ゴンべ","ソーナノ"]},
       {q:"ジョウト地方のノーマルタイプのジムリーダーは？",c:["アカネ","ミカン","センリ"]},
       {q:"ポケモン好き？",c:["はい","いいえ","どちらでもない"]},
       {q:"北海道をモチーフにした地方は？",c:["シンオウ","イッシュ","ホウエン"]},
       {q:"フェアリータイプの弱点は？",c:["どく","ドラゴン","じめん"]},
       {q:"ミカルゲの弱点は？",c:["フェアリー","ゴースト","あく"]},
       {q:"HPが1しかないポケモンは？",c:["ヌケニン","ハピナス","コイキング"]},
       {q:"最も進化が遅いポケモンは？",c:["サザンドラ","ガブリアス","メタグロス"]},
       {q:"伝説のポケモンは？",c:["ヒードラン","ウルガモス","ゾロアーク"]},
       {q:"テッポウオの進化系は？",c:["オクタン","マンタイン","ナマズン"]},
       {q:"ひでんわざに分類されているものを選べ",c:["いあいぎり","あなをほる","きりさく"]},
       {q:"ポケモンDPでマスターボールをくれるキャラクターは？",c:["アカギ","シロナ","ナナカマド"]},
       {q:"フェアリータイプが追加されたのはどの作品から？",c:["XY","サンムーン","BW"]},
       {q:"ユキノオーの弱点は全部で何個？",c:["7","4","5"]},
       {q:"ロズレイドに進化させるにはどの石が必要？",c:["めざめのいし","リーフのいし","ひかりのいし"]},
       {q:"カントー地方の3番目のジムリーダーが使うタイプは？",c:["でんき","くさ","エスパー"]},
       {q:"この中ですばやさ種族値が最も高いポケモンは？",c:["テッカニン","ルカリオ","ラティオス"]},
       {q:"エンジュシティはどこの地方にある？",c:["ジョウト","ホウエン","カントー"]},
    ]);

    let crrentnum = 0;
    let answer;
    let score = 0;
    let startTime;
    let timeoutID;

    function shuffle(array){
      for(let i =  array.length - 1;i > 0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[j],array[i]] = [array[i],array[j]];
      }
      return array;
    }

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
}

    function setqize(){
      answer = false;
      question.textContent = quizset[crrentnum].q;

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