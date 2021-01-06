// require('dotenv').config();
 // function Router(app){
//      // Posts routes
//      app.use('/api/posts', postRoutes);
// }
// export default Router;
import express from 'express';

let router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.get('/new', (req, res, next) => {
    let languages = [
        {
         language: 'Spanish'
        },
        {
         language: "French"
        },
        {
         langauge: "German"
        }
    ];
    res.json(languages);
});

export default router;