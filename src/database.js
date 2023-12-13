const mongoose = require('mongoose');

main().catch(err => console.log(err)).then(res => console.log('DB Connected'));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pw2');
  }