import{P as C,f as k,s as p,N as b,c as I}from"./give-rating-b5cca4a3.js";const P=document.querySelector(".favorites-hero-mobile"),y=document.querySelector(".favorites-list"),L=document.querySelector(".favorites-zero"),M=document.querySelector(".tags-list");let a=JSON.parse(localStorage.getItem("element_data"))||[];const w=window.innerWidth<768?9:12;let f={},h=[];async function E(){const n=(m.getCurrentPage()-1)*w,g=a.slice(n,n+w).map(async t=>await k(t)),c=await Promise.all(g);c.forEach(({_id:t,tags:r})=>{r.forEach(e=>{f[e]?f[e].push(t):f[e]=[t]})}),h=new Set,c.forEach(({tags:t})=>{t.forEach(r=>{!a.includes(r)&&r!==""&&h.add(r)})});const l=Array.from(h).map(t=>`<li class="tags-item">
              <button class="favorites-tags" type="button" data-tag="${t}">
                ${t}
              </button>
            </li>`).join("");M.innerHTML=l,A(c)}async function x(n){const u=f[n]||[],c=a.filter(t=>u.includes(t)).map(async t=>await k(t)),l=await Promise.all(c);A(l)}function A(n){y.innerHTML="";const u=n.map(({_id:e,title:i,rating:s,preview:v,description:N})=>{const q=Array(5).fill().map((B,S)=>{let d=Math.floor(s);const $=s-d!==0?s-d+.4:s-d,o=window.innerWidth<768?16:window.innerWidth<1200?12:14;return S<d?`<svg class="star-icon-active star" width="${o}" height="${o}">
                          <use href="${p}#star" style="fill: rgba(238, 161, 12, 1)"></use>
                        </svg>`:S===d&&$!==0?`<svg class="star-icon-part star" width="${o}" height="${o}">
                          <use href="${p}#star" style="fill: rgb(238, 161, 12); opacity: ${$};"></use>
                        </svg>`:`<svg class="star-icon star" width="${o}" height="${o}">
                          <use href="${p}#star"></use>
                        </svg>`}).join("");return`
          <li class="card-recipe" id="${e}" style="background-image: linear-gradient(rgba(5, 5, 5, 0.3), rgba(5, 5, 5, 0.3)), url(${v})">
            <svg class="heart-icon remuve" id="${e}" width="22" height="22">
              <use href="${p}#heart"></use>
            </svg>
            <h3 class="card-recipe-title">${i}</h3>
            <p class="card-recipe-description">${N}</p>
            <div class="recipe-block">
              <div class="rating-block">
                <span class="rating-recipe">${s}</span>
                ${q}
              </div>
              <button class="recipe-button see-recipe" id="${e}" type="button">
                See recipe
              </button>
            </div>
          </li>
        `}).join("");y.insertAdjacentHTML("beforeend",u);const g=document.querySelector(".see-backdrop");document.querySelectorAll(".remuve").forEach(e=>{e.addEventListener("click",function(){const i=e.getAttribute("id"),s=a.indexOf(i);b.Confirm.show("CHANGE YOUR MIND!","Remove recipe from collection?","Yes","No",function(){s!==-1&&(a.splice(s,1),localStorage.setItem("element_data",JSON.stringify(a)),m.reset(a.length),g.classList.remove("active"),document.body.style.overflow="",E()),b.Notify.success("Slava Ukraine!")},function(){b.Notify.success("Slava Ukraine!")},{width:"335px",borderRadius:"15px"})})}),y.innerHTML===""?(P.classList.remove("active"),L.classList.remove("active")):(P.classList.add("active"),L.classList.add("active"));const l=document.querySelector(".pagination-wrapper");(n.length<10||a.length<10||window.innerWidth>768&&a.length<13)&&(l.style.opacity="0"),document.querySelectorAll(".see-recipe").forEach(function(e){e.addEventListener("click",function(){const i=e.getAttribute("id");I(i)})}),document.querySelectorAll(".favorites-tags").forEach(function(e){e.addEventListener("click",function(){const i=e.getAttribute("data-tag");m.reset(),x(i)})}),h.forEach((e,i)=>{const s=document.querySelector(`button[data-tag="${i}"]`);e.length===0?s.classList.add("inactive-tag"):s.classList.remove("inactive-tag")})}const m=new C("pagination",{totalItems:a.length,itemsPerPage:w,visiblePages:window.innerWidth<768?2:3,page:1,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn btn-move tui-{{type}}"></a >',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}});m.on("afterMove",n=>{E()});E();
