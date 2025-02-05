import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    console.log(json.products);
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return !products.length ? (
    <h1>No Products Found</h1>
  ) : (
    <div className="App">
      <h1>Pagination</h1>
      <div className="products-container">
        {products.map((prod) => (
          <Card
            key={prod.id}
            image={prod.thumbnail}
            title={prod.title}
            category={prod.category}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
