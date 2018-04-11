const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//class players
//    {
//        int ninerid;
//        int sum;
//        boolean useable;
//    }
class Users
    {
        //this.cc=0;
    }
let count =0;
let userObj = {}
let dealerTotal = 0;
let d_first;
let cards = [1,2,3,4,5,6,7,8,9,10, 10, 10, 10];
let usable=false;
app.get('/getobsv/:ninerId', (req, res) => {
    res.json({
          "total" : userObj[req.params.ninerId],
          "dealerHand" : d_first,
          "usable" : usable
        
        });
    
})

app.get('/startGame/:ninerId', (req, res) => {
    usable=false;
    count=count+1;
//    if (req.params.ninerId) {
//      if (!userObj[req.params.ninerId]) {
//        dealerTotal = 0;
//        userObj[req.params.ninerId] = 0;
//        res.send("You can start the game !");
//      }else {
//        res.send("You can start the game !");
//      }
//    }else{
//      res.send("Enter Your Niner ID !");
//    }
   // var def=new players();
    //def.ninerid=10;
    //def.sum=0;
    //def.useable=false;
    var tt=new Users();
    res.send(""+count);
    
})
app.get('/hit/:ninerId', (req, res) => {
  console.log(userObj[req.params.ninerId]);
    if (userObj[req.params.ninerId] != undefined) {
      if (userObj[req.params.ninerId] == 0) {
        let t_card = [];
        let d_card = [];

        d_first = 0;

        t_card[0] = random_item(cards);
          
        t_card[1] = random_item(cards);
        if(t_card[0]==1)
            {
                if(t_card[0]+t_card[1]<21)
                    {
                    usable=true;
                    userObj[req.params.ninerId] = 11+ t_card[1];

                    }
                else
                    {
                    
                    userObj[req.params.ninerId] = t_card[0] + t_card[1];

                    }
            }
          else if(t_card[1]==1)
            {
                if(t_card[0]+t_card[1]<21)
                    {
                    usable=true;
                    userObj[req.params.ninerId] = 11+ t_card[0];

                    }
                else
                    {
                    
                    userObj[req.params.ninerId] = t_card[0] + t_card[1];

                    }
            }
          else
              {
                                    userObj[req.params.ninerId] = t_card[0] + t_card[1];
  
              }
        

          

        d_card[0] = random_item(cards);
        d_card[1] = random_item(cards);

        d_first = d_card[0]
        dealerTotal = d_card[0] + d_card[1];
      //  userObj[req.params.ninerId] = t_card[0] + t_card[1];

        res.json({
          "cards" : t_card,
          "total" : userObj[req.params.ninerId],
          "dealerHand" : d_first
        });
      } else {
        let s_card = random_item(cards);
          if(s_card==1)
            {
                if( userObj[req.params.ninerId]+s_card<21)
                    {
                    usable=true;
                    userObj[req.params.ninerId] += 11;

                    }
                else
                    {
                    
                        userObj[req.params.ninerId] += s_card;
                    }

                
            }
          else
              {
                                        userObj[req.params.ninerId] += s_card;
  
              }
        console.log(userObj[req.params.ninerId]);
        if (userObj[req.params.ninerId] > 21) {
          let temp = userObj[req.params.ninerId];
          userObj[req.params.ninerId] = 0;
          d_first = 0;
          res.json({
            "cards" : "Busted",
            "total"  : temp
          });
        }else {
          res.json({
            "cards" : [s_card],
            "total" : userObj[req.params.ninerId],
            "dealerHand" : d_first
          });
        }
      }
    }else{
      res.send("Please start the game and then Hit !");
    }
})

app.get('/stand/:ninerId', (req, res) => {
    usable=false;
  console.log(userObj[req.params.ninerId]);
    if (userObj[req.params.ninerId] != undefined) {
      let temp = userObj[req.params.ninerId];
      userObj[req.params.ninerId] = 0;

      while(dealerTotal < 17){
        console.log("while 1 "+dealerTotal);
        let rand_card = random_item(cards);
        console.log(rand_card);
        dealerTotal += rand_card
        console.log("while 2 "+dealerTotal);
      }

      if (dealerTotal > 21) {
        res.json({
          "total" : temp,
          "result"  : "Dealer Busted, you Won !",
            "dealerTotal" :dealerTotal,
          "Win" : true
        })
      }else{
          if (dealerTotal > temp) {
            res.json({
              "total" : temp,
              "result"  : "Dealer Won, you Lost !",
                "dealerTotal" :dealerTotal,
              "Win" : false
            })
          }else if (dealerTotal < temp) {
            res.json({
              "total" : temp,
              "result"  : "Dealer Lost, you Won !",
                "dealerTotal" :dealerTotal,
              "Win" : true
            })
          }else{
            res.json({
              "total" : temp,
              "result"  : "Dealer you Won draw !",
                "dealerTotal" :dealerTotal,
              "Win" : false
            })
          }
      }
    }else{
      res.send("Please start the game and then Hit !");
    }
})

function random_item(items)
{

return items[Math.floor(Math.random()*items.length)];

}
app.listen(process.env.PORT || 3988, () => console.log('Example app listening on port 3988!'))
