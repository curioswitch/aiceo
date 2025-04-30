export function getFirebaseConfig() {
  // Note, switch statement does not seem to allow optimizing away the unused
  // config so we use if statements.

  if (import.meta.env.PUBLIC_ENV__FIREBASE_APP === "aiceo-dev") {
    return {
      apiKey: "AIzaSyBATzL2uTOayvjWtg0qJc4kWRVCfLJBUDM",
      authDomain: "alpha.minnano-shacho.curioswitch.org",
      projectId: "aiceo-dev",
      storageBucket: "aiceo-dev.appspot.com",
      messagingSenderId: "285404307541",
      appId: "1:285404307541:web:53f0c935db42c990ae34dc",
    };
  }

  if (import.meta.env.PUBLIC_ENV__FIREBASE_APP === "aiceo-prod") {
    return {
      apiKey: "AIzaSyBNo8fBkGAsX1qhJ7qUYSDq_dtOlOxSB7Y",
      authDomain: "minnano-shacho.curioswitch.org",
      projectId: "aiceo-prod",
      storageBucket: "aiceo-prod.appspot.com",
      messagingSenderId: "1004160178879",
      appId: "1:1004160178879:web:3916992cc6acefba77840a",
    };
  }

  throw new Error("PUBLIC_ENV__FIREBASE_APP must be configured");
}
