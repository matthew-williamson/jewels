import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

interface SelectableItemProps {
  item: { image: string; title: string };
  isSelected: boolean;
  onClick: () => void;
}

const SelectableItem: React.FC<SelectableItemProps> = ({
  item,
  isSelected,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: isSelected ? "2px solid blue" : "2px solid transparent",
      }}
    >
      <CardMedia
        component="img"
        alt={item.title}
        height="250"
        image={item.image}
      />
      <CardContent>
        <Typography variant={item.title}>{item.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default SelectableItem;
