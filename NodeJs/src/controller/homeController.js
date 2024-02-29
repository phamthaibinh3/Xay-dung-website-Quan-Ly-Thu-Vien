import db from '../models/index'
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll({ raw: true });

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)        // truyền data ra views //chuyển data thành kiểu string
        })
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getHomePage: getHomePage,
}