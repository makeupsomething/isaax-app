# Isaax Native

## A react native app for interfacing with [Isaax](https://isaax.io) IoT platform

Isaax offers a public API that allows you to interface with your projects from  anywhere. All you need is an isaax account and your API key.

This was created as part of Isaax's [advent calendar](https://qiita.com/advent-calendar/2018/isaax) 2018.
You can read more about this [here](https://makeupsomething.github.io/isaax-native/)

### Prerequisites

This project is built with [expo](https://github.com/expo/expo), so you will need the expo app for easy debugging on a device. This can be downloaded from the iOS or Google play store.

### Installation

```bash
yarn install
```

### Run

To run the app you will need to get your API key from Isaax.

After getting the key, create a `.env` file at the root of the project, add the following and save:

```bash
ISAAX_API_KEY=<YOUR_API_KEY>
```

Then you can run the project with:

```bash
yarn start
```

This will launch the project, a QR code will be displayed in the terminal, scan the code to launch it on your device.