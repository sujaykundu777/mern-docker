
import { Router } from 'express';
let dashboardRouter = Router();

/**  GET User Dashboard 
 * @api {get} /api/dashboard 
 */
dashboardRouter.get('/', (req, res, next) => {
    try{
        res.send('Welcome to your Dashboard');
    }catch(err){
        throw(err);
    }
});

/** Get User Profile 
 *  @api {get} /api/edit_profile 
 */
dashboardRouter.get('/profile', (req, res, next) => {
    try{
        res.send('Welcome to your Profile');
    }catch(err){
        throw(err);
    }
})

export default dashboardRouter;