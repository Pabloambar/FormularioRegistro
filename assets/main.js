const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

const checkMail = () => {
	
	let valid = false;
	const emailValue = emailInput.value.trim();
		if (isEmpty(emailInput)) {
		showError(emailInput, "El mail es obligatorio");
	} else if (!isEmailValid(emailValue)) {
		showError(emailInput, "El mail no es válido");
	} else { 
		showSuccess(emailInput);
		valid = true;
	}
	return valid;
};

const checkPassword = () => {

	let valid = false;
	const min = 5;
	const max = 12;
	const pass = passInput.value.trim();
	if (isEmpty(pass)) {
		showError(passInput, "La contraseña es obligatoria");
	} else if (!isBetween(pass.length, min, max)) {
		showError(
			passInput,
			`La contraseña debe tener entre ${min} y ${max} caracteres al menos una mayuscula, una minuscula, un número y un simbolo`
		);
        }else if (!isPassSecure(pass)){
            showError(passInput, `La contraseña debe tener entre ${min} y ${max} caracteres al menos una mayuscula, una minuscula, un número y un simbolo`);
        }else {
		showSuccess(passInput);
		valid = true;
	}
	return valid; 
};

const isEmpty = (value) => value === "";

const isBetween = (length, min, max) => {
	return length < min || length > max ? false : true;
};

const isEmailValid = (email) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	return re.test(email);
}; 

const isPassSecure = (pass) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,}$/;
	return re.test(pass);
};



const showError = (input, message) => {
	const formField = input.parentElement;
	formField.classList.remove("success");
	formField.classList.add("error");
	const error = formField.querySelector("small");
	error.textContent = message;
};


const showSuccess = (input) => {
	const formField = input.parentElement;
	formField.classList.remove("error");
	formField.classList.add("success");
	const error = formField.querySelector("small");
	error.textContent = "";
};


const debounce = (fn, delay = 100) => {
	let timeoutId;

	return (...args) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			fn.apply(null, args);
		}, delay);
	};
};


form.addEventListener("submit", (e) => {
	e.preventDefault();
	let isEmailValid = checkMail();
	let isPasswordValid = checkPassword();
	let isFormValid =
		isEmailValid && isPasswordValid;

	if (isFormValid) {
		console.log("Enviamos el formulario");
		form.submit();
	}
});


form.addEventListener(
	"input",
	debounce((e) => {
		switch (e.target.id) {
			case "email":
				checkMail();
				break;
			case "password":
				checkPassword();
				break;
		}
	})
);
