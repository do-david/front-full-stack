/*eslint complexity: ["error", 6]*/

import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation } from '@apollo/client';

import { AppContext } from 'utils/context/AppContext';
// import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner.component';

import { GET_ALL_ORDERS } from 'utils/apollo/queries/order';
import { ADD_TO_CART } from 'utils/apollo/mutations/cart';


/**
 * Display and process product object when we click on the Add To Cart button
 * Adds product to shopping cart
 * @param {Object} product
 */
const AddToCartButton = ({ product }:any) => {
  const [, setCart] = useContext(AppContext);
  const [, setRequestError] = useState(null);
  const [, setShowViewCart] = useState(false);
  const [showAddToCart, setshowAddToCart] = useState(false);

  const productId = product.productId;
  const userId = product.userId;
  const productQueryInput = {
    clientMutationId: uuidv4(), // Generate a unique id.
    productId,
  };

  // Get Cart Data.
  const { data, refetch } = useQuery(GET_ALL_ORDERS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
    //   const updatedCart = getFormattedCart(data);
      localStorage.setItem('cart', data);
      // Update cart data in React Context.
      setCart(data);
    },
  });

  const [
    addToCart,
    { loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQueryInput,
    },
    onCompleted: () => {
      // If error.
      if (addToCartError) {
        setRequestError(addToCartError.extraInfo);
      }
      // Update the cart with new values in React context.
      refetch();
      // Show View Cart Button
      setShowViewCart(true);
      setshowAddToCart(true);
    },
    // onError: (error) => {
    //   if (error) {
    //     setRequestError(error);
    //   }
    // },
  });

  const handleAddToCartClick = () => {
    setRequestError(null);
    addToCart();
  };

  // Separate out conditions here for increased readability
  const fadeInButton =
    addToCartLoading && `animate__animated animate__fadeOutUp`;
  const fadeOutButton =
    showAddToCart && `animate__animated animate__fadeInDown`;

  return (
    <>
      <button
        onClick={handleAddToCartClick}
        className={`px-4 py-2 font-bold bg-white border border-gray-400 border-solid rounded hover:bg-gray-400 ${fadeInButton} ${fadeOutButton}`}
      >
        Ajouter au panier
      </button>

      {addToCartLoading && (
        <>
          <div className="mt-4 text-xl text-left">
            Chargement ...
            <br />
          </div>
          {/* <div className="absolute ml-32">
            <LoadingSpinner />
          </div> */}
        </>
      )}
    </>
  );
};

export default AddToCartButton;
