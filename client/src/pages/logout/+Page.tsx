import { getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useRef } from "react";
import { navigate } from "vike/client/router";

export default function Page() {
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
    const signout = async () => {
      await signOut(getAuth(getApp()));
      window.location.href = "https://curioswitch.org";
    };
    signout();
  }, []);

  return <>Signing out...</>;
}
