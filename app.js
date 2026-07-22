/* ===================================
   Bitcoin Vault Dashboard
   Live BTC Portfolio USD + EUR Edition
=================================== */


/* ================================
   Portfolio Amount
================================ */

const portfolioBTC = 31.06;
const portfolioETH = 354.15;




/* ================================
   Particle Background
================================ */

const particleContainer =
document.querySelector("#particles");


if (particleContainer) {

    const particleCount = 45;


    for (let i = 0; i < particleCount; i++) {

        const particle =
        document.createElement("div");


        particle.className =
        "particle";


        particle.style.left =
        Math.random() * 100 + "%";


        particle.style.animationDuration =
        (5 + Math.random() * 10) + "s";


        particle.style.animationDelay =
        Math.random() * 5 + "s";


        particle.style.opacity =
        Math.random();


        particleContainer.appendChild(
            particle
        );

    }

}







/* ================================
   Portfolio Elements
================================ */

const walletValue =
document.querySelector("#walletValue");


const btcBalance =
document.querySelector("#btcBalance");
const ethBalance =
document.querySelector("#ethBalance");

const btcPrice =
document.querySelector("#btcPrice");
const ethPrice =
document.querySelector("#ethPrice");
const btcAllocation =
document.querySelector("#btcAllocation");


const ethAllocation =
document.querySelector("#ethAllocation");
const btcAllocation =
document.querySelector("#btcAllocation");


const ethAllocation =
document.querySelector("#ethAllocation");
const eurValue =
document.querySelector("#eurValue");








/* ================================
   Live BTC Portfolio Update
================================ */

async function updatePortfolio(){


try {


    if(btcBalance){

        btcBalance.textContent =
        portfolioBTC.toFixed(2) + " BTC";

    }




    // BTC price from Kraken

    const priceResponse =
    await fetch(
    "https://api.kraken.com/0/public/Ticker?pair=XBTUSD"
    );


    const priceData =
    await priceResponse.json();


    const btcUSD =
    Number(
        priceData.result.XXBTZUSD.c[0]
    );





    if(btcPrice){

        btcPrice.textContent =
        "$" +
        btcUSD.toLocaleString(
            undefined,
            {
                maximumFractionDigits:2
            }
        );

    }







    // USD to EUR conversion

    const eurResponse =
    await fetch(
    "https://open.er-api.com/v6/latest/USD"
    );


    const eurData =
    await eurResponse.json();


    const usdToEUR =
    eurData.rates.EUR;






    // Calculate portfolio

const ethResponse =
await fetch(
"https://api.kraken.com/0/public/Ticker?pair=ETHUSD"
);


const ethData =
await ethResponse.json();


const ethUSD =
Number(
    ethData.result.XETHZUSD.c[0]
);
if(ethPrice){

    ethPrice.textContent =
    "$" +
    ethUSD.toLocaleString(
        undefined,
        {
            maximumFractionDigits:2
        }
    );

}


const totalUSD =
(portfolioBTC * btcUSD) +
(portfolioETH * ethUSD);
const btcValue =
portfolioBTC * btcUSD;


const ethValue =
portfolioETH * ethUSD;


const btcPercent =
(btcValue / totalUSD) * 100;


const ethPercent =
(ethValue / totalUSD) * 100;
if(btcAllocation){

btcAllocation.textContent =
"BTC " +
btcPercent.toFixed(1) +
"%";

}


if(ethAllocation){

ethAllocation.textContent =
"ETH " +
ethPercent.toFixed(1) +
"%";

}
    const totalEUR =
    totalUSD * usdToEUR;






    if(walletValue){

        walletValue.textContent =
        "$" +
        totalUSD.toLocaleString(
            undefined,
            {
                minimumFractionDigits:2,
                maximumFractionDigits:2
            }
        );

    }






    if(eurValue){

        eurValue.textContent =
        "€" +
        totalEUR.toLocaleString(
            undefined,
            {
                minimumFractionDigits:2,
                maximumFractionDigits:2
            }
        );

    }



}


catch(error){


console.error(
"Portfolio update error:",
error
);



if(walletValue){

walletValue.textContent =
"Unavailable";

}



if(btcPrice){

btcPrice.textContent =
"Unavailable";

}
if(ethBalance){

    ethBalance.textContent =
    portfolioETH.toFixed(2) + " ETH";

}


if(eurValue){

eurValue.textContent =
"Unavailable";

}



}



}





