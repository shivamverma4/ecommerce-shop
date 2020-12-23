import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import fetchAllProductsRequest from "../../APIs/AllProductsAPI/allProducts";
import logo from "../../Assests/Images/shoptrade-squarelogo.png";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Button from "@material-ui/core/Button";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import useStyles from "./Style";

const PurchasePage = props => {
  const classes = useStyles();

  const [data, setData] = useState({
    allProducts: [],
    sortedProducts: [],
    selectedProducts: [],
    cartCount: 0,
    loader: true
  });

  function sortProducts(products) {
    var rowArr1 = [];
    for(var i=0; i < products.length; i=i+5) {
      var rowArr2 = [];
      for(var j=i; j < i+5; j++) {
        rowArr2 = [...rowArr2, products[j]];
      }
      rowArr1 = [...rowArr1, rowArr2];
    }
    return rowArr1;
  }

  function allProductsKeys(products) {
    var allProductKeys = {};
    for(var i=0; i < products.length; i++) {
      allProductKeys[products[i].id] = {
        sizeSelected: null,
        addedToCart: false,
        fullData: products[i]
      }
    }
    return allProductKeys;
  }

  async function fetchAllProducts() {
    try {
      let allProducts = await fetchAllProductsRequest();
      var ln = allProducts.length;
      allProducts = allProducts.slice(0, ln-3) + allProducts.slice(ln-2, ln);
      allProducts = JSON.parse(allProducts);
      // console.log("allProducts: ", allProducts);
      setData({
        allProducts: allProducts,
        sortedProducts: sortProducts(allProducts),
        selectedProducts: allProductsKeys(allProducts),
        cartCount: 0,
        loader: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  function MouseOver(event) {
    var ele = event.target.parentNode;
    if (ele) {
      var img = ele.getElementsByTagName("img")[0];
      if (img) {
        img.style.height = "300px";
      }
      var sizeBtns = ele.querySelector("[data-id='product-sizes']");
      if (sizeBtns) {
        sizeBtns.removeAttribute("hidden");
      }
    }
  }

  function MouseOut(event){
    var ele = event.target.parentNode;
    var productID = ele.getAttribute("data-id");
    if (ele && productID && data.selectedProducts[productID] && data.selectedProducts[productID]["sizeSelected"] ) {
      return;
    }
    if (ele) {
      var img = ele.getElementsByTagName("img")[0];
      if (img) {
        img.style.height = "330px";
      }
      var sizeBtns = ele.querySelector("[data-id='product-sizes']");
      if (sizeBtns) {
        sizeBtns.setAttribute("hidden", "");
      }
    }
  }

  const handleAddProductToCart = (event) => {
    var productID = event.target.parentNode.getAttribute("value");
    var dt = data.selectedProducts;
    var cnt = data.cartCount;
    if(productID) {
      if (!dt[productID].addedToCart) {
        cnt = cnt + 1;
      } else if (dt[productID].addedToCart && cnt>0) {
        cnt = cnt - 1;
      }
      dt[productID].addedToCart = !dt[productID].addedToCart;
    }

    setData({
      ...data,
      selectedProducts: dt,
      cartCount: cnt,
    });
  }

  const handleUpdateSize = (event) => {
    var productID = event.target.getAttribute("value");
    var ele = document.querySelector("[data-id='"+productID+"']");
    var sizeBtns = ele.querySelector("[data-id='product-sizes']");
    if (sizeBtns) {
      sizeBtns.parentNode.removeAttribute("hidden");
    }
    var addToCartBtn = ele.querySelector("[data-id='add-to-cart-btn']");
    if (addToCartBtn) {
      addToCartBtn.parentNode.setAttribute("hidden", "");
    }
  }

  const handleChange = (event, newSize) => {
    var lk = newSize.split('-');
    var dt = data.selectedProducts;
    var cnt = data.cartCount;
    if(lk.length>1) {
      dt[lk[0]].sizeSelected = lk[1];
      if (dt[lk[0]].addedToCart && cnt > 0) {
        cnt = cnt - 1;
      }
      dt[lk[0]].addedToCart = false;
    }

    var ele = document.querySelector("[data-id='"+lk[0]+"']");
    var sizeBtns = ele.querySelector("[data-id='product-sizes']");
    if (sizeBtns) {
      sizeBtns.parentNode.setAttribute("hidden", "");
    }
    var addToCartBtn = ele.querySelector("[data-id='add-to-cart-btn']");
    if (addToCartBtn) {
      addToCartBtn.parentNode.removeAttribute("hidden");
    }

    setData({
      ...data,
      selectedProducts: dt,
      cartCount: cnt,
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      {data.loader ? (
        <div className={classes.circularLoader}>
          <CircularProgress />
        </div>
      ) : (
        <>
        {data.allProducts.length > 0 ? (
        <div>
          <Grid container className={classes.container}>
            <Grid item xs={4}>
              <img alt="logo" src={logo} width="50" height="50" className={classes.logo}/>
            </Grid>
            <Grid item xs={1} className={classes.headings}>Shop</Grid>
            <Grid item xs={1} className={classes.headings}>About Us</Grid>
            <Grid item xs={1} className={classes.headings}>Our Stores</Grid>
            <Grid item xs={1} className={classes.headings}>Contact Us</Grid>
            <Grid item xs={4} className={classes.headings}>
              <div className={classes.cartDetails}>
                <div className={classes.searchBtn}>Search&nbsp;<SearchIcon size="medium"/></div>
                <div><PersonOutlineIcon size="medium"/></div>
                <div><ShoppingCartOutlinedIcon size="medium"/>{data.cartCount > 0 ? (<span className={classes.cartCount}>{data.cartCount}</span>) : ''}</div>
              </div>
            </Grid>
          </Grid>
          <Grid container className={classes.inviteMessage}>
            Invite Friends To Big Fashion Festival & Get Up To $150 MynCash For Every Person Who Visits &nbsp;
            <Button
              className={classes.inviteNowBtn}
              variant="contained"
              size="small"
            >
              Invite Now
            </Button>
          </Grid>
          <Grid className={classes.categoryContainer}>
            <div>
              <div className={classes.categoryAddress}>Home / Clothing / Mens Clothing / <span style={{"fontWeight": "bold"}}>All Mens Clothing</span></div>
              <div className={classes.allProducts}><span style={{"fontWeight": "bold"}}>All Products</span> <span style={{"color": "grey"}}>({data.allProducts.length}&nbsp;Products)</span></div>
            </div>
            <div className={classes.filterDiv}>
              <div className={classes.filterContainer}>
                <span className={classes.filterHeading}>FILTERS:</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button className={classes.filterNames} variant="outlined" size="small">
                  All Products
                </Button>
                <Button className={classes.filterNames} variant="outlined" size="small">
                  Tee Shirt
                </Button>
                <Button className={classes.filterNames} variant="outlined" size="small">
                  Denim
                </Button>
                <Button className={classes.filterNames} variant="outlined" size="small">
                  Jackets
                </Button>
                <Button className={classes.filterNames} variant="outlined" size="small">
                  Shirt
                </Button>
              </div>
            </div>
            <Grid container className={classes.allProductContainer}>
              {data.sortedProducts.length > 0 && data.sortedProducts.map((arr, index1) => (
                <div className={classes.productsRow} key={index1}>
                  {arr.map((oneProduct, index2) => (
                    <div key={index2}>
                      {oneProduct ? (
                          <Grid item xs={3} className={classes.productDetailsContainer}>
                            <div
                              className={classes.oneProductContainer}
                              data-id={oneProduct["id"]}
                              onMouseEnter={MouseOver}
                              onMouseLeave={MouseOut}
                            >
                              <img src={oneProduct['image_src']} alt={oneProduct['name']} className={classes.productImage}/>
                              <div className={classes.addToCartBtnContainer} hidden={(data.selectedProducts[oneProduct["id"]]["fullData"]["id"] === oneProduct['id']) ? true : false}>
                                <Button
                                  data-id="add-to-cart-btn"
                                  className={classes.addToCartBtn}
                                  variant="outlined"
                                  size="medium"
                                  value={oneProduct["id"]}
                                  color={(data && data.selectedProducts[oneProduct["id"]]["addedToCart"]) ? "secondary": "primary"}
                                  onClick={handleAddProductToCart}
                                >
                                  Add{(data && data.selectedProducts[oneProduct["id"]]["addedToCart"]) ? "ed": ""} To Cart
                                </Button>
                                {data.selectedProducts[oneProduct["id"]]["sizeSelected"]
                                  ? (
                                      <div>
                                        Selected Size: {data.selectedProducts[oneProduct["id"]]["fullData"]["options"].filter(x => x["id"] === data.selectedProducts[oneProduct["id"]]["sizeSelected"])[0]["value"]} (<span className={classes.changeBtn} value={oneProduct["id"]} onClick={handleUpdateSize}>change</span>)
                                      </div>
                                    ) : ''}
                              </div>
                              <div className={classes.productSizes}>
                                <div data-id='product-sizes' hidden={(data.selectedProducts[oneProduct["id"]]["sizeSelected"] === null) ? true : false}>
                                  Select Sizes:
                                  <br/>
                                  <ToggleButtonGroup
                                    size="small"
                                    value={oneProduct["id"]+"-"+data.selectedProducts[oneProduct["id"]]["sizeSelected"]}
                                    onChange={handleChange}
                                    exclusive
                                  >
                                    {oneProduct.options.map((option, index) => (
                                      <ToggleButton value={oneProduct['id']+'-'+option.id} key={index}>
                                        {option.value}
                                      </ToggleButton>
                                    ))}
                                  </ToggleButtonGroup>
                                </div>
                              </div>
                              <div className={classes.vendorName}>{oneProduct['vendor']}</div>
                              <div className={classes.productName}>{oneProduct['name']}</div>
                              <div className={classes.productDetails}>
                                <span>${oneProduct['price']}</span>
                                &nbsp;
                                <span className={classes.comparePrice}>${oneProduct['compare_at_price']}</span>
                                &nbsp;
                                <span className={classes.discountPercent}>
                                  ({Math.floor(((oneProduct['compare_at_price']-oneProduct['price'])/oneProduct['compare_at_price'])*100)}% OFF)
                                </span>
                              </div>
                            </div>
                          </Grid>
                      ): ""}
                    </div>
                  ))}
                  <br/>
                </div>
              ))}
            </Grid>
          </Grid>
        </div>): ""}
        </>
      )}
    </>
  );
};

export default PurchasePage;
