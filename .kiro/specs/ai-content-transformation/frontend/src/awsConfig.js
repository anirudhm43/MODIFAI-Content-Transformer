const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_8SO624JZS",
      userPoolClientId: "69ttd8e2m3ei18obtperb4pn0q",
      loginWith: {
        oauth: {
          domain: "us-east-18so624jzs.auth.us-east-1.amazoncognito.com",
          scopes: ["openid"],
          redirectSignIn: "https://modifai-content-transformer.vercel.app/",
          redirectSignOut: "https://modifai-content-transformer.vercel.app/",
          responseType: "code",
        },
      },
    },
  },
};

export default awsconfig;