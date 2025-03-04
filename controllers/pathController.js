const renderHome = (req, res) => {
    res.render("home");
};

const renderLogin = (req, res) => {
    res.render("login");
}

const render404 = (req, res) => {
    res.render("404");
}

module.exports = {
    renderHome,
    renderLogin,
    render404,
};