import { Link, useLocation } from "react-router-dom"
import styles from "./InvoiceCancelledPage.module.css"
import { useEffect, useState } from "react"
import api from "../../api";



const InvoiceCancelledPage = ({setNumberCartItems}) => {

  const [statusMessage, setStatusMessage] = useState("Verifying your payment...");
  const [statusSubMessage, setStatusSubMessage] = useState("Wait a moment, your payment is being verified!")
  const location = useLocation();

  useEffect(function(){
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status')
    const ref = queryParams.get('ref')

    if(status && ref) {
      api.post(`cancelled_page/?ref=${ref}&status=${status}`)
      .then(res => {
        console.log(res.data)
        setStatusMessage(res.data.message);
        setStatusSubMessage(res.data.subMessage);
      })

      .catch(err => {
          console.log(err.message)
      })
  }

  }, [])

  return (
    <header className="py-3 my-5" style={{backgroundColor: "#3A6B35"}}>
        <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h1 className="display-4 fw-bold">{statusMessage}</h1>
                <p className="lead fw-normal text-white-75 mb-4">{statusSubMessage}</p>
                <p className="lead fw-normal text-white-75 mb-4">You will receive an email (inbox or spam folder) with a payment confirmation and receipt.</p>
                <p className="lead fw-normal text-white-75 mb-4">If you have not made the payment, use the navigation button and go back to the generated invoice then click on cancel invoice.</p>
                <Link to="/" className={`${styles.pill_button} btn btn-light btn-lg rounded-pill px-4 py-2`}>Back Home</Link>
            </div>


        </div>
    </header>
  )
}

export default InvoiceCancelledPage