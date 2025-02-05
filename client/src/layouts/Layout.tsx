import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import clsx from "clsx";
import type React from "react";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

import iconBack from "@/assets/icon-back.svg";
import titleSVG from "@/assets/title.svg";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageContext = usePageContext();
  const isHome = pageContext.urlParsed.pathname === "/";
  const isCEOs = pageContext.urlParsed.pathname.startsWith("/ceos/");

  const onReturnClick = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <div
      className={twMerge(
        clsx("container mx-auto prose max-w-full prose-img:m-0", {
          "bg-secondary": isHome,
          "bg-foreground": isCEOs,
          "min-h-screen": isHome,
        }),
      )}
    >
      {!isHome && (
        <Navbar
          className="bg-secondary px-0"
          classNames={{
            base: "md:h-24",
          }}
        >
          <NavbarBrand className="">
            <Image className="md:w-1/2" src={titleSVG} alt="みんなのAI社長" />
          </NavbarBrand>
          <NavbarContent justify="end">
            <Button
              className="bg-white text-primary rounded-full font-bold h-6 md:py-6 min-w-0"
              onPress={onReturnClick}
            >
              <div className="hidden md:block text-medium h-6">最初に戻る</div>
              <div className="h-4">
                <img src={iconBack} alt="Back" />
              </div>
            </Button>
          </NavbarContent>
        </Navbar>
      )}
      <div
        className={twMerge(
          clsx("grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 h-full", {
            "h-screen": isHome,
          }),
        )}
      >
        {children}
      </div>
    </div>
  );
}
