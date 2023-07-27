import{P as I,f as k,s as h,c as M,N as S}from"./give-rating-490f7cde.js";const $=document.querySelector(".favorites-list"),x=document.querySelector(".favor-tags-list"),i=JSON.parse(localStorage.getItem("element_data"))||[],E=window.innerWidth<768?9:12;let m={},v=[];async function y(){const n=(f.getCurrentPage()-1)*E,p=i.slice(n,n+E).map(async t=>await k(t)),r=await Promise.all(p);r.forEach(({_id:t,tags:a})=>{a.forEach(o=>{m[o]?m[o].push(t):m[o]=[t]})}),v=new Set,r.forEach(({tags:t})=>{t.forEach(a=>{!i.includes(a)&&a!==""&&v.add(a)})});const u=Array.from(v).map(t=>`<li class="tags-item">
              <button class="favorites-tags" type="button" data-tag="${t}">
                ${t}
              </button>
            </li>`).join("");x.innerHTML+=u,A(r)}async function B(n){const g=m[n]||[],r=i.filter(t=>g.includes(t)).map(async t=>await k(t)),u=await Promise.all(r);A(u)}function A(n){$.innerHTML="";const g=n.map(({_id:e,title:c,rating:s,preview:w,description:q})=>{const T=Array(5).fill().map((D,L)=>{let d=Math.floor(s);const P=s-d!==0?s-d+.4:s-d,l=window.innerWidth<768?16:window.innerWidth<1200?12:14;return L<d?`<svg class="star-icon-active star" width="${l}" height="${l}">
                          <use href="${h}#star" style="fill: rgba(238, 161, 12, 1)"></use>
                        </svg>`:L===d&&P!==0?`<svg class="star-icon-part star" width="${l}" height="${l}">
                          <use href="${h}#star" style="fill: rgb(238, 161, 12); opacity: ${P};"></use>
                        </svg>`:`<svg class="star-icon star" width="${l}" height="${l}">
                          <use href="${h}#star"></use>
                        </svg>`}).join("");return`
          <li class="card-recipe" id="${e}" style="background-image: linear-gradient(rgba(5, 5, 5, 0.3), rgba(5, 5, 5, 0.3)), url(${w})">
            <svg class="heart-icon remuve" id="${e}" width="22" height="22">
              <use href="${h}#heart"></use>
            </svg>
            <h3 class="card-recipe-title">${c}</h3>
            <p class="card-recipe-description">${q}</p>
            <div class="recipe-block">
              <div class="rating-block">
                <span class="rating-recipe">${s}</span>
                ${T}
              </div>
              <button class="recipe-button see-recipe" id="${e}" type="button">
                See recipe
              </button>
            </div>
          </li>
        `}).join("");$.insertAdjacentHTML("beforeend",g);const p=document.querySelectorAll(".see-recipe");let r=!1;p.forEach(function(e){e.addEventListener("click",function(){if(!r){r=!0;const c=e.getAttribute("id");M(c),setTimeout(function(){r=!1},250)}})});const u=document.querySelector(".see-backdrop");document.querySelectorAll(".remuve").forEach(e=>{e.addEventListener("click",function(){const c=e.getAttribute("id"),s=i.indexOf(c);S.Confirm.show("CHANGE YOUR MIND!","Remove recipe from collection?","Yes","No",function(){s!==-1&&(i.splice(s,1),localStorage.setItem("element_data",JSON.stringify(i)),f.reset(i.length),u.classList.remove("active"),document.body.style.overflow="",y()),S.Notify.success("Slava Ukraine!")},function(){S.Notify.success("Slava Ukraine!")},{width:"335px",borderRadius:"15px"})})});const a=document.querySelector(".favorites-hero"),o=document.querySelector(".favorites-zero");$.innerHTML===""?(a.classList.remove("active"),o.classList.add("active")):(a.classList.add("active"),o.classList.remove("active"));const C=document.querySelector(".pagination-wrapper");(n.length<9||i.length<9||window.innerWidth>768&&i.length<12&&n.length<12)&&(C.style.display="none");const N=document.querySelectorAll(".favorites-tags");let b=!1;N.forEach(function(e){e.addEventListener("click",function(){if(!b){if(b=!0,e.classList.contains("all-tags"))f.reset(),y();else{const c=e.getAttribute("data-tag");f.reset(),B(c)}setTimeout(function(){b=!1},250)}})}),v.forEach((e,c)=>{const s=document.querySelector(`button[data-tag="${c}"]`);e.length===0?s.classList.add("inactive-tag"):s.classList.remove("inactive-tag")})}const f=new I("pagination",{totalItems:i.length,itemsPerPage:E,visiblePages:window.innerWidth<768?2:3,page:1,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn btn-move tui-{{type}}"></a >',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}});f.on("afterMove",n=>{y()});y();
