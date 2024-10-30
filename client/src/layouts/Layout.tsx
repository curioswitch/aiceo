import { Button } from "@nextui-org/button";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import clsx from "clsx";
import type React from "react";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

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
        clsx("container mx-auto prose max-w-7xl prose-img:m-0 h-full", {
          "bg-green-700": isHome,
          "h-screen": isHome,
        }),
      )}
    >
      {!isHome && (
        <Navbar className="bg-green-700">
          <NavbarBrand className="text-pink-200 text-2xl">
            みんなのAI社長
          </NavbarBrand>
          <NavbarContent justify="end">
            <Button color="default" onPress={onReturnClick}>
              最初に戻る
            </Button>
          </NavbarContent>
        </Navbar>
      )}
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 h-full">
        {children}
      </div>
    </div>
  );
}
