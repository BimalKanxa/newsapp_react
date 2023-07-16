import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 14,
    category: 'general'
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,

    }

  }

  async componentDidMount() {
    // let url = "https://newsapi.org/v2/top-headlines?country=in&category=businesscategory=${this.props.category}&apiKey=7fadfcdfdb4d496cb78de3634914ea09&pagesize=18";
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7fadfcdfdb4d496cb78de3634914ea09&pagesize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData)
    this.setState({ articles: parsedData.articles, 
      totalResults : parsedData.totalResults,
      loading : false
    })
    
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=in&category=businesscategory=${this.props.category}&apiKey=7fadfcdfdb4d496cb78de3634914ea09&page=${this.state.page - 1}&pagesize=18`;
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=7fadfcdfdb4d496cb78de3634914ea09&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
    // console.log("prev")

  }
  handleNextClick = async () => {
    if ((this.state.page + 1) <= Math.ceil(this.state.totalResults / 14)) {
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=businesscategory=${this.props.category}&apiKey=7fadfcdfdb4d496cb78de3634914ea09&page=${this.state.page + 1}&pagesize=18`;
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7fadfcdfdb4d496cb78de3634914ea09&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        // page : 1,
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      }); 
    }
    else {
      alert("No More Articles To Display")

    }
  }

  render() {

    return (

      <div className='container my-3'>
        <h2 className='text-center' style={{margin: '40px'}}>The News Hub - Top Headlines Today</h2>
        {this.state.loading && <Spinner/>}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} author={element.author?element.author:"Unknown"} date={element.publishedAt} newsUrl={element.url} />
              </div>
            )
          })}

        </div>


        <div className="container">
          <div className="d-flex justify-content-between my-3">
            <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous Page</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 14)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next Page &rarr;</button>
          </div>

        </div>

      </div>
    )
  }
}

export default News