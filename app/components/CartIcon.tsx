"use client"
import React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useGlobalContext } from "../Context/store";

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
  return (
    <Link href="/cart">
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={cartCount} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    </Link>
  );
}
