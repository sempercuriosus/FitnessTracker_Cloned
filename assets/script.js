// #region Date
//

let current = {
  "date": "",
  "dateFormatted": "",
  "dateFormat": "YYYY-MM-DD",

  // goofy take on function overloading. wanted to reuse the format function, so I check for an input first, then default to formatt current
  /**
   * 
   * @param {string} dateInput (optional) if passed, the dateInput is formatted to the dateFormat
   * @returns  dateInput (optional) if passed or current is formatted
   */
  formatDate (dateInput)
  {
    if (dateInput)
    {
      let date = dayjs(dateInput);
      return date.format(this.dateFormat);
    } else
    {
      this.dateFormatted = this.date.format(this.dateFormat);
    }
  },
  updateDate ()
  {
    // getting the current time
    this.date = dayjs();
    this.formatDate();
  },
};


//
// #endregion Date  


// #region 

document.addEventListener("DOMContentLoaded", function ()
{
  // #region document selectors
  //

  let createButton = document.getElementById("create-button");
  // let saveButton = document.querySelector("#save-button");
  let closeButton = document.querySelector("#close-button");
  let deleteButton = document.querySelector("#delete-button");
  let workoutNameInput = document.getElementById("workout-name");
  let workoutDate = document.querySelector("#workout-date");
  let movementInput = document.getElementById("movement-input");
  let addMovementButton = document.getElementById("add-movement");
  let upcomingWorkoutButton = document.querySelector("#upcoming-workouts-button");
  let upcomingWorkoutContainer = document.querySelector("#upcoming-list-container");
  let upcomingWorkouts = document.querySelector("#upcoming-list");
  let pastWorkoutButton = document.querySelector("#past-workouts-button");
  let pastWorkoutContainer = document.querySelector("#past-list-container");
  let pastWorkouts = document.querySelector("#past-list");
  let selectedMovementsList = document.getElementById("selected-movements");
  let workoutDisplay = document.getElementById("displayWorkout");

  let equipmentInput = document.querySelector("#exercise-equipment");
  let nameInput = document.querySelector("#exercise-name");
  let typeInput = document.querySelector("#exercise-type");
  let muscleInput = document.querySelector("#exercise-muscle");

  let currentDataId = "";
  let selectedMovements = [];

  //
  // #endregion document selectors


  // #region Local Storage Init
  //

  let workouts = JSON.parse(localStorage.getItem("workouts"));

  if (!workouts)
  {
    workouts = [];
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }


  //
  // #endregion Local Storage Init


  // #region Create Workout Button
  //

  createButton.addEventListener("click", function ()
  {
    clearWorkoutForm();
    workoutDisplay.classList.remove("hide");
    createButton.disabled = true;
    workoutNameInput.disabled = false;
    workoutDate.disabled = false;
    movementInput.disabled = false;
    deleteButton.classList.add("is-hidden");
  });


  //function will make sure that when any of the buttons are clicked, rendering a form that the logo is hidden
  function toggleLogo () {
    var logo = document.getElementsByClassName('logo')[0];

    if (workoutDisplay.classList.contains('hide')) {
    logo.style.display='block';

  } else {
    logo.style.display='none';
  }
}
createButton.addEventListener('click',toggleLogo);
upcomingWorkouts.addEventListener('click',toggleLogo);
pastWorkouts.addEventListener('click',toggleLogo);
createButton.addEventListener('click',toggleLogo);

  //
  // #endregion Create Workout Button


  // #region Add Movement
  //

  addMovementButton.addEventListener("click", function ()
  {
    movementInput.classList.remove("is-danger");

    let movementValue = movementInput.value.trim();

    if (movementValue !== "")
    {
      selectedMovements.push(movementValue);

      let li = document.createElement("li");
      li.classList.add("block");
      li.textContent = movementValue;

      selectedMovementsList.appendChild(li);

      movementInput.value = "";

      saveWorkout();
    }
    else
    {
      movementInput.classList.add("is-danger");
    }
  });

  //
  // #endregion Add Movement


  // #region Save Button
  //

  // saveButton.addEventListener("click", saveWorkout);

  /**
  * Saves the Workout form on add of an item
  */
  function saveWorkout ()
  {
    let workoutName = workoutNameInput.value.trim();
    if (workoutName !== "" && workoutDate !== "" && selectedMovements.length > 0)
    {
      let workout = {
        name: workoutName,
        movements: selectedMovements,
        date: current.formatDate(workoutDate.value)
      };

      // Save workout to local storage
      workouts = JSON.parse(localStorage.getItem("workouts"));

      //Check if the item does not exist and the push based on that or update that item only
      let existingWorkoutIndex = workouts.findIndex(w => w.name === workout.name && w.date === workout.date);
      if (existingWorkoutIndex !== -1)
      {
        // Update if the workout already exists
        workouts[existingWorkoutIndex].movements = selectedMovements;

      } else
      {
        // Add as a new workout if not found
        workouts.push(workout);

        // Show menu and hide displayWorkout section
        // let workoutDisplay = document.getElementById("displayWorkout");
        // workoutDisplay.classList.add("hide");
      }

      // Enable the create button again
      createButton.disabled = false;

      localStorage.setItem("workouts", JSON.stringify(workouts));

      // reset the workouts
      workouts = JSON.parse(localStorage.getItem("workouts"));
    }
  }; //  [ end : saveWorkout ]



  //
  // #endregion Save Button


  // #region Close Button
  //

  closeButton.addEventListener("click", function ()
  {
    createButton.disabled = false;

    workoutDisplay.classList.add("hide");
  });

  //
  // #endregion Close Button  


  // #region Delete Button
  //

  deleteButton.addEventListener("click", function (event)
  {
    if (!document.querySelector("#delete-modal"))
    {
      // create the modal template 
      let modalContainer = document.createElement("div");
      modalContainer.id = "delete-modal";
      modalContainer.classList.add("modal");

      let modalBackground = document.createElement("div");
      modalBackground.classList.add("modal-background");

      let modalCard = document.createElement("div");
      modalCard.classList.add("modal-card");

      let modalHeader = document.createElement("header");
      modalHeader.classList.add("modal-card-head");

      let modalTitle = document.createElement("p");
      modalTitle.classList.add("modal-card-title");
      modalTitle.classList.add("is-full");
      modalTitle.innerHTML = "Delete Workout";

      let modalTitleClose = document.createElement("button");
      modalTitleClose.classList.add("delete");
      modalTitleClose.setAttribute("aria-label", "close");

      // add an event listener to the title close
      modalTitleClose.addEventListener("click", function (event)
      {
        const modalTarget = document.querySelector("#delete-modal");
        modalTarget.classList.remove("is-active");
      });

      let modalContentContainer = document.createElement("section");
      modalContentContainer.classList.add("modal-card-body");

      let modalContent = document.createElement("p");
      modalContent.innerHTML = "Do you want to delete this workout?";

      let modalFooter = document.createElement("footer");
      modalFooter.classList.add("modal-card-foot");

      let modalDeleteOption = document.createElement("button");
      modalDeleteOption.id = "modal-option-delete";
      modalDeleteOption.classList.add("button", "is-danger", "is-outlined");
      modalDeleteOption.innerHTML = "Ok";

      modalDeleteOption.addEventListener("click", function ()
      {
        deleteWorkout();
        const modalTarget = document.querySelector("#delete-modal");
        modalTarget.classList.remove("is-active");
      });

      let modalCancelOption = document.createElement("button");
      modalCancelOption.id = "modal-option-close";
      modalCancelOption.classList.add("button", "is-success");
      modalCancelOption.innerHTML = "Cancel";

      // keeping this apart from the close icon, for future development and assuming they will diverge in fucntionality.
      modalCancelOption.addEventListener("click", function (event)
      {
        const modalTarget = document.querySelector("#delete-modal");
        modalTarget.classList.remove("is-active");
      });

      // add the modal to the display
      workoutDisplay.appendChild(modalContainer);

      // create the modal 
      modalContainer.appendChild(modalBackground);
      modalContainer.appendChild(modalCard);
      modalCard.appendChild(modalHeader);
      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(modalTitleClose);
      modalCard.appendChild(modalContentContainer);

      // setting the modal content
      modalContentContainer.appendChild(modalContent);
      modalCard.appendChild(modalFooter);
      modalFooter.appendChild(modalDeleteOption);
      modalFooter.appendChild(modalCancelOption);

      // display the modal
      modalContainer.classList.add("is-active");
    }

    let displayModal = document.querySelector("#delete-modal");
    displayModal.classList.add("is-active");

  });

  /**
  * Generate a Modal Card to show a confirm delete
  */
  function deleteWorkout ()
  {
    //get the id of the current workout.
    let selectedWorkout = currentDataId;

    // remove from local storage
    for (let i = 0; i < workouts.length; i++)
    {
      // let removedWorkout = workouts.splice(i, 1);
      workouts = workouts.filter(workout => workout.name + " " + workout.date != selectedWorkout);

    }

    // save local storage
    localStorage.setItem("workouts", JSON.stringify(workouts));

    // render the objects again
    createButton.disabled = false;

    clearWorkoutForm();
    renderUpcomingWorkouts();
    renderPastWorkouts();

    workoutDisplay.classList.add("hide");

  }; //  [ end : confirmDetele ]


  //
  // #endregion Delete Button


  // #region Render Upcoming workouts
  //

  upcomingWorkoutButton.addEventListener("click", toggleUpcomingWorkouts);

  /**
  * Shows or Hides the upcoming workouts
  */
  function toggleUpcomingWorkouts ()
  {
    if (!upcomingWorkoutContainer.classList.contains("is-active"))
    {
      upcomingWorkoutContainer.classList.add("is-active");
      clearWorkoutForm();
      renderUpcomingWorkouts();
    }
    else
    {
      upcomingWorkoutContainer.classList.remove("is-active");
    }
  }; //  [ end : toggleUpcomingWorkouts ]

  /**
  * Render Upcoming workouts
  */
  function renderUpcomingWorkouts ()
  {
    let workoutsUpcoming = [];

    for (let i = 0; i < workouts.length; i++)
    {
      if (workouts[i].date >= current.dateFormatted)
      {
        workoutsUpcoming.push(workouts[i]);
      }
    }

    // sort workouts by date most recent to older
    workoutsUpcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

    upcomingWorkouts.innerHTML = "";

    if (workoutsUpcoming.length > 0)
    {

      for (let i = 0; i < workoutsUpcoming.length; i++)
      {
        // 
        let name = workoutsUpcoming[i].name + " " + workoutsUpcoming[i].date;

        let listItemContainer = document.createElement("div");
        listItemContainer.classList.add("dropdown-item");
        listItemContainer.setAttribute("data-id", name);

        upcomingWorkouts.appendChild(listItemContainer);

        let button = document.createElement("button");
        button.classList.add("button", "is-info", "is-outlined", "is-fullwidth");

        button.id = name;
        button.innerHTML = name;
        button.classList.add("workout");
        button.addEventListener("click", getDetails);

        listItemContainer.appendChild(button);
      }
    }
    else
    {
      let noUpcoming = document.createElement("p");
      noUpcoming.classList.add("dropdown-item");
      noUpcoming.innerHTML = "Nothing Yet!";

      upcomingWorkouts.appendChild(noUpcoming);
    }

  }; //  [ end : renderUpcomingWorkouts ]

  // Render Upcoming Details was here

  //
  // #endregion Render Upcoming workouts


  // #region Render Past Workouts
  //

  pastWorkoutButton.addEventListener("click", togglePastWorkouts);

  /**
  * Shows or Hides the past workouts
  */
  function togglePastWorkouts ()
  {
    if (!pastWorkoutContainer.classList.contains("is-active"))
    {
      // Logic here is opposite of the upcoming items from the previous design where upcoming workouts were displayed by default
      pastWorkoutContainer.classList.add("is-active");
      clearWorkoutForm();
      renderPastWorkouts();
    }
    else
    {
      pastWorkoutContainer.classList.remove("is-active");
    }
  }; //  [ end : togglePastWorkouts ]

  /**
  * Render Pasts workouts
  */
  function renderPastWorkouts ()
  {
    let workoutsPast = [];

    for (let i = 0; i < workouts.length; i++)
    {
      if (workouts[i].date < current.dateFormatted)
      {
        workoutsPast.push(workouts[i]);
      }
    }

    // sort workouts by date most recent to older
    workoutsPast.sort((a, b) => new Date(b.date) - new Date(a.date));

    pastWorkouts.innerHTML = "";
    if (workoutsPast.length > 0)
    {
      for (let i = 0; i < workoutsPast.length; i++)
      {
        let name = workoutsPast[i].name + " " + workoutsPast[i].date;

        let listItemContainer = document.createElement("div");
        listItemContainer.classList.add("dropdown-item");
        listItemContainer.setAttribute("data-id", name);

        pastWorkouts.appendChild(listItemContainer);

        let button = document.createElement("button");
        button.classList.add("button", "is-info", "is-outlined", "is-fullwidth");

        button.id = name;
        button.innerHTML = name;
        button.classList.add("workout");
        button.addEventListener("click", getDetails);

        listItemContainer.appendChild(button);
      }
    }
    else
    {
      let noUpcoming = document.createElement("p");
      noUpcoming.classList.add("dropdown-item");
      noUpcoming.innerHTML = "Nothing Yet!";

      pastWorkouts.appendChild(noUpcoming);
    }
  }; //  [ end : renderUpcomingWorkouts ]

  // /**
  // * Check what past workout to get
  // * @param {} event -  click event which attempts to match the name and date
  // */
  // function getPastDetails (event)
  // {
  //   let pastWorkoutButton = event.target;
  //   let pastId = pastWorkoutButton.id;
  //   currentDataId = pastWorkoutButton.id;

  //   if (pastWorkoutButton.matches("workout"))
  //   {
  //     for (let i = 0; i < workouts.length; i++)
  //     {
  //       if (workouts[i].name + " " + workouts[i].date == pastId)
  //       {
  //         workoutNameInput.value = workouts[i].name;
  //         workoutDate.value = workouts[i].date;

  //         workoutNameInput.disabled = true;
  //         workoutDate.disabled = true;
  //         movementInput.disabled = true;

  //         selectedMovementsList.innerHTML = "";

  //         for (let j = 0; j < workouts[i].movements.length; j++)
  //         {
  //           let movement = document.createElement("li");
  //           movement.textContent = workouts[i].movements[j];
  //           selectedMovementsList.appendChild(movement);
  //         }
  //         workoutDisplay.classList.remove("hide");
  //       }
  //     }
  //     pastWorkoutContainer.classList.remove("is-active");
  //   }
  // }; //  [ end : getPastDetails ]

  //
  // #endregion Render Past Workouts


  // #region Get Details on Future/Past workouts to render
  //


  /**
  * Check what upcoming workout to get
  * @param {} event - click event which attempts to match the name and date
  */
  function getDetails (event)
  {
    let button = event.target;
    let upcomingId = button.id;
    currentDataId = button.id;

    // Make sure the delete button is not hidden for past/upcoming items
    deleteButton.classList.remove("is-hidden");

    if (button.matches(".workout"))
    {
      // when I would go between upcoming and past workouts, the entire workouts object would have nothing in movements. 

      // Make sure workouts is updated
      workouts = JSON.parse(localStorage.getItem("workouts"));

      for (let i = 0; i < workouts.length; i++)
      {
        // Match the ID to the name and date
        if (workouts[i].name + " " + workouts[i].date == upcomingId)
        {
          // Clear the selectedMovements array
          selectedMovements = [];

          selectedMovements = workouts[i].movements;
          workoutNameInput.value = workouts[i].name;
          workoutDate.value = workouts[i].date;

          workoutNameInput.disabled = true;
          workoutDate.disabled = true;
          movementInput.disabled = false;

          // reset the content for the list
          selectedMovementsList.innerHTML = "";

          for (let j = 0; j < workouts[i].movements.length; j++)
          {
            let movement = document.createElement("li");
            movement.classList.add("block");
            movement.textContent = workouts[i].movements[j];
            selectedMovementsList.appendChild(movement);
          }
          workoutDisplay.classList.remove("hide");

          // break out when the item is found
          break;
        }
      }
      upcomingWorkoutContainer.classList.remove("is-active");
      pastWorkoutContainer.classList.remove("is-active");
    }
  }; //  [ end : getUpcomingDetails ]


  //
  // #endregion Get Details on Future/Past workouts to render


  // #region Clear Form
  //

  /**
  * Clears the Workout Input for the workout input 
  */
  function clearWorkoutForm ()
  {
    // Clear Inputs
    workoutNameInput.value = "";
    selectedMovements.length = 0;
    selectedMovementsList.innerHTML = "";
    workoutDate.value = "";

    // Clear API Search
    equipmentInput.value = "";
    nameInput.value = "";
    typeInput.value = "";
    muscleInput.value = "";

    // Reset Classess for formatting on form
    movementInput.classList.remove("is-danger");

  }; //  [ end : clearWorkoutForm ]


  //
  // #endregion Clear Form


  // #region Init
  //


  // update date on page reload
  current.updateDate();

  //
  // #endregion Init

});

// #endregion
