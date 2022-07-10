import React from "react";
import "./Main.css";

const Main = ({ data, addItemsHandler }) => {
  //console.log(data);
  return (
    <div className="items-wrapper">
      {data.map((items) => {
        return (
          <div className="item-display" key={items.productID}>
            <h4 className="item-name">{items.productName}</h4>
            <div className="image-availability">
              <img
                src={items.productImage}
                alt={items.productName}
                className="image"
              />
              {(items.available === "LimitedAvailability" ||
                items.available === "InStock") && (
                <span className="availability">{items.available}</span>
              )}
            </div>

            <p className="price">Price: Rs {items.price}</p>
            {items.available === "LimitedAvailability" ||
            items.available === "InStock" ? (
              <button
                className="btn-addToCart"
                onClick={() => {
                  addItemsHandler(items.productID);
                }}
              >
                Add To Cart
              </button>
            ) : (
              <button
                disabled={true}
                className="btn-addToCart"
                onClick={() => addItemsHandler(items.productID)}
              >
                {items.available}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Main;
