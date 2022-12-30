import "./critter-item.css"

//This function returns an HTML item for the critter grid.
export default class CritterItem {
    constructor(filter) {
        this.filter = filter
    }

    critterCard(critter) {
        var imageName = ""
        if (this.filter.critterType === 'bugs')
            imageName = "/Images/Insects/" + critter.Name + ".png"
        if (this.filter.critterType === 'fish')
            imageName = "/Images/Fish/" + critter.Name + ".png"
        if (this.filter.critterType === 'sea-creatures')
            imageName = "/Images/SeaCreatures/" + critter.Name + ".png"
        return (
            //This key attribute on the grid items is ESSENTIAL to let the app know which component is which to allow it to
            //Understand what to rerender and when.
            <div className="grid-item" key={critter.Name + "Item"}>
                <table className="grid-table">
                    <tbody>
                        <tr><th colSpan={3} className="critter-name"><h2>{critter.Name}</h2></th></tr>
                        <tr><td colSpan={3} className="critter-desc"><h4>{critter.Description}</h4></td></tr>
                        <tr>
                            <td rowSpan={this.getImageRowSpan()} className="critter-image"><img src={imageName} alt={critter.Name}></img></td>
                            <td className="table-label"><h4>Months Active</h4></td>
                            <td className="table-content"><h4>{critter.NorthMonths}</h4></td>
                        </tr>
                        <tr>
                            <td className="table-label"><h4>Hours Active</h4></td>
                            <td className="table-content"><h4>{critter.Time}</h4></td>
                        </tr>
                        {this.getLocationRow(critter)}
                        {this.getWeatherRow(critter)}
                        {this.getSpeedRow(critter)}
                        {this.getSizeRow(critter)}
                        <tr>
                            <td className="table-label"><h4>Spawn Condition</h4></td>
                            <td className="table-content"><h4>{critter.SpawnCondition}</h4></td>
                        </tr>
                        <tr>
                            <td className="table-label"><h4>Sell Price</h4></td>
                            <td className="table-content"><h4>{critter.Price}<img src="/Images/UI/BellsIcon.png" alt="bells" className="bell-img"></img></h4></td>
                        </tr>
                        <tr><td colSpan={3} className="critter-donate">{this.setDonatedCheckHTML(critter.Name)}</td></tr>
                    </tbody>
                </table>
            </div>
        )
    }

    getImageRowSpan() {
        if (this.filter.critterType === "fish")
            return 7
        return 6
    }

    getLocationRow(critter) {
        if (this.filter.critterType === "sea-creatures") {
            return
        }
        return (
            <tr>
                <td className="table-label"><h4>Location</h4></td>
                <td className="table-content"><h4>{critter.Location}</h4></td>
            </tr>
        )
    }

    getWeatherRow(critter) {
        if (this.filter.critterType === "sea-creatures")
            return
        return (
            <tr>
                <td className="table-label"><h4>Weather</h4></td>
                <td className="table-content"><h4>{critter.Weather}</h4></td>
            </tr>
        )
    }

    getSizeRow(critter) {
        if (this.filter.critterType === "bugs")
            return
        return (
            <tr>
                <td className="table-label"><h4>Size</h4></td>
                <td className="table-content"><h4>{critter.Size}</h4></td>
            </tr>
        )
    }

    getSpeedRow(critter) {
        if (this.filter.critterType === "sea-creatures")
            return (
                <tr>
                    <td className="table-label"><h4>Speed</h4></td>
                    <td className="table-content"><h4>{critter.Speed}</h4></td>
                </tr>
            )
    }

    setDonatedCheckHTML(critterName) {
        if (this.filter.collectedArray.includes(critterName))
            return (<h4>Donated <input type="checkbox" id={critterName + "CB"} onClick={() => this.filter.pressDonatedCheckbox(critterName)} defaultChecked /></h4>)
        else
            return (<h4>Donated <input type="checkbox" id={critterName + "CB"} onClick={() => this.filter.pressDonatedCheckbox(critterName)} /></h4>)
    }
}