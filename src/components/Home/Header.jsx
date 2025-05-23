import styles from "./Header.module.css"


const Header = () => {
  return (
    <header className='py-5' style={{backgroundColor: "#3A6B35"}}>
        <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h1 className="display-4 fw-bold">Welcome To Your Favourite Store!</h1>
                <p className="lead fw-normal text-white-75 mb-4">Discover the latest trends with our modern collection</p>
                <a href="#shop" className={`${styles.pill_button} btn btn-light btn-lg rounded-pill px-4 py-2`}>Shop Now</a>
            </div>
        </div>
    </header>
  )
}

export default Header