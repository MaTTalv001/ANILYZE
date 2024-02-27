// TwitterTimeline.tsx
import { useEffect } from "react";

const TwitterTimeline = ({ twitterUrl }: { twitterUrl: string }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="h-96 overflow-y-auto">
        <a className="twitter-timeline" href={twitterUrl}>
          Tweets by {twitterUrl.split("/").pop()}
        </a>
      </div>
    </>
  );
};

export default TwitterTimeline;
