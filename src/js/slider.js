import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
// import "../../node_modules/swiper/swiper-bundle.min.css";
import { fetchEvents } from "./APIrequests";

// ####### markup slider #######

new Swiper(".swiper", {
  modules: [Pagination, Autoplay],
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  mousewheel: {
    invert: true,
  },
});

async function getData() {
  const swiperEl = document.querySelector(".swiper-wrapper");
  const events = await fetchEvents();
  const slide = events
    .map((event, index) => {
      return `<div class="swiper-slide">
          <div class="my-slide">
            <div class="card-cook">
              <div class="wrapper-cook">
                <img class="event-cook-${index}" src="${event.cook.imgUrl}" alt="${event.cook.name}" />
                </div>
              </div>

              <div class="card-info">
                <img class="preview-img-${index}" src="${event.topic.previewUrl}" alt="${event.topic.name}" />
                <div class="info-box">
                  <p class="event-title-${index}">${event.topic.name}</p>
                  <p class="event-country">${event.topic.area}</p>
                </div>
              </div>

              <div class="card-img">
                <div class="wrapper-img">
                  <img class="event-img-${index}" src="${event.topic.imgUrl}" alt="${event.topic.name}" />
                </div>
              </div>
            </div>
          </div>
        </div>`;
    })
    .join("");
  swiperEl.innerHTML += slide;
}
getData();
