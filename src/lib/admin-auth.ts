export function verifyAdminKey(inputKey: string): boolean {
    return inputKey === process.env.ADMIN_SECRET_KEY;
}
