import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import useSiteMetadata from "../hooks/SiteMetadata";
import PageMenu from "../components/PageMenu";

const VideoPlayer = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const videoUrlParam = queryParams.get('video');
  const inputElement = useRef(null);
  const playerRef = useRef(null);
  const [youtubelink, setYoutubelink] = useState(videoUrlParam || "");
  const [showShareDialog, setShowShareDialog] = useState(false);

  const { featureOptions, proOptions } = useSiteMetadata();
  const { showBranding } = proOptions;
  const { showNav } = featureOptions;

  const handleInputChange = (event) => {
    const { value } = event.target;
    setYoutubelink(value);
    updateQueryString(value);

    const pirateVideoElement = document.getElementById('VideoPlayer');
    if (pirateVideoElement) {
      pirateVideoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setYoutubelink("");
    updateQueryString("");
  };

  const updateQueryString = (value) => {
    const newUrl = `${window.location.pathname}?video=${encodeURIComponent(value)}`;
    window.history.pushState({}, '', newUrl);
  };

  function isRunningStandalone() {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(display-mode: standalone)').matches;
    }
    return false;
  }

  const handleShareButtonClick = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) { 
        navigator.share({
          title: 'PIRATE',
          url: window.location.href
        }).then(() => {
          console.log('Thanks for being a Pirate!');
        })
        .catch(console.error);
      } else {
        setShowShareDialog(true);
      }
    }
  };

  const closeShareDialog = () => {
    setShowShareDialog(false);
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleCopyAndShareButtonClick = () => {
    copyToClipboard();
    handleShareButtonClick();
  };

  return (
    <>
      <div id="piratevideo" className='player-wrapper' style={{ display:'grid', placeContent:'', width:'100vw', transition: 'all 1s ease-in-out'}}>

        <div className="form-container controller font" style={{position:'relative', zIndex:'3', top:'0', height:'auto', width:'100vw', margin:'0 auto', marginTop: showNav ? '0' : '0', transition: 'all 1s ease-in-out', background:'var(--theme-ui-colors-headerColor)'}}>
          <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop:'1.5vh' }}>
            <form className="youtubeform frontdrop" onSubmit={handleSubmit} id="youtubeform" name="youtubeform">

              {isRunningStandalone() ? (
                <>
                  <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                    <ImYoutube2 style={{ fontSize: '50px' }} />
                  </a>
                  <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                    <FaFacebookSquare style={{ fontSize: '30px' }} />
                  </a>
                  <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                    <FaTwitch style={{ fontSize: '30px' }} />
                  </a>
                </>
              ) : (
                <></>
              )}

              <input
                ref={inputElement}
                id="youtubelink-input"
                type="text"
                name="youtubelink"
                value={youtubelink}
                onChange={handleInputChange}
                style={{ padding: '.5vh 1vw', width:'100%', maxWidth: '800px', fontSize:'clamp(.8rem,1.5vw,2rem)', transition: 'all 1s ease-in-out' }}
                placeholder="Paste Video Link"
                className="youtubelinker"
                aria-label="Paste Video Link"
              />
              <button aria-label="Reset" type="reset" onClick={handleReset} style={{ color: '', fontSize:'clamp(.8rem,1.5vw,2rem)', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
                Reset
              </button>

              <button aria-label="Copy Link" onClick={handleCopyAndShareButtonClick} style={{ display: "flex", gap:'.5vw', justifyContent: "center", padding: ".5vh .8vw", maxHeight:"", margin: "0 auto", textAlign:'center', fontSize:'14px', fontWeight:'light', textShadow:'0 1px 0 #000' }} className="button font print">
                <svg style={{maxWidth:'30px', maxHeight:'30px'}}>
                  <use href="#share-icon"></use>
                </svg>   Copy Link
              </button>

            </form>
          </div>
        </div>

        <svg className="hidden">
          <defs>
            <symbol id="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></symbol>
          </defs>
        </svg>

        {showBranding ? <PageMenu /> : null}

        <ReactPlayer
          ref={playerRef}
          allow="web-share"
          style={{
            position: 'relative', top: '0', margin: '0 auto 0 auto', zIndex: '1',  overflow: 'hidden', width: '100vw', minHeight: '', height: '100%', background: 'transparent',
            transition: 'all 1s ease-in-out',
          }}
          width="100%"
          height="100%"
          url={youtubelink}
          playing={true}
          controls={true}
          playsinline
          config={{
            youtube: {
              playerVars: { showinfo: false, autoplay: false, controls: true, start: "0", end: null, mute: false, loop: false }
            },
          }}
        />
      </div>
    </>
  );
};

export default VideoPlayer;
