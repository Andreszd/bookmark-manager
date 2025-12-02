// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  imgsBucketUrl: 'http://localhost:3000',
  apiUrl: 'http://localhost:3000/api',
  extensionId: 'bmhimodaabgndjeghigcgdijcgbpnhne',
  googleOauthUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  googleCallbackUrl: 'http://localhost:4200/auth/google',
  clientId:
    '538206183030-uscsvfh3nbskr41iipu2q9e9bk42kp2t.apps.googleusercontent.com',
  oAuthScopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
