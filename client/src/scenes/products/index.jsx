import React, {useState} from 'react';
import { useGetProductsQuery } from 'state/api';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import Header from "component/Header";

const Products = () => {
    const { data, isLoading } = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");

    return (
    <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="See all the products"/>
        {data || !isLoading ? (
            <Box mt="20px" display="grid"></Box>
        ):<></>}
    </Box>
  )
}

export default Products
