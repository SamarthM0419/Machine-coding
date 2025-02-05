import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    console.log(json.products);
    setProducts(json.products);
  };

  const PAGE_SIZE = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return !products.length ? (
    <h1>No Products Found</h1>
  ) : (
    <div className="App">
      <h1>Pagination</h1>

      <div className="products-container">
        {products.slice(start, end).map((prod) => (
          <Card
            key={prod.id}
            image={prod.thumbnail}
            title={prod.title}
            category={prod.category}
          />
        ))}
      </div>
      <div className="pagination-conatainer">
        <button
          disabled={currentPage === 0}
          className="page-number"
          onClick={() => goToPreviousPage()}
        >
          ⬅️
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <span
            className={"page-number" + (n === currentPage ? "active" : "")}
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </span>
        ))}
        <button
          disabled={currentPage === noOfPages - 1}
          className="page-number"
          onClick={() => goToNextPage()}
        >
          ➡️
        </button>
      </div>
    </div>
  );
}

export default App;
