import { orderNow } from './APIrequests';

const backdropEl = document.querySelector('.order-backdrop');
const openEls = document.querySelectorAll('.order-open');
const modalEl = document.querySelector('.order-modal');
const closeEl = document.querySelector('.order-close');
const formEl = document.querySelector('.order-form');

openEls.forEach(openEl => {
  openEl.addEventListener('click', function () {
    toggleModal();
  });
});

formEl.addEventListener('submit', event => {
  event.preventDefault();

  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  let email = document.getElementById('email').value;
  let comment = document.getElementById('comment').value;

  const dataForm = {
    name: `${name}`,
    phone: `${phone}`,
    email: `${email}`,
    comment: `${comment}`,
  };

  // const { elements } = event.currentTarget;

  // let dataForm;

  // dataForm = {
  //   [`"name"`]: elements.name.value.trim(),
  //   [`"phone"`]: elements.tel.value.trim(),
  //   [`"email"`]: elements.email.value.trim(),
  //   [`"comment"`]: elements.comment.value.trim(),
  // };

  console.log(dataForm);

  orderNow(dataForm);

  toggleModal();

  event.currentTarget.reset();
});

modalEl.addEventListener('click', function (event) {
  event.stopPropagation();
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    backdropEl.classList.remove('active');
    document.body.style.overflow = '';
  }
});

backdropEl.addEventListener('click', toggleModal);

closeEl.addEventListener('click', toggleModal);

function toggleModal() {
  backdropEl.classList.toggle('active');

  if (backdropEl.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}
