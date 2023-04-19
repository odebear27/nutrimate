import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { height } from '@mui/system';


function Header() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
        
      <div className="navbar-header-custom">
      <Carousel activeIndex={index} onSelect={handleSelect} >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://x.yummlystatic.com/web/img-fruit-bowl.png"
            alt="First slide"
            style={{ width: '100%', height:'600px' }}
          />
          <Carousel.Caption>
            <div style={{color: 'black'}}>
            <h3>Browse Recipes</h3>
            <p>Thousands of recipes at your Fingertips </p>
                <Link  to="/"> Browse here</Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets.epicurious.com/photos/64341b17f9970272d7333ca6/9:4/w_1432,h_636,c_limit/HerbSalt_HERO_040623_50997.jpg"
            alt="Second slide"
            style={{ width: '100%', height:'600px' }}
          />
  
          <Carousel.Caption>
          <div style={{color: 'black'}}>
            <h3>Visit your Favourite Saved Recipes</h3>
            <Link  to="/savedrecipes"> Browse Saved Recipes</Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.simplyrecipes.com/thmb/stjm2N9O8CIA7A_UqF4Q6vPMAmc=/1200x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Banana-Chocolate-Muffins-LEAD-07-9cca7d28c1d14da68c552cf164ba6a39.jpg"
            alt="Third slide"
            style={{ width: '100%', height:'600px' }}
          />
  
          <Carousel.Caption>
            <h3>What's Popular?</h3>
          
              <Link to='/myfeed'>Browse Your Feed 
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
    
    );
  }


export default Header;