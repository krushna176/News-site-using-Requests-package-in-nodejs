const express = require('express');
const app=express();
var requests = require("requests");
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
const { header } = require('express/lib/request');
const { restart } = require('nodemon');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var objdata;
var errorr;
var mName;
app.get('/',(req, res)=>{
  const url_api=`https://newsapi.org/v2/top-headlines?country=ind&from=2021-15-15&sortBy=publishedAt&apiKey=4b16fffb800646f8a245cce97d29c4aa`;
    requests(url_api)
    
    .on('data',  (chunk)=> {
        objdata= JSON.parse(chunk);
    // res.render('index',{objdata,mName,errorr});
    })
    .on('end',  (err)=> {
      errorr=err;
      if (errorr){ console.log('connection closed due to errors', errorr);
      
          // res.render('index',{objdata,mName,errorr});
         
    }
    res.render('index',{objdata,mName,errorr});
    });

   
});


app.post('/',urlencodedParser,(req,res)=>{
    mName=req.body.Movie;
    const url_api=`https://newsapi.org/v2/everything?q=${mName}&from=2021-15-15&sortBy=publishedAt&apiKey=4b16fffb800646f8a245cce97d29c4aa`;
    requests(url_api)
    
    .on('data',  (chunk)=> {
        objdata= JSON.parse(chunk);
      if(objdata.totalResults===0){
        console.log("nothing found");
        res.render('index',{objdata,mName,errorr});
      }
  
      else if(objdata.message){
          res.send('you havent entered anything')
         console.log(mName);
      }
      else{res.render('index',{objdata,mName,errorr});}

    })
    .on('end',  (err)=> {
      errorr=err;
      if (errorr){ console.log('connection closed due to errors', errorr);
          res.render('index',{objdata,mName,errorr});
    }         
    });
   
    
});
app.get('/contact/:id',(req,res)=>{
  const url_api=`https://newsapi.org/v2/everything?q=${mName}&from=2021-15-15&sortBy=publishedAt&apiKey=4b16fffb800646f8a245cce97d29c4aa`;
    requests(url_api)
    
    .on('data',  (chunk)=> {
        objdata= JSON.parse(chunk);
    })
    .on('end',  (err)=> {
      errorr=err;
      if (errorr){ console.log('connection closed due to errors', errorr);
    }
    });
  const ID=req.params.id;
  res.render('content',{ID,objdata});

})

app.get('/india',(req,res)=>{
  const url_api=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4b16fffb800646f8a245cce97d29c4aa`;
    requests(url_api)
    
    .on('data',  (chunk)=> {
        objdata= JSON.parse(chunk);
        res.render('India',{objdata});
    })
    .on('end',  (err)=> {
      errorr=err;
      if (errorr) console.log('connection closed due to errors', errorr);
    })
})
app.listen(3000);