export default {
  translation: {
    navbar: {
      mainLabel: 'Hexlet Chat',
      logOutButton: 'Выйти',
    },
    logInForm: {
      header: 'Войти',
      usernameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      logInButton: 'Войти',
      logInFailed: 'Неверные имя пользователя или пароль',
      footer: {
        signUpHeader: 'Нет аккаунта? ',
        signUp: 'Регистрация',
      },
    },
    signUpForm: {
      header: 'Регистрация',
      usernameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      confirmPasswordLabel: 'Подтвердите пароль',
      signUpButton: 'Зарегистрироваться',
      signUpFailed: 'Такой пользователь уже существует',
      validation: {
        requiredField: 'Обязательное поле',
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
      },
    },
    pageChat: {
      channels: {
        header: 'Каналы',
        addChannelButton: '+',
        removeChannelButton: 'Удалить',
        renameChannelButton: 'Переименовать',
        prefix: '#',
        channelControl: 'Управление каналом',
      },
      messageForm: {
        input: 'Введите сообщение...',
        inputLabel: 'Новое сообщение',
        submitButton: 'Отправить',
        allMessages: 'сообщений',
      },
    },
    pageNotFound: {
      notFound: 'Страница не найдена',
      prompt: 'Но вы можете перейти',
      returnButton: 'на главную страницу',
    },
    modals: {
      addChannel: {
        header: 'Добавить канал',
        inputLabel: 'Имя канала',
        cancelButton: 'Отменить',
        submitButton: 'Отправить',
        validation: {
          requiredField: 'Обязательное поле',
          channelNameLength: 'От 3 до 20 символов',
          channelNameExists: 'Должно быть уникальным',
        },
      },
      removeChannel: {
        header: 'Удалить канал',
        body: 'Уверены?',
        cancelButton: 'Отменить',
        removeButton: 'Удалить',
      },
      renameChannel: {
        header: 'Переименовать канал',
        inputLabel: 'Имя канала',
        cancelButton: 'Отменить',
        submitButton: 'Отправить',
        validation: {
          requiredField: 'Обязательное поле',
          channelNameLength: 'От 3 до 20 символов',
          channelNameExists: 'Должно быть уникальным',
        },
      },
    },
    notifications: {
      success: {
        channelCreated: 'Канал создан',
        channelRenamed: 'Канал переименован',
        channelRemoved: 'Канал удалён',
      },
      errors: {
        connectionError: 'Ошибка соединения',
      },
    },
  },
};
