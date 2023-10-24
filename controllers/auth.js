
const crypto = require('crypto')
const User=require('../model/user')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transportNodeMailer = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:'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'
  }
}))
exports.getLogin=(req,res,next)=>{

//const isAuthenticated=req.get("Cookie").split('=')[1]
let message = req.flash('error')

if (message.length > 0){
  message = message[0]
}
else{
  message=null
}
 res.render('auth/login',{path:'/login', pageTitle:'Login',errorMessage: message})
}


exports.postLogin=(req,res,next)=>{
   // console.log("In postLogin")
   // res.setHeader('Set-Cookie','loggedIn=true');
   const email=req.body.email
   const password=req.body.password

   User.findOne({email:email}).then(user=>{
    if(!user){
      req.flash('error','Invalid email or password')
      return res.redirect('/login')
    }
    bcrypt.compare(password,user.password).then((doMatch)=>{
      if(!doMatch){
        req.flash('error','Invalid password')
        return res.redirect('/login')
      }
      req.session.user=user
      req.session.isLoggedIn=true

    return req.session.save(err=>{
      console.log(err)
      res.redirect('/')})
    })

   }).catch(err=>{
    console.log(err)
  });

}

exports.postLogout = (req,res,next)=>{
  req.session.destroy((err)=>{
    console.log(err)
    res.redirect('/');
  });

}

exports.getSignup = (req,res,next)=>{
  let message = req.flash('Info')
  if(message.length>0){
    message=message[0]
  }
  else{
    message=null
  }
  res.render('auth/signup',{path:'/signup', pageTitle:'Sign Up', errorMessage:message})

}

exports.postSignup = (req,res,next)=>{
  const email=req.body.email
  
  User.findOne({email:email}).then((user)=>{
    if(user){
      req.flash('Info',"User already exists")
      return res.redirect('/signup')
    }
    bcrypt.hash(req.body.password,12).then((password)=>{
      const newuser= new User({email:email,password:password, cart:{items:[]}})
    return newuser.save();
    }).then((result)=>{
      res.redirect('/login')
      //transportNodeMailer.sendMail()
      return transportNodeMailer.sendMail({
        to:email,
        from:'akash7029.singh@gmail.com',
        subject:'Sign up completed',
        html:'<h1>You have successfully signed up</h1>'
      })
      
    }).catch(err=> {
      console.log(err)
    })
  }).catch(err=>{
    console.log(err)
  })
  console.log(email)

}

exports.getResetPassword =(req,res,next)=>{
 // console.log(req.flash('SingUperror'))

  let message=req.flash('SingUperror')
  //console.log(message)
  if(message.length>0){
    message=message[0]
  }
  else{
    message=null
  }
  res.render('auth/reset',{path:'/reset', pageTitle:'Reset Password', errorMessage:message})
}

exports.postResetPassword=(req,res,next)=>{
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      console.log(err)
      return res.redirect('/reset')
    }
    const token = buffer.toString('hex');
  
  const email=req.body.email;
  User.findOne({email:email}).then((user)=>{
    if(!user){
      
      return "redirectReset"
    }
    user.resetToken= token
    user.resetTokenExpiration= Date.now()+3600000;
    return user.save()

    
  }).then(result=>{
    if(result ==="redirectReset"){
      req.flash('SingUperror', 'No account with that email found')
      return res.redirect('/reset')
    }
    res.redirect('/')
    transportNodeMailer.sendMail({
      to:email,
      from:'akash7029.singh@gmail.com',
      subject:'Password Reset Mail',
      html: `
      <p>You requested a password reset</p>
      <p>Click this <a href="http://localhost:3000/reset/${token}"> link</a> to set a new password</p>
      `
    })
  }).catch(err=> {console.log(err);
  })

})
}

exports.getUpdatePassword=(req,res,next)=>{
  const resetToken= req.params.token
  User.findOne({resetToken:resetToken,resetTokenExpiration:{$gt: Date.now()}}).then(user=>{
    let message=req.flash('error')
    if(message.length>0){
      message=message[0]
    }
    else{
      message=null
    }
    res.render('auth/updatePassword',{path:'/updatePassword',pageTitle:'Update Password',userId:user._id.toString(),resetToken:resetToken,errorMessage:message})
  }).catch(err=>{
    console.log(err)
  })

}

exports.postUpdatePassword=(req,res,next)=>{
  let resetUser;
  const newpassword=req.body.password
  const userID=req.body.userID
  const resetToken=req.body.resetToken
  User.findOne({resetToken:resetToken, resetTokenExpiration:{$gt:Date.now()},_id:userID}).then(user=>{
   resetUser=user
    return bcrypt.hash(newpassword,12)
  }).then(hashPassword=>{

    resetUser.password=hashPassword
    resetUser.resetToken=undefined
    resetUser.resetTokenExpiration=undefined
    return resetUser.save()
  }).then(result=>{
    res.redirect('/login')
  })
  .catch(err=>console.log(err))
}

