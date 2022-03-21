const fetchProducts = async () => {
  const response = await fetch("http://127.0.0.1:8080/products.json");
  const data = await response.json();
  return data;
};

const createProductTile = (product) => {
  const finalProduct = document.createElement("li");
  const imgProduct = document.createElement("img");
  imgProduct.src = "img/awatar.jpg";
  const productPriceNode = document.createElement("h3");
  const productNameNode = document.createElement("h2"); //asdsad
  const line = document.createElement("div");
  const productStatus = document.createElement("p");

  finalProduct.dataset.status = product.prod_status;

  productStatus.classList.add("status");

  productNameNode.textContent = product.prod_name;
  productPriceNode.textContent = product.prod_price;

  if (product.prod_status !== "") {
    if (product.prod_status.includes(",")) {
      //zawiera 2 lub wiecej
      const productStatuses = product.prod_status.split(",");
      for (let i = 0; i < productStatuses.length; i++) {
        const anotherProductStatus = document.createElement("p");
        anotherProductStatus.textContent = productStatuses[i];
        finalProduct.appendChild(anotherProductStatus);
        productStatus.textContent = product.prod_status;
      }
    } else {
      //zawiera tylko 1
      productStatus.textContent = product.prod_status;
      finalProduct.appendChild(productStatus);
    }
  }

  if (product.prod_name.length > 50) {
    productNameNode.classList.add("long");
  }

  finalProduct.appendChild(imgProduct);
  finalProduct.appendChild(productNameNode);
  finalProduct.appendChild(line).classList.add("line");
  finalProduct.appendChild(productPriceNode);

  if (product.prod_oldprice !== null) {
    const productOldPriceNode = document.createElement("h3");
    productOldPriceNode.classList.add("promotion");
    productOldPriceNode.textContent = product.prod_oldprice;
    finalProduct.appendChild(productOldPriceNode);
  }

  return finalProduct;
};

const main = async () => {
  const products = await fetchProducts();
  const listOfProducts = document.querySelector(".list-of-products");
  const filterSelect = document.querySelector("#filter-select");

  //create product
  Object.keys(products).forEach((key) => {
    if (key !== "response_code") {
      const productTile = createProductTile(products[key]);
      listOfProducts.appendChild(productTile);
    }
  });

  //create select
  filterSelect.onchange = (event) => {
    const filterParam = event.target.value;
    listOfProducts.childNodes.forEach((listItem) => {
      listItem.dataset.visible = "true";
      if (filterParam === "all") {
        listItem.dataset.visible = "true";
        return;
      }
      if (!listItem.dataset.status.includes(filterParam)) {
        listItem.dataset.visible = "false";
      }
    });
  };
};

main();
