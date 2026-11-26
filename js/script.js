/*=====================================================
            AROMA HAVEN COFFEE
            SCRIPT.JS
======================================================*/

/*==========================================
            LOADER
==========================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1800);

});

/*==========================================
            AOS INITIALIZATION
==========================================*/

AOS.init({

    duration:1000,

    once:true,

    offset:100

});

/*==========================================
            MOBILE MENU
==========================================*/

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

/*==========================================
        CLOSE MENU AFTER CLICK
==========================================*/

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

/*==========================================
        SMOOTH SCROLL
==========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/*==========================================
            ACTIVE NAVIGATION
==========================================*/

const sections=document.querySelectorAll("section");

const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        const sectionHeight=section.clientHeight;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});

/*==========================================
        BACK TO TOP BUTTON
==========================================*/

const backTop=document.querySelector(".back-top");

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        backTop.style.display="flex";

    }

    else{

        backTop.style.display="none";

    }

});
/*=====================================================
            DARK / LIGHT MODE
======================================================*/

const themeBtn=document.getElementById("theme-toggle");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    const icon=themeBtn.querySelector("i");

    if(document.body.classList.contains("dark-mode")){

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

        localStorage.setItem("theme","dark");

    }

    else{

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

        localStorage.setItem("theme","light");

    }

});

/* Load Saved Theme */

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark-mode");

    const icon=themeBtn.querySelector("i");

    icon.classList.remove("fa-moon");

    icon.classList.add("fa-sun");

}

/*=====================================================
            BACKGROUND MUSIC
======================================================*/

const music=document.getElementById("coffeeMusic");

const musicBtn = document.getElementById("music-btn");
let isPlaying=false;

musicBtn.addEventListener("click",()=>{

    if(isPlaying){

        music.pause();

        musicBtn.innerHTML='<i class="fa-solid fa-music"></i>';

    }

    else{

        music.play();

        musicBtn.innerHTML='<i class="fa-solid fa-volume-high"></i>';

    }

    isPlaying=!isPlaying;

});

/*=====================================================
            COUNTER ANIMATION
======================================================*/

const counters=document.querySelectorAll(".counter");

const counterObserver=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter=entry.target;

            const target=+counter.dataset.target;

            let count=0;

            const speed=target/120;

            const updateCounter=()=>{

                if(count<target){

                    count+=speed;

                    counter.innerText=Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                }

                else{

                    counter.innerText=target;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/*=====================================================
            NAVBAR SHADOW
======================================================*/

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        navbar.style.background="rgba(20,20,20,.90)";

        navbar.style.boxShadow="0 10px 30px rgba(0,0,0,.25)";

    }

    else{

        navbar.style.background="rgba(30,30,30,.45)";

        navbar.style.boxShadow="none";

    }

});

/*=====================================================
            REVEAL ELEMENTS
======================================================*/

const revealElements=document.querySelectorAll(

".menu-card,.offer-card,.gallery-item,.team-card,.review-card"

);

const revealObserver=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("fade-up");

        }

    });

});

revealElements.forEach(element=>{

    revealObserver.observe(element);

});
/*=====================================================
            SCROLL PROGRESS BAR
======================================================*/

const progressBar=document.createElement("div");

progressBar.style.position="fixed";

progressBar.style.top="0";

progressBar.style.left="0";

progressBar.style.height="4px";

progressBar.style.width="0%";

progressBar.style.background="#C68B59";

progressBar.style.zIndex="99999";

progressBar.style.transition="width .15s linear";

document.body.appendChild(progressBar);

window.addEventListener("scroll",()=>{

    const scrollTop=document.documentElement.scrollTop;

    const scrollHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;

    const progress=(scrollTop/scrollHeight)*100;

    progressBar.style.width=progress+"%";

});

/*=====================================================
            BUTTON RIPPLE
======================================================*/

document.querySelectorAll(".btn,.order-btn,.filter-btn").forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        ripple.style.left=(e.clientX-rect.left)+"px";

        ripple.style.top=(e.clientY-rect.top)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },1000);

    });

});

/*=====================================================
            PARALLAX HOME IMAGE
======================================================*/

const heroImage=document.querySelector(".home-image");

window.addEventListener("mousemove",(e)=>{

    if(heroImage){

        const x=(window.innerWidth/2-e.clientX)/40;

        const y=(window.innerHeight/2-e.clientY)/40;

        heroImage.style.transform=

        `translate(${x}px,${y}px)`;

    }

});

/*=====================================================
            PREVENT EMPTY FORMS
======================================================*/


