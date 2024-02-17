import React from "react";

import PageMenu from "../components/PageMenu";
import Layout from "../components/siteLayout";
import Seo from "../components/seo";
import { Helmet } from "react-helmet";
import useSiteMetadata from "../hooks/SiteMetadata";
import VideoPlayer from "../components/VideoPlayer";
const VideoPage = ({ location }) => {

  const { proOptions } = useSiteMetadata();
  const { showBranding } = proOptions;
  
      return (
        <Layout>
          <Helmet>
            <body id="body" className="youtube"/>
          </Helmet>
          <Seo
            title="Pirate Video Player"
            description="Pirate Video Player"
          />
          <>
          <div className='player-wrapper'>
            {showBranding ? (
              <PageMenu />
            ) : (
              ""
            )}
<VideoPlayer location={location} />
</div>
    
    </>
    </Layout>

  );
};

export default VideoPage;