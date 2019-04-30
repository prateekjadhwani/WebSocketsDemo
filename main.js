// To Store Stock Data
let stockData = {};

function handleSocketOperations() {
  // Create WebSocket connection.
  const socket = new WebSocket('ws://stocks.mnet.website');

  // Connection opened
  socket.addEventListener('open', (event) => {
      console.log('Starting to get Stock Data')
  });

  // Listen for messages
  socket.addEventListener('message', (event) => {
      handleEventData(event.data);
  });
}

function handleEventData(data) {

  // lets parse this in the beginning it self
  let domContainer = document.querySelector('.stock__container');

  // Coz, data is in string
  // and needs parsing
  data = JSON.parse(data);

  data.forEach((val) => {

    // if the stock doesnt exist in our object
    if(!stockData[val[0]]) {

      // lets add this new stock
      stockData[val[0]] = val[1];

      // lets add this newly created stock to dom
      let div = createNewStockItem(val[0], val[1]);
      domContainer.appendChild(div);

    } else {
      // instead of querying the dom again and again
      // lets query it once
      let itemDom = domContainer.querySelector(`.stock__item--${val[0]}`);

      // remove the old classes
      itemDom.classList.remove('stock__item--gain');
      itemDom.classList.remove('stock__item--loss');

      // Lets update the class
      if(stockData[val[0]] < val[1]) {
        // when the value is more
        itemDom.classList.add('stock__item--gain');
      } else if(stockData[val[0]] > val[1]) {
        // when the value is less
        itemDom.classList.add('stock__item--loss');
      }

      // Update the value in dom
      itemDom.querySelector('.stock__item__val').innerText = val[1];

      // notice how I am resetting the time
      itemDom.querySelector('time-manager').reset = true;
    }

    // as per requirement
    console.log(`${val[0]}: ${val[1]}`);
  });
}

// Created a new div that can contain a stock
function createNewStockItem(stockName, stockVal) {
  let div = document.createElement('div');

  // adding classes
  div.classList.add('stock__item');
  div.classList.add(`stock__item--${stockName}`);

  div.innerHTML = `
    <div class="stock__item__name">${stockName}</div>
    <div class="stock__item__val">${stockVal}</div>
    <div class="stock__item__time">
      <time-manager></time-manager>
    </div>
  `;

  return div;
}

// Lets start the fun stuff
handleSocketOperations();
