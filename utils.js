const regEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
const regPassword = /[0-9a-zA-Z!@#$%^&*]{6,20}/;
const img = /[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/;
const name = /^[a-zA-Zа-яА-Я0-9ёЁ_-]{3,100}$/;
const email = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const role = /[Uu]ser|[Aa]dmin/;

module.exports = {
    regEmail,
    regPassword,
    img,
    name,
    email,
    role
  };