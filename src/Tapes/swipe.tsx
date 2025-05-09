
import { motion } from "motion/react";
import { Text } from "@chakra-ui/react";

const MovingText = motion(Text);

export default function SwipeHint() {

  return (
    <MovingText
      fontSize="3xl"
      color="gray.300"
      fontWeight="semibold"
      textAlign="center"
      mt={4}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      Swipe for more
    </MovingText>

  );
}
