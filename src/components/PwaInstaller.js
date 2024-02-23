import React, { useState, useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
// import PirateLogo from "../img/logo.svg";
// import Flag from "../img/logo.svg";
import useSiteMetadata from "../hooks/SiteMetadata"
// import { Link } from "gatsby";

const PWAInstaller = () => {
  const [isInstalled, setisInstalled] = useState(true);


  const { companyname } = useSiteMetadata()

  useEffect(() => {
    const storedisInstalled = localStorage.getItem("isInstalled");
    setisInstalled(storedisInstalled === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("isInstalled", isInstalled);
  }, [isInstalled]);

  // const MenuIcon = isInstalled ? RiCloseCircleFill : Flag;

  const handleButtonClick = () => {
    setisInstalled(!isInstalled);
  };

  return (
    
    <div id="pwabanner" style={{ display: isInstalled ? "none" : "flex",  alignItems:'center', fontSize: 'clamp(.9rem,2vw,1rem)', background:'var(--theme-ui-colors-siteColor)', color:'var(--theme-ui-colors-siteColorText)' }}>

      <button
        className="flag1 bug1"
        onClick={handleButtonClick}
        aria-label={isInstalled ? "Collapse menu" : "Expand menu"}
        style={{
          cursor: "pointer",
          padding: "0",
          fontSize: "clamp(3rem, 3vw, 3rem)",
          position: "relative",
          top: "20px",
          width: "60px",
          height: isInstalled ? "60px" : "60px",
          zIndex: "4",
          display: "flex",
          flexDirection: "column",
          justifySelf: "flex-start",
          textAlign: "center",
          overflow: "hidden", // Hides content when height is set to 0
          transition: "height 0.3s ease", // Smooth transition for height change
        }}
      >
        {isInstalled ? (
          <RiCloseCircleFill style={{ height: "100%", maxHeight: "20px", top: "0", zIndex: "4", color: "#fff" }} />
        ) : (
          <RiCloseCircleFill style={{ height: "100%", maxHeight: "20px", top: "0", zIndex: "4", color: "#fff" }} />
        )}
      </button>



      {/* <div style={{fontSize:'60px', display:'grid', placeContent:'center', height:'60px', margin:'0 2vw'}}>&#x2620;</div>  */}

                <div className="font" style={{display:'flex', alignItems:'center', gap:'1vw'}}>
                {/* INSTALL <span style={{textTransform:'uppercase'}}>{companyname}:</span> */}
                Save to your Home Screen" to install {companyname}'s free Web App
                </div>
  

    

      {/* <span style={{fontSize:'50px'}}>&#x2620;</span>

      
      Please Install Our Web App
        "Save to your Home Screen" to install free Web App */}


    </div>
  );
};

export default PWAInstaller;
