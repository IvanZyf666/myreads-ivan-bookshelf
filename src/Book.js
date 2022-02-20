import React, { Component } from 'react'
class Book extends Component{
  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.onShelfUpdate(this.props.book, event.target.value);
  }
  render(){
    const { title, authors, imageLinks, shelf } = this.props.book;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{width: 138,
                      height: 170,
                      backgroundImage: `url(${imageLinks && imageLinks.thumbnail})`
                    }}>
              <div title={shelf} className={"book-tag"+" book-tag-"+shelf}/>
            </div>
            <div className="book-shelf-changer">
              <select defaultValue={'move'} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    )
  }
}
export default Book