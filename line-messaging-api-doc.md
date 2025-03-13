# Line Messaging API Docs

## https://developers.line.biz/en/docs/messaging-api/

## Line Configuration

### 1. login to line dev console

    - Need to sign up for Line Business Id

### 2. Create Provider

![create provider](/images/create-providers.png)

### 3. Inside Provider, Create Messaging API Channel

![create channel](/images/create-channel.png)

![create messaging api channel](/images/create-ma-channel.png)

### 4. Create Line Official Account

![messaging api channel create line official account](/images/ma-channel-create-line-o-account.png)

![create line official account](/images/create-line-o-account.png)

![create line official account step 2](/images/create-line-o-account-step-2.png)

![create line official account step 3](/images/create-line-o-account-step-3.png)

### 5. Go to Line Official Account Manager (settings/messaging-api) and enable Messaging API

![enable messaging api](/images/enable-ma.png)

![enable messaging api select provider](/images/enable-ma-select-provider.png)

![enable messaging api privacy policy and terms of use](/images/enable-ma-pp-tou.png)

![enable messaging api confirm](/images/enable-ma-confirm.png)

![enabled messaging api](/images/enabled-ma.png)

### 6. Issue Channel Access Token

![channel access token](images/channel-acess-token.png)

## Next.js Integration (App Router)

### 1. Create webhook-handler (api/webhook-handlers/line/route.ts)

### 2. Publically expose local url using ngrok

### 3. Configure line webhook url to send webhooks to the ngrok url

### profit
