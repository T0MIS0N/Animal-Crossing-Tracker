from bs4 import BeautifulSoup
import requests
import critter

#This python file contains a webscraper for retrieving Animal Crossing critter data. It uses BeautifulSoup4 to webscrape html pages.

#TODO: Char (fish) and Salmon (fish) need to be handled slightly different from every other critter. They have two sets of times available depending
#-on the time of year. This is also different based on hemisphere. This means data is scraped in such a way that there's some extra bits in their json.
#In the future, the scraper will need to be changed and a seasonal fish type needs to be added so Char and Salmon can be worked with in the app and API.

#TODO: Change critter JSON format to allow for date types for months available and times available to make API and DB easier to work with.

#This webscraper is made to work with nookipedia.com critter pages.
page_prefix = 'https://nookipedia.com'

#This function scrapes the webpage links of all the critters in a list page. For example, on the page listing all bugs, this collects all the links to every bug.
def scrape_list(web_page):
    #This console log gives confirmation that list scraping has started and it shows which list is getting scraped.
    print(f"Scraping List: {web_page}")
    #A list is created to store all the critter links.
    page_list = list()
    #The next 2 lines collect the HTML text from the webpage and parse it for use.
    html_text = requests.get(web_page).text
    parsed_html = BeautifulSoup(html_text, 'lxml')
    #This div list finds every div in the page that holds critter links (They're broken up into categories based on names which are alphabetically sorted).
    div_list = parsed_html.find_all('div', class_='mw-category-group')
    #This loop goes through all the divs collected.
    for div in div_list:
        link_list = div.find_all('a')
        #This loop goes through the links in the current div and adds them to a page list to collect all links.
        for link in link_list:
            page_list.append(link.get('href'))
    #This console log gives confirmation that list scraping has successfully finished.
    print(f"Finished Scraping List")
    #We return a list of all the critter page links found in the webpage.
    return page_list

#This function takes a table object (That holds critter data) and scrapes a specific set of data useful for bugs and returns it in a collection.
def scrape_bug_table(table_element):
    location = table_element[2].find('td').text.strip()
    weather = table_element[3].find('td').text.strip()
    return [location, weather]

#This function takes a table object (That holds critter data) and scrapes a specific set of data useful for fish and returns it in a collection.
def scrape_fish_table(table_element):
    location = table_element[2].find('td').text.strip()
    size = table_element[3].find('td').text.strip()
    #Weather isn't actually in any fish table, BUT there is one fish that is only catch-able during the rain. As such, we set weather to 'any weather' for most fish.
    weather = 'Any weather'
    #The rain condition is appended to location, so we check if it's present, and if so, update weather to 'Raining'.
    if 'rain' in location:
        weather = 'Raining'
        #If weather is set to raining, we cut that data off of the location.
        location = location.split(" ")[0]
    return [location, weather, size]

#This function takes a table object (That holds critter data) and scrapes a specific set of data useful for sea creatures and returns it in a collection.
def scrape_sea_creature_table(table_element):
    size = table_element[2].find('td').text.strip()
    speed = table_element[3].find('td').text.strip()
    return [size, speed]

#This function scrapes a critter page into an object.
def scrape_critter(page_suffix, critter_type):
    #Console log confirmation that a page has started being scraped. This is useful for troubleshooting the webscraper as the user can find where things are going wrong.
    print(f"Scraping Critter: {page_suffix}")
    #This initializes the HTML data from the webpage being scraped.
    critter_page = page_prefix + page_suffix
    critter_page_text = requests.get(critter_page).text
    critter_parsed_html = BeautifulSoup(critter_page_text, 'lxml')

    #This section scrapes the critter's name from the HTML.
    critter_name = critter_parsed_html.find('h1', class_='firstHeading').text
    new_horizon_section = 'null'

    #These conditions check for unnecessary text appended to names and strips it.
    if '(fish)' in critter_name:
        critter_name = critter_name.replace(' (fish)','')
    if '(sea creature)' in critter_name:
        critter_name = critter_name.replace(' (sea creature)','')

    #This code checks a few things about the webpage to ensure the right section of the page is selected.
    #Currently, there's a few weird key cases like the brown cicada page that uniquely break the scraper for that only, so the checks are a bit messy but necessary.
    if len(critter_parsed_html.find_all(id='In_New_Horizons_2')) != 0 or critter_type == 'sea_creature' or page_suffix == '/wiki/Brown_Cicada':
        new_horizon_section = critter_parsed_html.find(id='In_New_Horizons')
    else:
        new_horizon_section = critter_parsed_html.find(id='New_Horizons')

    #This code and the while loop below shifts the selected section of HTML until the right part is selected (Which is the div that holds critter data for NH).
    new_horizon_parent = new_horizon_section.parent
    critter_data = new_horizon_parent.next_sibling
    while critter_data.name != 'div':
        critter_data = critter_data.next_sibling

    #This line scrapes the critter's description.
    critter_quote = critter_data.find('i').text.strip('"').replace('"','\'')

    #This variable stores the critter's table data for use in scraping type-specific data.
    critter_table_rows = critter_data.find_all('tr')

    #This section scrapes the months the critter is active and the times it's available.
    time_of_year = critter_table_rows[0].text.strip()
    month_list = time_of_year.split("North: ")[1].split("South: ")
    #This if condition scrapes extra unneeded data from some critter's months section.
    if '[' in month_list[0]:
        month_list[0] = month_list[0].split('[')[0]
        month_list[1] = month_list[1].split('[')[0]
    time_of_day = critter_table_rows[1].find('td').text.strip()

    #This section scrapes out spawn requirements and critter price.
    offset = 0
    #The if condition checks if the table contains rarity data. If so, we change an offset to skip a cell as rarity breaks some tables for scraping.
    if critter_table_rows[4].find('th').text.strip() == 'Rarity':
        offset = 1
    spawn_requirement = critter_table_rows[4 + offset].find('td').text.strip()
    price_cell = critter_table_rows[5 + offset].find('td')
    #This variable grabs the locations of bell images as those can be used to easily find prices for price scraping.
    bell_image_list = price_cell.find_all(title='Bell')
    price = (bell_image_list[0]).previous_sibling.text.strip('\xa0 ')
    #This line removes commas from numbers as those break JSON format. For example 3,000 becomes 3000.
    price = price.replace(',', '')

    #This variable 'table_data' stores critter type specific data for use in object creation.
    table_data = list()
    #In these 'if' conditions, we check the critter type so we can scrape the right data and create the right critter type.
    if critter_type == 'bug':
        table_data = scrape_bug_table(critter_table_rows)
        #The print lines here and lower give confirmation that the critter scraping has successfully finished.
        print(f"Finished Scraping: {critter_name}")
        return critter.Bug(critter_name, critter_quote, month_list[0], month_list[1], time_of_day, spawn_requirement, price, table_data[0], table_data[1])
    if critter_type == 'fish':
        table_data = scrape_fish_table(critter_table_rows)
        print(f"Finished Scraping: {critter_name}")
        return critter.Fish(critter_name, critter_quote, month_list[0], month_list[1], time_of_day, spawn_requirement, price, table_data[0], table_data[1], table_data[2])
    if critter_type == 'sea_creature':
        table_data = scrape_sea_creature_table(critter_table_rows)
        print(f"Finished Scraping: {critter_name}")
        return critter.Sea_Creature(critter_name, critter_quote, month_list[0], month_list[1], time_of_day, spawn_requirement, price, table_data[0], table_data[1])

