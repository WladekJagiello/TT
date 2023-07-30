import Swiper from 'swiper/bundle';
// import '../../node_modules/swiper/swiper-bundle.min.css';
import 'swiper/css/bundle';
import { fetchEvents } from './APIrequests';

// ####### markup slider #######

async function markapSlide() {
  const slideEls = document.querySelectorAll('.swiper-slide');

  const events = await fetchEvents();
  const slides = events.map((event, index) => {
    return `<div class="my-slide">
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
            </div>`;
  });

  slideEls.forEach((slideEl, index) => {
    slideEl.innerHTML = slides[index];
  });
}

const swiper = new Swiper('.swiper', {
  allowSlideNext: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

markapSlide();
