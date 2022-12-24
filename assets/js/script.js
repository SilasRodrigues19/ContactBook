// Helpers
const select = (el, isAll = false) => {
  if (typeof el === 'string') {
    return isAll ? document.querySelectorAll(el) : document.querySelector(el);
  }

  return el;
};

const strRegex = /^[a-zA-Z\s]*$/; //* Only letters
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const phoneRegex = /^(\(\d{2}\)|\d{2})? ?\d{5}[- ]?\d{4}$/;

const modal = select('.modal');

const openModal = () => {
  modal.showModal();
};

const closeModal = () => {
  modal.close();
};

const countryList = select('#country'),
  addrBookList = select('.contact__table--body'),
  addBtn = select('.footer__save');
      

let addrName = firstName = lastName = email = phone = streetAddr = postCode =
  city = country = labels = '';

document.addEventListener('DOMContentLoaded', () => {
  loadJSON();
});


loadJSON = () => {
  fetch('/mock/countries.json')
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach(({ country }) => {
        
        html += `
          <option>${country}</option>
        `;
      });
      console.log(html);
      countryList.innerHTML = html;
      console.log(countryList.innerHTML);
    })
}