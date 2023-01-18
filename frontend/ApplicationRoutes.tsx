import { LoadingPage } from "@jamalsoueidan/bsf.bsf-pkg";
import BookingNew from "@pages/booking/booking.new";
import Schedules from "@pages/schedules";
import Staff from "@pages/staff";
import Setting from "@pages/setting";
import NotFound from "pages/NotFound";
import Login from "pages/auth/Login";
import Phone from "pages/auth/Phone";
import Dashboard from "pages/dashboard";
import { ProtectedRoute } from "providers/Protected";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Booking = lazy(() => import("pages/booking"));

export default () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="phone" element={<Phone />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route
          path="bookings"
          element={
            <Suspense fallback={<LoadingPage title="Loading bookings" />}>
              <Booking />
            </Suspense>
          }
        />
        <Route path="bookings/new" element={<BookingNew />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="staff" element={<Staff />} />
        <Route path="settings" element={<Setting />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
