const path=require('path')
console.log("Hey"+require.main.filename)
module.exports=path.dirname(require.main.filename)