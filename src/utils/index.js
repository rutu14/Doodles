const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const colorOption = [ 'blue', 'teal', 'red', 'yellow', 'orange' ];

const token = localStorage.getItem("token");
const config = { headers: { 'authorization': token } };

const errorMessage = 'Error occured, try again after some time.';

function capitializeString( word ){
    return word.charAt(0).toUpperCase() + word.slice(1) 
}

export { emailRegex, passwordRegex, colorOption, config, errorMessage, capitializeString };