import express from 'express';
const router = express.Router();

/* GET home page. */
router.use (function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/',function(req,res){
  res.sendFile(path.resolve('views/index.html'));
});
export default router;
