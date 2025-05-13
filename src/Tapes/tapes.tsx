import {
  Box,
  Button,
  Text,
  VStack,
  Image,
  SimpleGrid,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FaApple, FaSpotify, FaSoundcloud, FaYoutube } from "react-icons/fa";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import SwipeHint from "./swipe";
// import Carousel from "./Carousel"

const albums = [
  {
    id: "songwars",
    title: "Song Wars (Exclusive Premiere)",
    artist: "808Lang",
    cover: "/images/album-cover.jpg", 
    audioSrc: "/tapes/SW.mp3",
  },
  {
    id: "Brando X Lang",
    title: "Flu",
    artist: "808Lang",
    cover: "/images/random2.jpg",
    audioSrc: "/tapes/practice10.mp3",
  },
  {
    id: "LW2",
    title: "LangsWorld 2",
    artist: "808Lang",
    cover: "/images/random.gif",
    audioSrc: "/tapes/MidnightWave.mp3",
  },
];

export default function ViewTapes() {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0); //Handles the current slide index for the
  const [windowWidth, setWindowWidth] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  const handlePlay = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    if (currentAudioRef.current && currentAudioRef.current !== event.target) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    currentAudioRef.current = event.target as HTMLAudioElement;
  };



  const externalLinks = {
    apple: "https://music.apple.com/us/artist/808lang/1534681265",
    spotify: "https://open.spotify.com/artist/1Pn5HQaSLxLDIk8tt7PCfR",
    soundcloud: "https://soundcloud.com/808lang",
    youtube: "https://www.youtube.com/@808lang",
  };

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

  return (
    <Box //Background
      bgGradient="linear(to-br,rgb(250, 250, 255), #16213e)"
      minH="100vh"
      py={12}
      px={4}
    >
      <Slider {...settings}>
        {albums.map((album, index) => {
          const centerOffset = Math.floor(settings.slidesToShow / 2);
          const normalizedCenterIndex =
            (currentSlide + centerOffset) % albums.length;
          const isCenter =
            visibleSlides > 1 &&
            index ===
              (currentSlide + Math.floor(visibleSlides / 2)) % albums.length;

          return (
            <Box 
              key={album.id}
              transform={
                visibleSlides > 2
                  ? isCenter
                    ? "scale(.9) translateY(10px)"
                    : "scale(0.6) translateY(-75px)"
                  : "scale(1)" 
              }
              opacity={visibleSlides > 2 ? (isCenter ? 1 : 0.6) : 1}
              zIndex={isCenter ? 1 : 0}
              transition="all 0.5s ease"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minH="60vh"
              px={2}
            >
              <VStack>
                <Image
                  src={album.cover}
                  alt={`${album.title} Cover`}
                  borderRadius="xl"
                  boxSize="280px"
                  objectFit="cover"
                  shadow="lg"
                />

                <Box textAlign="center">
                  <Text fontSize="xl" fontWeight="bold" color="purple.800">
                    {album.title}
                  </Text>
                  <Text fontSize="md" color="purple.600" fontWeight="semibold">
                    {album.artist}
                  </Text>
                </Box>

                <audio
                  controls
                  onPlay={handlePlay}
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ width: "100%", maxWidth: "100%" }}
                >
                  <source src={album.audioSrc} type="audio/mp3" />
                </audio>
              </VStack>
              <Box mt={10} maxW="300px" mx="auto">
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  <Button
                    leftIcon={<FaApple />}
                    colorScheme="red"
                    variant="solid"
                    onClick={() => window.open(externalLinks.apple, "_blank")}
                  >
                    Apple Music
                  </Button>
                  <Button
                    leftIcon={<FaSpotify />}
                    colorScheme="green"
                    onClick={() => window.open(externalLinks.spotify, "_blank")}
                  >
                    Spotify
                  </Button>
                  <Button
                    leftIcon={<FaSoundcloud />}
                    colorScheme="orange"
                    onClick={() =>
                      window.open(externalLinks.soundcloud, "_blank")
                    }
                  >
                    SoundCloud
                  </Button>
                  <Button
                    leftIcon={<FaYoutube />}
                    colorScheme="red"
                    onClick={() => window.open(externalLinks.youtube, "_blank")}
                  >
                    YouTube
                  </Button>
                </SimpleGrid>
              </Box>
            </Box>
          );
        })}
      </Slider>
      <SwipeHint />
    </Box>
  );
}
