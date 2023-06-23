"use client"
import Link from "next/link"
import Image from "next/image"
import { useDisclosure } from "@mantine/hooks"

import { MediaQuery, Drawer, Container, Flex, Text, Button, Burger, useMantineTheme, CSSObject, rem } from '@mantine/core'

import Logo from "@/assets/images/0.jpg"

export default function NavigationBar() {
    const theme = useMantineTheme()
    const [opened, {open,close}] = useDisclosure(false);

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
                        <Link className="nav-button" href="/">
                            <Text p={10} variant="h1" color="text">Home</Text>
                        </Link>
                        <Link className="nav-button" href="/about">
                            <Text p={10} variant="h3" color="text">About</Text>
                        </Link>
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
                                </Link>
                                <Link onClick={close} className="nav-button" href="/about">
                                    <Text p={10} variant="h3" color="text">About</Text>
                                </Link>
                            </Flex>
                        </Drawer>
                    </Flex>
                </MediaQuery>
            </Flex>
        </Flex>
    )
}