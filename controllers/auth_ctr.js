const Auth = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BaseError = require("../errors/base_error");
const nodemailer = require("nodemailer");
const {createToken, refreshToken} = require('../token/generate_token')

const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await Auth.findOne({ email });

    if (user) {
      throw BaseError.BadRequestError("Email already exists");
    }

    const generatePassword = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    ///////// Node mailer code /////////
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    async function main() {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verification code",
        text: "you got a verification code",
        html: `<p>Your verification code:</p><br>
    <h1>${generatePassword}</h1><br>
    <p>Enter this code to verify your account</p>`,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Auth.create({
      username,
      email,
      password: hashedPassword,
      verfication_code: generatePassword,
      role
    });

    setTimeout(async () => {
      await Auth.findByIdAndUpdate(newUser._id, {
        $set: { verfication_code: 0 },
      });
    }, 120 * 1000);

    res.status(201).send('Verification code will be sent to this email');
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      throw BaseError.BadRequestError("User not found");
    }

    if (user.verfication_code != code) {
      throw BaseError.BadRequestError("Invalid code");
    } else {
      await Auth.findByIdAndUpdate(user._id, {
        $set: { isVerify: true, verfication_code: 0 },
      });
      return res.status(200).json({ msg: "User verified successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      throw BaseError.BadRequestError("Invalid credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    let payload = { email: user.email, id: user._id, role: user.role };
    let createtoken = createToken(payload)
    let refreshtoken = refreshToken(payload)
    
    res.cookie("createtoken", createtoken, {httpOnly:true, maxAge: 900 * 1000})
    res.cookie("refreshToken", refreshtoken, {httpOnly:true, maxAge: 3600 * 1000 * 24 * 15})
    
    if (isPasswordMatch && user.isVerify) {
    return  res.status(200).json({ msg: "User logged in successfully", createtoken });
    }else{
     return res.status(200).json({ msg: "User not verified or password is wrong" });
    }
  } catch (error) {
    next(error);
  }
};

const logOut = (req, res, next) => {

  try {
    res.clearCookie("createtoken", {httpOnly: true})
    res.clearCookie("refreshToken", {httpOnly:true})

    res.status(200).json({msg: "User logged out successfully"})
  } catch (error) {
    next(error)
  }
}

module.exports = { register, verify, login, logOut };
