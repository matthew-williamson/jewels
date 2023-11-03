import React, { useMemo, useState } from "react";
import { Grid } from "@mui/material";
import SelectableItem from "./SelectableItem.tsx";

const chainItems = [
  { image: "./images/Chains/chain-gold.png", title: "Gold" },
  { image: "./images/Chains/chain-silver.png", title: "Silver" },
];

const pendantItems = [
  { image: "./images/Pendants/pendant-goldstar.png", title: "Gold Star" },
  { image: "./images/Pendants/pendant-jadebead.png", title: "Silver" },
];

const SelectMenu: React.FC = ({ type }: { type: string }) => {
  const items = useMemo(() => {
    return type === "chains" ? chainItems : pendantItems;
  }, [type]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={12} md={4} key={index}>
          <SelectableItem
            item={item}
            isSelected={index === selectedItem}
            onClick={() => handleItemClick(index)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SelectMenu;
