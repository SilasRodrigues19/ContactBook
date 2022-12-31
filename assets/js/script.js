// Helpers
const select = (el, isAll = false) => {
  if (typeof el === 'string') {
    return isAll ? document.querySelectorAll(el) : document.querySelector(el);
  }

  return el;
};

// Classes

class UserInterface {
  static showAddressesList() {
    const addresses = Address.getAddresses();

    addresses.forEach((address) => UserInterface.addAddressList(address));
  }

  static addAddressList(address) {
    const tableRow = document.createElement('tr');
    tableRow.setAttribute('data-id', address.id);
    tableRow.innerHTML = `
      <td>${address.id}</td>
      <td>
        <span class="contact__name">${address.addrName}</span> <br>
        <span class="contact__address">${address.streetAddr} ${address.city} ${
      address.postCode
    } ${address.country}</span>
      </td>
      <td>
        <span>${address.labels}</span>
      </td>
      <td>${address.firstName + ' ' + address.lastName}</td>
      <td>${address.phone}</td>
    `;

    addrBookList.appendChild(tableRow);
  }

  static showAddressDetails(id) {
    const addresses = Address.getAddresses();
    addresses.forEach(address => {
      if (address.id == id) {
        select('#ref_name').value = address.addrName;
        select('#first_name').value = address.firstName;
        select('#last_name').value = address.lastName;
        select('#email').value = address.email;
        select('#phone').value = address.phone;
        select('#address').value = address.streetAddr;
        select('#zip_code').value = address.postCode;
        select('#city').value = address.city;
        select('#country').value = address.country;
        select('#labels').value = address.labels;
        select('.modal__title').innerHTML = "Editar contato";
        select('#modal__actions--buttons').innerHTML = `
          <button type="submit" class="footer__save" data-id="${id}">Atualizar</button>
          <button class="footer__delete" onclick="closeModal()">Excluir</button>
        `;
      }
    })
  }

}
class Address {
  constructor(
    id,
    addrName,
    firstName,
    lastName,
    email,
    phone,
    streetAddr,
    postCode,
    city,
    country,
    labels
  ) {
    this.id = id;
    this.addrName = addrName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.streetAddr = streetAddr;
    this.postCode = postCode;
    this.city = city;
    this.country = country;
    this.labels = labels;
  }

  static getAddresses() {
    let addresses;

    if(localStorage.getItem('addresses') === null) {
      addresses = [];
    } else {
      addresses = JSON.parse(localStorage.getItem('addresses'));
    }

    return addresses;
  }

  static addAddress(address) {
    const addresses = Address.getAddresses();
    addresses.push(address);
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }

}


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

const clearConsole = delay => {
  document.addEventListener('keydown', e => {
    if (e.key === 'F12') {
      console.warn(`Console will be cleared in ${delay / 1000} seconds`);
      setTimeout(() => {
        console.clear();
      }, delay);
    }
  });
};


const countryList = select('#country'),
  addrBookList = select('.contact__table--body'),
  form = select('.form'),
  addBtn = select('.footer__save');

let addrName =
  (firstName =
  lastName =
  email =
  phone =
  streetAddr =
  postCode =
  city =
  country =
  labels =
    '');

document.addEventListener('DOMContentLoaded', () => {
  loadCountries();
  UserInterface.showAddressesList();
  clearConsole(5000);
});

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.id === 'modal__save') {
    let isFormValid = getFormData();

    if (!isFormValid) {
      form.querySelectorAll('input').forEach((input) => {
        setTimeout(() => {
          input.classList.remove('error');
        }, 1500);
      });
    } else {
      let allItems = Address.getAddresses();
      
      let lastItemId = (allItems.length > 0) ? allItems[allItems.length - 1].id : 0;
      lastItemId++;

      const addressItem = new Address(lastItemId, addrName, firstName, lastName, email, phone, streetAddr, postCode, city, country, labels);
      Address.addAddress(addressItem);
      location.reload();
      UserInterface.addAddressList(addressItem);
      form.reset();
    }
  }
});

addrBookList.addEventListener('click', e => {
  openModal();
  let trElement;

  if (e.target.parentElement.tagName == 'TD') {
    trElement = e.target.parentElement.parentElement;
  }

  if(e.target.parentElement.tagName == 'TR') {
    trElement = e.target.parentElement;
  }

  let viewID = trElement.getAttribute('data-id');
  UserInterface.showAddressDetails(viewID);

});

loadCountries = () => {
  fetch('/mock/countries.json')
    .then((res) => res.json())
    .then((data) => {
      let html = '';
      data.forEach(({ country }) => {
        country === 'Brazil'
          ? (html += `<option selected>${country}</option>`)
          : (html += `<option>${country}</option>`);
      });
      countryList.innerHTML = html;

     
      html != '' ? console.log('Countries loaded') : console.error('Error loading countries');

    });
};

getFormData = (e) => {
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

  if (
    !strRegex.test(form.ref_name.value) ||
    form.ref_name.value.trim().length == 0
  ) {
    isError(form.ref_name);
    inputValidStatus[0] = false;
  } else {
    addrName = form.ref_name.value;
    inputValidStatus[0] = true;
  }

  if (
    !strRegex.test(form.first_name.value) ||
    form.first_name.value.trim().length == 0
  ) {
    isError(form.first_name);
    inputValidStatus[1] = false;
  } else {
    firstName = form.first_name.value;
    inputValidStatus[1] = true;
  }

  if (
    !strRegex.test(form.last_name.value) ||
    form.last_name.value.trim().length == 0
  ) {
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
    city = form.city.value;
    inputValidStatus[7] = true;
  }

  country = form.country.value;
  labels = form.labels.value;
  console.log(
    addrName,
    firstName,
    lastName,
    email,
    phone,
    streetAddr,
    postCode,
    city,
    country,
    labels
  );
  return inputValidStatus.includes(false) ? false : true;
};

isError = (inputBox) => {
  inputBox.classList.add('error');
};
