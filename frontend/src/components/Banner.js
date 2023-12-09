import React from 'react';

export default function Banner() {
  return (
    <header style={{ paddingLeft: 0 }}>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkW7L8Xo9sF5oR45e0B4wSlfoiOLCFF3g8hQ&usqp=CAU')", height: 400 }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>About Us</h1>
                <h4 className='mb-3'>We are a team of developers</h4>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}