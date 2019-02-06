import React from 'react'
import { connect } from 'react-redux'
import { fetchFeeds, fetchFeed } from './common/api/actions'
import styled from 'styled-components'

const Rectangle = styled.div`
  height: 30px;
  width: 100%;
  background-color: rgb(120, 100, 123);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat';
  font-size: 30px;
  color: white;
  padding: 16px;
`

const Nav = styled.div`
  width: 15%;
  min-width: 60px;
  background-color: rgb(120, 100, 123);
  justify-content: left;
  align-items: left;
  font-family: 'Montserrat';
  font-size: 15px;
  color: white;
  padding: 16px;
  button {
    background: transparent;
    border: none;
    font-size: 30px;
    color: white;
  }
  ul {
    list-style: none;
    padding-inline-start: 0px;
    li {
      margin: 4px;
    }
  }
`

const ActiveFeed = styled.div`
  width: 85%;
  min-width: 40px;
  justify-content: left;
  align-items: left;
  font-family: 'Montserrat';
  font-size: 17px;
  color: black;
  padding: 16px;
  height: 100%;
`
const mapStatetoProps = state => {
  return {
    result: state.simpleReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFeeds: (params: { sortBy: string }) => dispatch(fetchFeeds(params)),
    fetchFeed: (id: string, params: { sortBy: string }) =>
      dispatch(fetchFeed(id, params)),
  }
}

interface AppProps {
  fetchFeeds: (params: { sortBy: string }) => Promise<string>
  fetchFeed: (id: string, params: { sortBy: string }) => Promise<string>
  result: any
}

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props)
    this.props.fetchFeeds({ sortBy: 'id' })
  }

  fetchFeed = (id: string, params: string[]) => {
    this.props.fetchFeed(id, { sortBy: 'id' })
  }

  renderFeedList = () => {
    const result = this.props.result.feeds
    const listItems = result.map(feed => (
      <li
        key={feed.id}
        onClick={this.props.fetchFeed.bind(null, feed.id, { sortBy: 'id' })}
      >
        {feed.title}
      </li>
    ))
    return <ul>{listItems}</ul>
  }

  renderActiveFeed = () => {
    const feed = this.props.result.feed
    const listPapers = feed.map(paper => (
      <li key={paper.id} style={{ display: 'flex' }}>
        <img src={paper.photo} alt="Paper pic" style={{ padding: '4px' }} />
        {paper.title}
        <ul>
          <li> Journal: {paper.journal} </li>
          <li>
            {' '}
            Authors:
            <ol>
              {paper.authors.map(author => (
                <li key={paper.id + Math.random()}> {author} </li>
              ))}
            </ol>
          </li>
          <li> Description: {paper.description} </li>
        </ul>
      </li>
    ))
    return <ul>{listPapers}</ul>
  }

  loading = () => {
    return <div>Loading...</div>
  }

  getPapers = () => {
    if (this.props.result.activeId) {
      this.props.fetchFeed(this.props.result.activeId, { sortBy: 'date' })
    }
  }

  render() {
    return (
      <div className="App">
        <Rectangle>React, TS, the whole shebang</Rectangle>
        <div
          className="contents"
          style={{ display: 'flex', position: 'relative' }}
        >
          <Nav>
            <button
              onClick={this.props.fetchFeeds.bind(null, { sortBy: 'id' })}
            >
              Feeds ↺
            </button>
            {this.props.result.feeds && this.props.result.feeds.length
              ? this.renderFeedList()
              : this.loading()}
          </Nav>
          <ActiveFeed>
            <button onClick={this.getPapers}>Sort Papers By Date</button>
            {this.props.result.feed && this.props.result.feed.length
              ? this.renderActiveFeed()
              : this.loading()}
          </ActiveFeed>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(App)
