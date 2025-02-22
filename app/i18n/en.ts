const en = {
  common: {
    punkto: "Punkto",
    and: "and",
    close: "Close",
    next: "Next",
    finish: "Finish",
  },
  oneLastStepScreen: {
    bestOffers: "I want the best offers",
    later: "Later",
  },
  registerScreen: {
    register: "Join now",
    email: "Email address",
    password: "Password",
    confirmPassword: "Confirm Password",
    termsAgreement:
      "By proceeding, I confirm my acceptance of Punkto's terms of use and privacy policy.",
  },
  mainNavigator: {
    homeTab: "Home",
    tipsTab: "Tips",
    qrTab: "QR",
    storesTab: "Stores",
    profileTab: "Profile",
  },
  welcomeScreen: {
    heading: "Earn Points. Get Rewards.",
    postscript: "This is a demo app that showcases the power of Punkto.",
    letsGo: "Let's go!",
    newHere: "New here?",
    login: "Login",
    termsAgreement:
      "By proceeding, I confirm my acceptance of Punkto's terms of use and privacy policy.",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    continue: "Continue",
    forgotEmail: "Forgot your email?",
    letUsKnow: "Let us know",
    niceToSeeYou: "Hey, nice to see you again!",
    logIn: "Log In",
    enterPassword: "Enter Password",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToLogIn: "Tap to log in!",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
}

export default en
export type Translations = typeof en
