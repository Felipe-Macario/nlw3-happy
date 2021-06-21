import bcrypt from 'bcrypt';

export default {
    async encryptPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        return hash;
    },

    async comparePassword(plainPassword: string, hashPassword: string): Promise<boolean> {
        const check = await bcrypt.compare(plainPassword, hashPassword);

        return check;
    }
}