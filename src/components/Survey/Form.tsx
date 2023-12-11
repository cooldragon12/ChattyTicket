"use client"
import { useState, useCallback } from 'react'
import { useForm, zodResolver } from '@mantine/form';
import { Flex, TextInput, Stepper, Select, NumberInput, Checkbox, Radio, Button, Group, useMantineTheme, useMantineColorScheme, Container, Box, Divider, BackgroundImage, Text, MediaQuery, Modal, Textarea, FileInput } from '@mantine/core';

import FadeSurveyImage from "@/assets/images/fade.jpg";
import { SoutEastAsiaCountries, RANK_CHOICES, SERVER_CHOICES, EMOTIONS_CHOICES } from '@/utils/choices';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import ImagePreview from './Entry/ImagePreview';
import TextPreview from './Entry/TextPreview';
import { supabase_client } from '@/utils/supabase';
import { SurveySchemaType, surveySchema } from '@/schema/survey';

import { decode } from "base64-arraybuffer";
import classes from "./Form.module.css"
import toast from '@/components/Toast';

export default function SurveyForm() {
    const [text, setText] = useState("")
    const [files, setFiles] = useState<File | null>(null)
    const [active, setActive] = useState(0);
    const [highestStepVisited, setHighestStepVisited] = useState(active);
    const [opened, { open, close }] = useDisclosure(false)
    const router = useRouter()

    const form = useForm<SurveySchemaType>({
        
        initialValues: {
            email: '',
            name: '',
            gender: '',
            age: 18,
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
        validate: zodResolver(surveySchema),
        validateInputOnBlur: true,
        }
    );
    

    const handleStepChange = (nextStep: number) => {
        // const isOutOfBounds = nextStep > 3 || nextStep < 0;
        form.validate();
        // if (isOutOfBounds) {
        //     return;
        // }
        if (form.isValid("username") && form.isValid("email") && form.isValid("Country") && form.isValid("in_game_rank") && form.isValid("in_game_rank_level") && form.isValid("average_hours") && form.isValid("frequency") && form.isValid("server")) {
            setActive(nextStep);
            setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
        }
    };

    const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;
    const cancelFileInput = () => {
        setFiles(null)
        setText("")
    }

    const handleDropZoneChange = useCallback(() => {
        // if ((text === "") && (files.length === 0)) return;

        if (files !== null) {
            const reader = new FileReader();
            reader.readAsDataURL(files)
            reader.onload = () => {
                form.setValues((values) => {
                    return {
                        ...values, entries: [...values.entries, {
                            text: "",
                            screenshot: reader.result as string,
                        }]
                    }
                })
            }
        }
        else if (text !== "")
            form.setValues((values) => {
                return {
                    ...values, entries: [...values.entries, {
                        text: text,
                        screenshot: "",
                    }]
                }
            })
        setText("")
        setFiles(null)
    }, [files, text, form])

    const handleRemoveEntry = (index: number) => {
        form.setValues((values) => {
            const entryT = values.entries
            entryT?.splice(index, 1)
            return { ...values, entries: entryT }
        })
    }
    /**
     * 
     * @description This function is used to handle the inputs of the user
     */
    const handleSubmit = async () => {
        try {
            const { data: data_demo, error } = await supabase_client.schema('public').from("PlayerDemography").insert({
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
                throw new Error("Sorry, we can't process your submission")
            }

            form.values.entries.map(async (entry) => {
                if (entry.screenshot !== "") {
                    const image_type = entry.screenshot
                        .split(";base64,")[0]
                        .split("/")[1];
                    const info = `entry/${data_demo.username.split("#")[0]}_${new Date().getTime().toString()}.${image_type}`
                    console.log(info)
                    const { data, error } = await supabase_client.storage
                    .from("Entries_Screenshots")
                    .upload(info, decode(entry.screenshot.split("base64,")[1]),
                    {
                        contentType: `image/${image_type}`,
                        upsert: false,
                        cacheControl: "3600",
                    }
                    );
                    const image_link = supabase_client.storage
                        .from("Entries_Screenshots")
                        .getPublicUrl(data.path);
                    const response_entries = await supabase_client.schema('public').from("Entry").insert({
                        player_id: data_demo?.id,
                        screenshot: image_link.data.publicUrl
                    });
                    if (error) {
                        throw new Error("Sorry, we can't process your submission")
                    }
                    if (response_entries.error) {
                        throw new Error("Sorry, we can't process your submission")
                    }
                } else if (entry.text !== "") {
                    const response_entries = await supabase_client.schema('public').from("Entry").insert({
                        player_id: data_demo?.id,
                        text: entry.text
                    });
                    if (response_entries.error) {
                        throw new Error("Sorry, we can't process your submission")
                    }
                }
                // toast({ 
                //     type: "success", 
                //     message:"Congratulation!! you've successfully finished the survey" });
                setTimeout(() => { router.push("/surveys/success") }, 3000)
            })
        } catch (e) {
            // toast({ type: "error", message: e.message });
        }
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
                                        <Select w="100%"   withAsterisk label="Country" placeholder="Select Country (e.i Philippines)" searchable data={SoutEastAsiaCountries} {...form.getInputProps("country")} />
                                        <TextInput w="100%" label="Province" placeholder="Province (Optional)" {...form.getInputProps("province")} />
                                    </Flex>
                                    <Divider label="Game Related" w="100%" m="1rem" />
                                    <Flex gap="1rem" w={"100%"}>
                                        <NumberInput min={1} label="Hours played per week (atleast average)" withAsterisk {...form.getInputProps("average_hours")} />
                                        <NumberInput min={1} label="Game played per week (frequency)" withAsterisk {...form.getInputProps("frequency")} />
                                    </Flex>
                                    <Flex gap="1rem" w={"100%"}>
                                        <Select w="100%" withAsterisk label="Rank" placeholder="Select Rank (Radiant)" searchable data={RANK_CHOICES} {...form.getInputProps("in_game_rank")} />
                                        <NumberInput w="100%" min={1} max={3} label="Rank Level" disabled={form.values.in_game_rank === "Radiant" ? true : false} withAsterisk {...form.getInputProps("in_game_rank_level")} />
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
                                form.values.entries.length > 0 ?
                                    <Flex w="90%" direction={"column"} justify={"center"} align={"center"}>
                                        {
                                            form.values.entries.map((entry, index) => entry.text === "" ? <ImagePreview key={index} onRemove={() => handleRemoveEntry(index)} image={entry.screenshot} /> : <TextPreview index={index} key={index} onRemove={() => { }} text={entry.text} />)
                                        }
                                    </Flex>
                                    :
                                    <Text size={"1rem"} weight={"bold"} color='dimmed'>No Entry yet!</Text>

                            }
                        </Flex>
                        <Divider orientation="vertical" />
                        <Flex w={"50%"} direction={"column"} justify={"center"} align={"center"}>
                            <Flex >
                                <Flex w={text.length > 0 || files?.type !== "" ? "50%" : "0%"} h={"90%"} wrap="wrap">
                                    <Container style={{ overflowY: "hidden", height: "100%" }} >
                                        {
                                            files !== null ? <img width={"40%"} height={"60%"} src={URL.createObjectURL(files)} /> : null
                                        }
                                    </Container>
                                </Flex>
                                <FileInput onChange={setFiles} value={files} accept="image/png,image/jpeg" label="Upload files" placeholder="Upload files" />
                            </Flex>
                            <Text>or</Text>
                            <Textarea value={text} onChange={(e) => setText(e.target.value)} w="70%" h="70%" placeholder="Write your entry here: (Team) MeYou: on C ....." />
                            <Group>
                                <Button disabled={text.length > 0 || files !== null ? false : true} onClick={() => handleDropZoneChange()} color="red" variant="filled" mt="1rem"  >Add Entry</Button>
                                {
                                    files !== null || text.length > 0 ? <Button onClick={cancelFileInput} color="red" variant="default" mt="1rem" >Cancel</Button> : null
                                }
                            </Group>
                        </Flex>

                    </Flex>
                </Stepper.Step>
                <Stepper.Step label="Reflection" description="Last 2 questions reaction for the gameplay you experience" allowStepSelect={shouldAllowSelectStep(2)}>
                    <Flex sx={(theme) => ({
                        padding: "2rem",
                        borderRadius: "1rem",
                        width: "90vw",
                        height: "65vh",
                    })} justify={"center"} align={"center"} w="100%" h="90%">
                        <Flex w={"50%"} justify={"center"} align={"center"}>
                            <Select w="100%" withAsterisk label="How do you feel when you receive trashtalks from other players?" placeholder="Select what you feel" searchable data={EMOTIONS_CHOICES} {...form.getInputProps("felt_from_the_trashtalks")} />
                            <Radio.Group withAsterisk label="Do you talk back to people who are toxic to you?" {...form.getInputProps("reason_for_talking_back")}>
                                <Radio p={4} color='red' value="Yes" label="Yes" />
                                <Radio p={4} color='red' value="No" label="No" />
                            </Radio.Group>
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
                        {/* Review of every input */}
                        <Flex w={"50%"} justify={"center"} align={"center"} wrap={"wrap"}>
                            {
                                form.values.entries.length > 0 ?
                                    <Flex w="90%" direction={"column"} justify={"center"} align={"center"}>
                                        {
                                            form.values.entries.map((entry, index) => entry.text === "" ? <ImagePreview key={index} onRemove={() => handleRemoveEntry(index)} image={entry.screenshot} /> : <TextPreview index={index} key={index} onRemove={() => { }} text={entry.text} />)
                                        }
                                    </Flex>
                                    :
                                    <Text size={"1rem"} weight={"bold"} color='dimmed'>No Entry yet!</Text>

                            }
                        </Flex>
                    </Flex>
                </Stepper.Step>
            </Stepper>
            {/* <Modal opened={opened} onClose={close} withCloseButton={false}>
                Thank you for participating!
            </Modal> */}

            <Group position="center" mt="xl">
                <Button sx={{
                    display: active === 0 ? "none" : "block"
                }} variant='default' onClick={() => handleStepChange(active - 1)}>
                    Back
                </Button>
                <Button sx={(theme) => ({ color: theme.colors.background_cc[0] })} variant="light" onClick={() => { 
                    switch (active){
                        case 0:
                            handleStepChange(active + 1)
                            break;
                        case 1:
                            handleStepChange(active + 1)
                            break;
                        case 2:
                            handleStepChange(active + 1)
                            break;
                        case 3:
                            handleSubmit()
                            break;
                    }
                  }}>{
                    active < 2 ? "Next" : active === 2 ? "Review" : "Submit"
                }</Button>
            </Group>
        </Flex>
    )
} 