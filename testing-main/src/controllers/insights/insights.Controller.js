
import { client, index } from "../../config/elasticSearchConnection.js";


// route:  POST /api/insights/getInsights
// desc:   getting insights with startDate, endDate, category and customQuery
// access: PROTECTED
const getInsights = async (req, res) => {
    try {
        console.log("old")
       const {startDate, endDate, category, customQuery}=  req.body;
       if (startDate && endDate){
        var mainQuery={}
        mainQuery['size']=0;
        var aggsQuery= 
            {
            "range": {
                "date_range": {
                "field": "date_download",
                "format": "yyyy-MM-dd",
                "ranges":[ { "from": String(startDate), "to" : String(endDate) }]
                },
                "aggs": {
                    
                    
                    
                "top_keywords" : {
                        "terms" : { 
                            "field" : "article_keywords",
                            "size": 50
                        }
                    },
                    
                           
            "top_authors_by_most_articles_published": {
                "terms": {
                  "field": "authors",
                  "size": 50,
                  "order": {
                    "_count": "desc"
                  }
                },
                
                  "aggs": {
                    "avg engagment": {
                      "avg": {
                        "field": "total_engagement"
                      }
                    },
                      "total engagment": {
                      "sum": {
                        "field": "total_engagement"
                      }
                    }
                  }
              }  ,
              
                    
                "top_domians_by_most_articles_published": {
                        "terms": {
                        "field": "source_domain",
                        "size": 20,
                        "order": {
                            "_count": "desc"
                        }
                        },
                        
                        "aggs": {
                            "avg engagment": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            },
                            "total engagment": {
                            "sum": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    }  ,
                    
        
                "Popular Days" : {
                    "terms" : { 
                        "field" : "day_published",
                        "size": 7
                    },
                                    "aggs": {
                            "avg engagment per day": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    
                    
                },
            
                    
                    
                    "Popular Reading Levels" : {
                        "terms" : { 
                            "field" : "reading_level",
                            "size": 10
                        },
                                            "aggs": {
                            "avg engagment per Reading level": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    }
            
                        
                    ,
                    
                    
                    "popular_word_count": {
                    "range": {
                        "field": "article_length",
                        "ranges": [
                        {
                            "from": 1,
        
                            "to": 10000
                        },
                        {
                            "from": 10000,
                            "to": 20000
                        }
                        ,
                                    {
                            "from": 20000,
                            "to": 30000
                        },
                                    {
                            "from": 30000,
                            "to": 40000
                        }
                        ,
                        {"from":50000}
                        ]
                        
                    },
                        "aggs": {
                            "avg engagment per word count": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    },
                    
                    "avg_facebook_shares": {
                    "avg": {
                        "field": "facebook_shares"
                    }
                    },
                    
                    "avg_twitter_shares": {
                    "avg": {
                        "field": "twitter_shares"
                    }
                    },
                    "sum_facebook_shares": {
                    "sum": {
                        "field": "facebook_shares"
                    }
                    },
                    
                    "sum_twitter_shares": {
                    "sum": {
                        "field": "twitter_shares"
                    }
                    },
                
                    "total_engagement": {
                        "sum": {
                          "field": "total_engagement"
                        }
                      },
                      
                                          
                      "avg_engagement": {
                        "avg": {
                          "field": "total_engagement"
                        }
                      },

                    "article_per_date":
                    {
                    "date_histogram": {
                        "field": "date_download",
                        "calendar_interval": "day"
                    },
                        "aggs": {
                        "total_engagement_per_day": {
                            "avg": 
                                { 
                        "field": "total_engagement"
                                
                                }
                            
                        }
                        
                        }
                    }
                }
            }
            }

        mainQuery['aggs']=aggsQuery
        





        var categoryAndQuery=""
        var justQuery=""
        var justCategory=""
        
        if(category && customQuery){
            categoryAndQuery=       { 
            "bool": {
            "must": [
                {
                "multi_match":
                    {
                    "query": String(customQuery),
                    "fields": ["title","maintext"]
                    
                    }
                },
                { "term": {
                    "category": {
                        "value": String(category)
                    }
                }
                
                }
                ]
            }
            
            
        }

        mainQuery['query']=categoryAndQuery
        
        } 


        if(category && customQuery==undefined){
            justCategory=       { 
            "bool": {
            "must": [

                { "term": {
                    "category": {
                        "value": String(category)
                    }
                }
                
                }
                ]
            }
            
            
        }

        mainQuery['query']=justCategory

        } 



        if(category==undefined && customQuery){
            justQuery=
        {
            
            "bool": {
            "must": [

                {
                    "multi_match":
                    {
                        "query": String(customQuery),
                        "fields": ["title","maintext"]
                    
                    }
                    }
                ]
            }
            
            
        }
        mainQuery['query']=justQuery


        } 
        

    



        var returnedArticles=await client.search({
            index: index,
            body: mainQuery
        });

        res.status(200).json(returnedArticles)
    }   
    else{
        res.status(500).json({"errorMsg":"Please provide startData and endDate"})
 
    }
    } catch (err) {
        console.log("GET INSIGHTS ERROR", err);
        res.status(500).json({ errorMsg: "Server error" }) //500 for server error
    }

};

const getCustomTopicInsights = async (req, res) => {
    try {
     
       const {startDate, endDate, category, customQuery}=  req.body;
       if (startDate && endDate){
        var mainQuery={}
        mainQuery['size']=0;
        var aggsQuery= 
            {
            "range": {
                "date_range": {
                "field": "date_download",
                "format": "yyyy-MM-dd",
                "ranges":[ { "from": String(startDate), "to" : String(endDate) }]
                },
                "aggs": {
                    
                    
                    
                "top_keywords" : {
                        "terms" : { 
                            "field" : "article_keywords",
                            "size": 50
                        }
                    },
                    
                           
            "top_authors_by_most_articles_published": {
                "terms": {
                  "field": "authors",
                  "size": 50,
                  "order": {
                    "_count": "desc"
                  }
                },
                
                  "aggs": {
                    "avg engagment": {
                      "avg": {
                        "field": "total_engagement"
                      }
                    },
                      "total engagment": {
                      "sum": {
                        "field": "total_engagement"
                      }
                    }
                  }
              }  ,
              
                    
                "top_domians_by_most_articles_published": {
                        "terms": {
                        "field": "source_domain",
                        "size": 20,
                        "order": {
                            "_count": "desc"
                        }
                        },
                        
                        "aggs": {
                            "avg engagment": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            },
                            "total engagment": {
                            "sum": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    }  ,
                    
        
                "Popular Days" : {
                    "terms" : { 
                        "field" : "day_published",
                        "size": 7
                    },
                                    "aggs": {
                            "avg engagment per day": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    
                    
                },
            
                    
                    
                    "Popular Reading Levels" : {
                        "terms" : { 
                            "field" : "reading_level",
                            "size": 10
                        },
                                            "aggs": {
                            "avg engagment per Reading level": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    }
            
                        
                    ,
                    
                    
                    "popular_word_count": {
                    "range": {
                        "field": "article_length",
                        "ranges": [
                        {
                            "from": 1,
        
                            "to": 10000
                        },
                        {
                            "from": 10000,
                            "to": 20000
                        }
                        ,
                                    {
                            "from": 20000,
                            "to": 30000
                        },
                                    {
                            "from": 30000,
                            "to": 40000
                        }
                        ,
                        {"from":50000}
                        ]
                        
                    },
                        "aggs": {
                            "avg engagment per word count": {
                            "avg": {
                                "field": "total_engagement"
                            }
                            }
                        }
                    },
                    
                    "avg_facebook_shares": {
                    "avg": {
                        "field": "facebook_shares"
                    }
                    },
                    
                    "avg_twitter_shares": {
                    "avg": {
                        "field": "twitter_shares"
                    }
                    },
                    "sum_facebook_shares": {
                    "sum": {
                        "field": "facebook_shares"
                    }
                    },
                    
                    "sum_twitter_shares": {
                    "sum": {
                        "field": "twitter_shares"
                    }
                    },
                
                    "total_engagement": {
                        "sum": {
                          "field": "total_engagement"
                        }
                      },
                      
                                          
                      "avg_engagement": {
                        "avg": {
                          "field": "total_engagement"
                        }
                      },

                    "article_per_date":
                    {
                    "date_histogram": {
                        "field": "date_download",
                        "calendar_interval": "day"
                    },
                        "aggs": {
                        "total_engagement_per_day": {
                            "avg": 
                                { 
                        "field": "total_engagement"
                                
                                }
                            
                        }
                        
                        }
                    }
                }
            }
            }

        mainQuery['aggs']=aggsQuery
        


        }


     
     
     
     //////////////////////
     

       var q2 = { "bool": {} };
      var returnedObjJson =  req.body
      console.log(returnedObjJson, "post parse")


      let any_keywords_list = null;
      let must_also_keywords_list = null;
      let must_not_contains_keywords_list = null;
      let exclude_domains_list = null;
      let limit_domains_results_list= null;




  
        if (returnedObjJson.any_keywords_list && returnedObjJson.any_keywords_list.length >0) {
          any_keywords_list = returnedObjJson.any_keywords_list;
        }

        if (returnedObjJson.must_also_keywords_list && returnedObjJson.must_also_keywords_list.length >0) {
            must_also_keywords_list = returnedObjJson.must_also_keywords_list;
          }
  

          if (returnedObjJson.must_not_contains_keywords_list && returnedObjJson.must_not_contains_keywords_list.length >0) {
            must_not_contains_keywords_list = returnedObjJson.must_not_contains_keywords_list;
          }
  
          if (returnedObjJson.exclude_domains_list && returnedObjJson.exclude_domains_list.length >0) {
            exclude_domains_list = returnedObjJson.exclude_domains_list;
          }
  
          if (returnedObjJson.limit_domains_results_list && returnedObjJson.limit_domains_results_list.length > 0) {
            limit_domains_results_list = returnedObjJson.limit_domains_results_list;
          }
  
          var must_not = [];
          if (must_not_contains_keywords_list !== null) {
            must_not.push({
              "terms": {
                "title": must_not_contains_keywords_list
              }
            })
          }
          // exclude_domains_list
          if (exclude_domains_list !== null) {
            must_not.push({
              "terms": {
                "source_domain": exclude_domains_list
              }
            })
          }
    
          
    
          var filter = [];
    
    

    
    
    
          if (limit_domains_results_list !== null) {
            filter.push({
              "terms": {
                "source_domain": limit_domains_results_list
              }
            })
          }
    
      

  
      var should = [];


  

        if (any_keywords_list !== null && must_also_keywords_list !== null) {
          should.push({
            "terms": {
              "title": any_keywords_list
            }
          })


          should.push({
            "terms": {
              "maintext": any_keywords_list
            }
          })

          should.push({
            "terms": {
              "title": must_also_keywords_list
            }
          })


          should.push({
            "terms": {
              "maintext": must_also_keywords_list
            }
          })

        }



        if (any_keywords_list !== null && must_also_keywords_list === null) {
          should.push({
            "terms": {
              "title": any_keywords_list
            }
          })


          should.push({
            "terms": {
              "maintext": any_keywords_list
            }
          })


        }


        if (any_keywords_list === null && must_also_keywords_list !== null) {

          should.push({
            "terms": {
              "title": must_also_keywords_list
            }
          })


          should.push({
            "terms": {
              "maintext": must_also_keywords_list
            }
          })

        }


      if (must_not.length > 0) {
        q2["bool"]["must_not"] = must_not;
      }
      if (filter.length > 0) {
        q2["bool"]["filter"] = filter;
      }
      if (should.length > 0) {
        q2["bool"]["should"] = should;
      }




    console.log(q2)
    if (Object.keys(q2['bool']).length !== 0){
        mainQuery['query']=q2

    }

    
    var returnedArticles=await client.search({
        index: index,
        body: mainQuery
    });

    res.status(200).json(returnedArticles)
    // res.status(200).json(mainQuery)

       
    } catch (err) {
        console.log("GET INSIGHTS ERROR", err);
        res.status(500).json({ errorMsg: "Server error" }) //500 for server error
    }

};



export {
    getInsights,
    getCustomTopicInsights
};