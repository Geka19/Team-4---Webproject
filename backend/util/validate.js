const MAX_NAME_LEN = 30;

function _checkIfEmpty(s){
	return s === undefined || s === null || !s.toString().trim().length;
}

/**
  * 
  * @param {String} name 
  */
function validateUserName(name){
	// if empty, null, undefined
	if(_checkIfEmpty(name)){
		throw "User name can't be empty";
	}
	name = name.toString().trim();
	// max length is sane
	if(name.length > MAX_NAME_LEN){
		throw new Error("User name is unrealistically long");
	}
	// no camelCase
	return nameParts.map(s=>s.charAt(0).toUpperCase()+s.substr(1).toLowerCase()).join(" ");
}

function validateEmail(email){
    if(_checkIfEmpty(email)){
        throw "Email can't be empty";
    }
    // email regex for basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        throw new Error("Invalid email format");
    }
    return email;
}


module.exports = {
	validateUserName,
    validateEmail
};