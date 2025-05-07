"use client";
import Link from "next/link";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import { auth } from "../components/googleSignin/config"; // Ensure you have the correct path
import { FaInstagram, FaSoundcloud } from "react-icons/fa";
import { ColorModeScript, useColorMode } from "@chakra-ui/react";

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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { signOut, User } from "firebase/auth";

export default function WithSubnavigation() {
  const mobileNav = useDisclosure(); // Controls the mobile navigation
  const profileDrawer = useDisclosure(); // Controls the user profile drawer
  const { isOpen, onToggle, onClose } = useDisclosure();
  // const { drawerOpen, draweronOpen, draweronClose } = useDisclosure();
  const [user, setUser] = useState<User | null>(null); // State to track user login status
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update user state on login or logout
    });
    return () => unsubscribe(); // Clean up the listener
  }, []);

  const router = useRouter();

  const bgColor = useColorModeValue(
    "linear-gradient(90deg, rgba(134, 182, 255, 1) 50%, rgba(189, 147, 249, 1) 100%)",
    "gray.800"
  );

  const bgShadow = useColorModeValue("gray.200", "gray.900");

  return (
    <Box>
      <Flex
        position="fixed"
        top="0"
        bg={bgColor}
        zIndex={1000}
        boxShadow="md"
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={3}
        borderStyle={"solid"}
        borderColor={bgShadow}
        align={"center"}
        justify="space-between"
        w="100%"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={mobileNav.onToggle} // Opens only the mobile nav
            icon={
              mobileNav.isOpen ? (
                <CloseIcon w={3} h={3} />
              ) : (
                <HamburgerIcon w={5} h={5} />
              )
            }
            variant="ghost"
            aria-label="Toggle Navigation"
            display={{ base: "flex", md: "none" }}
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
              borderRadius="full"
              objectFit="cover"
              src="Logo.png"
              alt="LW"
              cursor="pointer"
              border="2px solid white"
              shadow="lg"
              _hover={{
                transform: "scale(1.05)",
                transition: "0.3s ease-in-out",
              }} // Smooth hover effect
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
                boxSize="50"
                borderRadius="full"
                // objectFit="cover"
                alt={user.displayName || "User Avatar"}
                mr={100}
                // ml="auto"
                cursor="pointer"
                onClick={profileDrawer.onToggle}
                _hover={{
                  transform: "scale(1.2)",
                  transition: "0.2s ease-in-out",
                }}
              />
              <Drawer
                isOpen={profileDrawer.isOpen}
                placement="right"
                onClose={profileDrawer.onClose}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader>
                    <Image
                      src={user.photoURL || ""}
                      alt={user.displayName || "User Avatar"}
                      w="100%"
                      maxW="200px"
                      mx="auto"
                      display="block"
                    />
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button
                      variant="outline"
                      fontSize="md"
                      onClick={async () => {
                        await auth.signOut();
                        router.push("/");
                      }}
                    >
                      Sign Out
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            // Show "Sign In" and "Create an Account" buttons when not logged in
            <Link href="/signin" passHref>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"purple.600"}
                _hover={{ bg: "pink.300" }}
              >
                Sign in with Google
              </Button>
            </Link>
          )}
        </Stack>
      </Flex>

      <Collapse in={mobileNav.isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
      <Box h="110px" />
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const bgShadow = useColorModeValue("gray.200", "gray.900");

  return (
    <Menu>
      <Stack
        direction="row"
        spacing={6}
        align="center"
        px={6}
        py={3}
        bg="rgba(255, 255, 255, 0.1)" // Transparent effect
        backdropFilter="blur(10px)" // Glassmorphism effect
        borderRadius="xl"
        boxShadow="lg"
      >
        {NAV_ITEMS.map((navItem, index) => (
          <Box key={`nav-item-${index}`}>
            {/* <Popover 
            // trigger="hover" placement="bottom-start"
            > */}
              {/* <PopoverTrigger> */}
              <Button
                colorScheme="pink"
                variant="ghost"
                fontSize="lg"
                fontWeight="bold"
                as="a"
                href={navItem.href}
                color="purple.300"
                _hover={{
                  textDecoration: "none",
                  color: "purple.400",
                  bg: "whiteAlpha.100", // subtle background on hover
                  transform: "scale(1.05)",
                  boxShadow: "md",
                  transition: "all 0.2s ease-in-out",
                }}
                _active={{
                  transform: "scale(0.97)",
                  boxShadow: "sm",
                }}
                _focus={{
                  boxShadow: "outline",
                }}
              >
                {navItem.label}
              </Button>
              
          </Box>
        ))}
      </Stack>
    </Menu>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Menu
    // as="a"
    // href={href}
    // role={"group"}
    // display={"block"}
    // p={2}
    // rounded={"md"}
    // _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      {/* <Stack direction={"row"} align={"center"}> */}
      <MenuButton as={Button} colorScheme="pink">
        {/* <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          > */}
        {label}
        {/* </Text> */}
      </MenuButton>
      <MenuList>
        <Text fontSize={"sm"}>{subLabel}</Text>
      </MenuList>
    </Menu>
  );
};

const MobileNav = () => {
  const bgShadow = useColorModeValue("gray.200", "gray.900");
  return (
    <Stack bg={bgShadow} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem, key) => (
        <MobileNavItem {...navItem} key={key} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const bgShadow = useColorModeValue("gray.200", "gray.900");

  const igLink = "https://www.instagram.com/808lang/";
  const igDownload = () => {
    window.open(igLink, "_blank");
  };

  const { isOpen, onToggle } = useDisclosure();
  console.log({ label });

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
        {typeof label === "string" ? (
          <Text fontWeight={600} color={bgShadow}>
            {label}
          </Text>
        ) : (
          <Box>{label}</Box>
        )}
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
      <Collapse startingHeight={5} in={isOpen} animateOpacity>
        {children &&
          children.map((child, key) => (
            <Box as="a" py={2} key={key} href={child.href}>
              {child.label}
            </Box>
          ))}
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
    href: "/beats",
  },
  {
    label: "Videos",
    href: "/videos",

  },
  {
    label: (
      <Box p={2} fontSize={"3xl"}>
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
