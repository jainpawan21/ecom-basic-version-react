import React from "react";
import "./products.css";
import { productsData } from "../backend/db/productsData";
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
import { useFilters } from "../contexts/filterProducts";
import {
  filterByPrice,
  dataAfterPriceRange,
  filterByDiscount,
  filterByGender,
  filterByRating,
  filterBySeason,
} from "../utilitites/index";

const Products = () => {
  const { state, dispatch } = useFilters();
  const finalData = filterByDiscount(
    state.discount,
    filterByGender(
      state.men,
      state.women,
      filterByRating(
        state.rating,
        filterBySeason(
          state.summer,
          state.winter,
          filterByPrice(
            state.sortByPrice,
            dataAfterPriceRange(state.priceRange, productsData)
          )
        )
      )
    )
  );
  return (
    <>
      <Navbar />
      <div className="filters">
        {/* <!-- left side filter started --> */}
        <aside className="sort-filter">
          <div className="clear-button">
            <h3>Filters</h3>
            <button
              onClick={() =>
                dispatch({
                  ...state,
                  priceRange: 5000,
                  men: null,
                  women: null,
                  summer: null,
                  winter: null,
                  sortByPrice: null,
                  rating: null,
                  discount: null,
                })
              }
            >
              Clear
            </button>
          </div>
          <h3>Price</h3>
          <div className="slider-input-setting">
            <label for="slider-input">
              0 <span>2500</span> <span>5000</span>
            </label>
            <input
              className="slider-input"
              type="range"
              id="points"
              name="points"
              min={0}
              max={5000}
              defaultValue={state.priceRange}
              onChange={(e) =>
                dispatch({ ...state, priceRange: e.target.value })
              }
            />
            <div>Price range: 0 to{state.priceRange}</div>
          </div>

          <h3>Gender</h3>
          <div className="checkbox-input">
            <label>
              <input
                type="checkbox"
                checked={state.men}
                onChange={(e) => dispatch({ ...state, men: e.target.checked })}
              />
              Men Clothing
            </label>
            <label>
              <input
                type="checkbox"
                checked={state.women}
                onChange={(e) =>
                  dispatch({ ...state, women: e.target.checked })
                }
              />
              Women Clothing
            </label>
          </div>
          <h3>Season</h3>
          <div className="checkbox-input">
            <label>
              <input
                type="checkbox"
                checked={state.summer}
                onChange={(e) =>
                  dispatch({ ...state, summer: e.target.checked })
                }
              />
              Summer
            </label>

            <label>
              <input
                type="checkbox"
                checked={state.winter}
                onChange={(e) =>
                  dispatch({ ...state, winter: e.target.checked })
                }
              />
              Winter
            </label>
          </div>
          <h3>Rating</h3>
          <div className="radio-input">
            <label>
              <input
                type="radio"
                value={4}
                name="star_rating"
                onChange={(e) => dispatch({ ...state, rating: e.target.value })}
              />
              4 Stars & above
            </label>
            <label>
              <input
                type="radio"
                value={3}
                name="star_rating"
                onChange={(e) => dispatch({ ...state, rating: e.target.value })}
              />
              3 Stars & above
            </label>
            <label>
              <input
                type="radio"
                value={2}
                name="star_rating"
                onChange={(e) => dispatch({ ...state, rating: e.target.value })}
              />
              2 Stars & above
            </label>
            <label>
              <input
                type="radio"
                value={1}
                name="star_rating"
                onChange={(e) => dispatch({ ...state, rating: e.target.value })}
              />
              1 Stars & above
            </label>
          </div>
          <h3>Sort by</h3>
          <div className="radio-input">
            <label>
              <input
                type="radio"
                value="PRICE_LOW_TO_HIGH"
                name="price_sort"
                onChange={(e) =>
                  dispatch({ ...state, sortByPrice: e.target.value })
                }
              />
              Price - Low to High
            </label>
            <label>
              <input
                type="radio"
                value="PRICE_HIGH_TO_LOW"
                name="price_sort"
                onChange={(e) =>
                  dispatch({ ...state, sortByPrice: e.target.value })
                }
              />
              Price - High to Low
            </label>
          </div>
          <h3>Discount</h3>
          <div className="radio-input">
            <label>
              <input
                type="radio"
                value={50}
                name="discount"
                onChange={(e) =>
                  dispatch({ ...state, discount: e.target.value })
                }
              />
              50% & above
            </label>
            <label>
              <input
                type="radio"
                value={40}
                name="discount"
                onChange={(e) =>
                  dispatch({ ...state, discount: e.target.value })
                }
              />
              40% & above
            </label>
            <label>
              <input
                type="radio"
                value={30}
                name="discount"
                onChange={(e) =>
                  dispatch({ ...state, discount: e.target.value })
                }
              />
              30% & above
            </label>
            <label>
              <input
                type="radio"
                value={20}
                name="discount"
                onChange={(e) =>
                  dispatch({ ...state, discount: e.target.value })
                }
              />
              20% & above
            </label>
            <label>
              <input
                type="radio"
                value={10}
                name="discount"
                onChange={(e) =>
                  dispatch({ ...state, discount: e.target.value })
                }
              />
              10% & above
            </label>
            <label>
              <input
                type="radio"
                value={0}
                name="discount"
                onChange={(e) =>
                  dispatch({ ...state, discount: e.target.value })
                }
              />
              No discount
            </label>
          </div>
        </aside>
        {/* <!-- left side filter ended --> */}

        {/* <!-- all products listing started --> */}
        <div className="product-listing-setting">
          <div className="products-listing">
            <h3 className="listing-heading">
              Showing All Products
              <span>
                <small>(Showing {finalData.length} products)</small>
              </span>
            </h3>
            <div className="listing-column">
              {finalData.map((i) => (
                <div className="card-2" key={i._id}>
                  <div className="card-2-col-1">
                    <img src={i.image} alt={i.name} />
                  </div>
                  <div className="card-2-col-2">
                    <h3>{i.name}</h3>
                    <small className="brand-style">by {i.brand}</small>
                    <p className="discount-price">
                      ₹{i.mrp - (i.mrp * i.discount) / 100}{" "}
                      <span className="original-price">
                        ₹{i.mrp} <span className="line-on-price"></span>
                      </span>
                    </p>
                    <p className="discount-percent">{i.discount}% off</p>
                    <div className="rating">
                      <p>{i.rating}.0</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="star-rating"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <button className="card-2-button-1">Buy Now</button>
                    </div>
                    <div>
                      <button className="card-2-button-2">Add To Cart</button>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="card-icon-products"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={()=>{
                       state.wishlist = state.wishlist.concat(i)
                      console.log(state.wishlist)
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export { Products };
