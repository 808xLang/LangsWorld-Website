
import { motion } from "motion/react";
import { Text } from "@chakra-ui/react";

const MovingText = motion(Text);

export default function SwipeHint() {

  return (
    <MovingText
      fontSize="3xl"
      color="gray.100"
      fontWeight="semibold"
      textAlign="center"
      mt={4}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0.4, 1] }}
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
