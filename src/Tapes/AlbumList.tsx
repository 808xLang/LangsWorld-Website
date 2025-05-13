import { useState, useEffect } from "react";
export default function AlbumGallery({ album, index }: { album:string; index:string}) {
   
    const [currentSlide, setCurrentSlide] = useState(0); //Handles the current slide index for the
    const [windowWidth, setWindowWidth] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(3);

    
    useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth; //window.innerWidth detects width :|
      setWindowWidth(width);
      if (width < 768) {
        setVisibleSlides(1);
      } else if (width < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    className: "center",
    // dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    afterChange: (index: number) => setCurrentSlide(index),
  };
}

