export default {
  translation: {
    loader: 'Loading...',
    navbar: {
      mainLabel: 'Hexlet Chat',
      logOutButton: 'Log out',
    },
    logInForm: {
      header: 'Sign in',
      usernameLabel: 'Your name',
      passwordLabel: 'Password',
      logInButton: 'Sign in',
      logInFailed: 'Invalid username or password',
      footer: {
        signUpHeader: 'Don\'t have an account? ',
        signUp: 'Sign up',
      },
    },
    signUpForm: {
      header: 'Sign up',
      usernameLabel: 'Username',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm password',
      signUpButton: 'Sign up',
      signUpFailed: 'This user already exists',
      footer: {
        loginHeader: 'Have an account? ',
        backToLogin: 'Sign in',
      },
      validation: {
        requiredField: 'Required field',
        usernameLength: '3 to 20 characters',
        passwordLength: 'At least 6 characters',
        confirmPassword: 'Passwords must match',
      },
    },
    pageChat: {
      channels: {
        header: 'Channels',
        addChannelButton: '+',
        removeChannelButton: 'Remove',
        renameChannelButton: 'Rename',
        prefix: '#',
        channelControl: 'Channel control',
      },
      messageForm: {
        input: 'Enter your message...',
        inputLabel: 'New message',
        submitButton: 'Send',
      },
      pluralMessageCount: {
        message_zero: '{{count}} messages',
        message_one: '{{count}} message',
        message_other: '{{count}} messages',
      },
    },
    pageNotFound: {
      notFound: 'Page not found',
      prompt: 'But you can go',
      returnButton: 'to Home Page',
    },
    modals: {
      addChannel: {
        header: 'Add channel',
        inputLabel: 'Channel name',
        cancelButton: 'Cancel',
        submitButton: 'Send',
        validation: {
          requiredField: 'Required field',
          channelNameLength: '3 to 20 characters',
          channelNameExists: 'Must be unique',
        },
      },
      removeChannel: {
        header: 'Remove channel',
        body: 'Sure?',
        cancelButton: 'Cancel',
        removeButton: 'Remove',
      },
      renameChannel: {
        header: 'Rename channel',
        inputLabel: 'Channel name',
        cancelButton: 'Cancel',
        submitButton: 'Send',
        validation: {
          requiredField: 'Required field',
          channelNameLength: '3 to 20 characters',
          channelNameExists: 'Must be unique',
        },
      },
      networkError: {
        header: 'Something went wrong',
        body: 'Refresh the page!',
        button: 'Refresh',
      },
    },
    notifications: {
      success: {
        channelCreated: 'Channel created',
        channelRenamed: 'Channel renamed',
        channelRemoved: 'Channel removed',
      },
      errors: {
        connectionError: 'Connection error',
      },
    },
  },
};
