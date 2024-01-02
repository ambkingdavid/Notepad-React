import { Router } from 'express';

const router = Router();

router.get('/homepage', (req, res) => {
    res.send(401).send({
        success: false,
        message: 'Unauthorized login',
    });
})




export default router;