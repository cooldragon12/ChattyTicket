"use client"
import { useState } from 'react'
import { useForm, isEmail, matches, isNotEmpty } from '@mantine/form';
import { Flex, TextInput, Stepper, Select, NumberInput, Checkbox, Radio, Button, Group, useMantineTheme, useMantineColorScheme, Container, Box, Divider, BackgroundImage, Text, MediaQuery } from '@mantine/core';

import FadeSurveyImage from "@/assets/images/fade.jpg";
import DropPhoto from './Dropzone';

const SoutEastAsiaCountries = [
    "Indonesia",
    "Vietnam",
    "Malaysia",
    "Singapore",
    "Cambodia",
    "Myanmar",
    "Philippines",
    "Thailand",
    "Laos",
    "Brunei",
    "China",
    "India",
    "Timor-Leste",
    "Japan",
    "Bangladesh",
    "Pakistan",
    "Taiwan",
    "Sri Lanka",
    "Mongolia",
    "North Korea",
    "South Korea",
    "Nepal",
    "Bhutan",
    "Hong Kong",
    "Macao",
    "Maldives",
    "Papua New Guinea"
]
const RANK_CHOICES = [
    "Iron",

    "Bronze",

    "Silver",

    "Gold",

    "Platinum",

    "Diamond",

    "Ascendant",

    "Immortal",

    "Radiant",
]

