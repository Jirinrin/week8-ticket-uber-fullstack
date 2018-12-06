import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || '9u8nnjksfdt98*(&*%T$#hsfjk';
const expirationTime = 3600 * 2;

interface JwtContents {
  id: number;
  role: 'user'|'admin';
}

export const toJwt = (data: JwtContents): string =>
  jwt.sign({ data }, secret, { expiresIn: expirationTime });

export const toUserInfo = (token: string): { data: JwtContents } =>
  jwt.verify(token, secret) as { data: JwtContents };