import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import PublicLayout from '../components/layout/PublicLayout';
import HomePage from '../pages/HomePage';
import AiPage from '../pages/AiPage';
import EventTypesPage from '../pages/EventTypesPage';
import AvailabilityPage from '../pages/AvailabilityPage';
import TeamsPage from '../pages/TeamsPage';
import BookingsPage from '../pages/BookingsPage';
import PublicBookingPage from '../pages/PublicBookingPage';
import NotFoundPage from '../pages/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai" element={<AiPage />} />
        <Route path="/book/:slug" element={<PublicBookingPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard/event-types" replace />} />
        <Route path="event-types" element={<EventTypesPage />} />
        <Route path="availability" element={<AvailabilityPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="bookings" element={<BookingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

