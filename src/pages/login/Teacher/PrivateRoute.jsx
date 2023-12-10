import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../../../App';

const PrivateRoute = ({ element, ...rest }) => {
  const [userState] = useContext(UserContext);

  return (
    <Route
      {...rest}
      element={
        userState && userState.email ? (
          element
        ) : (
          <Navigate
            to="/login"
           
            state={{ from: rest.location }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
