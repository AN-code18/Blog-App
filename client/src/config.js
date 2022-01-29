const oktaAuthConfig = {
  
    issuer: 'https://dev-27079149.okta.com/oauth2/default',
    clientId: '0oa3r43lopgp0VNFA5d7',
    redirectUri: window.location.origin + '/login/callback',
  };
  
  const oktaSignInConfig = {
    baseUrl: 'https://dev-27079149.okta.com',
    clientId: '0oa3r43lopgp0VNFA5d7',
    redirectUri: window.location.origin + '/login/callback',
    authParams: {
     
    }
    // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
  };
  
  export { oktaAuthConfig, oktaSignInConfig };