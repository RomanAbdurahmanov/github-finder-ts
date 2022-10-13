import { createContext, useReducer, useContext } from 'react'
import { UserType } from '../../components/users/UserResults'
import githubReducer, { ActionKind } from './GithubReducer'

export interface GithubContextInterface {
  users: UserType[]
  loading: boolean
}

const GithubContext = createContext<GithubContextInterface | undefined>(
  undefined
)

// const GITHUB_URL = process.env.REACT_APP_GUTHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GUTHUB_TOKEN

interface Children {
  children: React.ReactNode
}

export const GithubProvider = ({ children }: Children) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  //Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })

    const data: UserType[] = await response.json()
    console.log(data)

    dispatch({
      type: ActionKind.GET_USERS,
      payload: data,
    })
  }

  const setLoading = () => {
    dispatch({
      type: ActionKind.SET_LOADING,
      payload: [],
    })
  }

  return (
    <GithubContext.Provider
      value={{
        loading: state.loading,
        users: state.users,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export const useGithubContext = (): GithubContextInterface => {
  const githubContext = useContext(GithubContext)
  if (!githubContext)
    throw new Error(
      'No GithubContext.Provider found when calling useGithubContext.'
    )
  return githubContext
}

export default GithubContext
