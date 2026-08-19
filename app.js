/* ===================================
   Bitcoin Vault Dashboard
   Part 1A
   Portfolio + Live Prices
=================================== */

/* ================================
   Portfolio Amount
================================ */

const portfolioBTC = 31.06;
const portfolioETH = 354.15;

/* ================================
   Particle Background
================================ */

const particleContainer = document.querySelector("#particles");

if (particleContainer) {

    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("div");

        particle.className = "particle";

        particle.style.left = Math.random() * 100 + "%";

        particle.style.animationDuration =
            (5 + Math.random() * 10) + "s";

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particle.style.opacity = Math.random();

        particleContainer.appendChild(particle);

    }

}

/* ================================
   Portfolio Elements
================================ */

const walletValue = document.querySelector("#walletValue");

const btcBalance = document.querySelector("#btcBalance");
const ethBalance = document.querySelector("#ethBalance");

const btcPrice = document.querySelector("#btcPrice");
const ethPrice = document.querySelector("#ethPrice");

const btcAllocation =
    document.querySelector("#btcAllocation");

const ethAllocation =
    document.querySelector("#ethAllocation");

const eurValue =
    document.querySelector("#eurValue");

/* ================================
   Live Portfolio Update
================================ */
/* ================================
   Live BTC / ETH Chart
================================ */

const chartCanvas =
    document.querySelector("#cryptoChart");

const chartBtcPrice =
    document.querySelector("#chartBtcPrice");

const chartEthPrice =
    document.querySelector("#chartEthPrice");

let cryptoChart = null;

const chartLabels = [];
const btcHistory = [];
const ethHistory = [];


/* ================================
   Create Chart
================================ */

if (chartCanvas && typeof Chart !== "undefined") {

    const ctx = chartCanvas.getContext("2d");

    cryptoChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: chartLabels,

            datasets: [

                {
                    label: "Bitcoin",

                    data: btcHistory,

                    borderColor: "#ffb700",

                    backgroundColor:
                        "rgba(255,183,0,.12)",

                    borderWidth: 3,

                    tension: 0.35,

                    pointRadius: 2,

                    pointHoverRadius: 5,

                    fill: true
                },

                {
                    label: "Ethereum",

                    data: ethHistory,

                    borderColor: "#627eea",

                    backgroundColor:
                        "rgba(98,126,234,.10)",

                    borderWidth: 3,

                    tension: 0.35,

                    pointRadius: 2,

                    pointHoverRadius: 5,

                    fill: true
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {
                duration: 500
            },

            interaction: {
                mode: "index",
                intersect: false
            },

            plugins: {

                legend: {
                    labels: {
                        color: "#ffffff"
                    }
                }

            },

            scales: {

                x: {

                    ticks: {
                        color: "#888"
                    },

                    grid: {
                        color:
                            "rgba(255,255,255,.06)"
                    }

                },

                y: {

                    ticks: {

                        color: "#888",

                        callback: function(value) {

                            return "$" +
                                Number(value)
                                .toLocaleString();

                        }

                    },

                    grid: {
                        color:
                            "rgba(255,255,255,.06)"
                    }

                }

            }

        }

    });

}


/* ================================
   Add Chart Data
================================ */

function addChartData(btcUSD, ethUSD) {

    if (!cryptoChart) return;

    const time =
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    chartLabels.push(time);

    btcHistory.push(btcUSD);

    ethHistory.push(ethUSD);


    /*
       Keep the latest 30 readings
    */

    if (chartLabels.length > 30) {

        chartLabels.shift();

        btcHistory.shift();

        ethHistory.shift();

    }


    cryptoChart.update();

}


/* ================================
   Chart Price Display
================================ */

