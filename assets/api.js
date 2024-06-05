
// #region Query Selectors
//

const searchButton = document.querySelector("#exercise-search");
const clearButton = document.querySelector("#clear-search");
const inputEquipmentName = document.querySelector("#exercise-equipment");
const inputExerciseName = document.querySelector("#exercise-name");
const inputExerciseType = document.querySelector("#exercise-type");
const inputExerciseMuscle = document.querySelector("#exercise-muscle");
const outputExerciseSuggestions = document.querySelector("#exercise-suggestions");


//
// #endregion Query Selectors


// #region Exercise API Object
//

/**
 * API Data
 * @property {string} XApiKey - Key used for requests  
 * @property {string} endpointBase - Endpoint for requests to be made.
 * @property {object} params - Contains an object of the parameters for requests.
 * @property {object} labels - The label for each parameter to be added into the api request
 * @property {string} paramDelimiter - The delimiter to sit between the parameters 
 * @property
 *  
 */
const exerciseApi = {
    "X-Api-Key": "uujzBHxJrI0YArVOAisVuA==ZXw07HyfVDK2OjSz",
    "endpointBase": "https://api.api-ninjas.com/v1/exercises",
    "params": {
        "name": "",
        "type": "",
        "muscle": "",
        "equipment": "",
    },
    "labels": {
        "name": "name=",
        "type": "type=",
        "muscle": "muscle=",
        "equipment": "equipment=",
    },
    "paramDelimiter": "&"
};


//
// #endregion Exercise API Object


// #region Exercise API Request Items
//

/**
* Gets the data that are present from the optional inputs for the exercise api
*/
function getExerciseApiInput ()
{
    let request = { ...exerciseApi };

    request.params.name = inputExerciseName.value.replaceAll(/[^a-zA-Z]+/g, "");
    request.params.type = inputExerciseType.value.replaceAll(/[^a-zA-Z]+/g, "");
    request.params.muscle = inputExerciseMuscle.value.replaceAll(/[^a-zA-Z]+/g, "");
    request.params.equipment = inputEquipmentName.value.replaceAll(/[^a-zA-Z]+/g, "");

    createRequestUrl(request);

}; //  [ end : getExerciseApiInput ]


/**
* create url for request
* @param {string} request - Instance of the {exerciseApi} to concatenate the optional params, if included, to the api request
*/
function createRequestUrl (request)
{
    const queryStringArray = [];

    for (const param in request.params)
    {
        const value = request.params[param];
        if (value !== "")
        {
            queryStringArray.push(request.labels[param] + value);
        }
    }

    const queryString = queryStringArray.join(request.paramDelimiter);

    if (queryStringArray.length > 0)
    {
        request.endpointBase = request.endpointBase.concat("?", queryString);
    }

    fetchExercises(request.endpointBase, request["X-Api-Key"]);
}; //  [ end : createRequestUrl ]

/**
* Does the Fetch to the passed in url to get data that are present.
* @param {string} requestUrl - The Exercise API endpoint with the parameters
* @param {string} apiKey - API Key used in request header
* @returns 
*/
function fetchExercises (requestUrl, apiKey)
{
    let options = {
        headers: { "X-Api-Key": apiKey }
    };

    if (requestUrl && apiKey)
    {
        fetch(requestUrl, options)
            .then((response) =>
            {
                if (response.ok || response.status == 200)
                {
                    return response.json();
                }
                else
                {
                    throw new Error(response);
                }
            }).then(function (data)
            {
                renderExerciseAPIData(data);
            })
            .catch((error) =>
            {
                // can I render no results from here?
                renderNoResults();
            });
    }
}; //  [ end :  ]

/**
* Render the Exercise API data that are returned.
* @param {JSON} data - The data that are returned from the Exercise API are parsed to get the names, made into a unique list, 
*/
function renderExerciseAPIData (data)
{
    let exerciseNames = [];

    outputExerciseSuggestions.innerHTML = "";

    // const suggestionsLabel = document.createElement("p");
    // suggestionsLabel.textContent = "Exercise Suggestions";
    // suggestionsLabel.id = "suggestions-label";

    // outputExerciseSuggestions.append(suggestionsLabel);

    for (let i = 0; i < data.length; i++)
    {
        exerciseNames.push(data[i].name);
    }

    // because the data names are not unique I am adding this to only show unique items
    let uniqueExercises = new Set(exerciseNames);

    if (uniqueExercises.size == 0)
    {
        renderNoResults();
    }

    let list = document.createElement("ul");

    for (const exercise of uniqueExercises)
    {
        let listItem = document.createElement("li");
        listItem.classList.add("block");

        let capExercise = exercise.split(/[\s\-]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        listItem.textContent = capExercise;

        list.appendChild(listItem);
    }

    outputExerciseSuggestions.append(list);

}; //  [ end : renderExerciseAPIData ]


/**
* Renders the case when no results are found
* @param {}  - 
* @returns 
*/
function renderNoResults ()
{
    let modalContainer = document.createElement("div");
    modalContainer.id = "no-resutls-modal";
    modalContainer.classList.add("modal", "is-active");

    let background = document.createElement("div");
    background.classList.add("modal-background");

    let contentContainer = document.createElement("div");
    contentContainer.classList.add("modal-content", "box");

    let button = document.createElement("button");
    button.classList.add("modal-close", "is-large");
    button.ariaLabel = "close";

    button.addEventListener("click", function (event)
    {
        const modalTarget = document.querySelector("#no-resutls-modal");
        modalTarget.classList.remove("is-active");
    });

    let content = document.createElement("p");
    content.id = "modal-message";
    content.textContent = "No Suggestions Returned";

    outputExerciseSuggestions.append(modalContainer);
    modalContainer.appendChild(background);
    modalContainer.appendChild(contentContainer);
    contentContainer.appendChild(button);
    contentContainer.appendChild(content);

}; //  [ end : renderNoResults ]


//
// #endregion Request Items


// #region Clear Suggestions
//

/**
* Clear Exercise Suggestions Output
*/
function clearSuggestions ()
{
    outputExerciseSuggestions.innerHTML = "";
}; //  [ end : clearSuggestions ]


//
// #endregion Clear Suggestions

// #region On Click
//

searchButton.addEventListener("click", getExerciseApiInput);
clearButton.addEventListener("click", clearSuggestions);

//
// #endregion On Click


// test callers
// getExerciseApiInput();
// createRequestUrl();

