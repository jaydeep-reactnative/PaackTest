# PaackTest

The repository for PaackTest.

**Project Name**: `PaackTest`

**Bundle Id**: `org.reactjs.native.example.PaackTest`

**Package Name**: `com.paacktest`

[![react-native](https://img.shields.io/badge/react--native-0.63.4-brightgreen)](https://facebook.github.io/react-native/docs/getting-started) [![Platform - Android](https://img.shields.io/badge/platform-Android-3ddc84.svg?style=flat&logo=android)](https://www.android.com)
[![Platform - iOS](https://img.shields.io/badge/platform-iOS-000.svg?style=flat&logo=apple)](https://developer.apple.com/ios) [![MIT](https://img.shields.io/dub/l/vibe-d.svg)](https://opensource.org/licenses/MIT)
---

##  Project Desctiption
A logistic management system for drivers. 

![alt text](https://github.com/justjd1992/PaackTest/blob/main/Home.png?raw=true) ![alt text](https://github.com/justjd1992/PaackTest/blob/main/Details.png?raw=true) ![alt text](https://github.com/justjd1992/PaackTest/blob/main/DeliveryStatus.png?raw=true)

## Prerequisites

**iOS** : XCode(12.4)

**Android** : Android Studio(4.2.1) with gradle(3.5.3)

**Editor** : Visual Studio Code

## Main technologies used

- [React Native](https://github.com/facebook/react-native)
A framework for building native apps with React.

- [MobX-state-tree](https://mobx-state-tree.js.org/intro/welcome)
A state management library used to manage data used by application.

- [react-native-permissions](https://github.com/zoontek/react-native-permissions)
A library, to get location permissions from user 

- [react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service)
A library, to get latitude and longitude from user's current location

- [Ignite Bowser](https://github.com/infinitered/ignite-bowser)
A boilerplate, used to setup project Architecture
## How to Setup Project

_Steps to setup the project_

**Step 1:** Clone this repository.

**Step 2:** Go to the cloned repo and open in in termianl.

**Step 3:** Install the Application with `yarn install`

**Step 4:** Install pods with `npx pod install`

**Step 5:** Run Jetify for Third Party library convert in AndroidX `npx jetify`(This needs to be done only for first time after checking out the repo. And for all projects having react-native 0.60 onwards)

## How to Run the Project

_Steps to run the project in ios and andorid_

1. cd to the project directory
2. Run and build for either OS
    * Run iOS app
        ```bash 
        npx react-native run-ios
        ```
    * Run Android app
      * Start Genymotion or Native emulator
      ```bash 
      npx react-native run-android
      ```

## Extra steps for android

- None

## Extra steps for ios

- You will need all the certificates to run the ios project in a real device.
 