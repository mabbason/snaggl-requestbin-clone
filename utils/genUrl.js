const hexSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

function generateURLOfLen(len) {
  let urlArr = [] 
  for (let n = 1; n <= len; n++) {
    urlArr.push(hexSource[Math.floor(Math.random() * 16)]);
  }
  return urlArr.join('');
}

module.exports = generateURLOfLen
