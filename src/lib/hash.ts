import crypto from "crypto";

export default function generateRandomHash(length = 64) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}