import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Header() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://x.yummlystatic.com/web/img-fruit-bowl.png"
            alt="First slide"
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
          />
  
          <Carousel.Caption>
          <div style={{color: 'black'}}>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.simplyrecipes.com/thmb/stjm2N9O8CIA7A_UqF4Q6vPMAmc=/1200x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Banana-Chocolate-Muffins-LEAD-07-9cca7d28c1d14da68c552cf164ba6a39.jpg"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }


export default Header;