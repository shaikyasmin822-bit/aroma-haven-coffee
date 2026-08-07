/*=====================================================
            AROMA HAVEN COFFEE
                MENU.JS
======================================================*/

/*==========================================
            MENU FILTER
==========================================*/

const filterButtons=document.querySelectorAll(".filter-btn");

const menuCards=document.querySelectorAll(".menu-card");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter=button.dataset.filter;

        menuCards.forEach(card=>{

            if(filter==="all"){

                card.style.display="block";

                setTimeout(()=>{

                    card.style.opacity="1";

                    card.style.transform="scale(1)";

                },100);

            }

            else if(card.classList.contains(filter)){

                card.style.display="block";

                setTimeout(()=>{

                    card.style.opacity="1";

                    card.style.transform="scale(1)";

                },100);

            }

            else{

                card.style.opacity="0";

                card.style.transform="scale(.8)";

                setTimeout(()=>{

                    card.style.display="none";

                },300);

            }

        });

    });

});

/*==========================================
            LIVE SEARCH
==========================================*/

const searchInput=document.getElementById("searchCoffee");

searchInput.addEventListener("keyup",()=>{

    const searchValue=searchInput.value.toLowerCase();

    let found=false;

    menuCards.forEach(card=>{

        const coffeeName=

        card.querySelector("h3").textContent.toLowerCase();

        if(coffeeName.includes(searchValue)){

            card.style.display="block";

            card.style.opacity="1";

            card.style.transform="scale(1)";

            found=true;

        }

        else{

            card.style.display="none";

        }

    });

    let noResult=document.getElementById("no-result");

    if(!noResult){

        noResult=document.createElement("h2");

        noResult.id="no-result";

        noResult.style.textAlign="center";

        noResult.style.marginTop="40px";

        noResult.style.color="#5C3D2E";

        noResult.style.fontFamily="Poppins";

        noResult.innerHTML="☕ No Coffee Found";

        document.querySelector(".menu").appendChild(noResult);

    }

    noResult.style.display=found?"none":"block";

});

/*==========================================
        MENU CARD HOVER SOUND
==========================================*/

menuCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transition=".4s";

        card.style.transform="translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0) scale(1)";

    });

});

/*==========================================
            ORDER BUTTON
==========================================*/

document.querySelectorAll(".order-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        button.innerHTML="☕ Preparing...";

        button.disabled=true;

        setTimeout(()=>{

            button.innerHTML="✅ Ready!";

        },2000);

        setTimeout(()=>{

            button.innerHTML="Order Now";

            button.disabled=false;

        },4000);

    });

});
/*=====================================================
            FAVORITE COFFEE SYSTEM
======================================================*/

document.querySelectorAll(".favorite-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        button.classList.toggle("active");

        if(button.classList.contains("active")){

            button.innerHTML='<i class="fa-solid fa-heart"></i>';

            button.style.color="#ff3b5c";

        }

        else{

            button.innerHTML='<i class="fa-regular fa-heart"></i>';

            button.style.color="";

        }

    });

});

/*=====================================================
            RANDOM COFFEE SUGGESTION
======================================================*/

const coffeeNames=[

"Espresso",

"Cappuccino",

"Latte",

"Mocha",

"Americano",

"Flat White",

"Macchiato",

"Cold Brew",

"Irish Coffee",

"Affogato",

"Caramel Latte",

"Vanilla Latte",

"Hazelnut Coffee",

"Iced Mocha",

"Chocolate Frappe",

"Matcha Latte",

"Turkish Coffee",

"Black Coffee",

"Cafe Au Lait",

"Spanish Latte"

];

const randomButton=document.getElementById("randomCoffee");

if(randomButton){

    randomButton.addEventListener("click",()=>{

        const random=

        coffeeNames[Math.floor(Math.random()*coffeeNames.length)];

        alert("☕ Today's Recommendation:\n\n"+random);

    });

}

/*=====================================================
            RESET SEARCH
======================================================*/

const searchBox=document.getElementById("searchCoffee");

if(searchBox){

    searchBox.addEventListener("search",()=>{

        menuCards.forEach(card=>{

            card.style.display="block";

            card.style.opacity="1";

            card.style.transform="scale(1)";

        });

    });

}

/*=====================================================
            MENU CARD ENTRANCE
======================================================*/

window.addEventListener("load",()=>{

    menuCards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(40px)";

        setTimeout(()=>{

            card.style.transition=".6s ease";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*120);

    });

});

/*=====================================================
            QUICK VIEW EFFECT
======================================================*/

menuCards.forEach(card=>{

    card.addEventListener("dblclick",()=>{

        card.classList.toggle("zoom-card");

    });

});

/*=====================================================
            MENU STATISTICS
======================================================*/

console.log("☕ Total Coffee Items :",menuCards.length);

/*=====================================================
            MENU READY
======================================================*/

console.log("Interactive Menu Loaded Successfully.");