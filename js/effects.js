/*=====================================================
            AROMA HAVEN COFFEE
            EFFECTS.JS
======================================================*/

/*==========================================
        PREMIUM COFFEE BLAST
==========================================*/

const blastButtons=document.querySelectorAll(

".btn,.order-btn,.filter-btn,.blast-btn"

);

blastButtons.forEach(button=>{

    button.addEventListener("click",(e)=>{

        createCoffeeBlast(e,button);

    });

});

function createCoffeeBlast(event,button){

    const rect=button.getBoundingClientRect();

    const x=event.clientX-rect.left;

    const y=event.clientY-rect.top;

    /* Coffee Splash */

    const blast=document.createElement("div");

    blast.className="blast";

    blast.style.left=x+"px";

    blast.style.top=y+"px";

    button.appendChild(blast);

    /* Ripple */

    const ripple=document.createElement("div");

    ripple.className="ripple";

    ripple.style.left=(x-10)+"px";

    ripple.style.top=(y-10)+"px";

    button.appendChild(ripple);

    /* Steam Burst */

    for(let i=0;i<3;i++){

        const steam=document.createElement("div");

        steam.className="steam-burst";

        steam.style.left=(x+(Math.random()*20-10))+"px";

        steam.style.top=y+"px";

        steam.style.animationDelay=(i*0.12)+"s";

        button.appendChild(steam);

        setTimeout(()=>{

            steam.remove();

        },1300);

    }

    /* Flying Coffee Beans */

    for(let i=0;i<8;i++){

        const bean=document.createElement("div");

        bean.className="bean-piece";

        bean.style.left=x+"px";

        bean.style.top=y+"px";

        bean.style.setProperty("--x",

        (Math.random()*180-90)+"px");

        bean.style.setProperty("--y",

        (Math.random()*180-90)+"px");

        button.appendChild(bean);

        setTimeout(()=>{

            bean.remove();

        },1400);

    }

    /* Coffee Powder */

    for(let i=0;i<18;i++){

        const powder=document.createElement("div");

        powder.className="powder";

        powder.style.left=x+"px";

        powder.style.top=y+"px";

        powder.style.setProperty("--tx",

        (Math.random()*260-130)+"px");

        powder.style.setProperty("--ty",

        (Math.random()*260-130)+"px");

        button.appendChild(powder);

        setTimeout(()=>{

            powder.remove();

        },1200);

    }

    /* Golden Sparks */

    for(let i=0;i<15;i++){

        const spark=document.createElement("div");

        spark.className="spark";

        spark.style.left=x+"px";

        spark.style.top=y+"px";

        spark.style.setProperty("--sx",

        (Math.random()*220-110)+"px");

        spark.style.setProperty("--sy",

        (Math.random()*220-110)+"px");

        button.appendChild(spark);

        setTimeout(()=>{

            spark.remove();

        },800);

    }

    setTimeout(()=>{

        blast.remove();

        ripple.remove();

    },1000);

}

/*==========================================
        BUTTON PRESS EFFECT
==========================================*/

blastButtons.forEach(button=>{

    button.addEventListener("mousedown",()=>{

        button.style.transform="scale(.95)";

    });

    button.addEventListener("mouseup",()=>{

        button.style.transform="scale(1)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="scale(1)";

    });

});
/*=====================================================
      BUTTON BLAST + DELAYED NAVIGATION
======================================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        const target=document.querySelector(this.getAttribute("href"));

        if(!target) return;

        e.preventDefault();

        // Coffee blast on the clicked button
        createCoffeeBlast(e,this);

        // Wait for blast to finish
        setTimeout(()=>{

            target.scrollIntoView({
                behavior:"smooth"
            });

        },900);

    });

});

/*=====================================================
            MOUSE COFFEE PARTICLES
======================================================*/

document.addEventListener("mousemove",(e)=>{

    if(Math.random()>0.35) return;

    const particle=document.createElement("div");

    particle.style.position="fixed";

    particle.style.left=e.clientX+"px";

    particle.style.top=e.clientY+"px";

    particle.style.width="6px";

    particle.style.height="6px";

    particle.style.borderRadius="50%";

    particle.style.background="#C68B59";

    particle.style.pointerEvents="none";

    particle.style.zIndex="9999";

    particle.style.transition="all .8s linear";

    document.body.appendChild(particle);

    requestAnimationFrame(()=>{

        particle.style.transform="translateY(-40px) scale(0)";

        particle.style.opacity="0";

    });

    setTimeout(()=>{

        particle.remove();

    },800);

});

/*=====================================================
            BUTTON GLOW
======================================================*/

blastButtons.forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.boxShadow="0 0 25px rgba(198,139,89,.6)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.boxShadow="";

    });

});

/*=====================================================
            COFFEE AROMA EFFECT
======================================================*/

setInterval(()=>{

    const aroma=document.createElement("div");

    aroma.style.position="fixed";

    aroma.style.left=Math.random()*window.innerWidth+"px";

    aroma.style.bottom="-20px";

    aroma.style.width="14px";

    aroma.style.height="14px";

    aroma.style.borderRadius="50%";

    aroma.style.background="rgba(255,255,255,.18)";

    aroma.style.filter="blur(8px)";

    aroma.style.pointerEvents="none";

    aroma.style.zIndex="3";

    aroma.style.transition="all 6s linear";

    document.body.appendChild(aroma);

    requestAnimationFrame(()=>{

        aroma.style.transform="translateY(-100vh) scale(2)";

        aroma.style.opacity="0";

    });

    setTimeout(()=>{

        aroma.remove();

    },6000);

},700);

/*=====================================================
            WEBSITE READY
======================================================*/

console.log("☕ Premium Coffee Effects Loaded Successfully!");