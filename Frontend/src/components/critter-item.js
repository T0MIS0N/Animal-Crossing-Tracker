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
                        <tr>
                            <td>
                                <img src={imageName} alt={critter.Name}></img>
                            </td>
                            <td className="info-cell">
                                <h4>{critter.Name}</h4>
                                <hr />
                                <h4>{critter.Description}</h4>
                                <hr />
                                <h4>{critter.NorthMonths}</h4>
                                <hr />
                                <h4>{critter.Time}</h4>
                                <hr />
                                {this.bugAndFishRows(critter)}
                                <h4>{critter.SpawnCondition}</h4>
                                <hr />
                                <h4>{critter.Price}<img src="/Images/UI/BellsIcon.png" alt="bells" height="30px" width="30px"></img></h4>
                                {this.setDonatedCheckHTML(critter.Name)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    bugAndFishRows(critter) {
        if (this.filter.critterType === 'bugs') {
            return (
                <div>
                    <h4>{critter.Location}</h4>
                    <hr />
                    <h4>{critter.Weather}</h4>
                    <hr />
                </div>
            )
        }
        if (this.filter.critterType === 'fish') {
            return (
                <div>
                    <h4>{critter.Location}</h4>
                    <hr />
                    <h4>{critter.Weather}</h4>
                    <hr />
                    <h4>{critter.Size}</h4>
                    <hr />
                </div>
            )
        }
        if (this.filter.critterType === 'sea-creatures') {
            return (
                <div>
                    <h4>{critter.Size}</h4>
                    <hr />
                    <h4>{critter.Speed}</h4>
                    <hr />
                </div>
            )
        }
    }

    setDonatedCheckHTML(critterName) {
        if (this.filter.collectedArray.includes(critterName))
            return (<h4>Donated <input type="checkbox" id={critterName + "CB"} onClick={() => this.filter.pressDonatedCheckbox(critterName)} defaultChecked /></h4>)
        else
            return (<h4>Donated <input type="checkbox" id={critterName + "CB"} onClick={() => this.filter.pressDonatedCheckbox(critterName)} /></h4>)
    }
}