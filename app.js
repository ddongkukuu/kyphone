const lockScreen = document.getElementById("lockScreen");
const homeScreen = document.getElementById("homeScreen");
const appScreen = document.getElementById("appScreen");

const lockTime = document.getElementById("lockTime");
const lockDate = document.getElementById("lockDate");
const homeTime = document.getElementById("homeTime");

const appTitle = document.getElementById("appTitle");
const appContent = document.getElementById("appContent");


/* =========================
   시간 / 날짜
========================= */

function updateTime() {

  const now = new Date();

  let hour = now.getHours();
  const minute = String(now.getMinutes()).padStart(2, "0");

  const period = hour >= 12 ? "오후" : "오전";

  hour = hour % 12;

  if (hour === 0) {
    hour = 12;
  }

  const timeText = `${hour}:${minute}`;

  lockTime.textContent = timeText;
  homeTime.textContent = timeText;

  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  ];

  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = days[now.getDay()];

  lockDate.textContent =
    `${month}월 ${date}일 ${day}`;
}


updateTime();

setInterval(updateTime, 1000);


/* =========================
   잠금 해제
========================= */

let startY = null;
let unlocked = false;


function unlock() {

  if (unlocked) {
    return;
  }

  unlocked = true;

  lockScreen.classList.add("unlocking");

  setTimeout(() => {

    lockScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");

  }, 430);
}


/* 터치 시작 */

lockScreen.addEventListener("touchstart", (event) => {

  startY = event.touches[0].clientY;

}, { passive: true });


/* 터치 이동 */

lockScreen.addEventListener("touchend", (event) => {

  if (startY === null) {
    return;
  }

  const endY = event.changedTouches[0].clientY;

  const distance = startY - endY;

  if (distance > 60) {
    unlock();
  }

  startY = null;

}, { passive: true });


/* PC에서 마우스로도 테스트 가능 */

let mouseStartY = null;


lockScreen.addEventListener("mousedown", (event) => {

  mouseStartY = event.clientY;

});


lockScreen.addEventListener("mouseup", (event) => {

  if (mouseStartY === null) {
    return;
  }

  const distance = mouseStartY - event.clientY;

  if (distance > 60) {
    unlock();
  }

  mouseStartY = null;

});


/* =========================
   앱 데이터
========================= */

const apps = {

  instagram: {
    title: "Instagram",
    html: `
      <div class="placeholder">
        <div class="placeholder-title">
          Instagram
        </div>

        <div class="placeholder-text">
          인스타그램 화면을 여기에 만들 거야.
          <br><br>
          프로필, 게시물, 스토리까지 실제 앱처럼 구성할 수 있어.
        </div>
      </div>
    `
  },


  kakao: {
    title: "카카오톡",
    html: `
      <div class="placeholder">
        <div class="placeholder-title">
          카카오톡
        </div>

        <div class="placeholder-text">
          친구 목록과 채팅방을 여기에 만들 거야.
          <br><br>
          나중에 최대 3명의 캐릭터와 채팅할 수 있도록 구성할 수 있어.
        </div>
      </div>
    `
  },


  notes: {
    title: "메모",
    html: `
      <div class="placeholder">
        <div class="placeholder-title">
          메모
        </div>

        <div class="placeholder-text">
          메모 앱 화면이 들어갈 자리야.
        </div>
      </div>
    `
  },


  phone: {
    title: "전화",
    html: `
      <div class="placeholder">
        <div class="placeholder-title">
          전화
        </div>

        <div class="placeholder-text">
          전화 앱 화면이 들어갈 자리야.
        </div>
      </div>
    `
  },


  messages: {
    title: "메시지",
    html: `
      <div class="placeholder">
        <div class="placeholder-title">
          메시지
        </div>

        <div class="placeholder-text">
          메시지 앱 화면이 들어갈 자리야.
        </div>
      </div>
    `
  }

};


/* =========================
   앱 열기
========================= */

function openApp(name) {

  const selectedApp = apps[name];

  if (!selectedApp) {
    return;
  }

  appTitle.textContent = selectedApp.title;
  appContent.innerHTML = selectedApp.html;

  appScreen.classList.remove("hidden");

  requestAnimationFrame(() => {
    appScreen.classList.add("open");
  });
}


/* =========================
   앱 닫기
========================= */

function closeApp() {

  appScreen.classList.remove("open");

  setTimeout(() => {

    appScreen.classList.add("hidden");

  }, 350);
}
