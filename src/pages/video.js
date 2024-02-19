import React from "react";
// import PageMenu from "../components/PageMenu";
import Layout from "../components/siteLayout";
import Seo from "../components/seo";
import { Helmet } from "react-helmet";
// import useSiteMetadata from "../hooks/SiteMetadata";
import VideoPlayer from "../components/VideoPlayer";

const VideoPage = ({ location }) => {
  // const { proOptions } = useSiteMetadata();
  // const { showBranding } = proOptions;

  return (
    <Layout>
      <Helmet>
        <body id="body" className="youtube" />
      </Helmet>
      <SeoWrapper location={location} />
      <div className='player-wrapper'>
        {/* {showBranding ? (
          <PageMenu />
        ) : (
          null
        )} */}
        <VideoPlayer location={location} />
      </div>
    </Layout>
  );
};

const SeoWrapper = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const videoUrlParam = queryParams.get('video');

  const extractVideoId = (url) => {
    // Check if the URL is null or undefined
    if (!url) {
      return null;
    }
/* eslint-disable no-useless-escape */
    // Regular expression to extract video ID from YouTube URL
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);

    // If a match is found, return the video ID, otherwise return null
    const videoId = match ? match[1] : null;
    console.log('Video ID:', videoId);
    return videoId;
  };
/* eslint-enable no-useless-escape */
  const videoId = extractVideoId(videoUrlParam);

  return (
    <Seo
      title="Play Video"
      description="Pirate: revolutionizing the web"
      image={videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null}
    />
  );
};

export default VideoPage;