import './style.scss';

function component() {
  const element = document.createElement("div");

  element.id = 'app';

  element.innerHTML = `
  <section id="game-start" class="hidden"></section>
    <section id="game-app" class="hidden">
      <section class="game-screen">
        <div class="game-info-wrapper hidden">
          <div class="game-round">1/2 ROUND</div>
          <div class="game-clock">
            <img src="./clock.svg" />
            <div id="time" class="time">0:00</div>
          </div>
        </div>
        <div class="game-modal hidden">
          <img src="./number_3.svg" />
          <p></p>
        </div>
        <div class="game-wrapper">
          <article class="game" id="game-1">
            <img class="character" src="./character-stand.svg" />
          </article>
          <article class="game" id="game-2">
            <img class="ballon" width="100px" height="100px" src="./balloon_pink.svg" />
            <!-- <img class="ballon" width="100px" height="100px" src="./balloon_green.svg" />
            <img class="ballon" width="100px" height="100px" src="./balloon_yellow.svg" /> -->
          </article>
          <!-- <article class="game" id="game-3">
          </article> -->
        </div>
      </section>
      <section class="button-wrapper">
        <button id="leftBtn">L</button>
        <button id="rightBtn">R</button>
      </section>
    </section>
    <section id="game-end" class="hidden">
      <section class="game-screen">
        <img src="./game_over.svg" />
        <p>영어 이니셜을 입력해주세요</p>
        <div class="input-wrapper">
          <input class="name" type="text"></input>
          <input class="name" type="text"></input>
          <input class="name" type="text"></input>
        </div>
        <img id="ok" src="./ok_btn.svg" />
      </section>
    </section>
    <section id="ranking" class="hidden">
      <section class="game-screen">
        <img src="./ranking_best.svg" />
        <div class="list">
          <div class="list-row">
            <div class="rank">1ST</div>
            <div class="user-score"></div>
            <div class="user-name"></div>
          </div>
          <div class="list-row">
            <div class="rank">2ND</div>
            <div class="user-score"></div>
            <div class="user-name"></div>
          </div>
          <div class="list-row">
            <div class="rank">3RD</div>
            <div class="user-score"></div>
            <div class="user-name"></div>
          </div>
          <div class="list-row">
            <div class="rank">4TH</div>
            <div class="user-score"></div>
            <div class="user-name"></div>
          </div>
          <div class="list-row">
            <div class="rank">5TH</div>
            <div class="user-score">123123</div>
            <div class="user-name">123</div>
          </div>
        </div>
        <div class="score-area">
          <p class="user-result">___님의 스코어는?</p>
          <div class="user-result-rank"> / </div>
        </div>
        <p>친구들에게 공유하기</p>
        <div class="button-wrapper">
          <img src="./twitter.png" />
          <img src="./facebook.png" />
          <img id="link" src="./link.png" />
        </div>
        <img id="reset" src="./reset.svg" />
      </section>
    </section>
  `;

  return element;
}

document.body.appendChild(component());
