import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { useAuth } from '../../api/useAuth';
import { Button } from '../../modules/Button';
import { clearUser } from '../../utils/auth';
import { clearToken } from '../../utils/jwt';

export const AuthorizeSwitchDesign = () => {
  const queryClient = useQueryClient();
  const { isAuth, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    clearToken();
    clearUser();
    queryClient.setQueryData(['auth-token'], null);
    queryClient.setQueryData(['auth-user'], null);

    navigate({ to: '/authorize' });
  };
  return (
    <>
      {isAuth ? (
        <>
          <span className="text-sm">Hello, {user?.name}</span>
          <Button variant="secondary" size="sm" onClick={handleSignOut}>
            SIGN OUT
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" size="sm" onClick={() => navigate({ to: '/authorize' })}>
            LOG IN
          </Button>
          <Button variant="secondary" size="sm" onClick={() => navigate({ to: '/registration' })}>
            SIGN UP
          </Button>
        </>
      )}
    </>
  );
};
