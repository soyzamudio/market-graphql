import jwt from 'jsonwebtoken';
import Users from './data/users';
import find from 'lodash/find';

const expiredIn = '3h';
const secret = 'samplejwtauthgraphql';
const tokenPrefix = 'JWT';

export const createToken = (email, password) => {
    if (!email || !password) {
        return false;
    }

    const user = find(Users, (user) => user.email === email.toLowerCase() && user.last_name.toLowerCase() === password);
    if (!user) { return false; }

    const payload = { username: user.email };
    const token = jwt.sign(payload, secret, { expiresIn });

    return token;
}

export const verifyToken = (token) => {
    const [prefix, payload] = token.split(' ');
    let user = null;

    if (!payload) { throw new Error('No token provided'); }
    if (prefix !== tokenPrefix) { throw new Error('Invalid header format'); }

    jwt.verify(payload, secret, (err, data) => {
        if (err) {
            throw new Error('Invalid token!');
        } else {
            user = find(Users, { email: data.username });
        }
    });

    if (!user) {
        throw new Error('User does not exist');
    }

    return user;
}