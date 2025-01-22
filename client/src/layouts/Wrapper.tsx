import "./styles.css";

import { HeroUIProvider } from "@heroui/system";
import { navigate } from "vike/client/router";

import { FirebaseProvider, useFirebase } from "@/hooks/firebase";
import { FrontendServiceProvider } from "@/hooks/rpc";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProvider>
      <FrontendServiceProvider>
        <HeroUIProvider navigate={navigate}>{children}</HeroUIProvider>
      </FrontendServiceProvider>
    </FirebaseProvider>
  );
}
