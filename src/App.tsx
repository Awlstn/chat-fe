import type React from "react";
import { RouterProvider } from "react-router/dom";
import router from "./app/router";

function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
