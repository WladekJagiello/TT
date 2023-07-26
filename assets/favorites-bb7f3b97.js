import{P as C,f as A,s as g,c as I,N as y}from"./see-recipe-a0e1229c.js";const $=document.querySelector(".favorites-hero-mobile"),x=document.querySelectorAll(".remove-favor"),P=document.querySelector(".favorites-list"),L=document.querySelector(".favorites-zero"),B=document.querySelector(".tags-list");let i=JSON.parse(localStorage.getItem("element_data"))||[];const b=window.innerWidth<768?9:12;let p={},m=[];async function E(){const n=(d.getCurrentPage()-1)*b,v=i.slice(n,n+b).map(async t=>await A(t)),o=await Promise.all(v);o.forEach(({_id:t,tags:r})=>{r.forEach(e=>{p[e]?p[e].push(t):p[e]=[t]})}),m=new Set,o.forEach(({tags:t})=>{t.forEach(r=>{!i.includes(r)&&r!==""&&m.add(r)})});const f=Array.from(m).map(t=>`<li class="tags-item">
              <button class="favorites-tags" type="button" data-tag="${t}">
                ${t}
              </button>
            </li>`).join("");B.innerHTML=f,N(o)}async function M(n){const u=p[n]||[],o=i.filter(t=>u.includes(t)).map(async t=>await A(t)),f=await Promise.all(o);N(f)}function N(n){const u=n.map(({_id:e,title:s,rating:a,preview:h,description:k})=>{const q=Array(5).fill().map((R,w)=>{let l=Math.floor(a);const S=a-l!==0?a-l+.4:a-l,c=window.innerWidth<768?16:window.innerWidth<1200?12:14;return w<l?`<svg class="star-icon-active star" width="${c}" height="${c}">
                          <use href="${g}#star" style="fill: rgba(238, 161, 12, 1)"></use>
                        </svg>`:w===l&&S!==0?`<svg class="star-icon-part star" width="${c}" height="${c}">
                          <use href="${g}#star" style="fill: rgb(238, 161, 12); opacity: ${S};"></use>
                        </svg>`:`<svg class="star-icon star" width="${c}" height="${c}">
                          <use href="${g}#star"></use>
                        </svg>`}).join("");return`
          <li class="card-recipe card-recipe-fav" style="background-image: linear-gradient(rgba(5, 5, 5, 0.3), rgba(5, 5, 5, 0.3)), url(${h})">
            <svg class="heart-icon favorites heart-icon-fav remove-favor" id="${e}" name="remove" width="22" height="22">
              <use href="${g}#heart"></use>
            </svg>
            <h3 class="card-recipe-title card-title-fav">${s}</h3>
            <p class="card-recipe-description">${k}</p>
            <div class="recipe-block recipe-block-fav">
              <div class="rating-block">
                <span class="rating-recipe">${a}</span>
                ${q}
              </div>
              <button class="recipe-button see-recipe" id="${e}" type="button">
                See recipe
              </button>
            </div>
          </li>
        `}).join("");P.innerHTML=u,P.innerHTML===""?($.classList.remove("active"),L.classList.remove("active")):($.classList.add("active"),L.classList.add("active")),document.querySelectorAll(".heart-icon").forEach(function(e){const s=e.getAttribute("id");i.includes(s)?e.style.fill="rgba(255, 255, 255, 1)":e.style.fill="none"});const o=document.querySelector(".pagination-wrapper");(n.length<10||i.length<10||window.innerWidth>768&&i.length<13)&&(o.style.opacity="0"),document.querySelectorAll(".see-recipe").forEach(function(e){e.addEventListener("click",function(){const s=e.getAttribute("id");I(s)})}),x.forEach(function(e){e.textContent="Remove",e.classList.add("remove-favor")}),document.getElementsByName("remove").forEach(e=>{e.addEventListener("click",function(){const s=e.getAttribute("id"),a=i.indexOf(s);y.Confirm.show("CHANGE YOUR MIND!","Remove recipe from collection?","Yes","No",function(){a!==-1&&(i.splice(a,1),localStorage.setItem("element_data",JSON.stringify(i)),d.reset(i.length),d.movePageTo(1),E()),y.Notify.success("Slava Ukraine!")},function(){y.Notify.success("Slava Ukraine!")},{width:"335px",borderRadius:"15px"})})}),document.querySelectorAll(".favorites-tags").forEach(function(e){e.addEventListener("click",function(){const s=e.getAttribute("data-tag");d.reset(),M(s)})}),m.forEach((e,s)=>{const a=document.querySelector(`button[data-tag="${s}"]`);e.length===0?a.classList.add("inactive-tag"):a.classList.remove("inactive-tag")})}const d=new C("pagination",{totalItems:i.length,itemsPerPage:b,visiblePages:window.innerWidth<768?2:3,page:1,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn btn-move tui-{{type}}"></a >',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}});d.on("afterMove",n=>{E()});E();