function updateChartPrices(btcUSD, ethUSD) {

    if (chartBtcPrice) {

        chartBtcPrice.textContent =
            "$" +
            btcUSD.toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

    }


    if (chartEthPrice) {

        chartEthPrice.textContent =
            "$" +
            ethUSD.toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

    }

}
async function updatePortfolio() {

    try {

        if (btcBalance) {
            btcBalance.textContent =
                portfolioBTC.toFixed(2) + " BTC";
        }

        if (ethBalance) {
            ethBalance.textContent =
                portfolioETH.toFixed(2) + " ETH";
        }

        /* ----------------------------
           BTC Price
        ---------------------------- */

        const btcResponse = await fetch(
            "https://api.kraken.com/0/public/Ticker?pair=XBTUSD"
        );

        const btcData = await btcResponse.json();

        const btcUSD =
            Number(
                btcData.result.XXBTZUSD.c[0]
            );

        if (btcPrice) {

            btcPrice.textContent =
                "$" +
                btcUSD.toLocaleString(
                    undefined,
                    {
                        maximumFractionDigits: 2
                    }
                );

        }

        /* ----------------------------
           ETH Price
        ---------------------------- */

        const ethResponse = await fetch(
            "https://api.kraken.com/0/public/Ticker?pair=ETHUSD"
        );

        const ethData = await ethResponse.json();

        const ethUSD =
            Number(
                ethData.result.XETHZUSD.c[0]
            );
updateChartPrices(
    btcUSD,
    ethUSD
);

addChartData(
    btcUSD,
    ethUSD
);
        if (ethPrice) {

            ethPrice.textContent =
                "$" +
                ethUSD.toLocaleString(
                    undefined,
                    {
                        maximumFractionDigits: 2
                    }
                );

        }

        /* ----------------------------
           USD → EUR
        ---------------------------- */

        const eurResponse = await fetch(
            "https://open.er-api.com/v6/latest/USD"
        );

        const eurData =
            await eurResponse.json();

        const usdToEUR =
            eurData.rates.EUR;

        /* ----------------------------
           Portfolio Value
        ---------------------------- */

        const btcValue =
            portfolioBTC * btcUSD;

        const ethValue =
            portfolioETH * ethUSD;

        const totalUSD =
            btcValue + ethValue;

        const totalEUR =
            totalUSD * usdToEUR;

    if (walletValue) {

    walletValue.textContent =
        "$" + totalUSD.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

}

        if (eurValue) {

            eurValue.textContent =
                "€" +
                totalEUR.toLocaleString(
                    undefined,
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                );

        }

        /* ----------------------------
           Allocation
        ---------------------------- */

        const btcPercent =
            (btcValue / totalUSD) * 100;

        const ethPercent =
            (ethValue / totalUSD) * 100;

        if (btcAllocation) {

            btcAllocation.style.width =
                btcPercent + "%";

            btcAllocation.textContent =
                "BTC " +
                btcPercent.toFixed(1) +
                "%";

        }

        if (ethAllocation) {

            ethAllocation.style.width =
                ethPercent + "%";

            ethAllocation.textContent =
                "ETH " +
                ethPercent.toFixed(1) +
                "%";

        }

    }

    catch (error) {

        console.error(
            "Portfolio update error:",
            error
        );

        if (walletValue) {
            walletValue.textContent =
                "Unavailable";
        }

        if (btcPrice) {
            btcPrice.textContent =
                "Unavailable";
        }

        if (ethPrice) {
            ethPrice.textContent =
                "Unavailable";
        }

        if (eurValue) {
            eurValue.textContent =
                "Unavailable";
        }

    }

}

/* ================================
   Start Updates
================================ */

updatePortfolio();

setInterval(
    updatePortfolio,
    30000
);
/* ===================================
   Bitcoin Vault Dashboard
   Part 1B
   Interface Functions
=================================== */

/* ================================
   Toast System
================================ */

const toast = document.querySelector("#toast");

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* ================================
   Copy Wallet
================================ */

const copyButton =
    document.querySelector("#copyWallet");

const wallet =
    document.querySelector("#walletAddress");

