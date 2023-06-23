"use client"
import { Global } from '@mantine/core';

import localFont from 'next/font/local'

export default function CustomFont() {
    return(
        <Global
        styles={[
            {
              '@font-face': {
                fontFamily: 'Valorant Font',
                src: `url('/fonts/ValorantFont.ttf') format("truetype")`,
                fontWeight: 400,
                fontStyle: 'normal',
              },
            },]}
    />
    )
}