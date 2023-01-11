
let myNotify;
const displayedNotifications = [];
const NOTIFY_TIMEOUT = 3000;

pushNotify = (status, title, text) => {
  const message = `${title}: ${text}`;
  if (displayedNotifications.includes(message)) {
    return;
  }

  displayedNotifications.push(message);

  setTimeout(() => {
    displayedNotifications.pop();
  }, NOTIFY_TIMEOUT + 700);

  myNotify = new Notify({
    status: `${status}`,
    title: `${title}`,
    text: `${text}`,
    effect: 'slide',
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: NOTIFY_TIMEOUT,
    distance: 20,
    type: 1,
  });
}

close = () => {
  const index = displayedNotifications.indexOf(myNotify.text);
  if (index > -1) {
    displayedNotifications.splice(index, 1);
  }
  myNotify.close();
}

exportToExcel = () => {
  let table = document.querySelector('.contact__table');
  let tbody = table.querySelector('tbody');

  if (tbody.childElementCount === 0) {
    pushNotify('info', 'Erro', 'Não há dados para exportar!');
    return;
  }

  let wb = XLSX.utils.table_to_book(table);

  let wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'binary',
  });

  let link = document.createElement('a');
  link.href = URL.createObjectURL(
    new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  );
  link.download = 'contacts.xlsx';

  link.click();
};

s2ab = (s) => {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};
