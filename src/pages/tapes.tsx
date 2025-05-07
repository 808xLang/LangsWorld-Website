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
import { useRef, useState } from "react";
import Slider from "react-slick";
import { FaApple, FaSpotify, FaSoundcloud, FaYoutube } from "react-icons/fa";

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
    title: "Brando x Lang",
    artist: "808Lang",
    cover: "/images/album2-cover.jpg",
    audioSrc: "/tapes/SunsetVibes.mp3",
  },
  {
    id: "LW2",
    title: "LangsWorld 2",
    artist: "808Lang",
    cover: "/images/album3-cover.jpg",
    audioSrc: "/tapes/MidnightWave.mp3",
  },
];

export default function ViewTapes() {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);//Handles the current slide index for the slider

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
  const CustomNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <Box
        className={className}
        onClick={onClick}
        position="absolute"
        top="50%"
        right="30px"
        transform="translateY(-50%)"
        zIndex={2}
        fontSize="40px"
        color="white"
        cursor="pointer"
      >
        ▶
      </Box>
    );
  };

  const CustomPrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <Box
        className={className}
        onClick={onClick}
        position="absolute"
        top="50%"
        left="30px"
        transform="translateY(-50%)"
        zIndex={2}
        fontSize="40px"
        color="white"
        cursor="pointer"
      >
        ◀
      </Box>
    );
  };

  const settings = {
    className: "center",
    dots: true,
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
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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
          const centerOffset = Math.floor(settings.slidesToShow / 1);
          const normalizedCenterIndex =
            (currentSlide + centerOffset) % albums.length;
          const isCenter = index === normalizedCenterIndex;

          return (
            <Box
              key={album.id}
              transform={isCenter ? "scale(1)" : "scale(0.6)"}
              opacity={isCenter ? 1 : 0.6}
              zIndex={isCenter ? 1 : 0}
              transition="all 0.5s ease"
              display="flex"
              justifyContent="center"
              alignItems="center"
              // minH="80vh"
              px={2}
            >
              <VStack
              // className="slide-container"
              // spacing={6}
              // p={6}
              // bg={cardBg}
              // borderRadius="2xl"
              // boxShadow="xl"
              // maxW="400px"
              // w="100%"
              // backdropFilter="blur(20px)"
              // border="1px solid"
              // borderColor="whiteAlpha.200"
              >
                <Image
                  src={album.cover}
                  alt={`${album.title} Cover`}
                  borderRadius="xl"
                  boxSize="280px"
                  objectFit="cover"
                  shadow="lg"
                />

                <Box textAlign="center">
                  <Text fontSize="xl" fontWeight="bold" color="grey">
                    {album.title}
                  </Text>
                  <Text fontSize="md" color="gray.400">
                    {album.artist}
                  </Text>
                </Box>

                <audio
                  controls
                  onPlay={handlePlay}
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ width: "100%", maxWidth: "100%"  }}
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
    </Box>
  );
}