if (copyButton && wallet) {

    copyButton.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                wallet.textContent.trim()
            );

            copyButton.textContent = "Copied ✓";

            showToast("Wallet address copied");

            setTimeout(() => {

                copyButton.textContent = "Copy Wallet";

            }, 2000);

        }

        catch (error) {

            console.error(error);

            showToast("Copy failed");

        }

    });

}

/* ================================
   Synchronization Time
================================ */

const sync =
    document.querySelector("#syncTime");

function updateTime() {

    if (sync) {

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
   Security Score Animation
================================ */

const security =
    document.querySelector(".security");

if (security) {

    let score = 0;

    const target = 98;

    const animation = setInterval(() => {

        score++;

        security.textContent =
            score + "%";

        if (score >= target) {

            clearInterval(animation);

        }

    }, 18);

}

/* ================================
   Premium Card Glow
================================ */

const cards =
    document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

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

    card.addEventListener("mouseleave", () => {

        card.style.background =
            "rgba(255,255,255,.08)";

    });

});

/* ================================
   Status Pulse
================================ */

const status =
    document.querySelector(".status");

if (status) {

    setInterval(() => {

        status.style.transform =
            "scale(1.03)";

        setTimeout(() => {

            status.style.transform =
                "scale(1)";

        }, 300);

    }, 3000);

}

/* ================================
   Page Loaded
================================ */

window.addEventListener("load", () => {

    document.body.classList.add("ready");

});
/* ===================================
   Bitcoin Vault Dashboard
   Part 2
   Language + Login System
=================================== */

/* ================================
   English / Italian Translator
================================ */

const languageBtn =
    document.querySelector("#languageBtn");

let italianMode = false;

if (languageBtn) {

    languageBtn.addEventListener("click", () => {

        italianMode = !italianMode;

        document
            .querySelectorAll("[data-en]")
            .forEach(element => {

                element.textContent =
                    italianMode
                        ? element.dataset.it
                        : element.dataset.en;

            });

        languageBtn.textContent =
            italianMode
                ? "🇬🇧 English"
                : "🇮🇹 Italiano";

    });

}

/* ================================
   Private Login
================================ */

const privateEmail =
    "viscas76@libero.it".toLowerCase();

const privatePassword =
    "DerviscCamporesi";

const loginScreen =
    document.querySelector("#loginScreen");

const loginButton =
    document.querySelector("#loginButton");

const loginMessage =
    document.querySelector("#loginMessage");

const emailInput =
    document.querySelector("#loginEmail");

const passwordInput =
    document.querySelector("#loginPassword");

/* ================================
   Restore Previous Login
================================ */

if (localStorage.getItem("vaultLogin") === "true") {

    document.body.classList.add("logged-in");

}

/* ================================
   Login Function
================================ */

function login() {

    const email =
        emailInput.value
        .trim()
        .toLowerCase();

    const password =
        passwordInput.value;

    if (
        email === privateEmail &&
        password === privatePassword
    ) {

        localStorage.setItem(
            "vaultLogin",
            "true"
        );

        document.body.classList.add(
            "logged-in"
        );

        loginMessage.textContent = "";

    }

    else {

        loginMessage.textContent =
            "Incorrect email or password";

        loginMessage.style.color =
            "#ff5b5b";

    }

}

/* ================================
   Login Button
================================ */

if (loginButton) {

    loginButton.addEventListener(
        "click",
        login
    );

}

/* ================================
   Press ENTER to Login
================================ */

if (passwordInput) {

    passwordInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                login();

            }

        }
    );

}

if (emailInput) {

    emailInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                login();

            }

        }
    );

}

/* ================================
   Optional Logout
================================ */

function logout() {

    localStorage.removeItem(
        "vaultLogin"
    );

    document.body.classList.remove(
        "logged-in"
    );

    if (emailInput) emailInput.value = "";
    if (passwordInput) passwordInput.value = "";

}
