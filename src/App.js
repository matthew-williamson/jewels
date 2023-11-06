import {
  Box,
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from 'react';
// import { Canvas } from "konva/lib/Canvas";
import { useCallback, useEffect, useState, useMemo } from "react";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { alphabet, chains } from "./constants";
import PendantImage from "./Components/PendantImage";
import PendantSelectionPanel from "./Components/PendantSelectionPanel";

const URLImage = ({ src, height, width, x = 0, y = 0, rotation = 0 }) => {
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


  //useEffect only runs setPrice when [] list updates any values
  useEffect(() => {
    setPrice(chain.price + centerpiece.price + leftpiece.price + rightpiece.price + (isAddingPersonalNote === true ? 2 : 0));
  }, [chain.price, centerpiece.price, leftpiece.price, rightpiece.price, isAddingPersonalNote]);

  //useCallback only calculates function (input,output dictionary values) 
  //when a dependency value changes
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
    setLetter(newLetter);
  });

  const onAddToCartClick = useCallback((e) => {
    console.log("TODO");
  }, []);

  const handleAddPersonalNoteChange = useCallback((e) => {
    setIsAddingPersonalNote(e.target.checked);
  });

  const handlePersonalNoteChange = useCallback((e) => {
    setPersonalNote(e.target.value);
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
                {/*centerpiece*/}
                <PendantImage
                  newSrc={alphabet[centerpiece.id].src}
                  newWidth={300}
                  newHeight={300}
                  newX={100}
                  newY={255}
                  newRotation={0}
                />
                {/*leftpiece*/}
                <PendantImage
                  newSrc={alphabet[leftpiece.id].src}
                  newWidth={300}
                  newHeight={300}
                  newX={180}
                  newY={170}
                  newRotation={45}
                />
                {/*rightpiece*/}
                <PendantImage
                  newSrc={alphabet[rightpiece.id].src}
                  newWidth={300}
                  newHeight={300}
                  newX={100}
                  newY={380}
                  newRotation={-45}
                />
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
                    src="./images/Chains/chaingold.png"
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
                    src="./images/Chains/chaingoldelaborate2.png"
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
          <PendantSelectionPanel
            displayText={"Step 2: Choose your centerpiece"}
            onPendantChange={handleOnCenterpieceChange}
          />
          <PendantSelectionPanel
            displayText={"Step 3: Choose your leftpiece"}
            onPendantChange={handleOnLeftpieceChange}
          />
          <PendantSelectionPanel
            displayText={"Step 4: Choose your rightpiece"}
            onPendantChange={handleOnRightpieceChange}
          />
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
