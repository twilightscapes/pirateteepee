import React, { useState, useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import PirateLogo from "../img/logo.svg";
import Flag from "../img/logo.svg";

import {Link} from "gatsby"
const MenuComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsMenuOpen = window.localStorage.getItem("isMenuOpen");
      if (storedIsMenuOpen) {
        setIsMenuOpen(storedIsMenuOpen === "true");
      } else {
        setIsMenuOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("isMenuOpen", isMenuOpen);
    }
  }, [isMenuOpen]);

  const MenuIcon = isMenuOpen ? RiCloseCircleFill : Flag;

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>


<button
 className="flag"
  onClick={handleButtonClick}
  aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
  style={{
    cursor: "pointer",
    padding: "0",
    fontSize: 'clamp(3rem, 3vw, 3rem)',
    position:'absolute', right:'2px', bottom:'55vh',
    width: '60px',
    height:'60px',
    zIndex: '3',
    opacity: '.5',
    color:'',
    display:'flex'
 // Adjust the borderRadius values as needed
  }}
>
  <MenuIcon style={{height:'100%', maxHeight: '60px', zIndex:'3', color:'#fff' }} />
</button>

<div className="menusnapp" style={{position:'absolute', zIndex:'2', top:'0', gap: "0", padding: "2vh 2vw", alignItems: "center", display: isMenuOpen ? "block" : "none", background:'var(--theme-ui-colors-headerBackground)', backgroundColor:'#222', width:'100dvw'  }}>
  
  <div id="" className="flexbutt" style={{ display: '', gap: '3vh', justifyContent: 'center', alignItems: "center", margin: '0 0', padding: '0', position: 'relative', minWidth:'80vw' }}>
    <div style={{ minWidth: '25vw', maxHeight: '20vh', textAlign: 'center', alignItems: "", }}>
      <PirateLogo style={{ minWidth: '', maxHeight: '20vh', position:'', top:'', left:'' }} />
      the web revolution
    </div>
    <div className="flexcheek mob2 print" style={{ position: '', top: '', minWidth: '25vw', overflow: '', marginBottom: '', paddingTop: '', borderRadius: 'var(--theme-ui-colors-borderRadius)', }}>
      <div className="nameblock font" style={{ margin: '0 auto 0 auto', padding: '0 0 0 0', alignContent: 'center', display: 'grid', textAlign: 'center', justifyContent: 'center', verticalAlign: 'center', color: '#fff', paddingTop: '', fontSize: 'clamp(1rem, 1.4vw, 3.2rem)', background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(8px)', border: '10px double var(--theme-ui-colors-buttonHoverBg)', borderRadius: 'var(--theme-ui-colors-borderRadius)', textShadow: '0 2px 0px #000', maxWidth: '' }}>
        <br />
        <span style={{ margin: '2vh auto', fontSize: '160%' }}>PIRATE</span>
        <br />
        A web revolution is coming
        <br /><br />
        And it's completely FREE!
        <br />
        <Link to="/contact" state={{ modal: true }} className="button print" style={{ display: 'flex', justifyContent: 'center', padding: '1vh .5vw', maxWidth: '250px', margin: '30px auto' }}>Become a PIRATE!</Link>
      </div>
    </div>
    <div className="flexcheek mob2 print" style={{ position: '', top: '', minWidth: '25vw', overflow: '', marginBottom: '', paddingTop: '', borderRadius: 'var(--theme-ui-colors-borderRadius)', }}>
      <div className="nameblock font" style={{ margin: '0 auto 0 auto', padding: '0 0 0 0', alignContent: 'center', display: 'grid', textAlign: 'center', justifyContent: 'center', verticalAlign: 'center', color: '#fff', paddingTop: '', fontSize: 'clamp(1rem, 1.4vw, 3.2rem)', background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(8px)', border: '10px double var(--theme-ui-colors-buttonHoverBg)', borderRadius: 'var(--theme-ui-colors-borderRadius)', textShadow: '0 2px 0px #000', maxWidth: '' }}>
        <br />
        <span style={{ margin: '2vh auto', fontSize: '160%' }}>PIRATE+</span>
        <br />
        Web, Social &amp; Video Media
        <br /><br />
        Combined into your own app
        <br />
        <Link to="/contact" state={{ modal: true }} className="button print" style={{ display: 'flex', justifyContent: 'center', padding: '1vh .5vw', maxWidth: '250px', margin: '30px auto' }}>Get PIRATE+ Now</Link>
      </div>
    </div>
  </div>

  {/* <button
 className="flag"
  onClick={handleButtonClick}
  aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
  style={{
    cursor: "pointer",
    padding: "0",
    color: "#fff",
    fontSize: 'clamp(2rem, 3vw, 3rem)',
    position:'absolute', left:'0', top:'10px',
    width: '100px',
    height: '60px',
    zIndex: '1',
    display:'flex',
    gap:'2vw'
 // Adjust the borderRadius values as needed
  }}
>
<MenuIcon style={{height:'100%', maxHeight: '60px', zIndex:'2', color:'#fff' }} />
</button> */}
</div>


</>
  );
};

export default MenuComponent;
