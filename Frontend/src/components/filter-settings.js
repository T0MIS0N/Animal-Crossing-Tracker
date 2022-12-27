export default class FilterPane {
    constructor(filter) {
        this.filter = filter;
    }

    filterPane() {
        return (
            <div className="filter-div">
                <button onClick={() => this.toggleFilterPane()}><img src="/Images/UI/FlowerIcon.png" alt=""></img></button>
                <div className="filter-pane" id="filter-pane">
                    <h3>Filter</h3>
                    <h4>Not Donated<input id="donated" onClick={() => { this.filter.donated = document.getElementById("donated").checked; /*console.log(filter.collectedArray)*/ }} type="checkbox" /></h4>
                    <h4>Available Today<input id="today" onClick={() => { this.filter.activeToday = document.getElementById("today").checked }} type="checkbox" /></h4>
                    <h4>Available Right Now<input id="right-now" onClick={() => { this.filter.activeNow = document.getElementById("right-now").checked }} type="checkbox" /></h4>
                    <h4>Location<input id="location" onClick={() => { this.filter.location = document.getElementById("location").checked }} type="checkbox" /></h4>
                    <h5>
                        <input type="radio" name="location" id="" value="" />Anywhere
                        <input type="radio" name="location" id="" value="" />Trees
                        <input type="radio" name="location" id="" value="" />Tree Stumps<br />
                        <input type="radio" name="location" id="" value="" />Flowers
                        <input type="radio" name="location" id="" value="" />Rocks
                        <input type="radio" name="location" id="" value="" />Water
                        <input type="radio" name="location" id="" value="" />Etc.
                    </h5>
                    <h4>Weather<input id="weather" onClick={() => { this.filter.weather = document.getElementById("weather").checked }} type="checkbox" /></h4>
                    <h5>
                        <input type="radio" name="weather" id="" value="" />Any Weather
                        <input type="radio" name="weather" id="" value="" />Absent in Rain
                        <input type="radio" name="weather" id="" value="" />Rain
                    </h5>
                    <h4>Spawn Condition<input id="spawn-condition" onClick={() => { this.filter.spawnCondition = document.getElementById("spawn-condition").checked }} type="checkbox" /></h4>

                    <h4>Price<input id="price" onClick={() => { this.filter.price = document.getElementById("price").checked }} type="checkbox" /></h4>

                    <hr></hr>
                    <h3>Sort</h3>
                    <h4>Alphabetical</h4>
                    <h4>Price</h4>
                    <h5>Lowest to Highest</h5>
                    <h5>Highest to Lowest</h5>
                </div>
            </div>
        )
    }

    toggleFilterPane() {
        var filterPane = document.getElementById("filter-pane")
        if (filterPane.style.visibility === "hidden")
            filterPane.style.visibility = "visible"
        else
            filterPane.style.visibility = "hidden"
    }
}