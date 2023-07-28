import{P as x,f as L,s as v,c as I,N as w}from"./give-rating-490f7cde.js";const $=document.querySelector(".favorites-list"),r=JSON.parse(localStorage.getItem("element_data"))||[],S=window.innerWidth<768?9:12;let n=!1,E={},h;async function y(){const a=(m.getCurrentPage()-1)*S,p=r.slice(a,a+S).map(async e=>await L(e)),c=await Promise.all(p);h=r.length,k(c,h)}async function M(){const a=document.querySelector(".favor-tags-list"),l=r.map(async e=>await L(e));E=(await Promise.all(l)).reduce((e,{_id:s,tags:f})=>(f.forEach(i=>{i!==""&&!e[i]?e[i]=[s]:i!==""&&!e[i].includes(s)&&e[i].push(s)}),e),{});const c=Object.keys(E).sort().map(e=>`<li class="tags-item">
          <button class="favorites-tags" type="button" data-tag="${e}">
            ${e}
          </button>
        </li>`).join("");a.innerHTML+=c}async function D(a){const l=E[a]||[],c=r.filter(s=>l.includes(s)).map(async s=>await L(s)),e=await Promise.all(c);h=e.length,k(e,h)}function k(a,l){$.innerHTML="";const p=a.map(({_id:t,title:d,rating:o,preview:b,description:q})=>{const C=Array(5).fill().map((j,A)=>{let g=Math.floor(o);const T=o-g!==0?o-g+.4:o-g,u=window.innerWidth<768?16:window.innerWidth<1200?12:14;return A<g?`<svg class="star-icon-active star" width="${u}" height="${u}">
                          <use href="${v}#star" style="fill: rgba(238, 161, 12, 1)"></use>
                        </svg>`:A===g&&T!==0?`<svg class="star-icon-part star" width="${u}" height="${u}">
                          <use href="${v}#star" style="fill: rgb(238, 161, 12); opacity: ${T};"></use>
                        </svg>`:`<svg class="star-icon star" width="${u}" height="${u}">
                          <use href="${v}#star"></use>
                        </svg>`}).join("");return`
          <li class="card-recipe" id="${t}" style="background-image: linear-gradient(rgba(5, 5, 5, 0.3), rgba(5, 5, 5, 0.3)), url(${b})">
            <svg class="heart-icon remuve" id="${t}" width="22" height="22">
              <use href="${v}#heart"></use>
            </svg>
            <h3 class="card-recipe-title">${d}</h3>
            <p class="card-recipe-description">${q}</p>
            <div class="recipe-block">
              <div class="rating-block">
                <span class="rating-recipe">${o}</span>
                ${C}
              </div>
              <button class="recipe-button see-recipe" id="${t}" type="button">
                See recipe
              </button>
            </div>
          </li>
        `}).join("");$.insertAdjacentHTML("beforeend",p);const c=document.querySelector(".hero"),e=document.querySelector(".favorites-zero"),s=document.querySelector(".all-tags");$.innerHTML===""?(c.classList.remove("active"),e.classList.add("active"),s.style.display="none"):(c.classList.add("active"),e.classList.remove("active"),s.display="flex");const f=document.querySelector(".pagination-wrapper");window.innerWidth<768&&l<10||window.innerWidth>768&&l<13?f.style.display="none":f.style.display="flex";const i=document.querySelectorAll(".favorites-tags");i.forEach(function(t){t.addEventListener("click",function(){if(!n){if(n=!0,t.classList.contains("all-tags"))P(),t.classList.add("active"),m.reset(),y();else{const d=t.getAttribute("data-tag");P(),t.classList.add("active"),m.reset(),D(d)}setTimeout(function(){n=!1},250)}})});function P(){i.forEach(t=>{t.classList.remove("active")})}document.querySelectorAll(".see-recipe").forEach(function(t){t.addEventListener("click",function(){if(!n){n=!0;const d=t.getAttribute("id");I(d)}setTimeout(function(){n=!1},250)})});const N=document.querySelector(".see-backdrop");document.querySelectorAll(".remuve").forEach(t=>{t.addEventListener("click",function(){if(!n){n=!0;const d=t.getAttribute("id"),o=r.indexOf(d);w.Confirm.show("CHANGE YOUR MIND!","Remove recipe from collection?","Yes","No",function(){o!==-1&&(r.splice(o,1),localStorage.setItem("element_data",JSON.stringify(r)),m.reset(r.length),N.classList.remove("active"),document.body.style.overflow="",y()),w.Notify.success("Slava Ukraine!")},function(){w.Notify.success("Slava Ukraine!")},{width:"335px",borderRadius:"15px"})}setTimeout(function(){n=!1},250)})})}const m=new x("pagination",{totalItems:r.length,itemsPerPage:S,visiblePages:window.innerWidth<768?2:3,page:1,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn btn-move tui-{{type}}"></a >',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}});m.on("afterMove",a=>{y()});M();y();
