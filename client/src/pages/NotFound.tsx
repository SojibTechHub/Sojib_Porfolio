import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/common/SEO';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <SEO title="Page Not Found" />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-8xl font-display font-bold gradient-text mb-4">404</h1>
          <p className="text-[var(--color-muted)] mb-8">The page you are looking for does not exist.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    </>
  );
};
