const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser'); //데이터 전송시 데이터값을 바디에 넣기 위해 사용
const { User } = require('./models/User');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/dev');
const cookieParser = require('cookie-parser'); //쿠키사용사 사용 라이브러리
const { auth } = require('./middleware/auth');
const cors = require('cors')


mongoose.connect(mongoURI)
  .then(() => console.log('Mongoose Connected...'))
  .catch(err => console.log(err));

//application/x-222-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json으로 가져옴
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true,
}));


app.get('/', (req, res) => {
  res.send('hello')
});
app.get('/api/hi', (req,res)=>{
  res.send('안녕하세요');
});

app.post('api/user/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  });
});

app.post('api/user/login', (req, res) => {
  //요청된 아이디, 비밀번호가 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.'
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.'
        })
      //토큰생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰 저장 쿠키, 로컬스토리지

        res.cookie("x_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id
          });
      })
    })
  })
});

app.get('/api/user/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
});

app.get('/api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
});


app.listen(port, () => console.log(`Example app ${port}`));