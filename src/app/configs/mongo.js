const mongoose = require('mongoose');

if(!process.env.JEST_WORKER_ID){
  mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function(error){
    if(error){
      console.log(error);
    }
    else{
      console.log("Conexão com mongodb feita com sucesso!");
    }
  });
}

module.exports = mongoose;