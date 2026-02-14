import React from 'react';
import './ThreeDBook.css';

const ThreeDBook = ({ coverImage }) => {
    return (
        <div className="book-container">
            <div className="book">
                <div className="front" style={{ backgroundImage: `url(${coverImage})` }}>
                    {/* Optional: Add glint or text overlay here */}
                </div>
                <div className="back"></div>
                <div className="left"></div> {/* Spine */}
                <div className="right"></div> {/* Pages */}
                <div className="top"></div>
                <div className="bottom"></div>
            </div>
        </div>
    );
};

export default ThreeDBook;
