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
const cepRegex = /^[0-9]{5}-[0-9]{3}$/;

const modal = select('.modal');

const openModal = () => {
  modal.showModal();
};

const closeModal = () => {
  modal.close();
};

const countryList = select('#country'),
  addrBookList = select('.contact__table--body'),
  form = select('.form'),
  addBtn = select('.footer__save');
      

let addrName = firstName = lastName = email = phone = streetAddr = postCode =
  city = country = labels = '';

document.addEventListener('DOMContentLoaded', () => {
  loadJSON();
});

addBtn.addEventListener('click', e => {

  e.preventDefault();

  if (e.target.id === 'modal__save') {
    let isFormValid = getFormData();
   }
})


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

getFormData = e => {
  let inputValidStatus = [];

  /*
  console.log(
    form.ref_name.value,
    form.first_name.value,
    form.last_name.value,
    form.email.value,
    form.phone.value,
    form.address.value,
    form.zip_code.value,
    form.city.value,
    form.country.value,
    form.labels.value
  );
  */
  
  if (!strRegex.test(form.ref_name.value) || form.ref_name.value.trim().length == 0) {
    isError(form.ref_name);
    inputValidStatus[0] = false;
  } else {
    addrName = form.ref_name.value;
    inputValidStatus[0] = true;
  }

  if (!strRegex.test(form.first_name.value) || form.first_name.value.trim().length == 0) {
    isError(form.first_name);
    inputValidStatus[1] = false;
  } else {
    firstName = form.first_name.value;
    inputValidStatus[1] = true;
  }

  if (!strRegex.test(form.last_name.value) || form.last_name.value.trim().length == 0) {
    isError(form.last_name);
    inputValidStatus[2] = false;
  } else {
    lastName = form.last_name.value;
    inputValidStatus[2] = true;
  }

  
  if (!emailRegex.test(form.email.value)) {
    isError(form.email);
    inputValidStatus[3] = false;
  } else {
    email = form.email.value;
    inputValidStatus[3] = true;
  }

  if (!phoneRegex.test(form.phone.value)) {
    isError(form.phone);
    inputValidStatus[4] = false;
  } else {
    phone = form.phone.value;
    inputValidStatus[4] = true;
  }

  if (!(form.address.value.trim().length > 0)) {
    isError(form.address);
    inputValidStatus[5] = false;
  } else {
    streetAddr = form.address.value;
    inputValidStatus[5] = true;
  }

  if (!cepRegex.test(form.zip_code.value)) {
    isError(form.zip_code);
    inputValidStatus[6] = false;
  } else {
    postCode = form.zip_code.value;
    inputValidStatus[6] = true;
  }

  if (!strRegex.test(form.city.value) || form.city.value.trim().length == 0) {
    isError(form.city);
    inputValidStatus[7] = false;
  } else {
    address = form.city.value;
    inputValidStatus[7] = true;
  }

  country = form.country.value;
  labels = form.labels.value;
  console.log(addrName, firstName, lastName, email, phone, streetAddr, postCode, city, country, labels);
  return inputValidStatus.includes(false) ? false : true;

}

isError = inputBox => {
  inputBox.classList.add('error')
}