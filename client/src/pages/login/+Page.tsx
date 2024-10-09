import { getApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useEffect, useRef } from "react";
import { navigate } from "vike/client/router";

export default function Page() {
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
    const signin = async () => {
      await signInWithPopup(getAuth(getApp()), new GoogleAuthProvider());
      navigate("/");
    };
    signin();
  }, []);

  return <>Authenticating...</>;
}
