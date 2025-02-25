import React from 'react'
import OrderHistoryItem from './OrderHistoryItem'

export const OrderHistoryItemContainer = ({orderitems}) => {
  return (
    <div className="row" style={{height: '300px', overflow: 'auto'}}>
        <div className="col-md-12">
            <div className="card">
                <div className="card-header" style={{ backgroundColor: '#E3B448', color: 'black'}}>
                    <h5>Order History</h5>
                </div>

                {orderitems.map(item => <OrderHistoryItem key={item.id} item={item} />)}

            </div>

        </div>

    </div>
  )
}

export default OrderHistoryItemContainer