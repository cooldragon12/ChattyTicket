"use client"
import Link from "next/link"
import Image from "next/image"

import {motion, AnimateSharedLayout} from "framer-motion"

import { useDisclosure } from "@mantine/hooks"
import { MediaQuery, Drawer, Container, Flex, Text, Button, Burger, useMantineTheme, CSSObject, rem } from '@mantine/core'

import Logo from "@/assets/images/0.jpg"
import { usePathname } from "next/navigation"

export default function NavigationBar() {
    const path =usePathname();

    const [opened, {open,close}] = useDisclosure(false);
    const navLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "About",
            href: "/about",
        },
        {
            name: "Participate",
            href: "/surveys",
        },
        {
            name: "Try it!",
            href: "/chat",
        },
    ]
    return (
        <Flex
            justify="center"
            align="center"
            sx={{ backdropFilter: 'blur(15px)', boxShadow: '0 0 15px -1.2px rgba(0, 0, 0, 0.05)', zIndex:100}}
            pos={"fixed"}
            w={"100vw"}
            
        >
            <Flex
                bg="primary"
                gap="md"
                justify="space-between"
                align="center"
                direction="row"
                wrap="wrap"
                h={60}
                w="95%"
                px={30}

            >
                <Flex gap="md">
                    <Image width={25} src={Logo} alt="ChattyTicket Logo" />
                </Flex>
                <MediaQuery largerThan="md" styles={(theme) => ({
                    visibility: 'visible',
                    display: 'flex',
                })}>
                    
                        <Flex sx={{ visibility: "hidden", display:"none"  }} gap="md">
                            {
                                navLinks.map((link, index) => link.name === "Participate" || link.name === "Try it!"?
                                    <Link key={index} className={`nav-button primary ${path === link.href ?"active":""}`} href={link.href}>
                                        <Text p={3} variant="h1" color="text">{link.name}</Text>
                                        <span></span>
                                    </Link>:
                                    <Link key={index} className={`nav-button ${path === link.href ?"active":""}`} href={link.href}>
                                        <Text p={3} variant="h3" color="text">{link.name}</Text>
                                        <span></span>
                                    </Link>
                                )
                            }
                        </Flex>
                        
                    
                </MediaQuery>
                <MediaQuery smallerThan="sm" styles={(theme) => ({
                    visibility: 'visible',
                    display: 'flex',
                })}>
                    <Flex sx={{ visibility: "hidden", display:"none" }} gap="md">
                        <Burger onClick={open} opened={opened} />
                        <Drawer opened={opened} onClose={close} title="Navigation">
                            {/* Drawer content */}
                            <Flex direction={"column"} gap="md">
                                <Link onClick={close} className="nav-button" href="/">
                                    <Text p={10} variant="h1" color="text">Home</Text>
                                    <span></span>
                                </Link>
                                <Link onClick={close} className="nav-button" href="/about">
                                    <Text p={10} variant="h3" color="text">About</Text>
                                    <span></span>
                                </Link>
                                <Link onClick={close} className="nav-button primary" href="/surveys">
                                    <Text p={10} sx={{borderRadius:"15px"}}  variant="h3" color="text" bg={"primary"}>Participate</Text>
                                </Link>
                                <Link onClick={close} className="nav-button primary" href="/sample">
                                    <Text p={10} sx={{borderRadius:"15px"}}  variant="h3" color="text" bg={"primary"}>Try it!</Text>
                                </Link>
                            </Flex>
                        </Drawer>
                    </Flex>
                </MediaQuery>
            </Flex>
        </Flex>
    )
}