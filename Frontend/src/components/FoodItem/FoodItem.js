import React, { useContext} from 'react'
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

function FoodItem({id,name,price,description,image}) {
    
    const context = useContext(StoreContext);

    // Early return or default display if context or cartItems is not yet available
    if (!context || !context.cartItems || !context.url) { // also check for url
        // Optionally, render a loading state or null
        // For now, let's just prevent the error by not rendering the problematic part
        // Construct image URL if possible, otherwise use raw image prop
        const imageUrl = context && context.url && image ? `${context.url}/images/${image}` : image;
        return (
            <div className='food-item'>
                <div className="food-item-img-container">
                    <img className='food-item-image' src={imageUrl} alt=""/>
                    {/* Placeholder or loading for add to cart button */}
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <img src={assets.rating_starts} alt=""/>
                    </div>
                    <p className="food-item-desc">{description}</p>
                    <p className="food-item-price">${price}</p>
                </div>
            </div>
        );
    }

    const { cartItems, addToCart, removeFromCart, url } = context; // Add url here

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            {/* Construct the full image URL */}
            <img className='food-item-image' src={`${url}/images/${image}`} alt=""/>
            {
                !cartItems[id]
                ?<img className='add'onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
                :<div className='food-item-counter'>
                    <img onClick={()=>removeFromCart(id)}src={assets.remove_icon_red} alt=""/>
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>

                </div>
            }

        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt=""/>

            </div>
            <p className="food-item-desc">
                {description}
            </p>
            <p className="food-item-price">
                ${price}
            </p>

        </div>
      
    </div>
  )
}

export default FoodItem