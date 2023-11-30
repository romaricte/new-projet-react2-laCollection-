import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { AddCart } from "../redux/action";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Product = () => {
  const { id } = useParams();
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(false);

  // const dispatch = useDispatch();
  // const addProduct = (product) => {
  //   dispatch(AddCart(product));
  // };

  useEffect(() => {
    const getProducts = async () => {
      setloading(true);
      const reponse = await fetch(`https://fakestoreapi.com/products/${id}`);
      setproduct(await reponse.json());
      setloading(false);
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-border">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-start"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description} </p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            // onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Product;
