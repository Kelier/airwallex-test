/* @file tool */
// email regex
/* eslint-disable */ 
const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;

export const isValidFullName = (fullName) => {
    if (fullName.length >= 3) {
        return true;
    } else {
        return false;
    }
}

export const isValidEmail = (email) => {
    if (reg.test(email)) {
        return true;
    } else {
        return false;
    }
}

export const isValidCheckEmail = (email, checkEmail) => {
    if (reg.test(checkEmail) && email === checkEmail) {
        return true;
    } else {
        return false;
    }
}