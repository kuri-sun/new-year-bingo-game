// generate 5x5 2D arr.
function generateNewBoard() {
  let arr = [];
  let cache = [];

  for (let i = 0; i < 5; i++) {
    arr[i] = [];
    for (let j = 0; j < 5; j++) {
      if (i !== 2 || j !== 2) {
        let ranNum = generateRandNum(cache);
        arr[i][j] = ranNum;
        cache.push(ranNum); // cache the used number.
      } else {
        arr[i][j] = -1;
      }
    }
  }
  return arr;
}

//generate random 1-100 without duplication
function generateRandNum(cache) {
  let ranNum = Math.floor(Math.random() * 100);
  while (cache.includes(ranNum)) {
    ranNum = Math.floor(Math.random() * 100);
  }
  return ranNum;
}

// fill the cell that is already consumed by roulette
function fillCell(board, fill) {
  let arr = JSON.parse(board);

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (arr[i][j] === -1 || arr[i][j] === fill) {
        arr[i][j] = -1;
      }
    }
  }
  return JSON.stringify(arr);
}

function returnNextTurnUser(players, currentUserId) {
  // sort
  players.sort(function (a, b) {
    return b.sortOrder - a.sortOrder;
  });
  // calc current user's index
  let index = -1;
  players.forEach((player, i) => {
    if (player._id === currentUserId) {
      index = i;
    }
  });
  if (index === -1 || index === players.length - 1) {
    return players[0];
  } else {
    return players[index + 1];
  }
}

module.exports = {
  generateNewBoard,
  generateRandNum,
  fillCell,
  returnNextTurnUser,
};
