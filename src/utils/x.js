exports.generateId = (len = 14) => {
    const base = "0123456789abcdef";
  
    var id = "-";
    for (let i = 0; i < len; i++) {
      var pos = Math.floor(Math.random() * base.length);
      id += base[pos];
    }
    return id;
  };
  