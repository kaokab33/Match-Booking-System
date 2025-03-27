import React from 'react';
import Form from './Form';
import {
    Box,
} from '@mui/material';

export default function Register() {
    return (
        <Box>
            <Box
                width="50%"
                margin=" 2rem auto"
                padding="2rem"
                borderRadius="1.5rem"
            >
                <Form />
            </Box>
        </Box>
    );
}