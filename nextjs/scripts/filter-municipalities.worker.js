import makeFilterCitiesWorker from 'workerize!./filter-municipalities'

const {getItems} = makeFilterCitiesWorker()

export {getItems}

/*
eslint
  import/no-webpack-loader-syntax: 0,
*/
