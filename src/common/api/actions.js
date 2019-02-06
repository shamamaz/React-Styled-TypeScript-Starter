import * as types from './types'
import { BASE_URL } from '../constants/apiUrl'

const simpleAction = () => dispatch => {
  dispatch({
    payload: 'result_of_simple_action',
    type: 'SIMPLE_ACTION',
  })
}

function fetchFeeds() {
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
      const url = BASE_URL
      const success = await fetch(url, {
        method: 'get',
      })
      return onSuccess(success)
    } catch (error) {
      return onError(error)
    }
  }
}

function fetchFeed(id) {
  return async dispatch => {
    async function onSuccess(success) {
      const json = await success.json()
      const payload = {
        feed: json.feed,
        id,
      }
      dispatch({ type: types.FETCH_FEED_SUCCESS, payload })
      return success
    }
    async function onError(error) {
      dispatch({ type: types.FETCH_FEED_FAILED, error })
      return error
    }
    try {
      const url = BASE_URL + id
      const success = await fetch(url, {
        method: 'get',
      })
      return onSuccess(success)
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
