function generateID() {
  var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var id = '';

  for (var i = 0; i < 16; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);

    if (i % 4 === 3 && i !== 15) {
      id += '-';
    }
  }

  return id;
}

module.exports = generateID;