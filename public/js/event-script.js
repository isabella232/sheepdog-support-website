console.log('Clientside Javascript Loaded!')

function subscribe() {
    var isSubscribed = this
}

function filterByEventName(event) {
    var eventParam = $(event).find("h1.event-name")// find event parameter to compare with filter
    var query = $(document).find("#event-search-query").val().toLowerCase()
    return eventParam.text().toLowerCase().indexOf(query) > -1 // compare
}

function filterByDate(event) {
    if ($(document).find("#event-filter-activate-date").prop("checked")) {
        var eventParam = $(event).find(".time") // find event parameter to compare with filter
        var startDate = $(document).find("#event-filter-input-date-start").val().toLowerCase()
        var endDate = $(document).find("#event-filter-input-date-end").val().toLowerCase()  
        return eventParam.text().toLowerCase() >= startDate &&
               eventParam.text().toLowerCase() <= endDate
    }
    return true
}

function filterByUser(event) {
    if ($(document).find("#event-filter-activate-user").prop("checked")) {
        var eventParam = $(event).find(".owner") // find event parameter to compare with filter
        var filterVal = $(document).find("#event-filter-input-user").val().toLowerCase()
        return eventParam.text().toLowerCase().indexOf(filterVal) > -1 // compare
    }
    return true
}

function filterByLocation(event) {
    if ($(document).find("#event-filter-activate-location").prop("checked")) {
        var eventParam = $(event).find(".location") // find event parameter to compare with filter
        var filterVal = $(document).find("#event-filter-input-location").val().toLowerCase()
        return eventParam.text().toLowerCase().indexOf(filterVal) > -1 // compare
    }
    return true
}

// https://www.shift8web.ca/2017/01/use-jquery-sort-reorganize-content/
// sort function for events
function sorter(eventL, eventR, criteria, order) {
    an = eventL.getElementsByClassName(criteria)[0].innerText
    bn = eventR.getElementsByClassName(criteria)[0].innerText
    if (order == "asc") {
        if (an > bn)
            return 1;
        if (an < bn)
            return -1;
    } else if (order == "desc") {
        if (an < bn)
            return 1;
        if (an > bn)
            return -1;
    }
    // same
    return 0
}

// sorts events and remakes the DOM to compensate (keeping track of event handlers)
function sortMeBy(arg, sel, elem, order) {
    var $selector = $(sel),
    $element = $selector.children(elem);
    $element.sort((a, b)=>sorter(a, b, arg, order))
    $element.detach().appendTo($selector);
}

function updateSearchResults() {
    var events = $("div.events-list").children() // get all events
    var eventFilters = [filterByDate, filterByLocation, filterByUser, filterByEventName] // filters to apply
    events.filter(function() {
        for (var i = 0; i < eventFilters.length; i++) {
            if (!eventFilters[i]($(this))) {
                $(this).toggle(false)
                return false
            }
        }
        $(this).toggle(true)
        return true
    })
}
// Array.from(document.getElementsByClassName('events-list')[0].children).forEach(node=>console.log(node.getElementsByClassName('owner')[0].innerText))

// https://www.w3schools.com/bootstrap/bootstrap_filters.asp
// main function
$(document).ready(function(){
    // default display is by date, ascending
    sortMeBy("time", "div.events-list", "li", "asc");
    // TODO display three most followed events
    $("#event-search-query, .event-filter-query").keyup(function() { updateSearchResults() })
    $(".event-filter-active, event-filter-input-date-start, event-filter-input-date-end").change(function() { updateSearchResults() });
    $("update-events-search").click(function() { updateSearchResults() })
})
// John is too salty to delete this dead code >:( jk keep this for reference in case Jquery is too slow for searching

// function sorter(eventL, eventR, criteria) {
//     arg1 = eventL.getElementsByClassName(criteria)[0].innerText
//     arg2 = eventR.getElementsByClassName(criteria)[0].innerText
//     return arg1 > arg2
// }

// function reorderEvents(arr) {
 
//     var wrapper = document.getElementsByClassName("events-list");
//     var items = wrapper[0].children;
//     var elements = document.createDocumentFragment();

//     arr.forEach(function(idx) {
//         elements.appendChild(items[idx].cloneNode(true));
//     });

//     wrapper[0].innerHTML = null;
//     wrapper[0].appendChild(elements);

//     // reattach event listeners for collapsability
//     document.querySelectorAll('.collapsible').forEach(elem => elem.addEventListener('click', toggleContent))
// }

// function showResults(query) {
//     filter = query.value.toUpperCase();

//     // Loop through all event items, and hide those who don't match the search query
//     events = document.getElementsByClassName('events-list')[0].children
//     eventsArr = Array.from(events)
//     for (i = 0; i < eventsArr.length; i++) {
//         eventName = eventsArr[i].getElementsByClassName("event-name")[0];
//         txtValue = eventName.textContent || eventName.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             eventsArr[i].style.display = "";
//         } else {
//             eventsArr[i].style.display = "none";
//         }
//     }
// }

// function myFunction() {

//     // Declare variables
//     var criteria, events, eventsArr, filter, newOrder,vul, li, a, i, sortedEventsArr, txtValue;

//     // TODO for criteria in filters { if active, apply }
//     criteria = 'time'

//     events = document.getElementsByClassName('events-list')[0].children;
//     eventsArr = Array.from(events)

//     newPositions = eventsArr.slice(0)                           // create copy
//                             .sort((x,y)=> sorter(x,y,criteria)) // sort by criteria
//                             .map(node=>eventsArr.indexOf(node)) // find position with respect to unsorted array

//     reorderEvents(newPositions) // reorder DOM elements for events-list

//     input = document.getElementById('search-query')

//     showResults(input)
// }

