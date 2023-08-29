"use client"
import { use, useEffect, useState, useCallback } from 'react'
import { useForm, isEmail, matches, isNotEmpty } from '@mantine/form';
import { Flex, TextInput, Stepper, Select, NumberInput, Checkbox, Radio, Button, Group, useMantineTheme, useMantineColorScheme, Container, Box, Divider, BackgroundImage, Text, MediaQuery, Modal, Textarea, FileInput } from '@mantine/core';

import FadeSurveyImage from "@/assets/images/fade.jpg";
import { SoutEastAsiaCountries, RANK_CHOICES, SERVER_CHOICES, EMOTIONS_CHOICES } from '@/utils/choices';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import ImagePreview from './Entry/ImagePreview';
import TextPreview from './Entry/TextPreview';

import { supabase_client } from '@/utils/supabase';
import { Survey } from '@/schema/survey';
type TEntry = {
    text: string;
    screenshot: File;
}

export default function SurveyForm() {
    const [text, setText] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const [active, setActive] = useState(0);
    const [highestStepVisited, setHighestStepVisited] = useState(active);
    const [opened, { open, close }] = useDisclosure(false)
    const router = useRouter()

    const form = useForm<Survey>({
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
            entries: [],
            felt_from_the_trashtalks: '',
            reason_for_talking_back: '',
        },

        validate: {
            email: isEmail("Invalid Email"),
            username: matches(/^([a-zA-Z0-9]+(#[0-9]{3,4}))/, "Enter valid username"),
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
                    if (entry.text === "" || entry.screenshot === null)
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
        if (nextStep === 3 && form.isValid("felt_from_the_trashtalks") && form.isValid("reason_for_talking_back")) {
            open()
            setTimeout(() => { router.push("/") }, 3000)
        }
    };

    const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;
    const cancelFileInput = () => {
        setFiles([])
        setText("")
    }
    /**
     * 
     */
    const handleDropZoneChange = useCallback(() => {
        if ((text === "") && (files.length === 0)) return;

        if (files.length > 0) {
            let entry: TEntry[] = [];
            files.map((file) => {
                entry.push({
                    text: "",
                    screenshot: file,
                })
            })
            form.setValues((values) => {
                const entryT = values.entries
                entry.map((entry) => entryT?.push(entry))
                return { ...values, entries: entryT }
            })
        }
        else if (text !== "")
            form.setValues((values) => {
                const entryT = values.entries
                entryT?.push({
                    text: text,
                    screenshot: {} as File,
                })
                return { ...values, entries: entryT }
            })
        setText("")
        setFiles([])
    }, [files, text])
    /**
     * 
     * @description This function is used to handle the inputs of the user
     */
    const handleSubmit = async () => {

        const {data:data_demo, error} = await supabase_client.schema('public').from("PlayerDemography").insert({
            email: form.values.email,
            name: form.values.name,
            age: form.values.age,
            country: form.values.country,
            province: form.values.province,
            username: form.values.username,
            average_hours: form.values.average_hours,
            frequency: form.values.frequency,
            in_game_rank: form.values.in_game_rank,
            in_game_rank_level: form.values.in_game_rank_level,
            often_server: form.values.server,
            responding_to_behavior: form.values.reason_for_talking_back,
            emotion: form.values.felt_from_the_trashtalks,
            gender: form.values.gender
        }).select().single()
        if (error) {
            console.log(error)
            return;
        }
    
        form.values.entries.map(async (entry) => {
            console.log(entry.screenshot)
            const { data, error } = await supabase_client.storage.from("Entries_Screenshots").upload(entry.screenshot.name, entry.screenshot)
            const response_entries = await supabase_client.schema('public').from("Entry").insert({
                player_id: data_demo?.id,
                screenshot: data?.path,
                text: entry.text,
            });
            if (error) {
                console.log(response_entries.error)
                return;
            }
        })
    }

    return (
        <Flex direction={"column"} w={"100vw"} h={"100vh"} justify={"center"} align={"center"}>
            <Stepper mt="10rem" color="red" active={active} onStepClick={handleStepChange} breakpoint="xl">
                <Stepper.Step label="Basic Information" description="Contains the basic information of user and their gameplay" allowStepSelect={shouldAllowSelectStep(0)}>
                    <MediaQuery query='(max-width: 1979px) and (max-height: 900px)' styles={{
                        width: "90vw",
                        height: "80vh",
                        padding: "0rem",
                    }}>
                        <Flex sx={(theme) => ({

                            padding: "2rem",
                            borderRadius: "1rem",
                            width: "90vw",
                            height: "65vh",
                        })} justify={"center"} align={"center"}>

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
                    </MediaQuery>
                </Stepper.Step>
                <Stepper.Step label="Entries" description="Input text or image related to the chat">
                    <Flex sx={(theme) => ({

                        padding: "2rem",
                        borderRadius: "1rem",
                        width: "90vw",
                        height: "65vh",
                    })} justify={"center"} align={"center"} w="100%" h="90%">
                        <Flex w={"50%"} justify={"center"} align={"center"} wrap={"wrap"}>
                            {
                                form.values.entries.length > 0?
                                    <Flex w="90%" direction={"column"} justify={"center"} align={"center"}>
                                        {
                                            form.values.entries.map((entry, index) => entry.text === "" ? <ImagePreview key={index} onRemove={() => {console.log("remove function called")}} image={entry.screenshot} /> : <TextPreview index={index} key={index} onRemove={() => { }} text={entry.text} />)
                                        }
                                    </Flex>
                                    :
                                    <Text size={"1rem"} weight={"bold"} color='dimmed'>No Entry yet!</Text>

                            }
                        </Flex>
                        <Divider orientation="vertical" />
                        <Flex w={"50%"} direction={"column"} justify={"center"} align={"center"}>
                            <Flex >
                                <Flex w={text.length > 0 || files.length > 0 ? "50%" : "0%"} h={"90%"} wrap="wrap">
                                    <Container style={{ overflowY: "hidden", height: "100%" }} >
                                        {
                                            files.map((file, index) => {
                                                return (
                                                    <img width={"40%"} height={"60%"} key={index} src={URL.createObjectURL(file)} />
                                                )
                                            })
                                        }
                                    </Container>
                                </Flex>
                                <FileInput multiple value={files} onChange={setFiles} accept="image/png,image/jpeg" label="Upload files" placeholder="Upload files" />
                            </Flex>
                            <Text>or</Text>
                            <Textarea value={text} onChange={(e) => setText(e.target.value)} w="70%" h="70%" placeholder="Write your entry here: (Team) MeYou: on C ....." />
                            <Group>
                                <Button disabled={text.length > 0 || files.length > 0 ? false : true} onClick={handleDropZoneChange} color="red" variant="filled" mt="1rem"  >Add Entry</Button>
                                {
                                    files.length > 0 || text.length > 0 ? <Button onClick={cancelFileInput} color="red" variant="default" mt="1rem" >Cancel</Button> : null
                                }
                            </Group>
                        </Flex>

                    </Flex>
                </Stepper.Step>
                <Stepper.Step label="Review" description="Review your entries before submitting" allowStepSelect={shouldAllowSelectStep(2)}>
                    <Flex sx={(theme) => ({

                        padding: "2rem",
                        borderRadius: "1rem",
                        width: "90vw",
                        height: "65vh",
                    })} justify={"center"} align={"center"} w="100%" h="90%">
                        <Flex w={"50%"} justify={"center"} align={"center"}>
                            <Select w="100%" withAsterisk label="How do you feel when you receive trashtalks from other players?" placeholder="Select what you feel" searchable data={EMOTIONS_CHOICES} {...form.getInputProps("felt_from_the_trashtalks")} />
                        </Flex>
                        <Flex w={"50%"} justify={"center"} align={"center"}>
                            <Radio.Group withAsterisk label="Do you talk back to people who are toxic to you?" {...form.getInputProps("reason_for_talking_back")}>
                                <Radio p={4} color='red' value="Yes" label="Yes" />
                                <Radio p={4} color='red' value="No" label="No" />
                            </Radio.Group>
                        </Flex>
                    </Flex>
                </Stepper.Step>
            </Stepper>
            <Modal opened={opened} onClose={close} withCloseButton={false}>
                Thank you for participating!
            </Modal>

            <Group position="center" mt="xl">
                <Button sx={{
                    display: active === 0 ? "none" : "block"
                }} variant='default' onClick={() => handleStepChange(active - 1)}>
                    Back
                </Button>
                <Button sx={(theme) => ({ color: theme.colors.background_cc[0] })} variant="light" onClick={() => { active < 2 ? handleStepChange(active + 1) : handleSubmit() }}>{
                    active < 2 ? "Next" : "Submit"
                }</Button>
            </Group>
        </Flex>
    )
} 