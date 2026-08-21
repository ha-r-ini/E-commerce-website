import * as React from "react";
import ProductCard from "../../components/ProductCard";
import "./product.css";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import useTitle from '../../hooks/useTitle'
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import NoProducts from "../productPage/components/NoProducts";

const Product = () => {
  const [open, setOpen] = React.useState(false);
  const { filter, dispatch } = useContext(FilterContext)
  const id = React.useId();
  useTitle('products')
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [filteredProduct, setFilteredProduct] = useState([]);
  const [search, setSearch] = useState("");
  const host = import.meta.env.VITE_HOST
  const { product, error, loading } = useFetch(`${host}/444/products`)

  
  useEffect(() => {
    const filterData = product.filter((item) => {
      if (search && !item.title.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (filter.rating > 0 && item.rating < filter.rating) {
        return false
      }
      if (filter.in_stock && !item.in_stock) {
        return false
      }
      if (filter.best_seller && !item.best_seller) {
        return false
      }
      return true
    }
    )
    if (filter.sort === "price_low") {
      filterData.sort((a, b) => a.price - b.price)
    }
    if (filter.sort === "price_high") {
      filterData.sort((a, b) => b.price - a.price)
    }
    setFilteredProduct(filterData)

  }, [filter, product, search])

  const handleSearch = (e) => {
    e.preventDefault()
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="filter-drawer">
      <div className="filter-title mb-10">
        <h3>Filter</h3>
      </div>
      <div className="filter-title mt-20 mb-10">
        <h4>Sort by</h4>
      </div>
      <FormControl>
        <RadioGroup
          aria-labelledby={`${id}-label`}
          name="radio-buttons-group"
          value={filter.sort}
          onChange={(e) => dispatch({ type: "SET_SORT", payload: e.target.value })}

        >
          <FormControlLabel value="price_low" control={<Radio />} label="Price low - high" />
          <FormControlLabel value="price_high" control={<Radio />} label="Price high - low" />
        </RadioGroup>
      </FormControl>
      <div className="filter-title mt-20 mb-10">
        <h4>Rating</h4>
      </div>
      <FormControl>
        <RadioGroup
          aria-labelledby={`${id}-label`}
          name="radio-buttons-group"
          value={filter.rating}
          onChange={(e) => dispatch({ type: "SET_RATING", payload: Number(e.target.value) })}

        >
          <FormControlLabel value={5} control={<Radio />} label="5 stars & above" />
          <FormControlLabel value={4} control={<Radio />} label="4 star & above" />
          <FormControlLabel value={3} control={<Radio />} label="3 star & above" />
        </RadioGroup>
      </FormControl>
      <Divider />
      <div className="filter-title mt-20 mb-10">
        <h4>Other Filters</h4>
      </div>
      <FormGroup className="ck-box">
        <FormControlLabel checked={filter.best_seller} onChange={(e) => dispatch({ type: "SET_BESTSELLER", payload: e.target.checked })} control={<Checkbox />} label="Best Seller" />
        <FormControlLabel checked={filter.in_stock} onChange={(e) => dispatch({ type: "SET_INSTOCK", payload: e.target.checked })} control={<Checkbox />} label="Instock" />
      </FormGroup>

      <div className="common-btn mt-20 text-center">
        <Button onClick={() => dispatch({ type: "CLEAR_FILTER" })}>Clear Filter</Button>
      </div>
    </Box>
  );

  return (
    <>
      <section className="product-sec">
        <div className="container-width">
          <div className="page-title text-center mt-20">
            <h1>Products</h1>
          </div>
          <div className="mt-20 flex-2 gap-1">
            <form
              className="search-product"
              component="form"
              onSubmit={handleSearch}
              style={{ display: "flex", alignItems: "center", width: 300 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </form>
            <div className="flex-1 filter-bx" onClick={toggleDrawer(true)}>
              <FilterAltIcon />
              <p>
                <b>Filter</b>
              </p>
            </div>
          </div>

          {loading && <CardSkeleton />
          }

          {error && <p>Error: {error.message}</p>}

          {!loading && !error && (
            filteredProduct.length <= 0 ? <NoProducts /> :
              <ProductCard products={filteredProduct} />
          )}

          <Drawer open={open} onClose={toggleDrawer(false)} className="drawer-paper">
            {DrawerList}
          </Drawer>
        </div>
      </section>
    </>
  );
};
export default Product;
