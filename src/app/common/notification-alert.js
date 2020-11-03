import Swal from 'sweetalert2'
//type : warning, error, success, info, and question

const timer = 2500;
const width = 200;
const imageWidth = '50px';

export const successNotification = (message) => Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: `${'<span style="font-size:14px">'}${message}${'<span>'}`,
  showConfirmButton: false,
  imageWidth,
  width,
  timer
});

export const errorNotification = (message) => Swal.fire({
  position: 'top-end',
  icon: 'error',
  title: `${'<span style="font-size:14px">'}${message}${'<span>'}`,
  showConfirmButton: false,
  width,
  imageWidth,
  timer
});

export const warningNotification = (message) => Swal.fire({
  position: 'top-end',
  icon: 'warning',
  title: `${'<span style="font-size:14px">'}${message}${'<span>'}`,
  showConfirmButton: false,
  width,
  imageWidth,
  timer
});

export const infoNotification = (message) => Swal.fire({
  position: 'top-end',
  icon: 'info',
  title: `${'<span style="font-size:14px">'}${message}${'<span>'}`,
  showConfirmButton: false,
  width,
  imageWidth,
  timer
});