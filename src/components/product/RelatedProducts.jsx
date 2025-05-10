import HomeCard from '../Home/HomeCard'
import React, { useState, useEffect } from 'react';
import api from "../../api"
import styles from "../Home/Header.module.css"
import ProductPagePlaceHolder from './ProductPagePlaceHolder'

const RelatedProducts = ({similar_products, next, prev}) => {
  const [displayedProducts, setDisplayedProducts] = useState(similar_products);
  const [loading, setLoading] = useState(false);

  const [nextPage, setNextPage] = useState(next);
  const [prevPage, setPrevPage] = useState(prev);


  // Function to fetch paginated data
  const fetchPaginatedData = (url) => {
    if (url) {
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setDisplayedProducts(data.results.similar_products || []);
          setNextPage(data.next); // Update the next page URL
          setPrevPage(data.previous); // Update the previous page URL
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching paginated data:", error);
          setLoading(false);
        });
    }
  };

  // Next Page Handler
  const handleNextPage = () => {
    fetchPaginatedData(nextPage);
  };

  // Previous Page Handler
  const handlePrevPage = () => {
    fetchPaginatedData(prevPage);
  };

  
  return (
    <section className="py-3 bg-light">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row justify-content-center">
          {loading ? (
          // Display loading message when data is being fetched
          <ProductPagePlaceHolder />
          ) : displayedProducts.length > 0 ? (
          // Map over displayed products when not loading
          displayedProducts.map((product) => (
            <HomeCard key={product.id} product={product} />
          ))
          ) : (
          // Show a message when no products are found
          <p>No related items.</p>
        )}
        </div>
      </div>
      <nav className="container px-4 px-lg-15 mt-5" aria-label="...">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="pagination">
              <button
                className={`${styles.pill_button} btn btn-light btn-lg rounded-pill px-4 py-2`}
                onClick={handlePrevPage}
                disabled={!prevPage} // Disable if there's no previous page
              >
                Previous
              </button>
              <button
                className={`${styles.pill_button} btn btn-light btn-lg rounded-pill px-4 py-2`}
                onClick={handleNextPage}
                disabled={!nextPage} // Disable if there's no next page
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </nav>
    </section>
  )
}

export default RelatedProducts