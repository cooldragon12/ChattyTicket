"use client"
import { MantineProvider } from '@mantine/core';
import CustomFont from './CustomFont';

export default function StyleProvider({ children}:{children: React.ReactNode}) {
    return (
        <MantineProvider theme={{ 
            colorScheme: 'light',
            primaryColor:"primary",
            colors:{
              primary: ['#FD4556', '#FF7B81', '#FFA7A9', '#FFD3D4', '#FFECEC'],
              secondary: ['#BD3944', '#D86B74', '#EFA3A9', '#F9D3D4', '#FCECEC'],
              text:['#000000', '#333333', '#666666', '#999999', '#CCCCCC'],
              accent: ['#53212B', '#A64D56', '#E38A8F', '#F8C6C7', '#FCECEC'],
              background_cc:['#FFFBF5', '#F8F4EF', '#F1ECE9', '#EAE5E2', '#E3DEDC'],
            },
            headings: { fontFamily: 'Valorant Font, Red Hat' },
            globalStyles:()=>({
                backgroundColor: '#FFFBF5',
            }),
            

            
          }}>
            <CustomFont/>
            {children}
        </MantineProvider>
    )
}