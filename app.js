const lockScreen = document.getElementById("lockScreen");
const homeScreen = document.getElementById("homeScreen");
const appScreen = document.getElementById("appScreen");

const appTitle = document.getElementById("appTitle");
const appContent = document.getElementById("appContent");


/* 시계 */

function updateClock(){

  const now = new Date();

  let hour = now.getHours();
  const minute = String(now.getMinutes()).padStart(2,"0");

  hour = hour % 12 || 12;

  document.getElementById("lockTime").textContent =
    `${hour}:${minute}`;

  document.getElementById("homeTime").textContent =
    `${hour}:${minute}`;

  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  ];

  document.getElementById("lockDate").textContent =
    `${now.getMonth()+1}월 ${now.getDate()}일 ${days[now.getDay()]}`;
}

updateClock();
setInterval(updateClock,1000);


/* 잠금해제 */

let startY = null;

lockScreen.addEventListener("touchstart",e=>{
  startY = e.touches[0].clientY;
});

lockScreen.addEventListener("touchend",e=>{

  if(startY === null) return;

  const distance =
    startY - e.changedTouches[0].clientY;

  if(distance > 55){
    unlock();
  }

  startY = null;
});


function unlock(){

  if(lockScreen.classList.contains("unlocking"))
    return;

  lockScreen.classList.add("unlocking");

  setTimeout(()=>{
    lockScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
  },430);
}


/* 앱 데이터 */

const apps = {

  instagram:{
    title:"Instagram",

    html:`

      <div class="page">

        <div class="card profile-head">

          <img
            class="profile-pic"
            src="./instagram.jpg"
          >

          <div>

            <div class="big-title">
              yushi
            </div>

            <div class="muted">
              NCT WISH
            </div>

          </div>

        </div>


        <div class="card">

          <div class="story-row">

            <div class="story">
              <img src="./instagram.jpg">
              <div>story</div>
            </div>

            <div class="story">
              <img src="./photos.jpg">
              <div>photo</div>
            </div>

            <div class="story">
              <img src="./messages.jpg">
              <div>daily</div>
            </div>

          </div>

        </div>


        <div class="card">

          <img
            class="post-img"
            src="./images/wallpaper.jpg"
          >

          <p>
            ♡ 좋아요 1,284개
          </p>

          <div>
            yushi 오늘도 좋은 하루 ☁️
          </div>

        </div>

      </div>

    `
  },


  photos:{
    title:"사진",

    html:`

      <div class="page">

        <div class="card">

          <div class="big-title">
            사진
          </div>

          <div class="muted">
            최근 항목
          </div>

        </div>

      </div>


      <div class="gallery">

        <img src="./instagram.jpg">
        <img src="./photos.jpg">
        <img src="./messages.jpg">
        <img src="./kakao.jpg">
        <img src="./phone.jpg">
        <img src="./images/wallpaper.jpg">

      </div>

    `
  },


  messages:{
    title:"메시지",

    html:`

      <div class="page">

        <div class="card">

          <div class="big-title">
            메시지
          </div>

          <div class="muted">
            최근 대화
          </div>

        </div>


        <div
          class="card app-row"
          onclick="openChat('유우시')"
        >

          <img
            class="avatar"
            src="./instagram.jpg"
          >

          <div>

            <div class="row-title">
              유우시
            </div>

            <div class="muted">
              오늘 뭐해?
            </div>

          </div>

        </div>


        <div
          class="card app-row"
          onclick="openChat('리쿠')"
        >

          <img
            class="avatar"
            src="./photos.jpg"
          >

          <div>

            <div class="row-title">
              리쿠
            </div>

            <div class="muted">
              사진 보내줘!
            </div>

          </div>

        </div>

      </div>

    `
  },


  kakao:{
    title:"카카오톡",

    html:`

      <div class="page">

        <div class="card">

          <div class="big-title">
            친구
          </div>

          <div class="muted">
            친구 3명
          </div>

        </div>


        <div
          class="card app-row"
          onclick="openChat('유우시')"
        >

          <img
            class="avatar"
            src="./instagram.jpg"
          >

          <div>
            <div class="row-title">유우시</div>
            <div class="muted">새로운 메시지가 있어요</div>
          </div>

        </div>


        <div
          class="card app-row"
          onclick="openChat('리쿠')"
        >

          <img
            class="avatar"
            src="./photos.jpg"
          >

          <div>
            <div class="row-title">리쿠</div>
            <div class="muted">안녕!</div>
          </div>

        </div>


        <div
          class="card app-row"
          onclick="openChat('사쿠야')"
        >

          <img
            class="avatar"
            src="./messages.jpg"
          >

          <div>
            <div class="row-title">사쿠야</div>
            <div class="muted">ㅋㅋㅋㅋ</div>
          </div>

        </div>

      </div>

    `
  },


  phone:{
    title:"전화",

    html:`

      <div
        class="phone-display"
        id="dialDisplay"
      ></div>

      <div class="dial-pad">

        <button class="dial-key" onclick="dial('1')">1</button>
        <button class="dial-key" onclick="dial('2')">2</button>
        <button class="dial-key" onclick="dial('3')">3</button>

        <button class="dial-key" onclick="dial('4')">4</button>
        <button class="dial-key" onclick="dial('5')">5</button>
        <button class="dial-key" onclick="dial('6')">6</button>

        <button class="dial-key" onclick="dial('7')">7</button>
        <button class="dial-key" onclick="dial('8')">8</button>
        <button class="dial-key" onclick="dial('9')">9</button>

        <button class="dial-key" onclick="dial('*')">*</button>
        <button class="dial-key" onclick="dial('0')">0</button>
        <button class="dial-key" onclick="dial('#')">#</button>

      </div>

      <div style="text-align:center">

        <button
          onclick="clearDial()"
          style="color:#1677ff"
        >
          지우기
        </button>

      </div>

    `
  }

};


