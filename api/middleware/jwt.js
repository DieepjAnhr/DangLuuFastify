const jwt = require(`jsonwebtoken`);
const JWT_KEY = process.env.JWT_KEY;

module.exports.createToken = (data, time) => {
    const payload = {
        ...data,
    };
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                ...payload,
                exp: Math.floor(Date.now() / 1000) + time ,
            },
            JWT_KEY,
            { algorithm: 'HS256' },
            (error, encoded) => {
                if (error) return reject(error);
                return resolve(encoded);
            }
        );
    });
};

module.exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_KEY, { algorithms: 'HS256' }, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            return resolve(decoded);
        });
    });
};

module.exports.auth = async (req, reply) => {
    try {
        const token = req.headers[`authorization`];
        if (token) {
            try {
                const decoded = await this.verifyToken(token);
                req[`user`] = decoded;
            } catch (error) {
                throw new Error(`Unauthorized!`);
            }
        } else {
            throw new Error(`Forbidden!`);
        }
    } catch (error) {
        return reply.code(400).send({
            status: "error",
            message: error.message,
            data: null
        });
    }
};

