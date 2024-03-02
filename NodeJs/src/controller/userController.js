import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let taiKhoan = req.body.taiKhoan;
    let matKhau = req.body.matKhau;
    if (!taiKhoan || !matKhau) {
        return res.status(500).json({
            errcode: 1,
            message: 'Bạn chưa nhập tài khoản hoặc mật khẩu',
        })
    }

    let userData = await userService.handleUserLogin(taiKhoan, matKhau);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })

}

module.exports = {
    handleLogin: handleLogin,
}