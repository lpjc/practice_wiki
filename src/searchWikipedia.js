/* 

*/

export default async function getResultsFromWiki(titleSearch){

    var url = "https://en.wikipedia.org/w/api.php"; 
    console.log("Entered Search with " + titleSearch);
    var params = {
        action: "query",
        list: "search",
        srsearch: titleSearch,
        format: "json"
    };
    let resultLists = [];

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    await fetch(url)
        .then(function(response){return response.json();}, console.log("in first then"))
        .then(function(response) {
            for (var key in response.query.search){
                console.log("into loop " + key);
                let thisResult = response.query.search[key].title
                console.log(thisResult)
                resultLists.push(thisResult)
            }
            console.log("exited loop with array "+ resultLists);
        })
        .catch(function(error){console.log(error);});

    return resultLists

    }