document.querySelectorAll("form").forEach(form => {

    // Skip the order form because it has its own API handler
    if (form.id === "orderForm" || form.id === "reviewForm") return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        alert("☕ Thank you! Your feedback has been received successfully.");

        form.reset();
    });

});


/*=====================================================
            FOOTER YEAR
======================================================*/

const copyright=document.querySelector(".copyright");

if(copyright){

    copyright.innerHTML=

    `© ${new Date().getFullYear()} Aroma Haven Coffee. All Rights Reserved.`;

}

/*=====================================================
            CONSOLE MESSAGE
======================================================*/

console.log("%c☕ Welcome to Aroma Haven Coffee ☕",

"color:#C68B59;font-size:20px;font-weight:bold;");

console.log("%cDesigned with ❤️ and lots of coffee!",

"color:#5C3D2E;font-size:15px;");

/*=====================================================
            WEBSITE READY
======================================================*/

window.addEventListener("load",()=>{

    console.log("Website Loaded Successfully.");

});
// ==========================================
//       CUSTOMER WELCOME
// ==========================================

const customerName = localStorage.getItem("customerName");

const welcomeUser = document.getElementById("welcomeUser");

if (customerName && welcomeUser) {

    welcomeUser.textContent =
        "☕ WELCOME, " + customerName + "!";

}

// ==========================================
// AROMA HAVEN - ORDER POPUP
// ==========================================

const orderModal = document.getElementById("orderModal");
const orderProduct = document.getElementById("orderProduct");
const orderQuantity = document.getElementById("orderQuantity");
const orderTotal = document.getElementById("orderTotal");
const closeOrder = document.getElementById("closeOrder");

let selectedPrice = 0;

// Open popup when clicking Order Now
document.querySelectorAll(".order-btn").forEach(button => {
    button.addEventListener("click", () => {

        const menuCard = button.closest(".menu-card");

        const productName = menuCard.querySelector("h3").textContent.trim();

        const priceText = menuCard.querySelector(".price").textContent;
        selectedPrice = Number(priceText.replace(/[^\d]/g, ""));

        orderProduct.value = productName;
        orderQuantity.value = 1;

        orderTotal.textContent = "Total: ₹" + selectedPrice;

        orderModal.style.display = "flex";
    });
});

// Update total when quantity changes
orderQuantity.addEventListener("input", () => {

    let quantity = Number(orderQuantity.value);

    orderTotal.textContent = "Total: ₹" + (selectedPrice * quantity);
});

// Close popup
closeOrder.addEventListener("click", () => {
    orderModal.style.display = "none";
});

// Close popup when clicking outside
orderModal.addEventListener("click", (event) => {
    if (event.target === orderModal) {
        orderModal.style.display = "none";
    }
});

// ==========================================
// SAVE CUSTOMER ORDER IN MONGODB
// ==========================================

const orderForm = document.getElementById("orderForm");
const orderMessage = document.getElementById("orderMessage");

orderForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const orderData = {
        name: document.getElementById("orderName").value.trim(),
        phone: document.getElementById("orderPhone").value.trim(),
        product: orderProduct.value,
        quantity: Number(orderQuantity.value)
    };

    orderMessage.textContent = "Placing your order...";

    try {

        const response = await fetch("https://aroma-haven-coffee.onrender.com/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Order failed");
        }

        orderMessage.textContent =
            "☕ " + result.message + " Total: ₹" + result.total;

        orderMessage.style.color = "green";

        orderForm.reset();
        orderQuantity.value = 1;

    } catch (error) {

        orderMessage.textContent =
            "❌ " + error.message;

        orderMessage.style.color = "red";
    }
});


// ==========================================
// AROMA HAVEN - CUSTOMER REVIEWS API
// ==========================================

const reviewForm = document.getElementById("reviewForm");
const reviewMessage = document.getElementById("reviewMessage");

reviewForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const reviewData = {
        name: document.getElementById("reviewName").value.trim(),
        emoji: document.getElementById("reviewEmoji").value,
        rating: Number(document.getElementById("reviewRating").value),
        review: document.getElementById("reviewText").value.trim()
    };

    reviewMessage.textContent = "Submitting your review...";

    try {

        const response = await fetch("https://aroma-haven-coffee.onrender.com/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Review submission failed");
        }

        reviewMessage.textContent = "❤️ " + result.message;
        reviewMessage.style.color = "green";

        reviewForm.reset();

    } catch (error) {

        reviewMessage.textContent = "❌ " + error.message;
        reviewMessage.style.color = "red";

    }

});
