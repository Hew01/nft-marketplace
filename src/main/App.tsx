// import { Provider } from 'react-redux';
// import { store } from '@/redux/store';
// import { AppRouter } from '@/routes/AppRouter'



// function App() {
//   return (
//     <>
//       <Provider store={store}>
//         <AppRouter/>
//       </Provider>
//     </>
//   )
// }

// export default App


import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import NFTTestView from '@/views/NFTTestView';

function App() {
  return (
    <Provider store={store}>
      {/* Render your test view component */}
      <NFTTestView />
    </Provider>
  );
}

export default App;
