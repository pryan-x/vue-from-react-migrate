import React from 'react';
import '../../../css/carousel/CarouselCaret.css'

export default (props) => (
<div className={`carousel-caret-wrapper  caret-${props.direction}`}>
    <div 
        onClick={props.shiftCarousel} 
        className={`carousel-caret-container ${props.direction}`}
    >
        <svg width="500" height="500" fill='none' viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <circle className='circle' cx="250" cy="250" r="250" />
        <path  className='caret' fillRule="evenodd" clipRule="evenodd" d="M99.5416 218.586C98.7605 219.367 98.7605 220.633 99.5416 221.414L128.191 250.064L99.4778 278.777C98.6968 279.558 98.6968 280.824 99.4778 281.605L111.586 293.713C112.367 294.494 113.633 294.494 114.414 293.713L143.127 265L156.713 251.414C157.494 250.633 157.494 249.367 156.713 248.586L114.542 206.414C113.761 205.633 112.494 205.633 111.713 206.414L99.5416 218.586Z"/>
        <path  className='caret' fillRule="evenodd" clipRule="evenodd" d="M401.586 281.542C402.367 280.761 402.367 279.494 401.586 278.713L372.936 250.064L401.649 221.351C402.431 220.57 402.431 219.303 401.649 218.522L389.542 206.414C388.761 205.633 387.494 205.633 386.713 206.414L358 235.127L344.414 248.713C343.633 249.494 343.633 250.761 344.414 251.542L386.586 293.713C387.367 294.494 388.633 294.494 389.414 293.713L401.586 281.542Z"/>
        </svg>
    </div>
</div>
)