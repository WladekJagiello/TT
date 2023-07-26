const deletEls = document.querySelectorAll('.remove');

console.log(deletEls);

deletEls.forEach(deletEl => {
  deletEl.addEventListener('click', function () {
    const id = deletEl.getAttribute('id');
    console.log(id);
    const index = dataStor.indexOf(id);
    Notiflix.Confirm.show(
      'CHANGE YOUR MIND!',
      'Remove recipe from collection?',
      'Yes',
      'No',
      function okCb() {
        if (index !== -1) {
          dataStor.splice(index, 1);
          localStorage.setItem('element_data', JSON.stringify(dataStor));
          pagination.reset(dataStor.length);
          pagination.movePageTo(1);
          createGallery();
        }
        Notiflix.Notify.success('Slava Ukraine!');
      },
      function cancelCb() {
        Notiflix.Notify.success('Slava Ukraine!');
        return;
      },
      {
        width: '335px',
        borderRadius: '15px',
      }
    );
  });
});
