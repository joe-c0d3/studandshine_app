import React, { useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import styles from './AboutUs.module.css'
import blob from "../../assets/blob11.png";
import hello from "../../assets/hello.png";
import woman from "../../assets/young-woman-shopping.png";




// You would typically import your CSS file here, e.g.,
// import './AboutPage.css'; // For the .left, .right, .cta, .blob, .hello, .portrait, #scroll-progress, #scroll-progress-bar styles

const AboutUs = () => {
  const scrollProgressBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percent = height > 0 ? (top / height) * 100 : 0;

      if (scrollProgressBarRef.current) {
        scrollProgressBarRef.current.style.width = percent + '%';
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <>
    <div className={styles.body}>
      {/* Scroll Progress Indicator */}
      <div id="scroll-progress">
        <div id="scroll-progress-bar" ref={scrollProgressBarRef}></div>
      </div>

      {/* Left side with images */}
      <div className={styles.left}>
        <img src={blob} alt="Blob Background" className={styles.blob} />
        <img src={hello} alt="Hello Text" className={styles.hello} />
        <img src={woman} alt="Portrait Image" className={styles.portrait} />
      </div>

      {/* Right side with textual content */}
      <div className={styles.right}>
        <h2 className='display-5 fw-bolder'>ABOUT US</h2>
        <p>
          Mandepudi Gopi Chakradhar, better known as Gopi, discovered his passion for technology and coding during his school days in Khammam.
        </p>
        <p>
          He pursued Computer Science at IIITDM Kurnool, enhancing skills in full-stack development, machine learning, and practical projects.
        </p>
        <Link to="/contact_us" className={styles.cta}>Contact Us</Link>
      </div>
      </div>
    </>
  );
};

export default AboutUs;