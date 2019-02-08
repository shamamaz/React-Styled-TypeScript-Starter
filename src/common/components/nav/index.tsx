import React from 'react'
import { connect } from 'react-redux'
import { fetchFeeds, fetchFeed } from '../../api/actions'
import styled from 'styled-components'

const Style = styled.div`
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

const mapDispatchToProps = dispatch => {
  return {
    fetchFeeds: (params: { sortBy: string }) => dispatch(fetchFeeds(params)),
    fetchFeed: (id: string, params: { sortBy: string }) =>
      dispatch(fetchFeed(id, params)),
  }
}

const mapStatetoProps = state => {
  return {
    result: state.simpleReducer,
  }
}

interface AppProps {
  fetchFeeds: (params: { sortBy: string }) => Promise<string>
  fetchFeed: (id: string, params: { sortBy: string }) => Promise<string>
  result: any
}

const Nav: React.SFC<AppProps> = appProps => {
  function renderFeedList(props: AppProps) {
    const { feeds } = props.result
    const listItems = feeds.map(feed => (
      <li
        key={feed.id}
        onClick={props.fetchFeed.bind(null, feed.id, { sortBy: 'id' })}
      >
        {feed.title}
      </li>
    ))
    return <ul>{listItems}</ul>
  }

  function loading() {
    return (
      <ul>
        <li>Loading feeds...</li>
      </ul>
    )
  }

  return (
    <Style>
      <button onClick={appProps.fetchFeeds.bind(null, { sortBy: 'id' })}>
        Feeds ↺
      </button>
      {appProps.result.feed && appProps.result.feeds.length
        ? renderFeedList(appProps)
        : loading()}
    </Style>
  )
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Nav)
