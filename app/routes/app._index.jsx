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
  const response = await admin.graphql(
    `#graphql
    # query getProducts {
    # products (first: 100) {
    #   edges {
    #     node {
    #       id
    #       title
    #     }
    #   }
    # }
query {
  # collections(first: 5) {
  #   edges {
  #     node {
  #       id
  #       title
  #       handle	id
  #       products(first: 250) {
  #         edges {
  #           node {
  #             id
  #           }
  #         }
  #       }
  #     }
  #   }
  
  collectionByHandle(handle: "chains") {
        id
        title
        handle
        products(first: 250) {
          edges {
            node {
              id
              title              
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
  const responseJson = await response.json();
  console.log("teststuff");
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
    return { id, url };
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

  const chains = UpdateChainUrls();



  const [price, setPrice] = useState(99);
  const [isAddingPersonalNote, setIsAddingPersonalNote] = useState(false);
  const [personalNote, setPersonalNote] = useState("");
  const [centerpiece, setCenterpiece] = useState(alphabet.A);
  const [leftpiece, setLeftpiece] = useState(alphabet.A);
  const [rightpiece, setRightpiece] = useState(alphabet.A);
  const [chain, setChain] = useState(chains == null ? null : chains[0]);
  const [letter, setLetter] = useState(alphabet.A);


  // const chain = chains == null ? null : chains[0];
  //useEffect only runs setPrice when [] list updates any values
  useEffect(() => {
    setPrice(centerpiece.price + leftpiece.price + rightpiece.price + (isAddingPersonalNote === true ? 2 : 0));
  }, [centerpiece.price, leftpiece.price, rightpiece.price, isAddingPersonalNote]);

  //   setPrice(chain.price + centerpiece.price + leftpiece.price + rightpiece.price + (isAddingPersonalNote === true ? 2 : 0));
  // }, [chain.price, centerpiece.price, leftpiece.price, rightpiece.price, isAddingPersonalNote]);

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
    submit();
  }, []);

  const handleAddPersonalNoteChange = useCallback((e) => {
    setIsAddingPersonalNote(e.target.checked);
  });

  const handlePersonalNoteChange = useCallback((e) => {
    setPersonalNote(e.target.value);
  }, []);


  // useEffect(() => {
  //   console.log("inProductUseEffect");
  //   console.log(productId);
  //   if (productId) {
  //     shopify.toast.show("Product created");
  //   }
  // }, [productId]);

  useEffect(() => {
    if (chains) {
      console.log("chains updated");
      console.log(chains);
    }
  }, [chains]);

  const generateProduct = () => submit({}, { replace: true, method: "POST" });
  // const LoadPage = () => submit({}, { replace: true, method: "POST" });
  return (
    <Page >
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
                        <Button onClick={generateProduct} variant="outlined">
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
                              <Typography>{ch.id}</Typography>
                            </Box>
                          ))}
                          {/* <Box
                            sx={{
                              width: 100,
                              height: 100,
                              backgroundColor: "gray",
                              borderRadius: 2,
                              overflow: "hidden",
                              border:
                                "1px solid teal",
                              // chain.id === "simpleGold"
                              //   ? "1px solid teal"
                              //   : "1px solid lightgray",
                              cursor: "pointer",
                              ":hover": {
                                backgroundColor: "lightgray",
                                boxShadow: "0 0 0 1px lightgray",
                              },
                            }}
                          onClick={() => handleOnChainChange(chains[0])}
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
                                // chain.id === "elaborateGold"
                                //   ? "1px solid teal"
                                //   : "1px solid lightgray",
                                "1px solid teal",
                              borderRadius: 2,
                              overflow: "hidden",
                              cursor: "pointer",
                              ":hover": {
                                backgroundColor: "lightgray",
                                boxShadow: "0 0 0 1px lightgray",
                              },
                            }}
                          // onClick={() => handleOnChainChange(chains.elaborateGold)}
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
                          /> */}
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
    </Page>
  );
}
