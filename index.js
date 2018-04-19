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
        this.standd=2;
    }
let count =0;
   let ids=[];
let turn=[];
let actualhits=4;
var currentturn=0;
let userObj = {}
var needshits=4;
var sumi=0;
var obsv=0;
let dealerT = 0;
let d_first;
let cards = [1,2,3,4,5,6,7,8,9,10, 10, 10, 10];
let usable=false;
var players=[];
var info="";
var observer=0;
let hitcount=0;
var idsum=0;
app.get('/getobsv/:ninerId', (req, res) => {
    observer=observer+1;
    if(observer==actualhits)
        {
        obsv=0;
        observer=0;
        }
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
    var index;
    for(var i=0;i<4;i++)
                {
                    if(players[i].id==req.params.ninerId)
                        {
                        index=i;
                        }
                }
    res.json({
          "total" : players[index].total,
          "dealerHand" : d_first,
          "usable" : players[index].useable,
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
    if(obsv==actualhits)
        {
res.send(""+4);
        }
    else
        {
            res.send(""+5);
        }
   
})

app.get('/checkstand/:ninerId', (req, res) => {
    res.send(""+sumi);
    
})


app.get('/reset/:ninerId', (req, res) => {
     count =0;
    ids=[];
 turn=[];
 actualhits=4;
 currentturn=0;
 userObj = {};
 needshits=4;
 sumi=0;
 obsv=0;
 dealerT = 0;
 
 cards = [1,2,3,4,5,6,7,8,9,10, 10, 10, 10];
 
 players=[];
 
 observer=0;
 hitcount=0;
 idsum=0;
    res.send("done")
    
})
app.get('/checkobsv/:ninerId', (req, res) => {
    if(observer==4)
        {
            observer=0;
            res.send(""+1);
        }
    else
        {
            res.send(""+0);
        }
    
})


app.get('/getresult/:ninerId', (req, res) => {
    
 
    
     res.json({
          "Player1 id " : players[0].id,
         "Player1 total " : players[0].total,
         "Player2 id " : players[1].id,
         "Player2 total " : players[1].total,
         "Player3 id " : players[2].id,
         "Player3 total " : players[2].total,
         "Player4 id " : players[3].id,
         "Player4 total " : players[3].total,
         "Dealer":dealerTotal
        
        });

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
        "Player 4 " : players[3].id  
        });

})
app.get('/startGame/:ninerId', (req, res) => {
    usable=false;
    count=count+1;
   

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
            for(var i=0;i<4;i++)
        {
            turn[i]=players[i].id;
        }
                        res.send("You are player : "+tt4.id);

        }
    
    
})







app.get('/hit/:ninerId', (req, res) => {
    
    
            
    obsv=obsv+1;
    if(obsv==4)
        {
            
            dealerT=dealerT+1;
            if(dealerT==1)
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
                if(11+t_card[1]<21)
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
                if(t_card[0]+11<21)
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
                if(  players[index].total+11<21)
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
    
    //hitcount=hitcount+1;
    //if everyone has stood then do dealer hands
    
    actualhits=actualhits-1;
    
        
    for(var i=0;i<4;i++)
        {
            if(players[i].id==req.params.ninerId)
                {
                players[i].standd=0;
                    
                }
        }
    sumi=0;
    for(var i=0;i<4;i++)
        {
            sumi=sumi+players[i].standd;
               
        }
            if(sumi==0)
                {
                    sumi=1;
                }
    if(sumi==1)
        {
      while(dealerTotal < 17){
       
          let rand_card = random_item(cards);
         dealerTotal += rand_card;
          
        
      }}
        res.send("You have decided to stand, Now please wait for other players to finish");
    
      })

function random_item(items)
{

return items[Math.floor(Math.random()*items.length)];

}
app.listen(process.env.PORT || 3988, () => console.log('Example app listening on port 3988!'))
