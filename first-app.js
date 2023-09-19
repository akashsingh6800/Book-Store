/*
const fs = require('fs')

fs.writeFileSync('hello.txt','Hellow from Node.js')*/

/*const person={
name:"Akash Singh",
age:"25"

}

const copyperson={...person}
console.log(copyperson);*/
/*

const toArray=(...argss)=>{
    console.log(argss)
}

toArray(1,2,3,4,5)*/
/*

const fetchData = callback =>{

    console.log("Hii");
    callback()
}
fetchData(()=>{console.log("Hello")})*/


const http=require('http');

const fs = require('fs');


const server = http.createServer((req,resp)=>{

    const url=req.url;

    if(req.url==='/'){
        resp.write(`<html>
                        <head>
                        </head>
                        <body>
                                <form action="/message" method="POST">
                                    <input type="text" name="messge">
                                    <button type ="submit"> Send</button>
                        </body>
                    </html>`)
        resp.end()
    }

    if(url==='/message' && req.method ==='POST'){
        const body=[]
        //resp.write("Messge Posetd")
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk)
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message)
            
        })

      /*  req.on('end',()=>{
            body.push(chunk)
           
        })*/
        resp.setHeader('Location','/message');

        return resp.end()
    }

    




})

server.listen(3000,()=> console.log('Hey'))
























