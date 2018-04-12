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
function Users(niner,sum,useable)
    {
        
        this.id=niner;
        this.total=sum;
        this.useable=useable;
        this.standd=1;
    }
let count =0;
   let ids=[];
let userObj = {}
var sumi=0;
let dealerTotal = 0;
let d_first;
let cards = [1,2,3,4,5,6,7,8,9,10, 10, 10, 10];
let usable=false;
var players=[];
var info="";
let hitcount=0;
var idsum=0;
app.get('/getobsv/:ninerId', (req, res) => {
    hitcount=0;
    let ptot=[];
    let pus=[];
    var k=-1;
    for(var i=0;i<4;i++)
        {
            if(players[i].id!=req.params.ninerId)
                {
                    k=k+1;
                    ptot[k]=players[i].total;
                    pus[k]=players[i].useable;
                }
        }
    res.json({
          "total" : players[0].total,
          "dealerHand" : d_first,
          "usable" : players[0].useable,
          "opponent1 total" :ptot[0],
        "opponent1 useable" :pus[0],
        "opponent2 total" :ptot[1],
        "opponent2 useable" :pus[1],
        "opponent3 total" :ptot[2],
        "opponent3 useable" :pus[2]
        
        });
    
})
app.get('/check/:ninerId', (req, res) => {
    res.send(""+count);
    
})

app.get('/checkhits/:ninerId', (req, res) => {
    res.send(""+hitcount);
    
})

app.get('/checkstand/:ninerId', (req, res) => {
    res.send(""+sumi);
    
})

app.get('/getplayers/:ninerId', (req, res) => {
    
 
    for(var i=0;i<4;i++)
        {
            ids[i]=players[i].id;
        }
     res.json({
          "Player 1 " : players[0].id,
         "Player 2 " : players[1].id,
         "Player 3 " : players[2].id,
        "Player 3 " : players[3].id,


          
          
        });
    //res.send(""+players[2].id+""+players[1].id);
   // res.send("Player 1 : "+players[1].id+"Player 2 : "+players[2].id+"Player 3 : "+players[3].id+"Player 4 : "+players[4].id);
})
app.get('/startGame/:ninerId', (req, res) => {
    usable=false;
    count=count+1;
    if(count==1)
        {
          //  var tmp = [new Users(0,0,false),new Users(0,0,false),new Users(0,0,false),new Users(0,0,false))];
        }
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
    if(count==1)
        {
    var tt=new Users(req.params.ninerId,0,false);
    players.push(tt);
            res.send("You are player : "+tt.id);
        }
    if(count==2)
        {
    var tt2=new Users(req.params.ninerId,0,false);
    players.push(tt2);
                        res.send("You are player : "+tt2.id);

        }
     if(count==3)
        {
    var tt3=new Users(req.params.ninerId,0,false);
    players.push(tt3);
                        res.send("You are player : "+tt3.id);

        }
     if(count==4)
        {
    var tt4=new Users(req.params.ninerId,0,false);
    players.push(tt4);
                        res.send("You are player : "+tt4.id);

        }
    
    
})







app.get('/hit/:ninerId', (req, res) => {
    
    
        hitcount=hitcount+1;
    if(hitcount==4)
        {
            
            dealerTotal=dealerTotal+1;
            if(dealerTotal==1)
                {
                    let d_card = [];
                    d_card[0] = random_item(cards);
                    d_card[1] = random_item(cards);

                    d_first = d_card[0];
                    dealerTotal = d_card[0] + d_card[1];
                }
        }
        var index=99;
        for(var i=0;i<4;i++)
                {
                    if(players[i].id==req.params.ninerId)
                        {
                        index=i;
                        }
                }
        let t_card = [];
        

        if(players[index].total==0)
           {

        t_card[0] = random_item(cards);
          
        t_card[1] = random_item(cards);
        if(t_card[0]==1)
                    {
                if(t_card[0]+t_card[1]<21)
                            {
                    players[index].useable=true;
                    players[index].total = 11+ t_card[1];

                            }
                else
                            {
                    
                    players[index].total = t_card[0] + t_card[1];

                            }
                    }
          else if(t_card[1]==1)
                {
                if(t_card[0]+t_card[1]<21)
                        {
                    players[index].useable=true;
                    players[index].total = 11+ t_card[0];

                        }
                else
                        {
                    
                    players[index].total = t_card[0] + t_card[1];

                        }
                }
          else
                    {
                                    players[index].total = t_card[0] + t_card[1];
  
                    }
        
            } 
    
    else 
            {
        let s_card = random_item(cards);
          if(s_card==1)
                {
                if(  players[index].total+s_card<21)
                        {
                     players[index].useable=true;
                     players[index].total+= 11;

                        }
                else
                        {
                    
                        players[index].total += s_card;
                        }

                
                }
          else
                    {
                                         players[index].total += s_card;
  
                    }

            }
    
    res.send(""+players[index].total);
})

app.get('/stand/:ninerId', (req, res) => {
    
    hitcount=hitcount+1;
    //if everyone has stood then do dealer hands
    for(var i=0;i<4;i++)
        {
            if(ids[i]-req.params.ninerId==0)
                {
                    ids[i]=0;
                }
        }
    
    for(var i=0;i<4;i++)
        {
            sumi=sumi+ids[i];
        }
    if(sumi==0)
        {
      while(dealerTotal < 17){
       
          let rand_card = random_item(cards);
         dealerTotal += rand_card;
          res.send(""+dealerTotal);
        
      }}
    else{
        res.send(""+sumi);
    }

      })

function random_item(items)
{

return items[Math.floor(Math.random()*items.length)];

}
app.listen(process.env.PORT || 3988, () => console.log('Example app listening on port 3988!'))
