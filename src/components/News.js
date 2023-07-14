import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page : 1

    }

  }

    async componentDidMount(){
      let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=7fadfcdfdb4d496cb78de3634914ea09&pagesize=18";
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData)
      this.setState({articles:parsedData.articles})

    }

    handlePrevClick  = async() =>{
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=7fadfcdfdb4d496cb78de3634914ea09&page=${this.state.page - 1}&pagesize=18`;
      let data = await fetch(url);
      let parsedData = await data.json();
          this.setState({
               page: this.state.page - 1,
               articles:parsedData.articles
          })
// console.log("prev")
      
    }
    handleNextClick  = async() =>{
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=7fadfcdfdb4d496cb78de3634914ea09&page=${this.state.page + 1}&pagesize=18`;
      let data = await fetch(url);
      let parsedData = await data.json();
          this.setState({
              // page : 1,
               page: this.state.page + 1,
               articles:parsedData.articles
          })
      // console.log("next click")
    }

  render() {

    return (
      
      <div className='container my-3'>
        <h2>The News Hub - Top Headlines Today</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem title={element.title?element.title:"" } description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} newsUrl={element.url} />
              </div>
            )
          })}

        </div>



      

        <div className="container">
        <div className="d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous Page</button>
        <button type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next Page &rarr;</button>
        </div>

        </div>

      </div>
    )
  }
}

export default News