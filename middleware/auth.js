const {User} = require('../models/User');

let auth = (req,res,next)=>{
  //인증을 처리
  //클라이언트 토큰에서 쿠키 가져오기
  //토큰을 복호화한후 유저를 찾는다. 유저가 있으면 인증
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user)=>{
    if(err) throw err;
    if(!user) return res.json({
      isAuth: false,
      error: true,
    })
    req.token = token;
    req.user = user;
    next();
  })
}

module.exports = {auth};