const nodemailer=require("nodemailer")
const dotenv=require("dotenv")
dotenv.config()

let transportor=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"from@gmail.com",
        pass:process.env.PASS
    }
})

let mailoption={
    from:'from@gmail.com',
    to:'to@gmail.com',
    subject:'Sending mail with nodemailer',
    text:'Hello from this batch'
}

transportor.sendMail(mailoption,(err,info)=>{
    if(err) throw err;
    else{
        console.log('Email sent successfully');
    }
})
