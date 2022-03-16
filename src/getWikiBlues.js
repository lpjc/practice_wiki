/* 

*/

export default async function getBluesFromWiki(titleSearch){

    var url = "https://en.wikipedia.org/w/api.php"; 
    console.log("Entered Search with " + titleSearch);
    var params = {
        action: "query",
        format: "json",
        pllimit: "499",
        titles: titleSearch,
        prop:"links",
    };

    let resultLists = [];

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    await fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            console.log("Response: " + response.continue.plcontinue);

            let plcontinueArray = response.continue.plcontinue.split("|") // return an array of the object, baseed on a string splitted with | . 
            let pageID = plcontinueArray[0]
            let thisPage = response.query.pages[pageID]
           
            thisPage.links.forEach(element => {
                resultLists.push(element.title);
            });

            console.log("exited loop with array "+ resultLists);
        })
        .catch(function(error){console.log(error);});

    return resultLists

    }

