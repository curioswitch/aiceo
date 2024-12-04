import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

export default function Page() {
  const pageContext = usePageContext();
  useEffect(() => {
    navigate(pageContext.urlOriginal);
  }, [pageContext]);
  return undefined;
}
