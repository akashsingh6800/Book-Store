exports.pageNotFound=(req,res,next)=>{

    //res.status(404).send('<h1>Page Not found</h1>')
   // console.log(require.main.filename)
   console.log("Hii in page not found")
    //res.status(404).sendFile(path.join(__dirname,'views','page-not-found.html'))
    //res.status(404).sendFile(path.join(routeDir,'views','page-not-found.html'))
    res.status(404).render('page-not-found',{ pageTitle:'Page Not Found', path:"Not found"})
}


