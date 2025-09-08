import aj from '../utils/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
        // Skip Arcjet for signup/login routes
        if (["/api/v1/auth/forgot-password", "/login"].includes(req.path)) {
            return next();
        }
        const decision = await aj.protect(req, { requested: 1 });

        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()) return res.status(429).json({ error: 'Rate Limit Exceeded' });
            if(decision.reason.isBot()) return res.status(403).json({ error: 'Bot detected' });

            return res.status(403).json({ error: 'Access denied' })
        }

        next()
 
    } catch (error) {
        console.log(`Arcject middleware error: ${Error}`);
        next(error);
    }
}

export default arcjetMiddleware;