/* 앱 열기 */

function openApp(name){

  const app = apps[name];

  if(!app) return;

  appTitle.textContent = app.title;

  appContent.innerHTML = app.html;

  appScreen.classList.remove("hidden");

  requestAnimationFrame(()=>{
    appScreen.classList.add("open");
  });

}


/* 앱 닫기 */

function closeApp(){

  appScreen.classList.remove("open");

  setTimeout(()=>{
    appScreen.classList.add("hidden");
  },320);

}


/* 채팅 */

function openChat(name){

  appTitle.textContent = name;

  appContent.innerHTML = `

    <div class="chat-window">

      <div
        class="chat-messages"
        id="chatMessages"
      >

        <div class="bubble left">
          ${name} 안녕! 👋
        </div>

        <div class="bubble left">
          오늘 뭐해?
        </div>

        <div class="bubble right">
          나 지금 폰 구경중 ㅋㅋ
        </div>

      </div>


      <div class="chat-input">

        <input
          id="chatInput"
          placeholder="메시지 입력"
        >

        <button onclick="sendMessage()">
          전송
        </button>

      </div>

    </div>

  `;
}


/* 메시지 보내기 */

function sendMessage(){

  const input =
    document.getElementById("chatInput");

  const box =
    document.getElementById("chatMessages");

  if(!input.value.trim())
    return;

  const message =
    document.createElement("div");

  message.className = "bubble right";

  message.textContent =
    input.value.trim();

  box.appendChild(message);

  input.value = "";

  box.scrollTop =
    box.scrollHeight;
}


/* 전화번호 */

let dialNumber = "";

function dial(number){

  dialNumber += number;

  const display =
    document.getElementById("dialDisplay");

  if(display)
    display.textContent = dialNumber;
}


function clearDial(){

  dialNumber = "";

  const display =
    document.getElementById("dialDisplay");

  if(display)
    display.textContent = "";
}
