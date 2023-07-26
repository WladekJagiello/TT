import{P as I,f as k,s as f,c as M,N as y}from"./give-rating-1a93978e.js";const w=document.querySelector(".favorites-list"),L=document.querySelector(".favorites-zero"),B=document.querySelector(".tags-list");let a=JSON.parse(localStorage.getItem("element_data"))||[];const E=window.innerWidth<768?9:12;let p={},h=[];async function S(){const r=(m.getCurrentPage()-1)*E,v=a.slice(r,r+E).map(async t=>await k(t)),i=await Promise.all(v);i.forEach(({_id:t,tags:c})=>{c.forEach(o=>{p[o]?p[o].push(t):p[o]=[t]})}),h=new Set,i.forEach(({tags:t})=>{t.forEach(c=>{!a.includes(c)&&c!==""&&h.add(c)})});const u=Array.from(h).map(t=>`<li class="tags-item">
              <button class="favorites-tags" type="button" data-tag="${t}">
                ${t}
              </button>
            </li>`).join("");B.innerHTML=u,A(i)}async function T(r){const g=p[r]||[],i=a.filter(t=>g.includes(t)).map(async t=>await k(t)),u=await Promise.all(i);A(u)}function A(r){w.innerHTML="";const g=r.map(({_id:e,title:n,rating:s,preview:b,description:N})=>{const q=Array(5).fill().map((D,$)=>{let d=Math.floor(s);const P=s-d!==0?s-d+.4:s-d,l=window.innerWidth<768?16:window.innerWidth<1200?12:14;return $<d?`<svg class="star-icon-active star" width="${l}" height="${l}">
                          <use href="${f}#star" style="fill: rgba(238, 161, 12, 1)"></use>
                        </svg>`:$===d&&P!==0?`<svg class="star-icon-part star" width="${l}" height="${l}">
                          <use href="${f}#star" style="fill: rgb(238, 161, 12); opacity: ${P};"></use>
                        </svg>`:`<svg class="star-icon star" width="${l}" height="${l}">
                          <use href="${f}#star"></use>
                        </svg>`}).join("");return`
          <li class="card-recipe" id="${e}" style="background-image: linear-gradient(rgba(5, 5, 5, 0.3), rgba(5, 5, 5, 0.3)), url(${b})">
            <svg class="heart-icon remuve" id="${e}" width="22" height="22">
              <use href="${f}#heart"></use>
            </svg>
            <h3 class="card-recipe-title">${n}</h3>
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
        `}).join("");w.insertAdjacentHTML("beforeend",g),document.querySelectorAll(".see-recipe").forEach(function(e){e.addEventListener("click",function(){u(e)})});let i=!1;function u(e){if(!i){i=!0;const n=e.getAttribute("id");M(n),setTimeout(function(){i=!1},1e3)}}const t=document.querySelector(".see-backdrop");document.querySelectorAll(".remuve").forEach(e=>{e.addEventListener("click",function(){const n=e.getAttribute("id"),s=a.indexOf(n);y.Confirm.show("CHANGE YOUR MIND!","Remove recipe from collection?","Yes","No",function(){s!==-1&&(a.splice(s,1),localStorage.setItem("element_data",JSON.stringify(a)),m.reset(a.length),t.classList.remove("active"),document.body.style.overflow="",S()),y.Notify.success("Slava Ukraine!")},function(){y.Notify.success("Slava Ukraine!")},{width:"335px",borderRadius:"15px"})})});const o=document.querySelector(".favorites-hero-mobile");w.innerHTML===""?(o.classList.remove("active"),L.classList.remove("active")):(o.classList.add("active"),L.classList.add("active"));const C=document.querySelector(".pagination-wrapper");(r.length<10||a.length<10||window.innerWidth>768&&a.length<13)&&(C.style.opacity="0"),document.querySelectorAll(".favorites-tags").forEach(function(e){e.addEventListener("click",function(){const n=e.getAttribute("data-tag");m.reset(),T(n)})}),h.forEach((e,n)=>{const s=document.querySelector(`button[data-tag="${n}"]`);e.length===0?s.classList.add("inactive-tag"):s.classList.remove("inactive-tag")})}const m=new I("pagination",{totalItems:a.length,itemsPerPage:E,visiblePages:window.innerWidth<768?2:3,page:1,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn btn-move tui-{{type}}"></a >',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}});m.on("afterMove",r=>{S()});S();
