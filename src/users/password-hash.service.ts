import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config()

@Injectable()
export class PasswordHashService {
    private readonly saltRounds: number;

    constructor() {
        this.saltRounds = Number(process.env.SALT_ROUNDS || 10);
    }

    async hashPassword(plainPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(plainPassword, salt);
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}