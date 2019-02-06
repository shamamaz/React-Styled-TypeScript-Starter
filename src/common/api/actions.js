import * as types from './types'
import queryString from 'query-string'
import { BASE_URL } from '../constants/apiUrl'

const simpleAction = () => dispatch => {
  dispatch({
    payload: 'result_of_simple_action',
    type: 'SIMPLE_ACTION',
  })
}

function fetchFeeds(params) {
  return async dispatch => {
    async function onSuccess(success) {
      const json = await success.json()
      const payload = json.feeds
      dispatch({ type: types.FETCH_FEEDS_SUCCESS, payload })
      return success
    }
    async function onError(error) {
      dispatch({ type: types.FETCH_FEEDS_FAILED, error })
      return error
    }
    try {
      const data = {
        sort: params.sortBy,
      }
      const url = BASE_URL + '?' + queryString.stringify(data)
      const success = await fetch(url, {
        method: 'get',
      })
      return onSuccess(success)
    } catch (error) {
      return onError(error)
    }
  }
}

function fetchFeed(id, params) {
  return async dispatch => {
    async function onSuccess(success, activeId) {
      const json = await success.json()
      const payload = {
        activeId,
        feed: json.feed,
      }
      dispatch({ type: types.FETCH_FEED_SUCCESS, payload })
      return success
    }
    async function onError(error) {
      dispatch({ type: types.FETCH_FEED_FAILED, error })
      return error
    }
    try {
      const data = {
        sort: params.sortBy,
      }
      const url = BASE_URL + '/' + id + '?' + queryString.stringify(data)
      const success = await fetch(url, {
        method: 'get',
      })
      return onSuccess(success, id)
    } catch (error) {
      return onError(error)
    }
  }
}

function createAction(type, payload) {
  return {
    payload,
    type,
  }
}

const setActiveFeed = payload => createAction(SET_ACTIVE_FEED, payload)

export { simpleAction, setActiveFeed, fetchFeeds, fetchFeed }
