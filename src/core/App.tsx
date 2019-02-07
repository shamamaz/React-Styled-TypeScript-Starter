import React from 'react'
import { connect } from 'react-redux'
import { fetchFeeds, fetchFeed } from '../common/api/actions'
import styled from 'styled-components'
import { Nav } from '../common/components'
import { Main } from '../core/components'

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
const MainPage = styled.div`
  display: flex;
  position: relative;
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
    return <div>Click on a feed to see its papers...</div>
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
        <MainPage>
          <Nav {...this.props} />
          <Main {...this.props} />
        </MainPage>
      </div>
    )
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(App)
