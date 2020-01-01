const request = require('request')

console.log('VaFacilities loaded!')
const optionsAll = {
    url:'https://dev-api.va.gov/services/va_facilities/v0/facilities/all',
    method:'GET',
    headers:{
        'Accept': 'application/vnd.geo+json',
        'apikey': process.env.VA_FACILITY_API_KEY
    }
}

//Finds facicilty by name
// const findFacility = (name) =>{
//  request(optionsAll,function(err, res, body){
//     const data = JSON.parse(body)
//     //console.log(data.features[0].geometry.coordinates)
//     data.features.forEach(element => {
//         if(name.toLowerCase() === element.properties.name.toLowerCase()){
//             console.log(element)
//             return element;
//         }   
//     });
// })
//}

const findFacility = (name, callback) => {
    request(optionsAll, (error, { body }) =>{
        if(error){
            callback('Unable to connect to Veterans API servive', undefined)
        }else if (body.features.length === 0){
            callback('Unable to find facility. Try another facility.', undefined)
        }else{
            const data = JSON.parse(body)
            
            callback(undefined, console.log(body))
        }
    })
}

module.exports = findFacility