#This function scrapes critters from a webpage list and returns a list of critter objects that can be worked with easier.
def scrape_critters_from_page(list_web_page, critter_type):
    #This critter_page_list variable has all the links from the critter page.
    critter_page_list = scrape_list(list_web_page)
    #This list is for storing critters.
    critter_list = list()
    #This loop iterates through the links and then scrapes the data from each page into a critter object which is added to a list and then returned.
    for critter in critter_page_list:
        critter_list.append(scrape_critter(critter, critter_type))
    return critter_list

#This function writes each critter in the given list to a txt file
def write_critters_to_txt(critter_list, file_name):
    file_string = f"./Webscraper/{file_name}"
    f = open(file_string,"a")
    for critter in critter_list:
        f.write(critter.text())
    f.close()

#This function writes each critter in the given list to a structured JSON file. The returned file should be ready for use as a JSON collection.
def write_critters_to_json(critter_list, file_name):
    file_string = f"./Webscraper/{file_name}"
    f = open(file_string,"a")
    f.write('[\n')
    for critter in critter_list:
        #TODO: These if conditions might be able to be simplified by making the brackets write every time with the comma only being written in the if condition
        if critter != critter_list[-1]:
            f.write('\t{')
            f.write(critter.json())
            f.write('},\n')
        else:
            f.write('\t{')
            f.write(critter.json())
            f.write('}')
    f.write('\n]')
    f.close()

#From here and to the end, all the code written is for testing and scraping data using the webscraper.
#TODO: Remove all the testing and application code in this file and create some tests in the 'Testing' directory


#Scraping Tests
#print(scrape_critter("/wiki/Abalone", 'sea_creature').text())
#print(scrape_critter("/wiki/Giant_Cicada", 'bug').text())
#print(scrape_critter("/wiki/Angelfish", 'fish').text())
#print(scrape_critter("/wiki/Brown_Cicada", 'bug').text())


#JSON Scraping Tests
#write_critters_to_json(
#    [scrape_critter("/wiki/Abalone", 'sea_creature'),
#    scrape_critter("/wiki/Giant_Cicada", 'bug'),
#    scrape_critter("/wiki/Angelfish", 'fish')]
#    ,'test.json')


#File filling tests
#fish = scrape_critters_from_page('https://nookipedia.com/wiki/Category:New_Horizons_fish', 'fish')
#write_critters_to_txt(fish, 'Fish.txt')

#bugs = scrape_critters_from_page('https://nookipedia.com/wiki/Category:New_Horizons_bugs', 'bug')
#write_critters_to_txt(bugs, 'Bugs.txt')

#sea_creatures = scrape_critters_from_page('https://nookipedia.com/wiki/Category:New_Horizons_sea_creatures', 'sea_creature')
#write_critters_to_txt(sea_creatures, 'Sea_Creatures.txt')


#Full JSON Scrapes
#fish = scrape_critters_from_page('https://nookipedia.com/wiki/Category:New_Horizons_fish', 'fish')
#write_critters_to_json(fish, 'Fish.json')

#bugs = scrape_critters_from_page('https://nookipedia.com/wiki/Category:New_Horizons_bugs', 'bug')
#write_critters_to_json(bugs, 'Bugs.json')

#sea_creatures = scrape_critters_from_page('https://nookipedia.com/wiki/Category:New_Horizons_sea_creatures', 'sea_creature')
#write_critters_to_json(sea_creatures, 'Sea_Creatures.json')