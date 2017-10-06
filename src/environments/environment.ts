// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  rootUrl: 'http://www.russellsnyder.io/',
  siteId: 641,
  firebase: {
    apiKey: "AIzaSyCpcHrovpppCQIUW257cE_deWg4tw1mC9o",
    authDomain: "spliss-download-codes.firebaseapp.com",
    databaseURL: "https://spliss-download-codes.firebaseio.com",
    projectId: "spliss-download-codes",
    storageBucket: "",
    messagingSenderId: "31306954767"
  }
};
