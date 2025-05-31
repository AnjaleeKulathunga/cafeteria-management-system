import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:8070";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [user, setUser] = useState(null);

    const userLogin = async (user) => {
        localStorage.setItem("user", JSON.stringify(user))

        setUser(user)
    }



    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev => ({ ...prev, [itemId]: 1 })));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            try {
                console.log("StoreContext: addToCart - Adding item:", itemId);
                const response = await axios.post(
                    `${url}/cart/add`,
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("addToCart - Success:", response.data);
            } catch (error) {
                console.error("addToCart - FAILED!");
                handleRequestError(error, "add item to cart");

                // Revert optimistic update
                setCartItems((prev) => {
                    const updatedCart = { ...prev };
                    if (updatedCart[itemId] > 1) {
                        updatedCart[itemId] -= 1;
                    } else {
                        delete updatedCart[itemId];
                    }
                    return updatedCart;
                });
            }
        } else {
            console.warn("addToCart - No token found. User not logged in.");
            alert("You need to be logged in to add items to the cart.");
        }
    };

    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] > 1) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        } else {
            setCartItems((prev) => {
                const updated = { ...prev };
                delete updated[itemId];
                return updated;
            });
        }

        if (token) {
            try {
                await axios.delete(`${url}/cart/remove`, {
                    data: { itemId },
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("removeFromCart - Item removed successfully");
            } catch (error) {
                console.error("removeFromCart - FAILED!");
                handleRequestError(error, "remove item from cart");
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/food/list`);
            if (response.data && response.data.data) {
                setFoodList(response.data.data);
                console.log("Food list fetched:", response.data.data);
            } else {
                console.error("Unexpected food list format:", response.data);
                setFoodList([]);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
            setFoodList([]);
        }
    };

    const loadCartData = async (passedToken) => {
        console.log("loadCartData with token:", passedToken);
        try {
            const response = await axios.get(`${url}/cart/get`, {
                headers: { Authorization: `Bearer ${passedToken}` }
            });

            if (response.data && response.data.cartData) {
                setCartItems(response.data.cartData);
                console.log("Cart data loaded:", response.data.cartData);
            } else {
                console.error("Unexpected cart data format:", response.data);
                setCartItems({});
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
            setCartItems({});
        }
    };

    useEffect(() => {
        console.log("StoreContext useEffect triggered");
        async function loadData() {
            await fetchFoodList();
            const currentToken = localStorage.getItem("token");
            if (currentToken) {
                setToken(currentToken);
                await loadCartData(currentToken);
            } else {
                console.log("No token found. Skipping cart load.");
                setCartItems({});
            }
        }
        loadData();

        // get user
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user)
        if (user) {
            setUser(user)
        }
    }, []);

    const handleRequestError = (error, actionDescription) => {
        if (error.response) {
            console.error("Error Response:", error.response.data);
            if (error.response.status === 401) {
                alert(`Authorization failed. Please log in again. Details: ${error.response.data.message || "Unauthorized"}`);
                // Optionally:
                // setToken("");
                // localStorage.removeItem("token");
            } else {
                alert(`Failed to ${actionDescription}. Server responded with: ${error.response.data.message || `Status ${error.response.status}`}`);
            }
        } else if (error.request) {
            alert(`No response from server while trying to ${actionDescription}. Check your connection.`);
        } else {
            alert(`Error trying to ${actionDescription}: ${error.message}`);
        }
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        user,
        setUser,
        userLogin
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
