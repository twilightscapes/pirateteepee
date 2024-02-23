import React, { useState, useRef, useEffect, useMemo } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import useSiteMetadata from "../hooks/SiteMetadata";
import PageMenu from "../components/PageMenu";

const VideoPlayer = ({ location }) => {


    



    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const proParam = queryParams.get('pro') === 'true';

    const videoUrlParam = queryParams.get('video');
    const startTimeParam = queryParams.get('start');
    const stopTimeParam = queryParams.get('stop');
    const loopParam = queryParams.get('loop') === 'true';
    const muteParam = queryParams.get('mute') === 'true';
    const controlsParam = queryParams.get('controls') === 'true';
    const autoplayParam = queryParams.get('autoplay') === 'true'; // Retrieve autoplay parameter

    const [showPro, setShowPro] = useState(proParam || (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('showPro'))) || false);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('showPro', JSON.stringify(showPro));
        }
    }, [showPro, proParam, queryParams]); 
    


    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('showPro', JSON.stringify(showPro));
            const storedShowPro = JSON.parse(localStorage.getItem('showPro'));
            const storedShowBlocker = queryParams.get('showBlocker') === 'true';
            setShowPro(storedShowPro !== null ? storedShowPro : proParam);
            setShowBlocker(storedShowBlocker);
        }
    }, [showPro, proParam, queryParams]);

    const [shouldPause, setShouldPause] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const { featureOptions, proOptions } = useSiteMetadata();
    const { showNav } = featureOptions;
    const { showBranding } = proOptions

    const inputElement = useRef(null);
    const playerRef = useRef(null);
    const [youtubelink, setYoutubelink] = useState(videoUrlParam || "");
    const [startTime, setStartTime] = useState(() => {
        const parsedStartTime = parseFloat(startTimeParam);
        return isNaN(parsedStartTime) ? "" : parsedStartTime.toFixed(2);
    });
    
    const [stopTime, setStopTime] = useState(() => {
        const parsedStopTime = parseFloat(stopTimeParam);
        return isNaN(parsedStopTime) ? "" : parsedStopTime.toFixed(2);
    });
    
    
    
    
    const [loop, setLoop] = useState(loopParam);
    
    

    const [mute, setMute] = useState(muteParam);
    const [autoplay, setAutoplay] = useState(autoplayParam);

    const [controls, setControls] = useState(controlsParam !== undefined ? controlsParam : false || startTimeParam !== undefined || stopTimeParam !== undefined);
    const [copied, setCopied] = useState(false);

    const [showBlocker, setShowBlocker] = useState(queryParams.get('showBlocker') === 'true');

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        console.log("Input changed:", name, value); // Add this line to log the changed input and its value

        // Ensure start and stop values are correctly formatted to two decimal places
        let formattedValue = value.trim() !== '' && !isNaN(parseFloat(value)) ? parseFloat(value).toFixed(2) : '';
        console.log("Formatted value:", formattedValue); // Add this line to log the formatted value
    
        if (type === 'checkbox') {
            // Handle checkbox inputs
            if (name === 'mute') {
                setMute(checked);
            } else if (name === 'controls') {
                setControls(checked);
            } else if (name === 'autoplay') {
                setAutoplay(checked);
            } else {
                setLoop(checked);
            }
        } else {
            // Handle other inputs
            if (name === 'video') {
                setYoutubelink(value);
            } else if (name === 'start') {
                setStartTime(formattedValue);
            } else if (name === 'stop') {
                setStopTime(formattedValue);
            }
        }
    };
    

    
    
    
    useEffect(() => {
        // Initialize start and stop time to empty string if they're NaN
        if (isNaN(parseFloat(startTime))) {
            setStartTime("");
        }
        if (isNaN(parseFloat(stopTime))) {
            setStopTime("");
        }
    }, [startTime, stopTime]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidURL(youtubelink)) {
            // Validate start and stop times only if they are provided
            if ((startTime === "" || !isNaN(parseFloat(startTime))) && (stopTime === "" || !isNaN(parseFloat(stopTime)))) {
                updateQueryString({ video: youtubelink, start: startTime, stop: stopTime, loop, mute, controls });
            } else {
                alert('Please enter valid values for start and stop times.');
            }
        } else {
            alert('Please enter a valid URL for the video.');
        }
    };
    
    const handleReset = () => {
        setYoutubelink("");
        setStartTime("");
        setStopTime("");
        setLoop(false);
        setMute(false);
        setControls(true);
        updateQueryString({ video: "", start: "", stop: "", loop: false, mute: false, controls: true });
    };

    const copyToClipboard = () => {
        if (typeof window !== 'undefined') {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('video', youtubelink || '');
            newUrl.searchParams.set('start', startTime || '');
            newUrl.searchParams.set('stop', stopTime || '');
            newUrl.searchParams.set('loop', loop || '');
            newUrl.searchParams.set('mute', mute ? 'true' : 'false'); // Correctly set mute parameter
            newUrl.searchParams.set('controls', controls ? 'true' : 'false');
            newUrl.searchParams.set('showBlocker', showBlocker ? 'true' : 'false');
            newUrl.searchParams.set('autoplay', autoplay ? 'true' : 'false'); // Correctly set autoplay parameter
            navigator.clipboard.writeText(newUrl.toString())
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((error) => console.error("Error copying to clipboard:", error));
        }
    };
    
    
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
            }
        }
    };

    const handleCopyAndShareButtonClick = () => {
        const queryParams = new URLSearchParams();
        queryParams.set('video', youtubelink);
        queryParams.set('loop', loop);
        queryParams.set('mute', mute);
        queryParams.set('controls', controls);
        queryParams.set('showBlocker', queryParams.get('showBlocker') || showBlocker); // Include showBlocker parameter
    
        // Add start and stop times only if they are provided
        if (startTime) {
            queryParams.set('start', startTime);
        }
        if (stopTime) {
            queryParams.set('stop', stopTime);
        }

        
    
        const url = `${window.location.pathname}?${queryParams.toString()}`;
        copyToClipboard(url);
        handleShareButtonClick();

        
    };




    const handleStartFromPlayhead = () => {
        const currentTime = playerRef.current.getCurrentTime();
        setStartTime(currentTime.toString());
    };

    const handleEndFromPlayhead = () => {
        const currentTime = playerRef.current.getCurrentTime();
        setStopTime(currentTime.toString());
    };

    const updateQueryString = (values) => {
        const { video, start, stop, loop, mute, controls, showBlocker } = values;
    
        // Round start and stop values to two decimal places
        const formattedStart = parseFloat(start).toFixed(2);
        const formattedStop = parseFloat(stop).toFixed(2);
    
        // Construct the base URL with mandatory parameters
        let newUrl = `${window.location.pathname}?video=${encodeURIComponent(video)}&start=${encodeURIComponent(formattedStart)}&stop=${encodeURIComponent(formattedStop)}&loop=${loop}&mute=${mute}&controls=${controls}&autoplay=${autoplay}`; // Include autoplay parameter
    
        // Append showBlocker parameter if it's defined
        if (showBlocker !== undefined) {
            newUrl += `&showBlocker=${showBlocker}`;
        }
    
        // Update the query string
        window.history.pushState({}, '', newUrl);
    };
    
    

    const isValidURL = (url) => {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    };

    function isRunningStandalone() {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(display-mode: standalone)').matches;
        }
        return false;
    }

    const handleBlockerChange = (event) => {
        const checked = event.target.checked;
        setShowBlocker(checked);
        if (checked) {
            // Append showBlocker parameter to the query string
            updateQueryString({ showBlocker: checked });
        } else {
            // Remove showBlocker parameter from the query string
            const updatedQueryParams = new URLSearchParams(location.search);
            updatedQueryParams.delete('showBlocker');
            const newQueryString = updatedQueryParams.toString();
            const newUrl = `${window.location.pathname}${newQueryString ? `?${newQueryString}` : ''}`;
            window.history.pushState({}, '', newUrl);
        }
    };

    const isVideoActive = youtubelink !== "";


    useEffect(() => {
        // Initialize start and stop time to empty string if they're NaN
        if (isNaN(parseFloat(startTime))) {
            setStartTime("");
        }
        if (isNaN(parseFloat(stopTime))) {
            setStopTime("");
        }
    }, [startTime, stopTime]);

    useEffect(() => {
        setIsPlaying(!shouldPause && (loop || !stopTime || playerRef.current.getCurrentTime() < parseFloat(stopTime)));
    }, [loop, shouldPause, stopTime]);

    return (
        <>
              <div id="piratevideo" className='player-wrapper' style={{ display: 'grid', placeContent: '', width: '100vw', transition: 'all 1s ease-in-out' }}>



            {showPro ? (

<div className=" font" style={{ position: 'relative', zIndex: '3', top: '0', height: 'auto', width: '100vw', margin: '0 auto', marginTop: showNav ? '0' : '0', transition: 'all 1s ease-in-out', background: 'var(--theme-ui-colors-headerColor)' }}>

        


                <form className="youtubeform1 frontdrop1" onSubmit={handleSubmit} id="youtubeform" name="youtubeform" style={{display:'flex', justifyContent:'center', flexWrap:'wrap', alignItems:'center', width:'100vw', margin:'0 auto', gap:'2vw', padding:'1vh 2vw' }}>


<div id="bigbox" style={{ display: 'flex', flexFlow:'wrap', flexDirection:'', gap: '2vw', alignItems: 'center', width:'', border:'0px solid red' }}>


<div id="controls" style={{ display: 'flex', flexDirection:'row', gap: '2vw', alignItems: 'center', width:'' }}>

<div id="checkboxes" style={{ display: 'flex', flexDirection:'row', gap: '1.5vw', alignItems: 'center' }}>
                                <label htmlFor="loop-checkbox" style={{textAlign:'center', fontSize:'60%', display:'flex', flexDirection:'column', alignItems:'center'}}>Loop:
                                    <input
                                        aria-label="Set to loop"
                                        id="loop-checkbox"
                                        type="checkbox"
                                        name="loop"
                                        checked={loop}
                                        className="youtubelinker"
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>
                                <label htmlFor="mute-checkbox" style={{textAlign:'center', fontSize:'60%', display:'flex', flexDirection:'column', alignItems:'center'}}>Mute:
                                    <input
                                        aria-label="Set to mute"
                                        id="mute-checkbox"
                                        type="checkbox"
                                        name="mute"
                                        checked={mute}
                                        className="youtubelinker"
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>

                                
                                <label htmlFor="controls-checkbox" style={{textAlign:'center', fontSize:'50%', display:'flex', flexDirection:'column', alignItems:'center'}}>Controls:
                                    <input
                                        aria-label="Set to show controls"
                                        id="controls-checkbox"
                                        type="checkbox"
                                        name="controls"
                                        className="youtubelinker"
                                        checked={controls}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>

                            
                                <label htmlFor="blocker-checkbox" style={{textAlign:'center', fontSize:'60%', display:'flex', flexDirection:'column', alignItems:'center'}}>Block:
    <input
        aria-label="Block user interactions"
        id="blocker-checkbox"
        type="checkbox"
        className="youtubelinker"
        name="showBlocker"
        checked={showBlocker}
        onChange={handleBlockerChange}
        disabled={!isVideoActive}
        style={{maxWidth:'50px'}}
    />
</label>

<label htmlFor="autoplayCheckbox" style={{textAlign:'center', fontSize:'50%', display:'flex', flexDirection:'column', alignItems:'center'}}>Autoplay:
    <input
        type="checkbox"
        id="autoplayCheckbox"
        className="youtubelinker"
        checked={autoplay}
        onChange={(e) => setAutoplay(e.target.checked)}
        disabled={!isVideoActive}
    />
</label>


                            </div>

<div id="timers" style={{ display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center', width:'100%' }}>
<input
    aria-label="Start Time"
    id="start-input"
    className="youtubelinker"
    type="text"
    name="start"
    value={isNaN(parseFloat(startTime)) ? '' : parseFloat(startTime).toFixed(2)}
    onChange={handleInputChange}
    onClick={handleStartFromPlayhead}
    placeholder={!startTime && 'Start'} // Set placeholder to 'Start' if startTime is falsy
    disabled={!isVideoActive}
    style={{ maxWidth: '100px', fontSize: 'clamp(1rem,.8vw,1.3rem)', textAlign: 'center' }}
/>
<input
    aria-label="Stop Time"
    id="stop-input"
    className="youtubelinker"
    type="text"
    name="stop"
    value={isNaN(parseFloat(stopTime)) ? '' : parseFloat(stopTime).toFixed(2)}
    onChange={handleInputChange}
    onClick={handleEndFromPlayhead}
    placeholder={!stopTime && 'Stop'} // Set placeholder to 'Stop' if stopTime is falsy
    disabled={!isVideoActive}
    style={{ maxWidth: '100px', fontSize: 'clamp(1rem,.8vw,1.4rem)', textAlign: 'center' }}
/>



                            </div>

</div>


<div id="pastebox" style={{ display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center', width:'', margin:'', border:'0px solid red' }}>
                            <input
                                ref={inputElement}
                                id="youtubelink-input"
                                type="text"
                                name="video"
                                value={youtubelink}
                                onChange={handleInputChange}
                                style={{ padding: '.5vh 1vw', minWidth:'100px', width: '100%', maxWidth: '800px', fontSize: 'clamp(.8rem,1.4vw,1rem)', transition: 'all 1s ease-in-out' }}
                                placeholder="Paste Link To Video"
                                className="youtubelinker"
                                aria-label="Paste Link To Video"
                            />

                            <button aria-label="Reset" type="reset" onClick={handleReset} disabled={!isVideoActive} style={{ color: '', fontSize: 'clamp(.8rem,1vw,1rem)', fontWeight: 'bold', textAlign: 'left', width: '20px', margin: '', opacity: isVideoActive ? 1 : 0.5 }}>
                                Reset
                            </button>

                            <div id="copybutton" style={{ display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center' }}>
<button aria-label="Create Link" onClick={handleCopyAndShareButtonClick} disabled={!isVideoActive} style={{ display: "flex", gap: '.5vw', justifyContent: "center", padding: ".5vh .8vw", width:'80px', maxHeight: "", margin: "0 auto", textAlign: 'center', fontSize: '14px', fontWeight: 'light', textShadow: '0 1px 0 #000', marginLeft:'', opacity: isVideoActive ? 1 : 0.5 }} className="button font print">
{copied ? 'Link Copied' : 'Copy Link'}
</button>
</div>
</div>




</div>




                            


                            

                            {isRunningStandalone() && (
                            <div style={{position:'absolute', left:'20px', top:'40vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2vh', width:'35px'}}>
                                    <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                                        <ImYoutube2 style={{ fontSize: '40px', opacity:'.5' }} />
                                    </a>
                                    <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                                        <FaFacebookSquare style={{ fontSize: '30px', opacity:'.5' }} />
                                    </a>
                                    <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                                        <FaTwitch style={{ fontSize: '30px', opacity:'.5' }} />
                                    </a>
                                </div>
                             )}
                        
                    
                    </form>

                    </div>
                
    ) : (
        <div className="form-container1 controller1 font" style={{ position: 'relative', zIndex: '3', width: '100vw', margin: '0 auto', marginTop: showNav ? '0' : '0', transition: 'all 1s ease-in-out', background: 'var(--theme-ui-colors-headerColor)', padding:'' }}>

        


                <form className="youtubeform1 frontdrop1" onSubmit={handleSubmit} id="youtubeform" name="youtubeform" style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100vw', margin:'0 auto', gap:'2vw', padding:'1vh 2vw' }}>


<div id="bigbox" style={{ display: 'flex', flexDirection:'column', gap: '4px', alignItems: 'center', width:'100%', border:'0px solid red' }}>

<div id="pastebox" style={{ display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center', width:'70%', margin:'0 auto', border:'0px solid red' }}>
                            <input
                                ref={inputElement}
                                id="youtubelink-input"
                                type="text"
                                name="video"
                                value={youtubelink}
                                onChange={handleInputChange}
                                style={{ padding: '.5vh 1vw', minWidth:'100px', width: '100%', maxWidth: '800px', fontSize: 'clamp(.8rem,1.5vw,2rem)', transition: 'all 1s ease-in-out' }}
                                placeholder="Paste Link To Video"
                                className="youtubelinker"
                                aria-label="Paste Link To Video"
                            />

                            <button aria-label="Reset" type="reset" onClick={handleReset} disabled={!isVideoActive} style={{ color: '', fontSize: 'clamp(.8rem,1vw,1rem)', fontWeight: 'bold', textAlign: 'left', width: '20px', margin: '', opacity: isVideoActive ? 1 : 0.5 }}>
                                Reset
                            </button>

                            {/* <div id="copybutton" style={{ display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center' }}>
<button aria-label="Create Link" onClick={handleCopyAndShareButtonClick} disabled={!isVideoActive} style={{ display: "flex", gap: '.5vw', justifyContent: "center", padding: ".5vh .8vw", width:'80px', maxHeight: "", margin: "0 auto", textAlign: 'center', fontSize: '14px', fontWeight: 'light', textShadow: '0 1px 0 #000', marginLeft:'', opacity: isVideoActive ? 1 : 0.5 }} className="button font print">
{copied ? 'Link Copied' : 'Copy Link'}
</button>
</div> */}


</div>


<div id="controls" style={{ visibility:'hidden', height:'0', display: 'flex', flexDirection:'row', gap: '2vw', alignItems: 'center', width:'70%' }}>

<div id="checkboxes" style={{visibility:'hidden', height:'0', display: 'flex', flexDirection:'row', gap: '1.5vw', alignItems: 'center' }}>
                                <label htmlFor="loop-checkbox" style={{textAlign:'center', fontSize:'60%', display:'flex', flexDirection:'column'}}>Loop:
                                    <input
                                        aria-label="Set to loop"
                                        id="loop-checkbox"
                                        type="checkbox"
                                        name="loop"
                                        checked={loop}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>
                                <label htmlFor="mute-checkbox" style={{textAlign:'center', fontSize:'60%', display:'flex', flexDirection:'column'}}>Mute:
                                    <input
                                        aria-label="Set to mute"
                                        id="mute-checkbox"
                                        type="checkbox"
                                        name="mute"
                                        checked={mute}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>

                                
                                <label htmlFor="controls-checkbox" style={{textAlign:'center', fontSize:'50%', display:'flex', flexDirection:'column'}}>Controls:
                                    <input
                                        aria-label="Set to show controls"
                                        id="controls-checkbox"
                                        type="checkbox"
                                        name="controls"
                                        checked={controls}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>

                            
<label htmlFor="blocker-checkbox" style={{textAlign:'center', fontSize:'60%', display:'flex', flexDirection:'column'}}>Block
    <input
        aria-label="Block user interactions"
        id="blocker-checkbox"
        type="checkbox"
        name="showBlocker"
        checked={showBlocker}
        onChange={handleBlockerChange}
        style={{maxWidth:'50px'}}
    />
</label>

<label htmlFor="autoplayCheckbox" style={{textAlign:'center', fontSize:'50%', display:'flex', flexDirection:'column'}}>Autoplay
    <input
        type="checkbox"
        id="autoplayCheckbox"
        checked={autoplay}
        onChange={(e) => setAutoplay(e.target.checked)}
    />
</label>


                            </div>

<div id="timers" style={{ display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center', width:'100%' }}>
<input
    aria-label="Start Time"
    id="start-input"
    className="youtubelinker"
    type="text"
    name="start"
    value={startTime !== null ? parseFloat(startTime).toFixed(2) : ''}
    onChange={handleInputChange}
    onClick={handleStartFromPlayhead}
    placeholder={startTime === null ? 'Start' : ''}
    disabled={!isVideoActive}
    style={{ maxWidth: '100px', fontSize: 'clamp(1rem,.8vw,1.3rem)', textAlign: 'center' }}
/>
<input
    aria-label="Stop Time"
    id="stop-input"
    className="youtubelinker"
    type="text"
    name="stop"
    value={stopTime !== null ? parseFloat(stopTime).toFixed(2) : ''}
    onChange={handleInputChange}
    onClick={handleEndFromPlayhead}
    placeholder={stopTime === null ? 'Stop' : ''}
    disabled={!isVideoActive}
    style={{ maxWidth: '100px', fontSize: 'clamp(1rem,.8vw,1.4rem)', textAlign: 'center' }}
/>


                            </div>

</div>

</div>




                            


                            

                            {isRunningStandalone() && (
                            <div style={{position:'absolute', left:'20px', top:'40vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2vh', width:'35px'}}>
                                    <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                                        <ImYoutube2 style={{ fontSize: '40px', opacity:'.5' }} />
                                    </a>
                                    <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                                        <FaFacebookSquare style={{ fontSize: '30px', opacity:'.5' }} />
                                    </a>
                                    <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                                        <FaTwitch style={{ fontSize: '30px', opacity:'.5' }} />
                                    </a>
                                </div>
                              )}
                        
                    
                    </form>

                    </div>
      
    )}

{!showBranding ? (
<PageMenu />
) : (
""
)}

{showBlocker && <div className="video-blocker"></div>}

<ReactPlayer
    ref={playerRef}
    allow="web-share"
    style={{
        position: 'relative',
        top: '0',
        margin: '0 auto 0 auto',
        zIndex: '1',
        overflow: 'hidden',
        width: '100vw',
        minHeight: '',
        height: '100%',
        background: 'transparent',
        transition: 'all 1s ease-in-out',
    }}
    width="100%"
    height="100%"
    url={youtubelink}
    playing={isPlaying}
    controls={controls}
    playsinline
    loop={loop}
    muted={mute} // Set muted prop based on the mute state
    autoPlay={autoplay} // Change autoplay to autoPlay
    config={{
        youtube: {
            playerVars: { showinfo: false, autoplay: autoplay ? 1 : 0, controls: controls ? 1 : 0, mute: mute ? 1 : 0 } // Set mute and autoplay flags based on state
        },
    }}
    onReady={() => {
        if (startTime) {
            playerRef.current.seekTo(parseFloat(startTime));
        }
    }}
    onProgress={({ playedSeconds }) => {
        if (!shouldPause && stopTime && parseFloat(stopTime) !== 0 && playedSeconds >= parseFloat(stopTime)) {
            console.log('Stopping video at stop time:', stopTime);
            if (loop) {
                if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
                    playerRef.current.seekTo(parseFloat(startTime));
                } else {
                    console.error('Error: playerRef.current is not properly initialized or does not expose seekTo function');
                }
            } else {
                setShouldPause(true);
            }
        }
    }}
/>






            </div>
        </>
    );
};

export default VideoPlayer;