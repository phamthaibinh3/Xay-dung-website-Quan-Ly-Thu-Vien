import db from '../models/index';
import bcrypt from 'bcryptjs'

let handleUserLogin = (taiKhoan, matKhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let tonTai = await checkTaiKhoan(taiKhoan);
            if (tonTai) {
                let user = await db.User.findOne({
                    where: { taiKhoan: taiKhoan }
                })
                if (user) {
                    let check = await bcrypt.compareSync(matKhau, user.matKhau); // true
                    if (check) {
                        userData.errCode = 0;
                        userData.message = 'thanh cong';
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Mật khẩu không chính xác';
                    }
                }
            } else {
                userData.errCode = 2;
                userData.message = 'Tài khoản của bạn không có trong hệ thống. Vui lòng thử lại';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkTaiKhoan = (userTaiKhoan) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { taiKhoan: userTaiKhoan }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (userId === 'ALL') {
                user = await db.User.findAll({

                })

            }
            if (userId && userId !== 'ALL') {
                user = await db.User.findOne({
                    attributes: {
                        exclude: ['matKhau']
                    },
                    where: { id: userId }
                })
            }
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
}