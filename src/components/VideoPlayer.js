import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import useSiteMetadata from "../hooks/SiteMetadata";
import PageMenu from "../components/PageMenu";

const VideoPlayer = ({ location }) => {
    const queryParams = new URLSearchParams(location.search);
    const proParam = queryParams.get('pro') === 'true';

    const videoUrlParam = queryParams.get('video');
    const startTimeParam = queryParams.get('start');
    const stopTimeParam = queryParams.get('stop');
    const loopParam = queryParams.get('loop') === 'true';
    const muteParam = queryParams.get('mute') === 'true';
    const controlsParam = queryParams.get('controls') === 'true';

    const [showPro, setShowPro] = useState(proParam || JSON.parse(localStorage.getItem('showPro')) || false);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('showPro', JSON.stringify(showPro));
        }
    }, [showPro]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedShowPro = JSON.parse(localStorage.getItem('showPro'));
            setShowPro(storedShowPro !== null ? storedShowPro : proParam);
        }
    }, []);

    const [shouldPause, setShouldPause] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const { featureOptions, proOptions } = useSiteMetadata();
    const { showNav } = featureOptions;
    const { showBranding } = proOptions

    const inputElement = useRef(null);
    const playerRef = useRef(null);
    const [youtubelink, setYoutubelink] = useState(videoUrlParam || "");
    const [startTime, setStartTime] = useState(startTimeParam || "");
    const [stopTime, setStopTime] = useState(stopTimeParam || "");
    const [loop, setLoop] = useState(loopParam);
    const [mute, setMute] = useState(muteParam === 'true');
    const [controls, setControls] = useState(controlsParam !== undefined ? controlsParam : false || startTimeParam !== undefined || stopTimeParam !== undefined);
    const [copied, setCopied] = useState(false);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            if (name === 'mute') {
                setMute(checked);
            } else if (name === 'controls') {
                setControls(checked);
            } else {
                setLoop(checked);
            }
        } else {
            if (name === 'video') {
                setYoutubelink(value);
            } else if (name === 'start') {
                setStartTime(value);
            } else if (name === 'stop') {
                setStopTime(value);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidURL(youtubelink)) {
            updateQueryString({ video: youtubelink, start: startTime, stop: stopTime, loop, mute, controls });
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
            navigator.clipboard.writeText(window.location.href)
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
        copyToClipboard();
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
        const { video, start, stop, loop, mute, controls } = values;
        const newUrl = `${window.location.pathname}?video=${encodeURIComponent(video)}&start=${encodeURIComponent(start)}&stop=${encodeURIComponent(stop)}&loop=${loop}&mute=${mute}&controls=${controls}`;
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

    const isVideoActive = youtubelink !== "";

    useEffect(() => {
        setIsPlaying(!shouldPause && (loop || !stopTime || playerRef.current.getCurrentTime() < parseFloat(stopTime)));
    }, [loop, shouldPause, stopTime]);

    return (
        <>
            <div id="piratevide1o" className='player-wrapper1' style={{ display: 'grid', placeContent: '', width: '100vw', transition: 'all 1s ease-in-out' }}>



            {showPro ? (
                <div className="form-container1 controller1 font" style={{ position: 'relative', zIndex: '3', top: showPro ? '0' : '-1000px', height: showPro ? 'auto' : '0', width: '100vw', margin: '0 auto', marginTop: showNav ? '0' : '0', transition: 'all 1s ease-in-out', background: 'var(--theme-ui-colors-headerColor)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding:'2vh 1vw 0 1vw', }}>
                        <form className="youtubeform frontdrop" onSubmit={handleSubmit} id="youtubeform" name="youtubeform">
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input
                                    aria-label="Start Time"
                                    id="start-input"
                                    className="youtubelinker"
                                    type="text"
                                    name="start"
                                    value={startTime}
                                    onChange={handleInputChange}
                                    onClick={handleStartFromPlayhead}
                                    placeholder="Start"
                                    disabled={!isVideoActive}
                                    style={{ maxWidth: '60px', fontSize: 'clamp(1rem,.8vw,1.3rem)', textAlign: 'center' }}
                                />
                                <input
                                    aria-label="Stop Time"
                                    id="stop-input"
                                    className="youtubelinker"
                                    type="text"
                                    name="stop"
                                    value={stopTime}
                                    onChange={handleInputChange}
                                    onClick={handleEndFromPlayhead}
                                    placeholder="Stop"
                                    disabled={!isVideoActive}
                                    style={{ maxWidth: '60px', fontSize: 'clamp(1rem,.8vw,1.4rem)', textAlign: 'center' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <label htmlFor="loop-checkbox" style={{textAlign:'center', fontSize:'60%'}}>Loop:
                                    <input
                                        aria-label="Set to loop"
                                        id="loop-checkbox"
                                        className="youtubelinker"
                                        type="checkbox"
                                        name="loop"
                                        checked={loop}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>
                                <label htmlFor="mute-checkbox" style={{textAlign:'center', fontSize:'60%'}}>Mute:
                                    <input
                                        aria-label="Set to mute"
                                        id="mute-checkbox"
                                        className="youtubelinker"
                                        type="checkbox"
                                        name="mute"
                                        checked={mute}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>
                                <label htmlFor="controls-checkbox" style={{textAlign:'center', fontSize:'60%'}}>Controls:
                                    <input
                                        aria-label="Set to show controls"
                                        id="controls-checkbox"
                                        className="youtubelinker"
                                        type="checkbox"
                                        name="controls"
                                        checked={controls}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>
                            </div>
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
                            <button aria-label="Create Link" onClick={handleCopyAndShareButtonClick} disabled={!isVideoActive} style={{ display: "flex", gap: '.5vw', justifyContent: "center", padding: ".5vh .8vw", width:'80px', maxHeight: "", margin: "0 auto", textAlign: 'center', fontSize: '14px', fontWeight: 'light', textShadow: '0 1px 0 #000', marginLeft:'', opacity: isVideoActive ? 1 : 0.5 }} className="button font print">
                                   {copied ? 'Copied Link' : 'Create Link'}
                            </button>
                            {!isRunningStandalone() && (
                                <>
                                    <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                                        <ImYoutube2 style={{ fontSize: '50px', opacity:'.5' }} />
                                    </a>
                                    <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                                        <FaFacebookSquare style={{ fontSize: '30px', opacity:'.5' }} />
                                    </a>
                                    <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                                        <FaTwitch style={{ fontSize: '30px', opacity:'.5' }} />
                                    </a>
                                </>
                            )}
                        </form>
                    </div>
                </div>
    ) : (
        <div className="form-container1 controller1 font" style={{ position: 'relative', zIndex: '3', width: '100vw', margin: '0 auto', marginTop: showNav ? '0' : '0', transition: 'all 1s ease-in-out', background: 'var(--theme-ui-colors-headerColor)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding:'1vh 1vw 1vh 1vw', }}>
                        <form className="youtubeform frontdrop" onSubmit={handleSubmit} id="youtubeform" name="youtubeform">


{isRunningStandalone() && (
                                <><div style={{display:'flex', width:'100%', gap:'1vw', alignItems:'center'}}>
                                    <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                                        <ImYoutube2 style={{ fontSize: '50px', opacity:'.5' }} />
                                    </a>
                                    <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                                        <FaFacebookSquare style={{ fontSize: '30px', opacity:'.5' }} />
                                    </a>
                                    <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                                        <FaTwitch style={{ fontSize: '30px', opacity:'.5' }} />
                                    </a>
                                    </div>
                                </>
                            )}

                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', visibility:'hidden', }}>
                                <input
                                    aria-label="Start Time"
                                    id="start-input"
                                    className="youtubelinker"
                                    type="text"
                                    name="start"
                                    value={startTime}
                                    onChange={handleInputChange}
                                    onClick={handleStartFromPlayhead}
                                    placeholder="Start"
                                    disabled={!isVideoActive}
                                    style={{ maxWidth: '60px', fontSize: 'clamp(1rem,.8vw,1.3rem)', textAlign: 'center' }}
                                />
                                <input
                                    aria-label="Stop Time"
                                    id="stop-input"
                                    className="youtubelinker"
                                    type="text"
                                    name="stop"
                                    value={stopTime}
                                    onChange={handleInputChange}
                                    onClick={handleEndFromPlayhead}
                                    placeholder="Stop"
                                    disabled={!isVideoActive}
                                    style={{ maxWidth: '60px', fontSize: 'clamp(1rem,.8vw,1.4rem)', textAlign: 'center' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', visibility:'hidden', }}>
                                <label htmlFor="loop-checkbox" style={{textAlign:'center', fontSize:'60%'}}>Loop:
                                    <input
                                        aria-label="Set to loop"
                                        id="loop-checkbox"
                                        className="youtubelinker"
                                        type="checkbox"
                                        name="loop"
                                        checked={loop}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>
                                <label htmlFor="mute-checkbox" style={{textAlign:'center', fontSize:'60%'}}>Mute:
                                    <input
                                        aria-label="Set to mute"
                                        id="mute-checkbox"
                                        className="youtubelinker"
                                        type="checkbox"
                                        name="mute"
                                        checked={mute}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>
                                <label htmlFor="controls-checkbox" style={{textAlign:'center', fontSize:'60%'}}>Controls:
                                    <input
                                        aria-label="Set to show controls"
                                        id="controls-checkbox"
                                        className="youtubelinker"
                                        type="checkbox"
                                        name="controls"
                                        checked={controls}
                                        onChange={handleInputChange}
                                        disabled={!isVideoActive}
                                        style={{maxWidth:'50px'}}
                                    />
                                </label>
                            </div>

                            
                            <div style={{display:'flex', gap:'1vw',}}>
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

                            {/* <button aria-label="Copy Link" onClick={handleCopyAndShareButtonClick} disabled={!isVideoActive} style={{ display: "flex", gap: '.5vw', justifyContent: "center", padding: ".5vh .8vw", width:'80px', maxHeight: "", margin: "0 auto", textAlign: 'center', fontSize: '14px', fontWeight: 'light', textShadow: '0 1px 0 #000', marginLeft:'', opacity: isVideoActive ? 1 : 0.5 }} className="button font print">
                                   {copied ? 'Copied Link' : 'Create Link'}
                            </button> */}
</div>
                            
                            
                        </form>
                    </div>
                </div>
      
    )}

{!showBranding ? (
<PageMenu />
) : (
""
)}

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
                    muted={mute}
                    config={{
                        youtube: {
                            playerVars: { showinfo: false, autoplay: false, controls: controls ? 1 : 0, mute: false }
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
                                    playerRef.current.seekTo(parseFloat(startTime)); // Seek to start time for looping
                                } else {
                                    console.error('Error: playerRef.current is not properly initialized or does not expose seekTo function');
                                }
                            } else {
                                setShouldPause(true); // Set shouldPause flag to true
                            }
                        }
                    }}
                />
            </div>
        </>
    );
};

export default VideoPlayer;
