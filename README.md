# Interview Scheduler

## About

The **Interview Scheduler** is a single page app built with [React](https://reactjs.org/) that allows a user to book an appointment with an interviewer.

## Final product
![Showing appointments](public/final_product.png)



## Setup

1. Clone the repository:

```sh
git clone git@github.com:anaProdigy/Interview-Scheduler.git
```

2. Install dependencies 

```sh
 npm install
```

3. Running Webpack Development Server

```sh
npm start
```


The app also requires the [Interview Scheduler API](https://github.com/anaProdigy/Interview-Scheduler-Api) to be installed separately, and a [PostgreSQL](https://www.postgresql.org/) database set up and running. Instructions are provided in the Scheduler API [README](https://github.com/anaProdigy/Interview-Scheduler-Api#readme).

4. Start [Interview Scheduler API](https://github.com/anaProdigy/Interview-Scheduler-Api):

```sh
npm start
```
The development server will automatically open a browser at `http://localhost:8000/` with the app running.




## Testing

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

 [React](https://reactjs.org/)
 [axios](https://www.npmjs.com/package/axios)
 [classnames](https://www.npmjs.com/package/classnames)
 [normalize](https://www.npmjs.com/package/normalize)


## Development dependencies

 [Babel](https://babeljs.io/)
 [Storybook](https://storybook.js.org/)
 [react-test-renderer](https://reactjs.org/docs/test-renderer.html)
 [Testing library](https://testing-library.com/)
 [sass](https://www.npmjs.com/package/sass)
 [prop-types](https://www.npmjs.com/package/prop-types)
 