import React, { useState, useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

const GalleryIndex = ({ isSliderVisible }) => {
  const [selectedDirectory, setSelectedDirectory] = useState("favorites"); // Set the default
  const [sliderVisible, setSliderVisible] = useState(false);
  const scrollRef = useRef(null);
  const data = useStaticQuery(graphql`
    query {
      allDirectory(filter: { sourceInstanceName: { eq: "assets" } }) {
        nodes {
          name
        }
      }
      allFile(filter: { extension: { ne: "svg" } }) {
        edges {
          node {
            name
            id
            relativePath
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
            publicURL # Add this to handle non-image files
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSliderVisibility = localStorage.getItem("isSliderVisible");
      const initialSliderVisible = storedSliderVisibility
        ? JSON.parse(storedSliderVisibility)
        : true;
      setSliderVisible(isSliderVisible ?? initialSliderVisible);
    }
    return () => {
      // Cleanup logic here...
    };
  }, [isSliderVisible]);

  useEffect(() => {
    const handleScroll = (e) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("wheel", handleScroll);
    }
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("wheel", handleScroll);
      }
    };
  }, [scrollRef]);

  const resetScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0; // Reset scroll to left
    }
  };

  const handleDirectoryChange = (e) => {
    setSelectedDirectory(e.target.value);
    resetScroll(); // Reset scroll when directory changes
  };

  const renderContent = () => {
    return (
      <div
        id="posttop"
        className={sliderVisible ? "slider" : "grid-container contentpanel"}
        ref={scrollRef}
      >
        <SimpleReactLightbox>
          {data.allFile.edges
            .filter(({ node }) =>
              selectedDirectory
                ? node.relativePath.includes(selectedDirectory)
                : true
            )
            .map(({ node }, index) => {
              if (node.childImageSharp) {
                const imageData = node.childImageSharp.gatsbyImageData;
                return (
                  <div key={index} className="post-card1">
                    <SRLWrapper options={options}>
                      <GatsbyImage
                        image={imageData}
                        alt={`Car ${index}`}
                        className="featured-image1 galleryimage"
                      />
                    </SRLWrapper>
                  </div>
                );
              } else if (node.publicURL) {
                return (
                  <div key={index} className="post-card1">
                    <SRLWrapper options={options}>
                      <img
                        src={node.publicURL}
                        alt={`Car ${index}`}
                        className="featured-image1 galleryimage"
                      />
                    </SRLWrapper>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </SimpleReactLightbox>
      </div>
    );
  };

  return (
    <>
      <div className="magicshell">
        <div className="magicisland">
          <div className="cattags font panel" style={{ width: "300px" }}>
            Choose Gallery:
            <select
              value={selectedDirectory}
              onChange={handleDirectoryChange}
              style={{ width: "100%" }}
            >
              {data.allDirectory.nodes
                .filter(({ name }) => name !== "assets") // Exclude the "assets" directory
                .map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      {renderContent()}
    </>
  );
};

const options = {
  // Options for SimpleReactLightbox
};

export default GalleryIndex;
