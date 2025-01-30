import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    isFirstStartup: true,
    authEmail: "",
    authPassword: "",
    authPasswordConfirmation: "",
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
    get validationErrorPassword() {
      if (store.authPassword.length === 0) return "can't be blank"
      if (store.authPassword.length < 6) return "must be at least 6 characters"
      return ""
    },
    get validationErrorPasswordConfirmation() {
      if (store.authPasswordConfirmation.length === 0) return "can't be blank"
      if (store.authPasswordConfirmation !== store.authPassword) return "must match"
      return ""
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setAuthPassword(value: string) {
      store.authPassword = value.replace(/ /g, "")
    },
    setAuthPasswordConfirmation(value: string) {
      store.authPasswordConfirmation = value.replace(/ /g, "")
    },
    setIsFirstStartup(value: boolean) {
      store.isFirstStartup = value
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
      store.authPassword = ""
      store.authPasswordConfirmation = ""
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
