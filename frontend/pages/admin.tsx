import ApplicationFrame from "@components/application/ApplicationFrame";
import { LoadingPage, SaveBarProvider, ToastProvider } from "@jamalsoueidan/pkg.frontend";
import { useAccountSetting } from "@services/account";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("pages/dashboard"));
const Booking = lazy(() => import("pages/booking"));
const BookingNew = lazy(() => import("pages/booking/booking.new"));
const MySchedules = lazy(() => import("pages/my/schedules"));
const MySettings = lazy(() => import("pages/my/settings"));
const MyAccount = lazy(() => import("pages/my/account"));

const PagesCollectionRoutes = lazy(() =>
  import("@jamalsoueidan/pkg.frontend").then((module) => ({
    default: module.PagesCollectionRoutes,
  })),
);

const PagesStaffRoutes = lazy(() =>
  import("@jamalsoueidan/pkg.frontend").then((module) => ({
    default: module.PagesStaffRoutes,
  })),
);

export default () => {
  // force fetching userSetting so application change language! until another solution
  useAccountSetting();

  return (
    <ApplicationFrame>
      <SaveBarProvider>
        <ToastProvider>
          <Suspense fallback={<LoadingPage title="Loading page..." />}>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="bookings/new" element={<BookingNew />} />
              <Route path="bookings/*" element={<Booking />} />
              <Route path="bookings/*" element={<Booking />} />
              <Route path="/collections/*" element={<PagesCollectionRoutes />} />
              <Route path="/staff/*" element={<PagesStaffRoutes />} />
              <Route path="/my/schedules" element={<MySchedules />} />
              <Route path="/my/account" element={<MyAccount />} />
              <Route path="/my/settings" element={<MySettings />} />
            </Routes>
          </Suspense>
        </ToastProvider>
      </SaveBarProvider>
    </ApplicationFrame>
  );
};
