console.log('Starting notes.js');

// export function from module : no parameter
module.exports.addNotes = () => {
  console.log('addNotes called');
  return 'New note';
};

// export functin from module : with input parameters
module.exports.add = (a,b) => {
  return a+b;
};
