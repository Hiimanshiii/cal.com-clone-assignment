import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl">
      <Card className="p-6">
        <h1 className="text-lg font-semibold text-slate-900">Page not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-4">
          <Link to="/">
            <Button variant="secondary">Go home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
