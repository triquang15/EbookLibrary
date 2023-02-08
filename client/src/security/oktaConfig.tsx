export const oktaConfig = {
    clientId: '0oa89egi7kdoKoKVY5d7',
    issuer: 'https://dev-04101482.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpCheck: true,
}