import React, { useState, useRef, useEffect } from "react";

import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare  } from "react-icons/fa";
// import {Link} from "gatsby"
// import { RiQuestionLine, RiCloseCircleFill } from "react-icons/ri"
// import PirateLogo from "../img/logo.svg"
import PageMenu from "./PageMenu"
// import Layout from "../components/siteLayout"
// import Seo from "../components/seo";
// import { Helmet } from "react-helmet";
// import useSiteMetadata from "../hooks/SiteMetadata"
// import Player from "../components/Player";
// import PropTypes from "prop-types";
// import { MdPlayArrow } from "react-icons/md"
// import { MdPause } from "react-icons/md"
// import { MdVolumeOff } from "react-icons/md"
// // import { MdVolumeDown } from "react-icons/md"
// import { MdVolumeUp } from "react-icons/md"
// import { StaticImage } from "gatsby-plugin-image"
// import { ImPlay } from "react-icons/im"


// import { IoArrowRedoSharp, IoArrowUndoSharp } from "react-icons/io5"

const VideoPlayer = () => {


  // const { language } = useSiteMetadata();
  // const { dicClickToView } = language;


  // const { iconimage } = useSiteMetadata()

  const [youtubelink, setYoutubelink] = useState("");

  const fillFormFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setYoutubelink(clipboardText);
    } catch (error) {
      console.error("Error reading clipboard:", error);
    }
  };

  useEffect(() => {
    fillFormFromClipboard();
  }, []); // Empty dependency array to run the effect only once

  const handleInputChange = (event) => {
    const { value } = event.target;
    setYoutubelink(value);
  };

  const handleInputClick = () => {
    fillFormFromClipboard(); // Trigger clipboard check manually
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add any additional logic you need on form submission
  };

  const inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.onfocus = () => {
      // window.scrollBy(0, 0);
      document.body.scrollTop = 0;
    };
    inputElement.current.onblur = () => {
      // window.scrollBy(0, 0);
      document.body.scrollTop = 0;
    };
  });




  const playerRef = useRef(null);


  const finalUrl = youtubelink

  const YouTubeStart = "0"
  const YouTubeEnd = null
  const YouTubeMute = false
  const YouTubeAutostart = true
  const YoutubeLoop = false
  // const Suggestion2 = frontmatter.youtube.youtubersuggestion2
  // const Suggestion3 = frontmatter.youtube.youtubersuggestion3
  

  





// const [showControls, setShowControls] = useState(false);
  // const [count, setCount] = useState(0);
  // const [anchorEl, setAnchorEl] = React.useState(null);

    // const Playing  = useState(true);
    



  return (
    
    <>

{/* <Layout>
<Helmet>
    <body id="body" className="youtube"/>
  </Helmet>
<Seo
    title="AdFree Video Player"
    description="Adfree Video Player"
  /> */}

{/* <PageMenu /> */}

      <div className='player-wrapper' style={{position:'relative'}}>

      
  

        {/* <Player /> */}
          <ReactPlayer
              allow="web-share"
              ref={playerRef}
              style={{
                position: 'relative', top:'0', margin: '0 auto 0 auto', zIndex: '1', aspectRatio:'16/9', overflow:'hidden', width:'100vw', minHeight:'90%', height:'100%', background:'transparent'}}
              width="100%"
              height="100%"
              url={finalUrl}
              playing={"true"}
              controls={"true"}
              playsinline
              config={{
                  youtube: {
                    playerVars: { showinfo:false, autoplay:YouTubeAutostart, controls:true, start:YouTubeStart, end:YouTubeEnd, mute:YouTubeMute, loop:YoutubeLoop }
                  },
              }}

          
          />
      
      <PageMenu />
      <div className="form-container controller" style={{position:'relative', zindex:'10', top:'0', marginTop:'0', height:'', padding:'2vh 2%', width:'100vw', background:'var(--theme-ui-colors-headerColor)'}}>
          <div style={{ maxWidth:'800px', margin:'0 auto'}}>
          <form className="youtubeform frontdrop" onSubmit={handleSubmit} id="youtubeform" name="youtubeform">
      
              <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <ImYoutube2 style={{ fontSize:'50px' }} />
              </a>
          
  
              <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <FaFacebookSquare style={{ fontSize: '30px' }} />
              </a>

              <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <FaTwitch style={{ fontSize: '30px' }} />
              </a>
            <input
            ref={inputElement}
            id="youtubelink-input"
              type="text"
              name="youtubelink"
              value={youtubelink}
              onInput={handleInputChange}
              
              onClick={handleInputClick}
              // onChange={handleInputChange}
              style={{ padding: '1vh 1vw', width:'100%', minWidth: '', outline: '1px solid #333', borderRadius: 'var(--theme-ui-colors-borderRadius)', color: 'var(--theme-ui-colors-siteColor)' }}
              placeholder="Paste Video Link"
              className="youtubelinker"
            />
            <button type="reset" onClick={() => setYoutubelink("")} style={{ fontSize: '90%', color: '', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
              Reset
            </button>
          </form>
          </div>
      </div>
      </div>

      {/* {CustomControls ? (
         <Controls
         ref={controlsRef}
         onPlayPause={handlePlayPause}
         playing={playing}
         played={played}
         onMute={handleMute}
         muted={muted}
       />
       
          ) : (
   ""
          )} */}

      {/* </Layout> */}

    </>
    
  );
};

export default VideoPlayer;