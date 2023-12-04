import React from 'react';
import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { alphabet } from "./constants";

const PendantSelectionPanel = ({ displayText, onPendantChange }) => {
    return (
        <Paper sx={{ py: 2, px: 2 }}>
            <Stack spacing={1}>
                <Typography>{displayText}</Typography>
                <Stack spacing={1} direction="row">
                    <Box
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid lightgray",
                        }}
                    >
                        <img
                            src="https://7879.co/_next/image?url=https%3A%2F%2Fmedia.7879.co%2Fcontent%2F1_0f439b6a79.png&w=720&q=75"
                            alt="simple gold chain"
                            objectFit="contain"
                            width="100%"
                            height="100%"
                        />
                    </Box>
                    <Stack
                        direction="row"
                        sx={{
                            flexWrap: "wrap",
                            width: 316,
                            height: 100,
                            borderRadius: 2,
                            alignItems: "center",
                        }}
                    >
                        {Object.values(alphabet).map((letter) => (
                            <Box
                                key={`letter-${letter.id}`}
                                sx={{
                                    m: 0.5,
                                    borderRadius: 1,
                                    border: "1px solid lightgray",
                                    width: 25,
                                    height: 25,
                                    textAlign: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    ":hover": {
                                        backgroundColor: "lightgray",
                                    },
                                }}
                                onClick={() => onPendantChange(letter)}
                            >
                                <Typography>{letter.id}</Typography>
                            </Box>
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default PendantSelectionPanel;
