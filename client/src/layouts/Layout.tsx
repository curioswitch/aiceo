import { Button } from "@nextui-org/button";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import clsx from "clsx";
import type React from "react";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

import iconBack from "@/assets/icon-back.svg";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageContext = usePageContext();
  const isHome = pageContext.urlParsed.pathname === "/";

  const onReturnClick = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <div
      className={twMerge(
        clsx("container mx-auto prose max-w-7xl prose-img:m-0", {
          "bg-primary": isHome,
          "min-h-screen": isHome,
        }),
      )}
    >
      {!isHome && (
        <Navbar
          className="bg-primary"
          classNames={{
            base: "md:h-24",
          }}
        >
          <NavbarBrand className="text-secondary text-2xl md:text-3xl tracking-[0.3em]">
            みんなのAI社長
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
