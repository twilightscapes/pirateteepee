import React from "react";
import Layout from "../components/siteLayout";
import Seo from "../components/seo";
import VideoPlayer from "../components/VideoPlayer";

import { Helmet } from "react-helmet"
const VideoPage = ({ location }) => {
  return (
    <Layout>
      <Helmet>
        <body id="body" className="youtube" />
      </Helmet>
      <SeoWrapper location={location} />
      <div className='player-wrapper'>
        <VideoPlayer location={location} />
      </div>
    </Layout>
  );
};



const SeoWrapper = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const videoUrlParam = queryParams.get('video');
  const seoTitle = queryParams.get('seoTitle') || "Play Video ▶"; // Use the seoTitle from query params or default value

  // Function to extract video ID from YouTube URL
  const extractVideoId = (url) => {
    if (!url) {
      return null;
    }
    /* eslint-disable no-useless-escape */
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    const videoId = match ? match[1] : null;
    return videoId;
  };
  /* eslint-enable no-useless-escape */

  const videoId = extractVideoId(videoUrlParam);

  return (
    <Seo
      title={seoTitle}
      description="Pirate: revolutionizing the web"
      image={videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null}
    />
  );
};

export default VideoPage;
