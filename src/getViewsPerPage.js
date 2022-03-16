export default async function mapResults(results) {
  
  let Article = function(title, views){
  // object that contains a title and a viewcount
      this.title = title;
      this.views = views;
  } 

  let topN = 10;
  let allArticles = []
  let allArticlesSortedDescending = []
  let topArticles = []
  let yesterday = new Date(Date.now() - 86400000);
  let yesterdayFormatted = yesterday.toISOString().slice(0,10).replace(/-/g,"");

  await Promise.all(results.map(async (element) => { // doing the Promise.all() for not executing code after this map(), before its done. 
      try {
        const response = await fetch(
          "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/"+ element +"/daily/"+yesterdayFormatted+"/"+ yesterdayFormatted,
          {
            method: "GET"
          }
        );

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();
        const thisItem = data.items[0] // in case of wierd data, only grab first object.

        // creating and pushing a new Article object into the allArticle array for later use, cutting away info from original item.
        allArticles.push(
          new Article(
            thisItem.article, 
            thisItem.views
          )
        )
      }
       catch (error) {
        console.log(error);
      }
  }))
  
  allArticlesSortedDescending = allArticles.sort((a, b) => parseFloat(b.views) - parseFloat(a.views)); // sort descending
  topArticles = allArticlesSortedDescending.slice(0,topN)
  console.log(topArticles);
  return topArticles
}
