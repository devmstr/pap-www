module.exports = {
  apps: [
    {
      name: 'pap-www',
      script: 'npm start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        MODE: 'production',
        NEXT_PUBLIC_APP_URL: 'https://perfectassesspro.com/',
        NEXTAUTH_URL: 'https://perfectassesspro.com/',
        NEXTAUTH_SECRET: 'qnKSD3IulEHBGqMulCTXJWqlATGxqOJCO0ba8na+MNQ=',
        NEXT_PUBLIC_SERVER_URL: 'https://api.perfectassesspro.com',
        SERVER_URL: 'https://api.perfectassesspro.com/',
        EXPIRE_TIME: 3600000,
        GOOGLE_CLIENT_ID:
          '1004657065000-hu691t76iklf826aoj3aoht24bnafdol.apps.googleusercontent.com',
        GOOGLE_CLIENT_SECRET: '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',
        NEXT_PUBLIC_AVATAR_IMAGE:
          'https://api.perfectassesspro.com/images/default-pfp.svg'
      }
    }
  ]
}
