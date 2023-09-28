import express from 'express';

const router = express.Router();

router.post("/api/users/signout", async (req, res) => {
    // remove user's session cookie on logout
    req.session = null;
    res.send({});
});

export { router as signoutRouter };