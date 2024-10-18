const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const backgroundOpts = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

export const locationTask = async taskData => {
  const {delay} = taskData;
  let i = 0;

  // Loop that runs until you stop the task manually
  while (i < 55) {
    console.log(`Background Task Running: ${i}`);
    await sleep(delay);
    i++;
  }

  console.log('Background Task Complete');
};
