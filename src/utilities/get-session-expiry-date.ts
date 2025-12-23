export function getSessionExpiryUtil(days = 30) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    return expires;
}
