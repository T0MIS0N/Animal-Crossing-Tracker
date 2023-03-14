import React from "react";
import "./art-grid.css"


function ArtGrid() {
    return (
        <div className="content">
            <div className="critter-table">
                <div className="grid">
                    {ArtCard()}
                    {ArtCard()}
                    {ArtCard()}
                    {ArtCard()}
                </div>
            </div>
        </div>
    );
}

function ArtCard() {
    var placeholderArtLink = "https://wallpaperset.com/w/full/2/2/9/207342.jpg";
    return (
        <table>
            <tbody>
                <tr><th colSpan={3} className="tabs">Art Name</th></tr>
                <tr><td className="key">Genuine Art</td><td className="key" colSpan={2}>Fake Art</td></tr>
                <tr><td rowSpan={2} className="image-content"><img className="art-card" alt="Genuine Art" src={placeholderArtLink} /></td><td className="image-content"><div className="flex-container"><img className="art-card" alt="Fake Art" src={placeholderArtLink} /></div></td><td className="art-note image-content">Woman has star earings instead of pearls</td></tr>
                <tr><td className="image-content"><div className="flex-container"><img className="art-card" alt="Fake Art" src={placeholderArtLink} /></div></td><td className="art-note image-content">The wolf was given a tongue that's sticking out</td></tr>
                <tr><td colSpan={3} className="tabs donated">Donated<input type="checkbox"></input></td></tr>
            </tbody>
        </table>
    )
}

export default ArtGrid;
