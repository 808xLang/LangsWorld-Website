import { Box, Text } from "@chakra-ui/react";

type ProjectCardProps = {
  title: string;
  image: string;
  description: string;
};

export default function ProjectCard({
  title,
  image,
  description,
}: ProjectCardProps) {
    return(
<Box>
        <Text>{title}</Text>
    </Box>
  // JSX goes here
    )
    
}