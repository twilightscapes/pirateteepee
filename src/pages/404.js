import React from "react"
import { Link } from "gatsby"
import { RiArrowLeftSLine } from "react-icons/ri"
import { StaticImage } from "gatsby-plugin-image"
// import { AiFillRobot } from "react-icons/ai"
import Seo from "../components/seo"
import Layout from "../components/siteLayout"

const NotFound = () => (
  <Layout className="not-found-page">
    <Seo title="Page not found" />

  



<div style={{display:'grid', placeContent:'center', height:'100%', position:'absolute', top:'-15vh', }}>
<StaticImage className="panel" src="../img/moose.webp" alt="Todd builds Web Apps" style={{  border:'0px solid red !important'}}  />

<Link to="/" className="button" style={{maxWidth:'300px', margin:'0 auto'}}>
        <RiArrowLeftSLine className="icon -left" />
        Back to Homepage
      </Link>
</div>
{/* 
        <h1 className="headline1" style={{fontSize:'200%'}}>Well, shit.</h1>
        <p className="headline1" style={{fontSize:'150%', margin:'2rem'}}>
          That wasn't supposed to happen.
        </p> */}


     




  </Layout>
)

export default NotFound