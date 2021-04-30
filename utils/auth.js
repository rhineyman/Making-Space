const withAuth = (req, res, next) => {
    if(!req.session_user_id) {
        res.redirect('/login')
    }
    else{
        next();
    }
}


module.exports = withAuth