console.log('Clientside Javascript Loaded!')


function sorter(eventL, eventR, criteria) {
    arg1 = eventL.getElementsByClassName(criteria)[0].innerText
    arg2 = eventR.getElementsByClassName(criteria)[0].innerText
    return arg1 > arg2
}

function reorderEvents(arr) {
 
    var wrapper = document.getElementsByClassName("events-list");
    var items = wrapper[0].children;
    var elements = document.createDocumentFragment();

    arr.forEach(function(idx) {
        elements.appendChild(items[idx].cloneNode(true));
    });

    wrapper[0].innerHTML = null;
    wrapper[0].appendChild(elements);

    // reattach event listeners for collapsability
    document.querySelectorAll('.collapsible').forEach(elem => elem.addEventListener('click', toggleContent))
}

function showResults(query) {
    filter = query.value.toUpperCase();

    // Loop through all event items, and hide those who don't match the search query
    events = document.getElementsByClassName('events-list')[0].children
    eventsArr = Array.from(events)
    for (i = 0; i < eventsArr.length; i++) {
        eventName = eventsArr[i].getElementsByClassName("event-name")[0];
        txtValue = eventName.textContent || eventName.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            eventsArr[i].style.display = "";
        } else {
            eventsArr[i].style.display = "none";
        }
    }
}

function myFunction() {

    // Declare variables
    var criteria, events, eventsArr, filter, newOrder,vul, li, a, i, sortedEventsArr, txtValue;

    // TODO for criteria in filters { if active, apply }
    criteria = 'time'

    events = document.getElementsByClassName('events-list')[0].children;
    eventsArr = Array.from(events)

    newPositions = eventsArr.slice(0)                           // create copy
                            .sort((x,y)=> sorter(x,y,criteria)) // sort by criteria
                            .map(node=>eventsArr.indexOf(node)) // find position with respect to unsorted array

    reorderEvents(newPositions) // reorder DOM elements for events-list

    input = document.getElementById('search-query')

    showResults(input)
}