updatePortfolio();


setInterval(
updatePortfolio,
30000
);









/* ================================
   Toast System
================================ */


const toast =
document.querySelector("#toast");


function showToast(message){


if(!toast)
return;


toast.textContent =
message;


toast.classList.add(
"show"
);


setTimeout(()=>{


toast.classList.remove(
"show"
);


},2500);


}









/* ================================
   Copy Wallet
================================ */


const copyButton =
document.querySelector("#copyWallet");


const wallet =
document.querySelector("#walletAddress");



if(copyButton && wallet){


copyButton.addEventListener(
"click",
async()=>{


try{


await navigator.clipboard.writeText(
wallet.textContent
);



copyButton.textContent =
"Copied ✓";


showToast(
"Wallet address copied"
);



setTimeout(()=>{


copyButton.textContent =
"Copy Wallet";


},2000);



}


catch(error){


showToast(
"Copy failed"
);


}



});


}









/* ================================
   Synchronization Time
================================ */


const sync =
document.querySelector("#syncTime");



function updateTime(){


if(sync){

sync.textContent =
new Date().toLocaleString();

}

}



updateTime();


setInterval(
updateTime,
60000
);









/* ================================
   Security Score
================================ */


const security =
document.querySelector(".security");



if(security){


let score = 0;


const target = 98;



const securityAnimation =
setInterval(()=>{


score++;


security.textContent =
score + "%";



if(score >= target){


clearInterval(
securityAnimation
);


}



},18);


}









/* ================================
   Premium Card Glow
================================ */


const cards =
document.querySelectorAll(".card");



cards.forEach(card=>{


card.addEventListener(
"mousemove",
(e)=>{


const rect =
card.getBoundingClientRect();


const x =
e.clientX - rect.left;


const y =
e.clientY - rect.top;



card.style.background = `

radial-gradient(

circle at ${x}px ${y}px,

rgba(255,183,0,.22),

rgba(255,255,255,.08)

)

`;



});




card.addEventListener(
"mouseleave",
()=>{


card.style.background =
"rgba(255,255,255,.08)";


});


});









/* ================================
   Status Pulse
================================ */


const status =
document.querySelector(".status");


if(status){


setInterval(()=>{


status.style.transform =
"scale(1.03)";


setTimeout(()=>{


status.style.transform =
"scale(1)";


},300);



},3000);


}









/* ================================
   Page Loaded
================================ */


window.addEventListener(
"load",
()=>{


document.body.classList.add(
"ready"
);


});
/* ================================
   English / Italian Translator
================================ */


const languageBtn =
document.querySelector("#languageBtn");


let italianMode = false;



if(languageBtn){


languageBtn.addEventListener(
"click",
()=>{


italianMode =
!italianMode;



document.querySelectorAll("[data-en]")
.forEach(text=>{


text.textContent =
italianMode
?
text.dataset.it
:
text.dataset.en;


});



languageBtn.textContent =
italianMode
?
"🇬🇧 English"
:
"🇮🇹 Italiano";


});


}
/* ================================
   Local Private Login
================================ */


const privateEmail =
"viscas76@libero.it";


const privatePassword =
"DerviscCamporesi";



const loginButton =
document.querySelector("#loginButton");



const loginMessage =
document.querySelector("#loginMessage");




if(localStorage.getItem("vaultLogin") === "true"){

document.body.classList.add(
"logged-in"
);

}




if(loginButton){


loginButton.addEventListener(
"click",
()=>{


const email =
document.querySelector("#loginEmail").value;


const password =
document.querySelector("#loginPassword").value;




if(
email === privateEmail &&
password === privatePassword
){


localStorage.setItem(
"vaultLogin",
"true"
);



document.body.classList.add(
"logged-in"
);



}

else{


loginMessage.textContent =
"Incorrect email or password";


}



});


}
