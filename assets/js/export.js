exportToExcel = () => {
  let table = document.querySelector('.contact__table');

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
}

s2ab = s => {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}
