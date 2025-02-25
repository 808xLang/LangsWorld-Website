"use client";
import Link from "next/link";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import { auth } from "../components/googleSignin/config"; // Ensure you have the correct path
import { FaInstagram, FaSoundcloud } from "react-icons/fa";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  Image,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { User } from "firebase/auth";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const [user, setUser] = useState<User | null>(null); // State to track user login status

  // Use useEffect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update user state on login or logout
    });
    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <Box>
      <Flex
        bg={useColorModeValue(
          "linear-gradient(90deg, rgba(134, 182, 255, 1) 50%, rgba(189, 147, 249, 1) 100%)",
          "gray.800"
        )}
        color={useColorModeValue("gray.600", "white")}
        boxShadow="md"
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={"center"} // Ensure everything aligns vertically
        >
          <Link href="/" passHref>
            <Image
              boxSize="100px"
              objectFit="cover"
              src="Logo.png"
              alt="LW"
              cursor="pointer"
            />
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {/* Conditional rendering for authentication buttons */}
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {user ? (
            // Show logged-in user's name and sign-out button when logged in
            <>
              {/* REMEMBER TO CHANGE THIS TO A LINK TO THE USERS PROFILE DONT KNOW WHAT TO PUT
            INSIDE OF THE PROFILE PAGE YET */}
              <Image
                src={user.photoURL || ""}
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt={user.displayName || "User Avatar"}
                mr={2}
              />
              {/* <Button fontSize={"sm"} fontWeight={400} variant={"link"}>
                {user.displayName}
              </Button> */}
              <Button
                fontSize={"md"}
                // fontWeight={400}
                variant={"link"}
                onClick={() => auth.signOut()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            // Show "Sign In" and "Create an Account" buttons when not logged in
            <>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"purple.600"}
                href={"/signin"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign in with google
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={8} align={"center"}>
{NAV_ITEMS.map((navItem, index) => (
  <Box key={`nav-item-${index}`}> {/* Add an explicit unique key */}
    <Popover trigger={"hover"} placement={"bottom-start"}>
      <PopoverTrigger>
        <Box
          as="a"
          p={4}
          href={navItem.href ?? "#"}
          fontSize={"md"}
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
          _hover={{
            textDecoration: "underline",
            color: useColorModeValue("pink.400", "pink.200"),
            transform: "scale(1.05)",
            transition: "all 0.3s ease",
          }}
        >
          {navItem.label}
        </Box>
      </PopoverTrigger>
      {navItem.children && (
        <PopoverContent
          border={0}
          boxShadow={"xl"}
          bg={useColorModeValue("white", "gray.800")}
          p={4}
          rounded={"xl"}
          minW={"sm"}
        >
          <Stack>
            {navItem.children.map((child, childIndex) => (
              <DesktopSubNav key={`subnav-item-${childIndex}`} {...child} />
            ))}
          </Stack>
        </PopoverContent>
      )}
    </Popover>
  </Box>
))}

    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem, key) => (
        <MobileNavItem {...navItem} key={key} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  console.log({label})

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        {typeof label === "string" ? <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text> : <Box>{label}</Box>}
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child, key) => (
              <Box as="a"  py={2} key={key} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string | ReactNode; //This will alow a string to be a node
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  key?: number;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Beats",
    children: [
      {
        label: "Gallery",
        subLabel: "Beats (Must be signed in)",
        href: "/BeatGallery",
      },
      {
        label: "Upload Beats",
        subLabel: "Upload beats (Need Admin access)",
        href: "/uploadBeats",
      },
    ],
  },
  {
    label: "Book a session",
    children: [
      {
        label: "Book a session",
        subLabel: "Book a session",
        href: "/calendar",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "DrumKits",
    children: [
      {
        label: "Loops",
        subLabel: "Custom Loops Made by 808Lang",
        href: "/Collabs",
      },
    ],
  },
  {
    label: (
      <Box
        p={2}
        fontSize={"2xl"}
        color={("purple.600", "purple.300")}
        _hover={{
          color: ("pink.400", "pink.200"),
          transform: "scale(1.2)",
          transition: "all 0.3s ease",
        }}
      >
        <FaInstagram />
      </Box>
    ), // Add padding and adjust font size
    href: "https://www.instagram.com/808lang/",
  },
  {
    label: (
      <Box p={2} fontSize="4xl">
        <FaSoundcloud />
      </Box>
    ), // Consistent styling
    href: "https://soundcloud.com/808lang",
  },
];
