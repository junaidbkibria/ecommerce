"use client"
import React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useGlobalContext } from "../Context/store";
import { useRouter } from "next/navigation";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));


export default function CartIcon() {
  const { cartCount } = useGlobalContext();
  const route = useRouter()
  const routeToCart = () => {
    route.replace("/cart")
  }
  return (
      <IconButton aria-label="cart" onClick={routeToCart}>
        <StyledBadge badgeContent={cartCount} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
  );
}
