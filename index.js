const Twit = require('twit');
const config = require('./src/config');
const axios = require('axios');

const bot = new Twit(config);

const post = () =>{
    axios.get("https://covid19-brazil-api.now.sh/api/report/v1/brazil")
    .then((response) => {
        const deaths = response.data.data.deaths;
        const cases = response.data.data.cases;
        const recovered = response.data.data.recovered;
        const total = response.data.data.confirmed;
        let msg = `‼️ Casos confirmados (Totais) : ${total}\n`+
        `😷 Portadores :  ${cases}\n` + 
        `☑️ Curados :  ${recovered}\n`+ 
        `✝️ Mortes : ${deaths}\n` +
        `#covid19 #brasil #coronavirus #Covid19`;
        
        bot.post('statuses/update',{status:msg},(err)=>{
            if(!err){
                console.log("Houve alteração nos dados");
            }
        });
    })
    .catch((err) => {
        console.log(err);
    })
}

setInterval(post,1000);
