const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(302).redirect('/auth/google');
    }
}

export default isLoggedIn;