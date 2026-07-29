import './App.css';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function App() {
  const images = [
    { id: 1, url: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg', alt: 'Hong Kong' },
    { id: 2, url: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp', alt: 'Macao' },
    { id: 3, url: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp', alt: 'Japan' },
    { id: 4, url: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp', alt: 'Las Vegas' }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      
      <Carousel 
        showArrows={true} 
        infiniteLoop={true} 
        showThumbs={true} 
        autoPlay={true} 
        interval={3000}
      >
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.url} alt={image.alt} />
            <p className="legend">{image.alt}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
