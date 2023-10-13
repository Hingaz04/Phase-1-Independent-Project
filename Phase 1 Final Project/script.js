// DOM Elements
const title = document.getElementById("title");
const poster = document.getElementById("game-poster");
const matchDate = document.getElementById("match-date");
const matchTime = document.getElementById("time");
const matchVenue = document.getElementById("match-venue");
const ticketBookButton = document.getElementById("btn");
const matchList = document.getElementById("matchday9");
const availableTicketsElement = document.getElementById("available-tickets");

//Fetch the details for the first match.
fetch("http://localhost:3000/matchday9/1")
.then((response) => response.json())
.then((data) => {
   matchDetails(data);
})
.catch((error) => console.error("Error fetching match detail",  error));

//Fetch list of the other matches.
fetch("http://localhost:3000/matchday9")
.then((response) => response.json())
.then((matches) => {
  matchDay9List(matches);
})
.catch((error) => console.error("Error fetching match list", error));

//Function to update match details
function matchDetails(match){
  title.textContent = match.title;
  poster.src = match.poster;
  matchDate.textContent = match.match_date;
  matchTime.textContent = match.time;
  matchVenue.textContent = match.match_venue;
  capacity.textContent = match.capacity;
  const availableTickets = match.capacity - match.sold_tickets;
  availableTicketsElement.textContent = availableTickets;
  if (availableTickets === 0){
    ticketBookButton.disabled = true;
  }
}

// Function for the button.
ticketBookButton.addEventListener("click", () => {
  const availableTickets = parseInt
  (availableTicketsElement.textContent);
  if (availableTickets > 0){
    availableTicketsElement.textContent = availableTickets - 1;
  }
  alert("Ticket acquired see you at the game!")
})

//Function to populate the match date 9 list

function matchDay9List(matches){
 matches.forEach((match) => {
  const matchItem = document.createElement("li");
  matchItem.textContent = match.title;
  matchItem.className = "match-item";
  matchItem.addEventListener("click", () => {
    //Fetch and display the selected movie details.
    fetch(`http://localhost:3000/matchday9/${match.id}`)
    .then((response) => response.json())
    .then((data) => {
      matchDetails(data);
    })
    .catch((error) => console.error("Error fetching match details", error));
  });
  matchList.appendChild(matchItem)
 })
}


