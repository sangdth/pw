declare module 'randomatic'

interface Password {
  id: string
  email: string
  password: string
  alias: string
  login: string
  used: number
  created: number
  updated: number
}

interface PromptAnswer {
  confirm: boolean
}

interface Input {
  email: string
  password: string
  alias: string
  login: string
}
