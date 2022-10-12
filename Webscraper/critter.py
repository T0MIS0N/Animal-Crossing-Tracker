#This file contains critter objects to make storage of scraped data more convenient to work with and allow for multiple types of export for that data

#The critter class is the base class for all critters. As such, it contains all the variables that are common between critter types
class Critter:
    def __init__(self, name, description, months_north, months_south, time, spawn_condition, price):
        self.name = name
        self.description = description
        self.months_north = months_north
        self.months_south = months_south
        self.time = time
        self.spawn_condition = spawn_condition
        self.price = price

#The Bug class adds location and weather variables as those are useful for finding bugs
class Bug(Critter):
    def __init__(self, name, description, months_north, months_south, time, spawn_condition, price, location, weather):
        self.name = name
        self.description = description
        self.months_north = months_north
        self.months_south = months_south
        self.time = time
        self.spawn_condition = spawn_condition
        self.price = price
        self.location = location
        self.weather = weather

    #This function returns a block of text that describes the bug
    def text(self):
        return f"""
        Name: {self.name}
        Description: {self.description}
        North Months: {self.months_north}
        South Months: {self.months_south}
        Time: {self.time}
        Location: {self.location}
        Weather: {self.weather}
        Spawn Condition: {self.spawn_condition}
        Price: {self.price}
        """

    #This function returns a block of text that describes the bug in JSON format which can easily be added to a json file
    def json(self):
        return f'''"Name":"{self.name}",
        "Description":"{self.description}",
        "NorthMonths":"{self.months_north}",
        "SouthMonths":"{self.months_south}",
        "Time":"{self.time}",
        "Location":"{self.location}",
        "Weather":"{self.weather}",
        "SpawnCondition":"{self.spawn_condition}",
        "Price":{self.price}'''

#The Fish class adds location, weather, and size variables as those are useful for finding fish
class Fish(Critter):
    def __init__(self, name, description, months_north, months_south, time, spawn_condition, price, location, weather, size):
        self.name = name
        self.description = description
        self.months_north = months_north
        self.months_south = months_south
        self.time = time
        self.spawn_condition = spawn_condition
        self.price = price
        self.location = location
        self.weather = weather
        self.size = size

    #This function returns a block of text that describes the fish
    def text(self):
        return f"""
        Name: {self.name}
        Description: {self.description}
        North Months: {self.months_north}
        South Months: {self.months_south}
        Time: {self.time}
        Location: {self.location}
        Weather: {self.weather}
        Size: {self.size}
        Spawn Condition: {self.spawn_condition}
        Price: {self.price}
        """

    #This function returns a block of text that describes the fish in JSON format which can easily be added to a json file
    def json(self):
        return f'''"Name":"{self.name}",
        "Description":"{self.description}",
        "NorthMonths":"{self.months_north}",
        "SouthMonths":"{self.months_south}",
        "Time":"{self.time}",
        "Location":"{self.location}",
        "Weather":"{self.weather}",
        "Size":"{self.size}",
        "SpawnCondition":"{self.spawn_condition}",
        "Price":{self.price}'''

#The Sea Creature class adds size and speed variables as those are useful for finding sea creatures
class Sea_Creature(Critter):
    def __init__(self, name, description, months_north, months_south, time, spawn_condition, price, size, speed):
        self.name = name
        self.description = description
        self.months_north = months_north
        self.months_south = months_south
        self.time = time
        self.spawn_condition = spawn_condition
        self.price = price
        self.size = size
        self.speed = speed

    #This function returns a block of text that describes the sea creature
    def text(self):
        return f"""
        Name: {self.name}
        Description: {self.description}
        North Months: {self.months_north}
        South Months: {self.months_south}
        Time: {self.time}
        Size: {self.size}
        Speed: {self.speed}
        Spawn Condition: {self.spawn_condition}
        Price: {self.price}
        """

    #This function returns a block of text that describes the sea creature in JSON format which can easily be added to a json file
    def json(self):
        return f'''"Name":"{self.name}",
        "Description":"{self.description}",
        "NorthMonths":"{self.months_north}",
        "SouthMonths":"{self.months_south}",
        "Time":"{self.time}",
        "Size":"{self.size}",
        "Speed":"{self.speed}",
        "SpawnCondition":"{self.spawn_condition}",
        "Price":{self.price}'''