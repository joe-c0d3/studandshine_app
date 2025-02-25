import { FaFacebook } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa6'



const Footer = () => {
  return (
    <footer className="py-3" style={{ backgroundColor: '#E3B448', color: 'black' }}>
        <div className="container text-center">
            {/* Quick Links Section */}
            <div className="mb-2">
                <a href="#" className="text-black text-decoration-none mx-2">Home</a>
                <a href="#" className="text-black text-decoration-none mx-2">About</a>
                <a href="#" className="text-black text-decoration-none mx-2">Shop</a>
                <a href="#" className="text-black text-decoration-none mx-2">Contact</a>
            </div>

            {/* Social Media Icons Section */}
            <div className="mb-2">
                <a href="#" className= "text-black mx-2"><FaFacebook /></a>
                <a href="#" className= "text-black mx-2"><FaXTwitter /></a>
                <a href="#" className= "text-black mx-2"><FaInstagram /></a>
            </div>

            {/* Copyright Section */}
            <p className="small mb-0">&copy; 2025 Stud And Shine</p>

        </div>    
    </footer>
  )
}

export default Footer