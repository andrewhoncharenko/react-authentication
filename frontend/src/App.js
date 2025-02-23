import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import { tokenLoader, checkAuthLoader } from "./util/auth";
import EditEventPage from "./pages/EditEvent";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import { action as manipulateEventAction } from "./components/EventForm";
import AuthencticationPage, {action as authAction} from "./pages/Authentication";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import { action as logoutAction} from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthLoader
              }
            ]
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader
          },
        ]
      },
      {
        path: "/auth",
        element: <AuthencticationPage />,
        action: authAction
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
