import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import PageMenu from "../components/PageMenu"

const VideoPlayer = () => {
  const inputElement = useRef(null);
  const playerRef = useRef(null);
  const [youtubelink, setYoutubelink] = useState("");

  useEffect(() => {
    const inputRef = inputElement.current;
    inputRef.onfocus = () => {
      document.body.scrollTop = 0;
    };
    inputRef.onblur = () => {
      document.body.scrollTop = 0;
    };

    return () => {
      inputRef.onfocus = null;
      inputRef.onblur = null;
    };
  }, []);

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
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setYoutubelink(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add any additional logic you need on form submission
  };

  return (
    <>
      <div className='player-wrapper' style={{}}>
        <ReactPlayer
          ref={playerRef}
          allow="web-share"
          style={{
            position: 'relative', top: '0', margin: '0 auto 0 auto', zIndex: '1', aspectRatio: '16/9', overflow: 'hidden', width: '100vw', minHeight: '90%', height: '100%', background: 'transparent'
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
        <PageMenu />
        <div className="form-container controller font" style={{position:'relative', zIndex:'2', top:'0', marginTop:'0', height:'', padding:'2vh 2%', width:'100vw', background:'var(--theme-ui-colors-headerColor)'}}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form className="youtubeform frontdrop" onSubmit={handleSubmit}id="youtubeform" name="youtubeform">
              <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                <ImYoutube2 style={{ fontSize: '50px' }} />
              </a>
              <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                <FaFacebookSquare style={{ fontSize: '30px' }} />
              </a>
              <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                <FaTwitch style={{ fontSize: '30px' }} />
              </a>
              <input
                ref={inputElement}
                id="youtubelink-input"
                type="text"
                name="youtubelink"
                value={youtubelink}
                onChange={handleInputChange}
                style={{ padding: '.5vh 1vw', width:'100%', minWidth: '', outline: '1px solid #333', borderRadius: 'var(--theme-ui-colors-borderRadius)', color: 'var(--theme-ui-colors-siteColor)', fontSize:'clamp(.8rem,1.5vw,2rem)' }}
              placeholder="Paste Video Link"
              className="youtubelinker"
              />
              <button type="reset" onClick={() => setYoutubelink("")} style={{ color: '', fontSize:'clamp(.8rem,1.5vw,2rem)', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
