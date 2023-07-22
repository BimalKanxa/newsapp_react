import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

    // document.title = `${capitalize(props.category)} - News Hub`;


  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updatenews =  async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)  //setting progress bar below navbar
  }

  useEffect(() => {
   updatenews()
  }, [])

         //fetching more data during infinite scroll

  const fetchMoreData = async () => {
        setPage(page+1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        // setLoading(false)
       
  };

    return (
<>
     
        <h2 className='text-center' style={{ margin: '40px' }}>The News Hub - Top {capitalize(props.category)} Headlines </h2>
        {loading && <Spinner/>}   
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
         
       <div className="container">
        <div className="row">

          {articles.map((element, index) => {
            return (
              <div className="col-md-4 my-2" key={element.url+ index}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} author={element.author ? element.author : "Unknown"} date={element.publishedAt} newsUrl={element.url} source={element.source.name} />
              </div>
            )
          })}

        </div>
        </div>
        </InfiniteScroll>

      {/* </div> */}
      </>
    )
  }


News.defaultProps = {
  country: 'in',
  pageSize: 11,
  // category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News