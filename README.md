# Fitness Tracker

**User Story**
```
As a user, I want to select my workout type and add exercises.
As a user, I want my workout history to be dated.
As a user, I want to be able to find gyms near me.
As a user, I want to input my exercise movements and have them store in a list.
```

---

## Table of Contents
- [About The Project](#aboutProject)
- [Getting Started](#gettingStarted)
- [Deployment Location](#deploymentLocation)
- [Author Credit](#authorCredit)
- [Resources](#resources)

---

## About The Project <a id="aboutProject"></a>

Our application is a workout planner/tacker. That will allow our users to add multiple workout movements to a list as well as see a list of upcoming workouts. There is a [search](#exerciseSearch) to pull various exercises names, types, muscle groups, and equipment to suggest exercises for your workouts if you are feeling stuck or just want to add in something new to your workout routine. There is an integration with [Google Maps](#searchMaps) to search for gym locations by zip code. The map is centered with the latitude and longitude coordinates of Charlotte NC. When the user enters their zip code, the map is then recentered with the new zip location from geocoding. A specific request for “gyms” helps grabs and sorts data and renders the list of gyms from that tag. The gym locations are shown on the map with a location marker and a list is rendered below the map. 

### Built With
- HTML
- Bulma CSS
- Javascript
- API Ninja's Exercise API
- Google Maps
- Font Awesome
- DayJS


---

## Getting Started <a id="gettingStarted"></a>

### Prerequisites & Dependencies

- [Bulma CSS](https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css)
- [Google Maps API](https://unpkg.com/@googlemaps/js-api-loader@1.x/dist/index.min.js)
- [Font Awersome](https://kit.fontawesome.com/7c9180ab11.js)
- [Day JS](https://cdn.jsdelivr.net/npm/dayjs@1.11.3/dayjs.min.js)

### Installation

This is a web application, so there is no need to install anything. ​

### Usage

#### General Functionality
- **Create A Workout** 
Opens the form that will allow you to input a workout name, workout date, and add one or more movements to create your workout. Each time a movement is added the workout is automatically saved, so there is no need to worry about forgetting to save it.  

- **Upcoming Workouts**
Displays the workouts whose date's have not yet passed ordered from the closest to the current date to the furthest away. The items are listed in a list and each item is clickable to return the information for each workout.

- **Previous Workouts**
Displays the workouts whose date's **have already past** ordered from the closest to the current date to the furthest away. The items are listed in a list and each item is clickable to return the information for each workout.

- **Adding a Movement**
    - The "Movement" form field input must have a value 
    - Click the "+" button located immediately near the input

- **Close Workout**
Simply closes and clears the form to add/view a workout and movements.

- **Delete Workout**
When prompted, deletes the current workout and closes the form.

#### Upcoming and Past Workouts
When a workout is added and 

#### Exercise Search <a id="exerciseSearch"></a>
**Please Note:** These are dictated by the API used to search with, [API Ninjas Exercise API](https://api-ninjas.com/api/exercises), so the results returned are in their control. The Groups and Values are from their documentation.

When searching, you can use any number of these groups to hone your suggestions. Included underneath the groups are some of the exercises that may be searched for. The application does only support a single item, per group input, so you cannot string multiple search terms together in a group, at this time.

There four main groupings to search for exercise suggestions with:

|Equipment|Names|Type|Muscle Groups|
|---------|---------|---------|---------|
|Body Weight|Arms|Cardio|Abdominals|
|Barbell|Bench|Olympic_weightlifting|Abductors|
|Dumbbell|Curl|Plyometrics|Adductors|
||Legs|Powerlifting|Biceps|
||Press|Strength|Calves|
|||Strength|Chest|
|||Stretching|Forearms|
|||Strongman|Glutes|
||||Hamstrings|
||||Lats|
||||Lower_Back|
||||Middle_Back|
||||Neck|
||||Quadriceps|
||||Traps|
||||Triceps|

#### Maps <a id="searchMaps"></a>

User can Input any zip code to retrieve a list of gyms near them. The results are shown on the map via a marker and then listed below in a list under the map.

## Screenshots

<img width="1440" alt="Screenshot 2023-09-11 at 6 19 44 PM" src="https://github.com/VonjareeW/FitnessTracker/assets/52430595/d7c77196-c460-4bdd-af70-950ec50659f9">

<img width="1440" alt="Screenshot 2023-09-11 at 6 18 02 PM" src="https://github.com/VonjareeW/FitnessTracker/assets/52430595/6a66d669-d862-472c-9fa8-99b2138748aa">

## Deployment Location <a id="deploymentLocation"></a>

- [Demo Location](https://vonjareew.github.io/FitnessTracker/)

---

## Author Credit <a id="authorCredit"></a>

- Tyler Stubbs
- Vonjaree Willson
- Modeste Natimana
- Eric Hulse

---

## Resources <a id="resources"></a>

- [Bulma CSS Link](https://bulma.io/documentation/overview/)
- [Day JS Link](https://day.js.org/docs/en/installation/installation)

---

