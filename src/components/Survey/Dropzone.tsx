import { Group, Text, useMantineTheme, rem, Flex, Box } from '@mantine/core';

import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import {AiFillFileAdd, AiFillFileUnknown} from "react-icons/ai"
import {HiOutlinePhotograph} from "react-icons/hi"
const DropPhoto = (props:Partial<DropzoneProps>) => {
    const theme = useMantineTheme();
    return(
        <Dropzone
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={5000000} // 5mb
        accept={IMAGE_MIME_TYPE}
        {...props}
    >
        <Flex justify={"center"} align={"center"} direction={"column"} style={{ minHeight: rem(200), pointerEvents: 'none' }}>
            <Dropzone.Accept>
                <Flex direction={"column"} w={"60%"}justify={"center"} align={"center"} >
                <AiFillFileAdd
                    size="3.2rem"
                    
                    color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                />
                    <Text align='center' size="xl" inline>
                        Drag or Select your photos here
                    </Text>
                    <Text align='center' size="sm" color="white" inline mt={7}>
                        Attach as many images as you like, each file should not exceed 5mb
                    </Text>
                </Flex>
            </Dropzone.Accept>
            <Dropzone.Reject>
                <Flex direction={"column"} w={"60%"}justify={"center"} align={"center"} >
                <AiFillFileUnknown
                    size="3.2rem"
                    color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                />
                    <Text align='center' size="xl" inline>
                        Sorry, we only accept images
                    </Text>
                    
                </Flex>
            </Dropzone.Reject>
            <Dropzone.Idle>
                <Flex direction={"column"} w={"60%"}justify={"center"} align={"center"} >
                <HiOutlinePhotograph size="3.2rem" />
                    <Text align='center' size="xl" inline>
                        Drag or Select your photos here
                    </Text>
                    <Text align='center' size="sm" color="dimmed" inline mt={7}>
                        Attach as many images as you like, each file should not exceed 5mb
                    </Text>
                </Flex>
            </Dropzone.Idle>
        </Flex >
    </Dropzone>
    )
}

export default DropPhoto;