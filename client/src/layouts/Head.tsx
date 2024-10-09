import logoUrl from "@/assets/logo.svg";

// Default <head> (can be overridden by pages)

export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="A matching service with CEOs." />
      <link rel="icon" href={logoUrl} />
    </>
  );
}
