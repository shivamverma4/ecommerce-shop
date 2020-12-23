import fetchData from "../../Utils/FetchData";

async function fetchAllProductsRequest() {
  const response = await fetchData("https://cdn.shopify.com/s/files/1/0455/2176/4502/files/products.json",
  //const response = await fetchData('http://jsonplaceholder.typicode.com/todos',
    {
      "method": "GET",
      "Content-Type": "application/json; charset=utf-8"
    });
    //console.log("response 1: ", response.slice(0, response.length-2)+response.slice(response.length-2, response.length));
    return response;
}

export default fetchAllProductsRequest;
