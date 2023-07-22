import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 11,
    // category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
      

    }
    if (this.props.category) {
      document.title = `${this.capitalize(this.props.category)} - News Hub`;
    }

  }

  async updatenews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7fadfcdfdb4d496cb78de3634914ea09&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    await this.updatenews()

  }

         //fetching more data during infinite scroll
  fetchMoreData = async () => {
        this.setState({page: this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7fadfcdfdb4d496cb78de3634914ea09&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData)
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading: false
        })
  };

  render() {

    return (
<>
     
        <h2 className='text-center' style={{ margin: '40px' }}>The News Hub - Top {this.capitalize(this.props.category)} Headlines </h2>
        {this.state.loading && <Spinner/>}   
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
         
       <div className="container">
        <div className="row">

          {!this.state.loading && this.state.articles.map((element, index) => {
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
}

export default News