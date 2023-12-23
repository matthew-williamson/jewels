import React from 'react';
import {
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import {
    Box,
    BlockStack,
} from "@shopify/polaris";

const PendantSelectionPanel = ({ displayText, pendantOptions, onPendantChange }) => {
    return (
        <Paper sx={{ py: 2, px: 2 }}>
            <BlockStack spacing={1}>
                <Typography>{displayText}</Typography>
                <BlockStack spacing={1} direction="row">
                    <Stack spacing={1} direction="row">
                        {Object.values(pendantOptions)
                            .sort((a, b) => a.id < b.id ? 1 : -1)
                            .map((pendant) => (
                                <Box
                                    key={`pendant-${pendant.id}`}
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
                                    onClick={() => onPendantChange(pendant)}
                                >
                                    <img
                                        src={pendant.url}
                                        alt={pendant.id}
                                        objectFit="cover"
                                        width="100%"
                                        height="100%"
                                    />
                                </Box>
                            ))}
                    </Stack>
                </BlockStack>
            </BlockStack>
        </Paper>
    );
}

export default PendantSelectionPanel;
