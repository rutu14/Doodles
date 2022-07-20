const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
function capitializeString( word ){
    return word.charAt(0).toUpperCase() + word.slice(1) 
}
const colorOption = [ 'blue', 'teal', 'red', 'yellow', 'orange' ];

export { emailRegex,passwordRegex,capitializeString,colorOption };