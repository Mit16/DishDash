import { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ apiURL }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(apiURL + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Unable to get orders list");
    }
  };

  const orderStatusHandler = async (event, orderId) => {
    const response = await axios.post(apiURL + "/api/orders/status", {
      orderId,
      orderStatus: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹ {order.amount}</p>
            <select
              onChange={(event) => orderStatusHandler(event, order._id)}
              value={order.orderStatus}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const OrdersList = () => {
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get(apiURL + "/api/orders");
//       setOrders(response.data.orders);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const orderStatusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(apiURL + "/api/orders/status", {
//         orderId,
//         orderStatus: event.target.value,
//       });

//       if (response.data.success) {
//         alert("Order status updated successfully");
//         await fetchAllOrders();
//       } else {
//         alert("Failed to update order status: " + response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       alert("An error occurred while updating order status.");
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   return (
//     <div>
//       <h1>Orders List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
//               <td>{order._id}</td>
//               <td>
//                 <select
//                   onChange={(event) => orderStatusHandler(event, order._id)}
//                   value={order.orderStatus}
//                 >
//                   {/* Adjust options based on portal type */}
//                   <option value="Ordered">Ordered</option>
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="In Preparation">In Preparation</option>
//                   <option value="Ready for Pickup">Ready for Pickup</option>
//                   <option value="Assigned to Delivery Agent">Assigned to Delivery Agent</option>
//                   <option value="Picked Up">Picked Up</option>
//                   <option value="Out for Delivery">Out for Delivery</option>
//                   <option value="Delivered">Delivered</option>
//                   <option value="Cancelled">Cancelled</option>
//                   <option value="Delayed">Delayed</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrdersList;
