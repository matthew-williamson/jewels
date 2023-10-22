import {
  Box,
  Button,
  Checkbox,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Canvas } from "konva/lib/Canvas";
import { useCallback, useEffect, useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { alphabet, astrologySigns, chains } from "./constants";

const URLImage = ({ src, height, width, x = 0, y = 0, rotation = 0}) => {
  const [image] = useImage(src);
  return <Image image={image} height={height} width={width} x={x} y={y} rotation={rotation} />;
};

function App() {
  const [price, setPrice] = useState(99);
  const [isAddingPersonalNote, setIsAddingPersonalNote] = useState(false);
  const [personalNote, setPersonalNote] = useState("");
  const [centerpiece, setCenterpiece] = useState(alphabet.A);
  const [leftpiece, setLeftpiece] = useState(alphabet.A);
  const [rightpiece, setRightpiece] = useState(alphabet.A);
  const [chain, setChain] = useState(chains.simpleGold);
  const [letter, setLetter] = useState(alphabet.A);
  const [sign, setSign] = useState(astrologySigns.aquarius);

  useEffect(() => {
    // TODO: update price whenever specs change
  }, []);

  const handleOnCenterpieceChange = useCallback((newCenter) => {
    setCenterpiece(newCenter);
  });

  const handleOnLeftpieceChange = useCallback((newLeft) => {
    setLeftpiece(newLeft);
  });

  const handleOnRightpieceChange = useCallback((newRight) => {
    setRightpiece(newRight);
  });
  const handleOnChainChange = useCallback((newChain) => {
    setChain(newChain);
  }, []);

  const handleOnLetterChange = useCallback((newLetter) => {
    setSign(null);
    setLetter(newLetter);
  });

  const handleOnSignChange = useCallback((newSign) => {
    setLetter(null);
    setSign(newSign);
  });

  const onAddToCartClick = useCallback((e) => {
    console.log("TODO");
  }, []);

  const handleAddPersonalNoteChange = useCallback((e) => {
    console.log("TODO");
  }, []);

  const handlePersonalNoteChange = useCallback((e) => {
    console.log("TODO");
  }, []);

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 1.75, sm: 4 },
        flexWrap: "wrap",
        py: 1,
        px: 0.5,
        borderRadius: "25px",
      }}
    >
      <Stack spacing={2} direction="row" sx={{ maxWidth: 1200 }}>
        <Paper sx={{ py: 2, px: 2 }}>
          <Stack spacing={2}>
            <Box sx={{ borderRadius: 2 }} width={500} height={600}>
              <Stage width={500} height={600}>
                <Layer>
                  {/* chain */}
                  <URLImage
                    src={chains[chain.id].src}
                    width={500}
                    height={600}
                  />
                </Layer>
                <Layer>
                  {/* center pendant */}
                  <URLImage
                    src={alphabet[centerpiece.id].src}
                    width={300}
                    height={300}
                    x={100}
                    y={255}
                  />
                </Layer>
                <Layer>
                  {/* left pendant */}
                  <URLImage
                    src={alphabet[leftpiece.id].src}
                    width={300}
                    height={300}
                    x={180}
                    y={170}
                    rotation={45}
                  />
                </Layer>
                <Layer>
                  {/* right pendant */}
                  <URLImage
                    src={alphabet[rightpiece.id].src}
                    width={300}
                    height={300}
                    x={100}
                    y={380}
                    rotation={-45}
                  />
                </Layer>
              </Stage>
            </Box>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography>Price: ${price}</Typography>
              <Button onClick={onAddToCartClick} variant="outlined">
                Add to Cart
              </Button>
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Checkbox onChange={handleAddPersonalNoteChange} />
              <Typography>Add a personal note (+$2)</Typography>
            </Stack>
            <TextField
              disabled={!isAddingPersonalNote}
              onChange={handlePersonalNoteChange}
              value={personalNote}
            />
          </Stack>
        </Paper>
        <Stack spacing={2}>
          <Paper sx={{ py: 2, px: 2 }}>
            <Stack spacing={1}>
              <Typography>Step 1: Choose your chain</Typography>
              <Stack spacing={1} direction="row">
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    borderRadius: 2,
                    overflow: "hidden",
                    border:
                      chain.id === "simpleGold"
                        ? "1px solid teal"
                        : "1px solid lightgray",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "lightgray",
                      boxShadow: "0 0 0 1px lightgray",
                    },
                  }}
                  onClick={() => handleOnChainChange(chains.simpleGold)}
                >
                  <img
                    src="./images/chaingold.png"
                    alt="simple gold chain"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    border:
                      chain.id === "elaborateGold"
                        ? "1px solid teal"
                        : "1px solid lightgray",
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "lightgray",
                      boxShadow: "0 0 0 1px lightgray",
                    },
                  }}
                  onClick={() => handleOnChainChange(chains.elaborateGold)}
                >
                  <img
                    src="./images/chaingoldelaborate2.png"
                    alt="simple gold chain"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    borderRadius: 2,
                  }}
                />
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    borderRadius: 2,
                  }}
                />
              </Stack>
            </Stack>          
          </Paper>
          <Paper sx={{ py: 2, px: 2 }}>
            <Stack spacing={1}>
              <Typography>Step 2: Choose your centerpiece</Typography>
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
                      onClick={() => handleOnCenterpieceChange(letter)}
                    >
                      <Typography>{letter.id}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Paper>
          <Paper sx={{ py: 2, px: 2 }}>
            <Stack spacing={1}>
              <Typography>Step 3: Choose your Leftpiece</Typography>
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
                      onClick={() => handleOnLeftpieceChange(letter)}
                    >
                      <Typography>{letter.id}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Paper>
          <Paper sx={{ py: 2, px: 2 }}>
            <Stack spacing={1}>
              <Typography>Step 4: Choose your Rightpiece</Typography>
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
                      onClick={() => handleOnRightpieceChange(letter)}
                    >
                      <Typography>{letter.id}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Paper>
          <Paper sx={{ py: 2, px: 2 }}>
            <Stack spacing={1}>
              <Typography>Step 5: Decorate your necklace</Typography>
              <Stack spacing={1} direction="row">
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    borderRadius: 2,
                  }}
                />
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    borderRadius: 2,
                  }}
                />
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    borderRadius: 2,
                  }}
                />
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "gray",
                    borderRadius: 2,
                  }}
                />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default App;
