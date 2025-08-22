import React from 'react'

const Flower = () => {
    return (
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

            <circle cx="100" cy="100" r="20" fill="yellow" />

            <path d="M100 50 Q120 60 100 70 Q80 60 100 50" fill="pink" />
            <path d="M150 100 Q140 80 130 100 Q140 120 150 100" fill="pink" />
            <path d="M100 150 Q120 140 100 130 Q80 140 100 150" fill="pink" />
            <path d="M50 100 Q60 120 70 100 Q60 80 50 100" fill="pink" />

            <rect x="95" y="170" width="10" height="30" fill="green" />

            <path d="M105 180 Q125 170 105 160" fill="lightgreen" />
            <path d="M95 180 Q75 170 95 160" fill="lightgreen" />
        </svg>
    )
}

export default Flower