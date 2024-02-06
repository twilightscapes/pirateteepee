import React, { useState, useRef, useEffect, forwardRef } from "react";

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
import PropTypes from "prop-types";
import { MdPlayArrow } from "react-icons/md"
import { MdPause } from "react-icons/md"
import { MdVolumeOff } from "react-icons/md"
// import { MdVolumeDown } from "react-icons/md"
import { MdVolumeUp } from "react-icons/md"
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
      window.scrollBy(0, 0);
      document.body.scrollTop = 0;
    };
  });







  const finalUrl = youtubelink

  const YouTubeStart = "0"
  const YouTubeEnd = null
  const YouTubeMute = false
  const YouTubeControls = true
  const YouTubeAutostart = true
  const CustomControls = true
  const YoutubeLoop = false
  // const Suggestion2 = frontmatter.youtube.youtubersuggestion2
  // const Suggestion3 = frontmatter.youtube.youtubersuggestion3
  

  
  const ClickToPlay = false
  





// const [showControls, setShowControls] = useState(false);
  // const [count, setCount] = useState(0);
  // const [anchorEl, setAnchorEl] = React.useState(null);

    // const Playing  = useState(true);
    const [state, setState] = useState({
      playing: YouTubeAutostart,
      controls: YouTubeControls,
      light: ClickToPlay,
      muted: YouTubeMute,
      loop: YoutubeLoop,
    });
  
    const playerRef = useRef(null);
    const controlsRef = useRef(null);
  
    const {
      playing,
      controls,
      light,
      muted,
      loop,
      played,
    } = state;
  
    const handlePlayPause = () => {
      setState({ ...state, playing: !state.playing });
    };
  
    const handleMute = () => {
      setState({ ...state, muted: !state.muted });
    };
  
  
  
  
  
  
    const Controls = forwardRef(
      (
        {
          // onSeek,
          // onSeekMouseDown,
          // onSeekMouseUp,
          // onDuration,
          // onRewind,
          onPlayPause,
          // onFastForward,
          playing,
          // played,
          // elapsedTime,
          // totalDuration,
          onMute,
          muted,
          // onVolumeSeekDown,
          // onChangeDispayFormat,
          // playbackRate,
          // onPlaybackRateChange,
          // onToggleFullScreen,
          volume,
          // onVolumeChange,
          // onBookmark,
        },
        ref
      ) => {
        // const classes = useStyles();
        // const [anchorEl, setAnchorEl] = React.useState(null);
        // const handleClick = (event) => {
        //   setAnchorEl(event.currentTarget);
        // };
    
        // const handleClose = () => {
        //   setAnchorEl(null);
        // };
    
        // const open = Boolean(anchorEl);
        // const id = open ? "simple-popover" : undefined;
    
        // const { iconimage } = useSiteMetadata()
    
    
        return (
    
    <div>
    
    
    
          {playing ? (
  ""
          ) : (
  
    
    
  
     
  
  
  <div className="videohide1 554 pane1" style={{position:'absolute', height:'auto', maxHeight:'85%', aspectRatio:'', width:'100%', zIndex:'3', top:'0', right:'0', textAlign:'center', display:'grid', placeContent:'', justifyContent:'', color:'var(--theme-ui-colors-text)', fontFamily:'Verdana, Sans-Serif, System', border:'0px solid red' }}>
  
  
  
  
  <div aria-label="Click To Play" className="clickplays videohide 555" style={{position:'relative', zIndex:'', top:'0', border:'0px  solid blue', width:'100%', height:'', minHeight:'300px', aspectRatio:'', maxHeight:'', fontSize:'', textAlign:'center', display:'grid', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center', padding:'2vh 0 0 0', background:'', color:'#ddd', transition:'all 2s ease-in-out', cursor:'pointer'}}>
  
  

  
           {/* <div style={{display:'grid', placeContent:'center', position:'relative', zindex:'1', fontWeight:'bold', padding:'3% 0 0 0', fontSize:'clamp(.6rem, 1.4vw, 2rem)', width:'100%', maxWidth:'25vw', height:'', border:'0px solid', borderRadius:'12px', margin:'0 auto 0 auto', opacity:'.99', textShadow:'2px 2px 2px black', color:'#fff' }}>


<img className="homepage-bg" src={iconimage} width="250px" height="150px" alt="UrbanFetish" style={{ width:'', margin:'120px auto 0 auto', filter:'drop-shadow(2px 2px 2px #000)', background:'transparent !important', position:'relative', top:''}} />



  <ImPlay style={{margin:'0 auto', width:'50%', fontSize:'clamp(2rem, 4.4vw, 3rem)', filter:'drop-shadow(0px 0px 12px #fff',}} />
  {dicClickToView}
  </div> */}
  
  
  <button aria-label="Video Play/Pause Button"
          onClick={onPlayPause}
          className="videohide 644 pane2" 
          style={{
           color:'#ddd',
           width:'100%', 
           height:'auto',
           display:'grid',
           placeContent:'center',
           position:'absolute',
           aspectRatio:'16/9',
           top:'',left:'0',right:'0',bottom:'0',
           border:'0px solid blue',
           zindex:'1'
          }}
        ></button>
        
        
        </div>
        </div>

   )}

    
   
    
    
          
    
    
    <div ref={ref} className="controlsbox" style={{width:'', height:'', border:'0px solid blue', }}>
    
  <button
          aria-label="Video Play/Pause Button"
          onClick={onPlayPause}
          className="videohide 679 pane3" 
          style={{
           color:'#ddd',
           width:'99vw', 
           height:'auto',
           display:'block',
           placeContent:'',
           aspectRatio:'16/9',
           bottom:'0',
           left:'0',
           right:'0',
           border:'0px solid yellow',
           zindex:'1', 
           cursor:'pointer',
           position:'absolute'
          //  animation: 'fadeout 4s forwards'
          }}
        ></button>
  
  
    <div className="vidcontrols">
                    <button
                      onClick={onPlayPause}
                      className="controls panel" 
                      style={{
                        backgroundColor:'rgba(0,0,0, 0.6)',
                        color:'#999',
                        borderRadius:'', overFlow:'hidden'
                    }}
                    >
                      {/* <MdPlayArrow style={{fontSize:'50px', position:'absolute'}}  /> */}
                      {playing ? (
                        
                        <MdPause className="hudicon" style={{}} />
                        
                      ) : (
                  
                  <MdPlayArrow className="hudicon" style={{}}  />
                  
                      )}
                    </button>
    
                    <button
                      // onClick={() => setState({ ...state, muted: !state.muted })}
                      onClick={onMute}
                      className="controls panel"
                      style={{
                        backgroundColor:'rgba(0,0,0, 0.6)',
                        color:'#999',
                        borderRadius:'', overFlow:'hidden'
                    }}
                    >
                      {muted ? (
                        <MdVolumeOff className="hudicon" fontSize="" style={{}}  />
                      ) : volume > 0.5 ? (
                        <MdVolumeUp className="hudicon" fontSize="" style={{}}  />
                      ) : (
                        <MdVolumeUp className="hudicon" fontSize="" style={{}}  />
                      )}
                    </button>
    </div>
  
          </div>
          </div>
        );
      }
    );
    
    Controls.propTypes = {
      onSeek: PropTypes.func,
      onSeekMouseDown: PropTypes.func,
      onSeekMouseUp: PropTypes.func,
      onDuration: PropTypes.func,
      onRewind: PropTypes.func,
      onPlayPause: PropTypes.func,
      onFastForward: PropTypes.func,
      onVolumeSeekDown: PropTypes.func,
      onChangeDispayFormat: PropTypes.func,
      onPlaybackRateChange: PropTypes.func,
      onToggleFullScreen: PropTypes.func,
      onMute: PropTypes.func,
      playing: PropTypes.bool,
      light: PropTypes.bool,
      played: PropTypes.number,
      elapsedTime: PropTypes.string,
      totalDuration: PropTypes.string,
      muted: PropTypes.bool,
      playbackRate: PropTypes.number,
    };



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

<PageMenu />

      <div className='player-wrapper' style={{marginTop:''}}>

      
  

        {/* <Player /> */}
          <ReactPlayer
              allow="web-share"
              ref={playerRef}
              style={{
                position: 'relative', top:'0', margin: '0 auto 0 auto', zIndex: '0', aspectRatio:'16/9', overflow:'hidden', width:'100vw', minHeight:'', height:'', background:'transparent'}}
              width="100%"
              height="100%"
              url={finalUrl}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              muted={muted}
              playsinline
              config={{
                  youtube: {
                    playerVars: { showinfo:false, autoplay:YouTubeAutostart, controls:YouTubeControls, start:YouTubeStart, end:YouTubeEnd, mute:YouTubeMute, loop:YoutubeLoop }
                  },
              }}
            playIcon={
              <div style={{position:'absolute',
              backgroundColor:'rgba(0,0,0,0.6)',
               width:'100vw', height:'100%', minHeight:'40vh', maxHeight:'85vh', zIndex:'0', top:'0', right:'0', textAlign:'center', display:'grid', placeContent:'center', justifyContent:'center', 
              color:'#ddd',
              fontFamily:'Verdana, Sans-Serif, System' }}>
<button aria-label="Click To Play" className="clickplays videohide 1042" style={{position:'relative', zIndex:'', top:'0', border:'0px  solid red', width:'100vw', background:'transparent', color:'', fontSize:'18px', textAlign:'center', display:'', flexDirection:'column', verticalAlign:'center', justifyContent:'center', alignItems:'center', aspectRatio:'16/9'}}>
</button>

<button
aria-label="Video Play/Pause Button"
className="" 
style={{
color:'#ddd',
width:'100vw', 
height:'',
display:'grid',
placeContent:'center',
position:'fixed',
top:'0',left:'0',right:'0',bottom:'0',
zindex:'1'
}}
></button>

          </div>
          }
          
          />
      </div>
    
      <div className="form-container controller" style={{position:'relative', zindex:'10', marginTop:'0', height:'', padding:'2vh 2%', width:'100vw', background:'var(--theme-ui-colors-headerColor)'}}>
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