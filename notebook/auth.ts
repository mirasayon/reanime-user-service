// @ts-nocheck
// auth.ts
import { PrismaClient } from "@prisma/client";
import { hashingService } from "./hashing-service";

const prisma = new PrismaClient();

export async function register(email: string, password: string) {
    // создаём аккаунт сначала (или в транзакции)
    const account = await prisma.account.create({ data: { email } });

    const hashed = await hashingService.hashPasswordBuiltinArgon2id(password);
    await prisma.password.create({
        data: {
            accountId: account.id,
            hashB64: hashed.derivedB64,
            saltB64: hashed.saltB64,
            memory: hashed.memory,
            passes: hashed.passes,
            parallelism: hashed.parallelism,
            tagLength: hashed.tagLength,
        },
    });

    return account;
}

export async function login(email: string, password: string) {
    // подтянем аккаунт + пароль одной транзакцией
    const account = await prisma.account.findUnique({
        where: { email },
        include: { password: true }, // не делай этого везде — только при логине
    });
    if (!account || !account.password) return null;

    const ok = await hashingService.verifyPasswordWithStored(password, {
        derivedB64: account.password.hashB64,
        saltB64: account.password.saltB64,
        memory: account.password.memory,
        passes: account.password.passes,
        parallelism: account.password.parallelism,
        tagLength: account.password.tagLength,
    });

    if (!ok) return null;

    // опционально: rehash-on-login
    const needRehash =
        account.password.memory !== hashingService.defaults.memory ||
        account.password.passes !== hashingService.defaults.passes ||
        account.password.parallelism !== hashingService.defaults.parallelism;

    if (needRehash) {
        const newHashed = await hashingService.hashPasswordBuiltinArgon2id(password);
        await prisma.password.update({
            where: { accountId: account.id },
            data: {
                hashB64: newHashed.derivedB64,
                saltB64: newHashed.saltB64,
                memory: newHashed.memory,
                passes: newHashed.passes,
                parallelism: newHashed.parallelism,
                tagLength: newHashed.tagLength,
            },
        });
    }

    return account;
}
