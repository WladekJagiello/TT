import{P as C,f as k,s as f,c as I,N as b}from"./give-rating-490f7cde.js";const w=document.querySelector(".favorites-list"),L=document.querySelector(".favorites-zero"),M=document.querySelector(".tags-list");let i=JSON.parse(localStorage.getItem("element_data"))||[];const E=window.innerWidth<768?9:12;let m={},h=[];async function S(){const c=(v.getCurrentPage()-1)*E,p=i.slice(c,c+E).map(async e=>await k(e)),n=await Promise.all(p);n.forEach(({_id:e,tags:a})=>{a.forEach(u=>{m[u]?m[u].push(e):m[u]=[e]})}),h=new Set,n.forEach(({tags:e})=>{e.forEach(a=>{!i.includes(a)&&a!==""&&h.add(a)})});const l=Array.from(h).map(e=>`<li class="tags-item">
              <button class="favorites-tags" type="button" data-tag="${e}">
                ${e}
              </button>
            </li>`).join("");M.innerHTML=l,A(n)}async function B(c){const g=m[c]||[],n=i.filter(e=>g.includes(e)).map(async e=>await k(e)),l=await Promise.all(n);A(l)}function A(c){w.innerHTML="";const g=c.map(({_id:t,title:r,rating:s,preview:y,description:N})=>{const q=Array(5).fill().map((x,$)=>{let d=Math.floor(s);const P=s-d!==0?s-d+.4:s-d,o=window.innerWidth<768?16:window.innerWidth<1200?12:14;return $<d?`<svg class="star-icon-active star" width="${o}" height="${o}">
                          <use href="${f}#star" style="fill: rgba(238, 161, 12, 1)"></use>
                        </svg>`:$===d&&P!==0?`<svg class="star-icon-part star" width="${o}" height="${o}">
                          <use href="${f}#star" style="fill: rgb(238, 161, 12); opacity: ${P};"></use>
                        </svg>`:`<svg class="star-icon star" width="${o}" height="${o}">
                          <use href="${f}#star"></use>
                        </svg>`}).join("");return`
          <li class="card-recipe" id="${t}" style="background-image: linear-gradient(rgba(5, 5, 5, 0.3), rgba(5, 5, 5, 0.3)), url(${y})">
            <svg class="heart-icon remuve" id="${t}" width="22" height="22">
              <use href="${f}#heart"></use>
            </svg>
            <h3 class="card-recipe-title">${r}</h3>
            <p class="card-recipe-description">${N}</p>
            <div class="recipe-block">
              <div class="rating-block">
                <span class="rating-recipe">${s}</span>
                ${q}
              </div>
              <button class="recipe-button see-recipe" id="${t}" type="button">
                See recipe
              </button>
            </div>
          </li>
        `}).join("");w.insertAdjacentHTML("beforeend",g);const p=document.querySelectorAll(".see-recipe");let n=!1;p.forEach(function(t){t.addEventListener("click",function(){if(!n){n=!0;const r=t.getAttribute("id");I(r),setTimeout(function(){n=!1},0)}})});const l=document.querySelector(".see-backdrop");document.querySelectorAll(".remuve").forEach(t=>{t.addEventListener("click",function(){const r=t.getAttribute("id"),s=i.indexOf(r);b.Confirm.show("CHANGE YOUR MIND!","Remove recipe from collection?","Yes","No",function(){s!==-1&&(i.splice(s,1),localStorage.setItem("element_data",JSON.stringify(i)),v.reset(i.length),l.classList.remove("active"),document.body.style.overflow="",S()),b.Notify.success("Slava Ukraine!")},function(){b.Notify.success("Slava Ukraine!")},{width:"335px",borderRadius:"15px"})})});const a=document.querySelector(".favorites-hero-mobile");w.innerHTML===""?(a.classList.remove("active"),L.classList.remove("active")):(a.classList.add("active"),L.classList.add("active"));const u=document.querySelector(".pagination-wrapper");(c.length<10||i.length<10||window.innerWidth>768&&i.length<13)&&(u.style.opacity="0"),document.querySelectorAll(".favorites-tags").forEach(function(t){t.addEventListener("click",function(){const r=t.getAttribute("data-tag");v.reset(),B(r)})}),h.forEach((t,r)=>{const s=document.querySelector(`button[data-tag="${r}"]`);t.length===0?s.classList.add("inactive-tag"):s.classList.remove("inactive-tag")})}const v=new C("pagination",{totalItems:i.length,itemsPerPage:E,visiblePages:window.innerWidth<768?2:3,page:1,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn btn-move tui-{{type}}"></a >',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}});v.on("afterMove",c=>{S()});S();
