## React-Express-Pints

This is an example mobile app that uses a simple Client-Server architecture to retrieve information of a few stocks from https://iexcloud.io and then display the results on the mobile screen.


### Application Demo
![react-express-pints](https://user-images.githubusercontent.com/85099754/214916720-2badf1fb-d680-4649-af1c-575b02bcdb72.gif)                            ![react-express-pints-android](https://user-images.githubusercontent.com/85099754/214924974-c149048c-b5bf-45fa-97d8-e4781ea5ee17.gif)



## Tech Stack
* [React Native](https://reactnative.dev) with [Expo SDK](https://expo.dev) for frontend 
* [Express JS](https://expressjs.com) for backend node server


### Prerequisites
* [Expo](https://docs.expo.dev/get-started/installation/) (and Expo Go app if you do not access to an Android or iOS simulator). No account is needed.
* iOS or Android simuator. 
    * For Mac users, iOS simulator: the built in iOS simulator in your Mac, Android simulator: [Android Studio](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiQ35GA7eX8AhUHeSoKHVcuCnAYABAAGgJ0bQ&ohost=www.google.com&cid=CAESbeD2Hyv5xjViwYPdcNYJCdkxlDb_3ei4lHHN2rKCUjonZGI4FMIiYdz7jlZgNPnmgjdy9t1XlJDSWuDRhh9YEXQ3cWrwIm4UOw9esKaPovacfrMagXIpY7h05riWjGPgSK2qW-QEpKfM9LV6MbA&sig=AOD64_3AbIcBJHYsob2z20_56spjYpxHdg&q&adurl&ved=2ahUKEwjexomA7eX8AhVjJrcAHcmRApQQ0Qx6BAgIEAE&nis=8). 
    * For Windows users, IOS simulator: [List of potential simulators](https://buildfire.com/5-best-ios-simulators-for-windows), Android Simulator: [Android Studio](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiQ35GA7eX8AhUHeSoKHVcuCnAYABAAGgJ0bQ&ohost=www.google.com&cid=CAESbeD2Hyv5xjViwYPdcNYJCdkxlDb_3ei4lHHN2rKCUjonZGI4FMIiYdz7jlZgNPnmgjdy9t1XlJDSWuDRhh9YEXQ3cWrwIm4UOw9esKaPovacfrMagXIpY7h05riWjGPgSK2qW-QEpKfM9LV6MbA&sig=AOD64_3AbIcBJHYsob2z20_56spjYpxHdg&q&adurl&ved=2ahUKEwjexomA7eX8AhVjJrcAHcmRApQQ0Qx6BAgIEAE&nis=8).
* [node.js](https://nodejs.org/en/), [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and/or [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable).


### Running The Application
1. Clone this repo to your local device
2. To get the expected output shown above, the server must be started before the app.
3. Navigate to the `Server` directory and run the following commands to start the node server
  - `cd Server`
  - `yarn run server` or `npm run server`
4. Open any iOS or Android simulator that you use.
5. Then go to the `Client` directory and start running the app with these commands:
  - `cd ../Client`
  -  `expo start --ios` or `expo start --android` depending on your device
6. Wait for the app to load and the expected output shoud appear
