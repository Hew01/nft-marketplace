import { AppRouters } from '../constants/AppRoutes';
import { ReactElement } from 'react';
import { useAccount } from 'wagmi';
import { Redirect } from './Redirect';

export const PrivateRoute = ({
    children,
    } : {
    children: JSX.Element;
    }) : ReactElement | null => {
    const {isConnected} = useAccount();
    return isConnected ? children : <Redirect to={AppRouters.DASHBOARD} />;
};