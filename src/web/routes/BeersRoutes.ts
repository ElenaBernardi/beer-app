import Router from "koa-router";
const router = new Router();

router.get(`/`, async (ctx) => {
    try {
        ctx.body = {
            status: "success",
        };
    } catch (err) {
        console.error(err);
    }
});

export default router;