const SERVER_CHOICES = [
    "Singapore",
    "Tokyo",
    "Hong Kong"
]
export default function SurveyForm() {
    const [active, setActive] = useState(0);
    const [highestStepVisited, setHighestStepVisited] = useState(active);

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            gender: '',
            age: 1,
            country: '',
            province: '',
            username: '',
            average_hours: 0,
            frequency: 0,
            in_game_rank: '',
            in_game_rank_level: 1,
            server: '',
            entries: [
                {
                    text: '',
                    screenshot: '', // Link of the file
                    description: ''
                }
            ]

        },
        validate: {
            email: isEmail("Invalid Email"),
            username: matches(/^([a-zA-Z0-9]+(#[0-9]{4}))/, "Enter valid username"),
            in_game_rank: isNotEmpty("This should not be empty."),
            in_game_rank_level: (value, values) => {
                if (values.in_game_rank != "Radiant" && (value > 3 && value < 1))
                    return "This rank only have 3 levels, choose 1."
            },
            average_hours: (value) => {
                if (value < 1)
                    return "Average hour should be more than 0"
            },
            frequency: (value) => {
                if (value < 1)
                    return "Frequency should be more than 0"
            },
            country: (value) => {
                if (value === "")
                    return "This is required"
                if (!SoutEastAsiaCountries.includes(value))
                    return "The country should be in South East Asia"
            },
            server: isNotEmpty("This is required"),
            entries: (value) => {
                if (value.length < 0)
                    return "Enter atleast 1"
                value.map((entry) => {
                    if (entry.text === "" || entry.screenshot === "")
                        return "You should put either of two (screenshot or text)"
                })
            }
        },
        validateInputOnBlur: true
    }
    );
    const handleStepChange = (nextStep: number) => {
        const isOutOfBounds = nextStep > 3 || nextStep < 0;
        form.validate();

        if (isOutOfBounds) {
            return;
        }
        if (form.isValid("username") && form.isValid("email") && form.isValid("Country") && form.isValid("in_game_rank") && form.isValid("in_game_rank_level") && form.isValid("average_hours") && form.isValid("frequency") && form.isValid("server")) {
            setActive(nextStep);
            setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
        }
    };
    const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;
   
    return (
        <Flex direction={"column"} w={"100vw"} h={"100vh"} justify={"center"} align={"center"}>
            <Stepper mt="10rem" color="red" active={active} onStepClick={handleStepChange} breakpoint="lg">
                <Stepper.Step label="Basic Information" description="Contains the basic information of user and their gameplay" allowStepSelect={shouldAllowSelectStep(0)}>
                    <Flex sx={(theme) => ({
                        boxShadow: theme.shadows.md,
                        padding: "2rem",
                        borderRadius: "1rem",
                        width: "90vw",
                        height: "65vh",
                    })} justify={"center"} align={"center"} w="100%" h="90%">
                        <MediaQuery smallerThan={1024} styles={{
                            width: "100%",
                        }}>

                            <Flex w={"50%"} justify={"center"} align={"center"}>
                                <Flex w="90%" direction={"column"} justify={"center"} align={"center"}>
                                    <Flex gap="1rem" w={"100%"}>
                                        <TextInput
                                            w="100%"
                                            label="Name"
                                            placeholder="John Doe (Optional)"

                                            {...form.getInputProps("name")}
                                        />
                                        <TextInput
                                            w="100%"
                                            withAsterisk
                                            label="Username"
                                            placeholder="username#1234"
                                            {...form.getInputProps("username")}
                                        />
                                    </Flex>
                                    <TextInput
                                        w="100%"
                                        withAsterisk
                                        label="E-mail"
                                        placeholder="youremail@example.com"
                                        {...form.getInputProps("email")}
                                    />
                                    <Flex gap="1rem" w={"100%"}>
                                        <NumberInput min={1} withAsterisk
                                            label="Age"
                                            placeholder="14"
                                            {...form.getInputProps("age")}
                                        />
                                        <Radio.Group withAsterisk label="Pronoun" {...form.getInputProps("gender")}>
                                            <Radio p={4} color='red' value="he/him" label="He/Him" />
                                            <Radio p={4} color='red' value="she/her" label="She/Her" />
                                            <Radio p={4} color='red' value="them/they" label="They/Them" />
                                        </Radio.Group>
                                    </Flex>
                                    <Flex gap="1rem" w={"100%"}>
                                        <Select w="100%" withAsterisk label="Country" placeholder="Select Country (e.i Philippines)" searchable data={SoutEastAsiaCountries} {...form.getInputProps("country")} />
                                        <TextInput w="100%" label="Province" placeholder="Province (Optional)" {...form.getInputProps("province")} />
                                    </Flex>
                                    <Divider label="Game Related" w="100%" m="1rem" />
                                    <Flex gap="1rem" w={"100%"}>
                                        <NumberInput min={1} label="Hours played per week (atleast average)" withAsterisk {...form.getInputProps("average_hours")} />
                                        <NumberInput min={1} label="Game played per week (frequency)" withAsterisk {...form.getInputProps("frequency")} />
                                    </Flex>
                                    <Flex gap="1rem" w={"100%"}>
                                        <Select w="100%" withAsterisk label="Rank" placeholder="Select Rank (Radiant)" searchable data={RANK_CHOICES} {...form.getInputProps("in_game_rank")} />
                                        <NumberInput w="100%" min={1} label="Rank Level" disabled={form.values.in_game_rank === "Radiant" ? true : false} withAsterisk {...form.getInputProps("in_game_rank_level")} />
                                    </Flex>
                                    <Select withAsterisk w={"100%"} label="Your often use server" placeholder="Hong Kong" searchable data={SERVER_CHOICES} {...form.getInputProps("server")} />

                                </Flex>
                            </Flex>
                        </MediaQuery>
                        <MediaQuery smallerThan={1024} styles={{
                            display: "none"
                        }}>
                            <Flex direction={"column"} w={"50%"} h="100%" justify={"center"} align={"center"} m={0}>
                                <BackgroundImage w={"100%"} h="25rem" src={FadeSurveyImage.src} />
                                <Flex w={"100%"} h="10%" direction={"column"} justify={"center"} align={"center"}>
                                    <Text color="text" weight={"bold"}>Why do we need this?</Text>
                                    <Text color="text" >We need this to know your basic information and your gameplay to match you with the right people.</Text>
                                </Flex>
                            </Flex>
                        </MediaQuery>
                    </Flex>
                </Stepper.Step>
                <Stepper.Step label="Entries" description="Input text or image related to the chat">
                    <Flex sx={(theme) => ({
                        boxShadow: theme.shadows.md,
                        padding: "2rem",
                        borderRadius: "1rem",
                        width: "90vw",
                        height: "65vh",
                    })} justify={"center"} align={"center"} w="100%" h="90%">
                        <Flex w={"50%"} justify={"center"} align={"center"}>
                           <DropPhoto/>
                        </Flex>

                    </Flex>
                </Stepper.Step>
            </Stepper>

            <Group position="center" mt="xl">
                <Button sx={{
                    display: active === 0 ? "none" : "block"
                }} variant='default' onClick={() => handleStepChange(active - 1)}>
                    Back
                </Button>
                <Button sx={(theme) => ({ color: theme.colors.background_cc[0] })} variant="light" onClick={() => { handleStepChange(active + 1) }}>{
                    active === 0 ? "Next" : "Submit"
                }</Button>
            </Group>
        </Flex>
    )
} 