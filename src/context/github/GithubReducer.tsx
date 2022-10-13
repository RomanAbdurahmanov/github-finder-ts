import React from 'react'
import { UserType } from '../../components/users/UserResults'

export enum ActionKind {
  GET_USERS = 'GET_USERS',
  SET_LOADING = 'SET_LOADING',
}

interface Action {
  type: ActionKind
  payload: UserType[]
}

interface GithubReducerState {
  users: UserType[]
  loading: boolean
}

const githubReducer = (state: GithubReducerState, action: Action) => {
  switch (action.type) {
    case ActionKind.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case ActionKind.SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export default githubReducer
