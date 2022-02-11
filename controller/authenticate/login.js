var login = function (user, password) {

    console.log(user, password)
    if (user === "admin@ves.io" && password === "Volterra123") {
        return true;
    }
    else {
        return false;
    }
}

module.exports = login;