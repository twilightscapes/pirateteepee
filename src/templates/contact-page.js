// import { jsx } from "theme-ui";
import React from "react";
import { useState } from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import Layout from "../components/siteLayout";
import useSiteMetadata from "../hooks/SiteMetadata"
// import useSiteMetadata from "../hooks/SiteMetadata";
import { Helmet } from "react-helmet";

// import Map from "../components/contact-map"
export const pageQuery = graphql`
  query ContactQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
        redirect
        contactname
        contactphone
        contactupload
        uploadtext
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Contact = ({ data }) => {
  // const { showNav } = useSiteMetadata();

  const { language, proOptions } = useSiteMetadata();
  const { dicName, dicEmail, dicMessage, dicSubmit, dicPhone, dicConfirmation } = language;
  const { showContact   } = proOptions

  const { markdownRemark, site } = data;
  const { frontmatter, html } = markdownRemark;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);


const encode = data => {
  // console.log(data);
  return Object.keys(data)
    .map(key => {
      if (key === "file") {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key][0].name);
      }
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    })
    .join("&");
};

const handleSubmit = e => {
  e.preventDefault();
  const form = e.target;
  setIsSubmitting(true);
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    if (key === "file") {
      data[key] = [value];
    } else {
      data[key] = value;
    }
  });
  // console.log(frontmatter.redirect);
  if (frontmatter.redirect === true) {
    setTimeout(() => {
      window.location.href = "/install2";
    }, 1600);
  } else {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("contact"),
        ...data,
      }),
    })
      .then(() => setSubmitted(true))
      .catch(error => alert(error));
  }
};
  

  return (
    <Layout className="contact-page">
      <Helmet>
        <body className="contactpage utilitypage" />
      </Helmet>
      <Seo
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
      />

      {/* {showNav ? <div className="spacer" style={{ height: "60px", border: "0px solid yellow" }}></div> : ""} */}

      <div className="container panel" style={{ maxWidth: "1024px", margin: "0 auto", paddingTop: "5vh" }}>
        {/* <h1 className="headline">{frontmatter.title}</h1> */}

  <div style={{ padding: "3vh 6% 0 6%", textAlign:'center' }} dangerouslySetInnerHTML={{ __html: html }} />

        
  { showContact ? (
      <div
      className="wrapper flexbutt"
      style={{ padding: "0 10% 10vh 10%", maxWidth: "", margin: "0 auto", display: "flex", flexDirection: "", justifyContent: "center" }}
    >


{/* <div className="flexcheek" style={{display:'flex', justifyContent:'center', maxWidth:'300px', maxHeight:'40vh', width:'300px', margin:'40px auto 0 auto'}}>

<Map id="contactMap" options={{
              center: { lat: 39.92483, lng: -86.10551 },
              zoom: 15,
            }}
/>
</div> */}


<form
className={`contact-form flexcheek1 ${submitted ? "submitted" : ""}`}
action="/install2"
name="contact"
method="POST"
data-netlify="true"
data-netlify-honeypot="bot-field"
encType="multipart/form-data"
onSubmit={handleSubmit}
style={{
display: "flex",
flexDirection: "column",
justifyContent: "center",
opacity: isSubmitting ? 0.5 : 1,
}}
>




{submitted ? (
<div className="thank-you-message" style={{fontSize:'200%', height:'60vh', textAlign:'center'}}>
  {dicConfirmation}
</div>
) : (
<>
  <input type="hidden" name="form-name" value="contact" />

  {frontmatter.contactname && (
<p>
  <label htmlFor="name" aria-label="Your Name">
    <input type="text" id="name" name="name" placeholder={dicName} required />
  </label>
</p>
)}

  <p>
    <label htmlFor="email" aria-label="Your Email">
      <input id="email" type="email" name="email" placeholder={dicEmail} required />
    </label>
  </p>

  {frontmatter.contactphone && (
<p>
  <label htmlFor="phone" aria-label="Your Phone">
    <input type="tel" id="phone" name="phone" placeholder={dicPhone} />
  </label>
</p>
)}


  <p>
    <label htmlFor="message" aria-label="Your Message">
      <textarea id="message" name="message" placeholder={dicMessage} required></textarea>
    </label>
  </p>



  {frontmatter.contactupload && (
<label htmlFor="file"  aria-label="Upload your file" style={{padding: '0', color: 'inherit', textShadow:'1px 1px 0 #555', display:'flex', flexDirection:'column', width:'100%', fontSize:'90%', gap:'15px', justifyContent:'center', alignItems:'center'}}>
{frontmatter.uploadtext}
    <input className="file-input hidden" type="file" id="file" name="file" />
  </label>
)}

  <p
    className="text-align-right1"
    style={{ margin: "0 auto", color: "#fff" }}
  >
   

    <button
        className="button specialfont1"
        type="submit"
        disabled={isSubmitting}
        style={{width:'90%',}}
      >
        {isSubmitting ? "Submitting..." : dicSubmit}
      </button>


  </p>
</>
)}
</form>

    </div>
      ) : (
        "Please Upgrade to Plus"
      )}

  



      </div>


    </Layout>
  );
};

export default Contact;
