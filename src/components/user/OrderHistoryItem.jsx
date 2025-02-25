import { BASE_URL } from "../../api"
import styles from "./OrderHistorItem.module.css"
import { FormatDate } from '../../FormatDate'

export const OrderHistoryItem = ({item}) => {
  return (
    <div className="card-body">
        <div className={`order-item mb-3 ${styles.orderItem}`}>
            <div className="row">
                <div className="col-md-2">
                    <img 
                        src={`${BASE_URL}${item.product.image}`}
                        alt="Order Item"
                        className="img-fluid"
                        style={{ borderRadius: '5px' }}
                    />
                </div>
                <div className="col-md-6">
                    <h6>{item.product.name}</h6>
                    <p>{`Order Date: ${FormatDate(item.order_date)}`}</p>
                    <p>{`Order ID: ${item.order_id}`}</p>
                </div>

                <div className="col-md-2 text-center">
                    <h6 className="text-muted"> {`Quantity: ${item.quantity}`}</h6>
                </div>

                <div className="col-md-2 text-center">
                    <h6 className="text-muted"> {`NGN${item.product.price}`}</h6>
                </div>
            </div>
        </div>
        {/* {Repeat for more orders} */}
    </div>

  )
}

export default OrderHistoryItem