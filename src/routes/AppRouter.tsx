
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Redirect } from './Redirect';
import { Dashboard } from '@/views/Dashboard';
import { Homepage } from '@/views/Homepage';
import { LoaderGif } from '@/components/Loader/LoaderGif';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<LoaderGif />}>
        <Routes>
          <Route path="*" element={<Redirect to="/" />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
