import React from 'react'
import styled from 'styled-components'

const Style = styled.div`
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

interface AppProps {
  fetchFeeds: (params: { sortBy: string }) => Promise<string>
  fetchFeed: (id: string, params: { sortBy: string }) => Promise<string>
  result: any
}

const Main = (props: AppProps) => {
  function renderActiveFeed(props: AppProps) {
    const { feed } = props.result

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

  function clickToSee() {
    return <div>Click on a feed to see its papers...</div>
  }

  function loading() {
    return <div>Loading..</div>
  }

  function getPapers(props: AppProps) {
    if (props.result.activeId) {
      props.fetchFeed(props.result.activeId, { sortBy: 'date' })
    }
  }

  if (props.result.feed) {
    return (
      <Style>
        <button onClick={getPapers.bind(null, props)}>
          Sort Papers By Date
        </button>
        {props.result.feed && props.result.feed.length
          ? renderActiveFeed(props)
          : loading()}
      </Style>
    )
  } else {
    return <Style>{clickToSee()}</Style>
  }
}

export default Main
