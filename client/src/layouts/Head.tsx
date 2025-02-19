import opengraphUrl from "@/assets/opengraph.png";
import logoUrl from "@/assets/thumb-aiceo.png";

// Default <head> (can be overridden by pages)

export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="「みんなのAI社長」は、質問に答えるだけで9人の社長からアドバイスがもらえる チャットアプリです。気軽に相談しながら、社長たちの考え方やエピソードに触れることができます。悩みを解決しつつ、経営者の人生を感じる新しい体験をぜひお楽しみください"
      />
      <meta property="og:title" content="みんなのAI社長" />
      <meta
        property="og:description"
        content="「みんなのAI社長」は、質問に答えるだけで9人の社長からアドバイスがもらえる チャットアプリです。気軽に相談しながら、社長たちの考え方やエピソードに触れることができます。悩みを解決しつつ、経営者の人生を感じる新しい体験をぜひお楽しみください"
      />
      <meta property="og:image" content={opengraphUrl} />
      <link rel="icon" href={logoUrl} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
