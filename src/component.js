const score = [];
let userId;

const startGamePage = async () => {
  let page = document.getElementById('game-start');
  page.className = '';

  let next;
  const promise = new Promise((resolve) => next = resolve);

  const listener = (e) => {
    page.className += ' hidden';
    page.removeEventListener('click', listener);
    page = null;
    e.stopImmediatePropagation();
    next();
  };

  page.addEventListener('click', listener);

  return promise;
}

const showGameModal = async (message) => {
  let next;
  const promise = new Promise((resolve) => next = resolve);

  let modal = document.querySelector('.game-modal');
  let number = modal.querySelector('img');
  let messageNode = modal.querySelector('p');
  number.src = `./number_3.svg`;
  messageNode.innerText = message;
  modal.className = 'game-modal';

  let count = 3;
  const interverId = setInterval(() => {
    count--;
    if (count > 0) number.src = `./number_${count}.svg`;
    else {
      clearInterval(interverId);
      modal.className += ' hidden';
      modal = null;
      number = null;
      // messageNode = null;
      next();
    }
  }, 1000);

  return promise;
}

const gamePage = async () => {
  let page = document.getElementById('game-app');
  page.className = '';

  await game1(page);
  await game2(page);

  return Promise.resolve();
}


const game1 = async (page) => {
  let next;
  const promise = new Promise((resolve) => next = resolve);

  const games = page.getElementsByClassName('game');
  const leftBtn = page.querySelector('#leftBtn');
  const rightBtn = page.querySelector('#rightBtn');

  const gameInfo = page.querySelector('.game-info-wrapper');
  gameInfo.className = 'game-info-wrapper';

  games[0].scrollIntoView();

  await showGameModal('');

  let time = 0;
  const timeNode = document.getElementById('time');
  timeNode.innerText = '0:00';
  const endTimeInterval = setInterval(() => {
    time++;
    timeNode.innerText = Math.floor(time / 60) + ':' + (Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60));
  }, 1000);

  let flag = true;
  let position = 0;
  const speed = 4;
  const character = games[0].querySelector('.character');

  const leftListener = (e) => {
    if (flag) {
      position += speed;
      character.style.left = position + 'px';
      character.src = './character-right.svg';
      flag = !flag;
    }

    e.stopImmediatePropagation();

    if (position > 160) {
      leftBtn.removeEventListener('click', leftListener);
      rightBtn.removeEventListener('click', rightListener);

      score.push(time);
      clearInterval(endTimeInterval);
      next();
    }
  };

  const rightListener = (e) => {
    if (!flag) {
      position += speed;
      character.src = './character-left.svg';
      character.style.left = position + 'px';
      flag = !flag;
    }
    e.stopImmediatePropagation();
  }

  leftBtn.addEventListener('click', leftListener)
  rightBtn.addEventListener('click', rightListener);

  return promise;
}

const game2 = async (page) => {
  let next;
  const promise = new Promise((resolve) => next = resolve);

  const games = page.getElementsByClassName('game');
  const leftBtn = page.querySelector('#leftBtn');
  const rightBtn = page.querySelector('#rightBtn');

  const gameInfo = page.querySelector('.game-info-wrapper');
  gameInfo.className = 'game-info-wrapper';
  gameInfo.querySelector('.game-round').innerText = '2/2 ROUND';

  games[1].scrollIntoView();

  await showGameModal('');

  let time = 0;
  const timeNode = document.getElementById('time');
  timeNode.innerText = '0:00';
  const endTimeInterval = setInterval(() => {
    time++;
    timeNode.innerText = Math.floor(time / 60) + ':' + (Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60));
  }, 1000);

  let size = 100;
  let ballonIdx = 0;
  const speed = 2;
  const ballons = document.getElementsByClassName('ballon');

  let removeLeftListener = leftBtn.addEventListener('click', (e) => {
    size += speed;
    ballons[ballonIdx].style.width = size + 'px';
    ballons[ballonIdx].style.height = size + 'px';

    e.stopImmediatePropagation();

    if (size > 180) {
      ballons[ballonIdx].src = './balloon_pink_pop.svg'
      leftBtn.removeEventListener('click', removeLeftListener);
      rightBtn.removeEventListener('click', removeRightListener);

      score.push(time);
      clearInterval(endTimeInterval);
      next();
    }
  })

  let removeRightListener = rightBtn.addEventListener('click', (e) => {
    size += speed;
    ballons[ballonIdx].style.width = size + 'px';
    ballons[ballonIdx].style.height = size + 'px';

    e.stopImmediatePropagation();

    if (size > 180) {
      ballons[ballonIdx].src = './balloon_pink_pop.svg'
      leftBtn.removeEventListener('click', removeLeftListener);
      rightBtn.removeEventListener('click', removeRightListener);

      score.push(time);
      clearInterval(endTimeInterval);
      next();
    }
  })

  return promise;
}

const endGamePage = async () => {
  let next;
  const promise = new Promise((resolve) => next = resolve);

  const gameEnd = document.getElementById('game-end');
  gameEnd.className = '';

  const imgNode = document.getElementById('ok');
  const names = document.getElementsByClassName('name');

  imgNode.addEventListener('click', () => {
    const name = Array.from(names).map(nameNode => nameNode.value).join('');

    fetch('https://ttt.placepic.ml/score', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ name, points: score }),
    })
      .then(response => response.json()).then(response => {
        userId = response.data.id;
        next();
      });
  })

  return promise;
}

const rankingPage = async () => {
  const page = document.getElementById('ranking');
  page.className = '';

  const reset = document.getElementById('reset');
  reset.addEventListener('click', () => {
    location.reload();
  });

  fetch('https://ttt.placepic.ml/score?limit=999999&offset=0', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default'
  }
  ).then(response => response.json()).then(response => {
    const list = response.data.sort(ele => ele.point);

    const listNodes = document.getElementsByClassName('user-score');
    const userNames = document.getElementsByClassName('user-name');
    for (let i = 0; i < 5; i++) {
      listNodes[i].innerText = list[i].point;
      userNames[i].innerText = list[i].name;
    }

    const data = list.filter(ele => ele.id === userId)[0];

    const userResult = document.getElementsByClassName('user-result')[0];
    userResult.innerText = data.name + '님의 스코어는?';

    const userResultRank = document.getElementsByClassName('user-result-rank')[0];
    userResultRank.innerText = data.point + ' / ' + list.map(ele => ele.id).indexOf(userId) + '등';

  });
}

(window.onload = async () => {
  await startGamePage();
  await gamePage();
  await endGamePage();
  await rankingPage();
})();