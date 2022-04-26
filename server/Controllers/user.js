const router = require("express").Router();
const bodyparser = require("body-parser");
const user = require("../Models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

router.post("/create", async function (req, res) {
  console.log("data", req.body);
  let data = new user({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  data.save(function (error, result) {
    if (error) {
      return res.json({
        status: false,
        message: "database insert data fail...",
        error: error,
      });
    }
    return res.json({
      status: true,
      message: "Add new user in Database successfully",
      result: result,
    });
  });
});
/////////////////////////////////////////////////////////////////////

router.post("/find", async (req, res) => {
  //console.log("CREATATAT");
  try {
    let data = await user.findOne({ _id: req.body.id });
    if (data) {
      res.json({
        message: "your data",
        data,
      });
    } else {
      res.json({
        message: "no data are found",
      });
    }
  } catch (error) {
    res.json({
      message: "Something wents wrong",
      Error_Mesaage: error,
    });
  }
});
///////////////////////////////////////////////////////////////
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let data = await user.findOne({
      $and: [{ email: email }, { password: password }],
    });
    if (data) {
      const token = jwt.sign({ email: req.body.email }, "secret", {
        expiresIn: "7d",
      });
      res.json({
        message: "login successfull",
        data: data,
        token,
      });
    } else {
      res.json({
        message: "invalid Email or password",
      });
    }
  } catch (error) {
    res.json({
      message: "Something wents wrong",
      Error_Mesaage: error,
    });
  }
});
router.post("/forget_password", async (req, res) => {
  console.log("-----", req.body.email);

  const data = await user.findOne({ email: req.body.email });
  // console.log("data", data)
  if (data == null) {
    res.json({
      status: false,
      message: "invalid email",
    });
  } else {
    const otpcode = Math.floor(Math.random() * 10000 + 1);

    //console.log(req.body.email, otpcode)
    await sendMailer(req.body.email, otpcode);
    await user.findOneAndUpdate(
      { email: req.body.email },
      { $set: { otp: otpcode } }
    );

    return res.json({
      status: true,
      message: "Check your Email",
    });
  }
});
///////////////////////////////////////////////////////////////////////////
router.post("/reset_password", async (req, res) => {
  const { email, password, otp } = req.body;
  try {
    const data1 = await user.findOne({
      $and: [{ email: email }, { otp: otp }],
    });

    console.log("data1", data1);
    if (data1 == null) {
      res.json({
        status: false,
        message: "Email or OTP are Invalid...",
      });
    } else {
      let data = await user.findOneAndUpdate({ email }, { $set: { password } });
      if (data) {
        res.json({
          status: true,
          message: "password update successfully",
        });
      } else {
        res.json({
          status: false,
          message: "password update fail......",
        });
      }
    }
  } catch (erro) {
    console.log(error);
  }
});
/////////////////////////////////////////////////////////

async function sendMailer(email, otpcode) {
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",

      auth: {
        user: "ciitlahore383@gmail.com", // generated ethereal user
        pass: "Bakerabu@1234", // generated ethereal password
      },
    })
  );
  let info = await transporter.sendMail({
    from: "ciitlahore383@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Email verification code", // Subject line
    text: "Hello world?", // plain text body
    html: `<p> Your Email verfication OTP == ${otpcode}  </p>`, // html body
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return true;
}

module.exports = router;
