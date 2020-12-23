import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    circularLoader: {
      textAlign: "center",
      alignItems: "center",
      height: "100vh"
    },
    container: {
      padding: "20px",
      alignItems: "center"
    },
    logo: {
      "borderRadius": "5px"
    },
    headings: {
      "fontSize": 14,
      "padding": "0px 1px"
    },
    productDetails: {
      width: "100%",
      overflow: "hidden",
      paddingLeft: "9px"
    },
    productSizes: {
      width: "100%",
      overflow: "hidden",
      fontWeight: "bold"
    },
    productName: {
      width: "100%",
      overflow: "hidden",
      paddingLeft: "9px",
      fontSize: "10",
      color: "grey",
      textOverflow: "ellipsis",
      maxWidth: "250px",
      whiteSpace: "nowrap"
    },
    productImage: {
      width: "260px",
      height: "330px"
    },
    filterNames: {
      borderRadius: "25px",
      backgroundColor: "white",
      margin: "0px 3px",
      fontSize: "10px"
    },
    filterHeading: {
      fontWeight: "bold"
    },
    filterContainer: {
      margin: "10px 0px 10px 10px",
      fontSize: 14,
      display: "flex",
      alignItems: "center"
    },
    filterDiv: {
      padding: "15px 15px 15px 0px",
      borderBottom: "1px solid #58535324"
    },
    categoryAddress: {
      margin: "10px",
      fontSize: 12
    },
    allProducts: {
      margin: "10px",
      fontSize: 20
    },
    categoryContainer: {
      fontSize: 14,
      margin: "15px 20px"
    },
    inviteNowBtn: {
      borderRadius: "25px"
    },
    inviteMessage: {
      display: "flex",
      color: "white",
      padding: "10px",
      background: "linear-gradient(90deg, rgb(77 14 14) 0%, rgb(217 67 9) 100%) 0% 0% no-repeat padding-box padding-box transparent",
      alignItems: "center",
      justifyContent: "center"
    },
    cartCount: {
      backgroundColor: "#ff3500d6",
      padding: "1px 5px",
      borderRadius: "50%",
      position: "relative",
      float: "right"
    },
    searchBtn: {
      display: "flex",
      alignItems: "center"
    },
    cartDetails: {
      display: "flex",
      float: "right"
    },
    changeBtn: {
      color: "grey",
      textDecoration: "underline"
    },
    oneProductContainer: {
      width: "min-content",
      lineHeight: "2"
    },
    productDetailsContainer: {
      padding: "0px 7px"
    },
    productsRow: {
      display: "flex",
      margin: "15px 0px",
      height: "460px"
    },
    allProductsContainer: {
      justifyContent: "flex-start"
    },
    vendorName: {
      width: "100%",
      overflow: "hidden",
      paddingLeft: "9px",
      fontWeight: "bold"
    },
    comparePrice: {
      color: "grey",
      textDecoration: "line-through"
    },
    discountPercent: {
      color: "#ff4b47",
      fontSize: "10"
    },
    addToCartBtnContainer: {
      width: "100%",
      overflow: "hidden",
      paddingLeft: "9px",
      fontWeight: "bold"
    },
    addToCartBtn: {
      margin: "0px 3px",
      fontSize: "12px",
      fontWeight: "bold",
      width: "90%"
    }
  })
);

export default useStyles;
