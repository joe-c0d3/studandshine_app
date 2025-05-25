import HomeCard from "./HomeCard"
import React, { useState, useEffect } from 'react';
import api from "../../api"
import PlaceHolderContainer from "../ui/PlaceHolderContainer"
import styles from "./Header.module.css"



const CardContainer = ({products}) => {
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [loading, setLoading] = useState(false);

  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  console.log(nextPage)


  // Function to fetch paginated data
  const fetchPaginatedData = (url) => {
    if (url) {
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setDisplayedProducts(data.results || []);
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

  useEffect(() => {
    if (searchTerm) {
      // Set loading state when a search is in progress
      setLoading(true);
      api.get(`products/?search=${searchTerm}`)
        .then(res => {
          // Update the displayed products with the search results
          setDisplayedProducts(res.data.results || []);
          setNextPage(res.data.next); // Update next page URL
          setPrevPage(res.data.previous); // Update previous page URL
          setLoading(false); // Stop loading after fetching
        })
        .catch(error => {
          console.error("Error fetching products:", error);
          setDisplayedProducts([]); // Show no results in case of an error
          setLoading(false); // Ensure loading state stops
        });
    } else {
      // If search box is cleared, show all products
      setDisplayedProducts(products || []);
    }
  }, [searchTerm, products]); // Listen to changes in both searchTerm and products

  useEffect(() => {
    if (filterOption) {
      // Set loading state when a search is in progress
      setLoading(true);
      api.get(`products/?category=${filterOption}`)
        .then(res => {
          // Update the displayed products with the search results
          setDisplayedProducts(res.data.results || []);
          setNextPage(res.data.next); // Update next page URL
          setPrevPage(res.data.previous); // Update previous page URL
          setLoading(false); // Stop loading after fetching
        })
        .catch(error => {
          console.error("Error fetching products:", error);
          setDisplayedProducts([]); // Show no results in case of an error
          setLoading(false); // Ensure loading state stops
        });
    } else {
      // If search box is cleared, show all products
      setDisplayedProducts(products || []);
    }
  }, [filterOption, products]); // Listen to changes in both searchTerm and products

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/products/`)
      .then((response) => response.json())
      .then((data) => {
        setDisplayedProducts(data.results || []);
        setNextPage(data.next); // Store the next page URL
        setPrevPage(data.previous); // Store the previous page URL
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setDisplayedProducts([]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-5" id="shop">
      <h4 style={{ textAlign: "center" }}>Our Products</h4>

      <div className="container px-4 px-lg-5 mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">

            {/* Search Input */}
            <input 
              type="text" 
              className="form-control mb-3" 
              placeholder="Search for a product..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} // Capture search term
            />
            
            {/* Dropdown menu for filtering */}
            <label htmlFor="filterDropdown" className="form-label">Filter by:</label>
            <select 
              id="filterDropdown" 
              className="form-select mb-3" 
            >
              <option value="">Select an option</option>
              <option value="wristwatch">Wristwatch</option>
              <option value="earrings">Earrings</option>
              <option value="necklace">Necklace</option>
              <option value="brooch">Brooch</option>
              <option value="bracelet">Bracelet</option>
              <option value="bangle">Bangle</option>
            </select>

            {/* Go Button */}
            <button 
              className={`${styles.btn_custom} btn btn-primary w-100`}
              onClick={() => {
                const filterDropdown = document.getElementById("filterDropdown");
                if (filterDropdown) {
                  setFilterOption(filterDropdown.value);
                } else {
                  console.error(`Dropdown with id "filterDropdown" not found.`);
                  return null;
                }

              }} // Trigger function on click
              disabled={loading}
            >
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="container px-4 px-lg-5 mt-5">
          <div className="row justify-content-center">
            {loading ? (
            // Display loading message when data is being fetched
            <PlaceHolderContainer />
            ) : displayedProducts.length > 0 ? (
            // Map over displayed products when not loading
            displayedProducts.map((product) => (
              <HomeCard key={product.id} product={product} />
            ))
            ) : (
            // Show a message when no products are found
            <p>No products found.</p>
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

export default CardContainer
