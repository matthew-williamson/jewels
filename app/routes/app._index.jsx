import { useCallback, useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import {
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
  collapseClasses,
} from "@mui/material";
import { Image, Layer, Stage } from "react-konva";
import { authenticate } from "../shopify.server";
import { alphabet } from "../constants";
import PendantImage from "../PendantImage";
import PendantSelectionPanel from "../PendantSelectionPanel";
import useImage from "use-image";

const URLImage = ({ src, height, width, x = 0, y = 0, rotation = 0 }) => {
  const [image] = useImage(src);
  return <Image image={image} height={height} width={width} x={x} y={y} rotation={rotation} />;
};

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};
export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const chainResponse = await admin.graphql(
    `#graphql
  query {
    collectionByHandle(handle: "chains") {
      id
      title
      handle
      products(first: 250) {
        edges {
         node {
            id
            title
            priceRangeV2 {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
            featuredImage{
              altText
              url
            }
          }
        }
      }
    }    
  }`,
  );
  const responseJson = await chainResponse.json();
  console.log(responseJson);
  return json({
    product: responseJson.data.collectionByHandle,
  });
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";

  function selectProductUrlImages(product) {
    if (product == null || product.node == null) return null;
    const { url } = product.node?.featuredImage;
    const { id } = product.node;
    const { amount } = product.node.priceRangeV2.minVariantPrice;
    return { id, amount, url };
  }

  const UpdateChainUrls = () => {
    if (actionData == null || actionData.product == null ||
      actionData.product.products == null ||
      actionData.product.products.edges == null) {
      return [];
    }
    // actionData.product.products.edges.forEach((node) => node?.id.replace("gid://shopify/Product/", ""));
    return actionData.product.products.edges.map(selectProductUrlImages);
  }
  const generateProduct = () => submit({}, { replace: true, method: "POST" });
  useEffect(() => {
    generateProduct();
  }, []);

  var chains = UpdateChainUrls();


  const [price, setPrice] = useState(99);
  const [isAddingPersonalNote, setIsAddingPersonalNote] = useState(false);
  const [personalNote, setPersonalNote] = useState("");
  const [centerpiece, setCenterpiece] = useState(alphabet.A);
  const [leftpiece, setLeftpiece] = useState(alphabet.A);
  const [rightpiece, setRightpiece] = useState(alphabet.A);
  const [chain, setChain] = useState(chains == null || chains.length == 0 ? { id: '', url: '', amount: 0 } : chains[0]);
  const [letter, setLetter] = useState(alphabet.A);


  //useEffect only runs setPrice when [] list updates any values
  useEffect(() => {
    setPrice(chain.amount + centerpiece.price + leftpiece.price + rightpiece.price + (isAddingPersonalNote === true ? 2 : 0));
  }, [chain.amount, centerpiece.price, leftpiece.price, rightpiece.price, isAddingPersonalNote]);

  //useCallback only calculates function (input,output dictionary values)
  //when a dependency value changes
  const handleOnCenterpieceChange = useCallback((newCenter) => {
    setCenterpiece(newCenter);
  }, []);

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
    submit();
  }, []);

  const handleAddPersonalNoteChange = useCallback((e) => {
    setIsAddingPersonalNote(e.target.checked);
  }, []);

  const handlePersonalNoteChange = useCallback((e) => {
    setPersonalNote(e.target.value);
  }, []);
  function test() {
    if (!chain || chain.id == '') {
      setChain(chains[0]);
    }
  }
  useEffect(() => {
    if (chains.length > 0) {
      console.log("chains updated");
      console.log(chains);
      test()
    }
  }, [chains]);

  // const LoadPage = () => submit({}, { replace: true, method: "POST" });
  return (
    <Paper >
      <ui-title-bar title="Remix app template">

      </ui-title-bar>
      <BlockStack gap="500">

        <Layout>
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
            <BlockStack spacing={2} direction="row" sx={{ maxWidth: 1200 }}>
              <Layout>
                <Layout.Section>
                  <Paper sx={{ py: 2, px: 2 }}>
                    <Stack spacing={2}>
                      <Box sx={{ borderRadius: 2 }} width={500} height={600}>
                        <Stage width={500} height={600}>
                          <Layer>
                            {/* chain */}
                            <URLImage
                              src={chain?.url}
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
                </Layout.Section>
                <Layout.Section variant="oneThird">
                  <BlockStack spacing={2}>
                    <Paper sx={{ py: 2, px: 2 }}>
                      <BlockStack spacing={1}>
                        <Typography>Step 1: Choose your chain</Typography>
                        <BlockStack spacing={1} direction="row">
                          <Stack spacing={1} direction="row">
                            {Object.values(chains).map((ch) => (
                              <Box
                                key={`chain-${ch.id}`}
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
                                onClick={() => handleOnChainChange(ch)}
                              >
                                <img
                                  src={ch.url}
                                  alt={ch.id}
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
                    <PendantSelectionPanel
                      displayText={"Step 2: Choose your centerpiece"}
                      onPendantChange={handleOnCenterpieceChange}
                    />
                  </BlockStack>
                </Layout.Section>
              </Layout>
            </BlockStack>
          </Paper>
        </Layout>
      </BlockStack>
    </Paper>
  );
}
