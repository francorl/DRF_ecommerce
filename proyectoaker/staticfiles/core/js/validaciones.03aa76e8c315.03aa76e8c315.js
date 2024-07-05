const form = document.getElementById("form");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");

document.addEventListener("submit", (e) => {
  if (!checkInputs()) {
    e.preventDefault();
  }
});

function setErrorFor(input, message) {
  const inputContainer = input.parentElement;
  const small = inputContainer.querySelector("small");
  inputContainer.className = "inputContainer error";
  small.innerText = message;
  return false;
}

function setSuccessFor(input) {
  const inputContainer = input.parentElement;
  inputContainer.className = "inputContainer success";
  return true;
}

//Valida que tiene ser un email
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

//Valida que un campo contenga solo letras (como nombre o apellido)
function validateName(nombre, apellido) {
  var patt = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,256}$");
  return patt.test(nombre, apellido);
}

function enviarformulario() {
  form.reset();
}

function checkInputs() {
  // trim to remove the whitespaces
  let status = false;
  const nombreValue = nombre.value.trim();
  const apellidoValue = apellido.value.trim();
  const emailValue = email.value.trim();
  const mensajeValue = mensaje.value.trim();

  if (nombreValue === "") {
    status = setErrorFor(nombre, "No puede dejar la casilla nombre en blanco");
  } else if (!validateName(nombreValue)) {
    status = setErrorFor(nombre, "Solo se aceptan letras");
  } else {
    status = setSuccessFor(nombre);
  }

  if (apellidoValue === "") {
    status = setErrorFor(apellido, "No puede dejar la casilla apellido en blanco");
  } else if (!validateName(apellidoValue)) {
    status = setErrorFor(apellido, "Solo se aceptan letras");
  } else {
    status = setSuccessFor(apellido);
  }

  if (emailValue === "") {
    status = setErrorFor(email, "No puede dejar el email en blanco");
  } else if (!isEmail(emailValue)) {
    status = setErrorFor(email, "No ingreso un email válido");
  } else {
    status = setSuccessFor(email);
  }

  if (mensajeValue === "") {
    status = setErrorFor(mensaje, "No puede dejar el mensaje en blanco");
  } else {
    status = setSuccessFor(mensaje);
  }
  return status;
}
