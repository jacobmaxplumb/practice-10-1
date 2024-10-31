import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetHistoryQuery } from '../state/pizzaApi'

export default function OrderList() {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const {data: orders} = useGetHistoryQuery();
  
  useEffect(() => {
    if (orders) {
      if (selectedFilter === 'All') setFilteredOrders(orders);
      else setFilteredOrders(orders.filter(o => o.size === selectedFilter))
    }
  }, [orders, selectedFilter]);
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  {order.customer} ordered a size {order.size} with {order.toppings?.length || 'no'} {order.toppings?.length === 1 ? 'topping' : 'toppings'}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === selectedFilter ? ' active' : ''}`
            return <button
              onClick={() => setSelectedFilter(size)}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
