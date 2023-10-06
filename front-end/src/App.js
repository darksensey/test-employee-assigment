import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Suspense } from "react";
import EmployeeList from "./EmployeeList";
import EmployeeShow from "./EmployeeShow";

export default function App() {
  return (
      <Suspense fallback={<>...</>}>
          <Routes>
              <Route path="/" element={<EmployeeList />} />
              <Route path="/employee/:id" element={<EmployeeShow />} />
          </Routes>
      </Suspense>
  );
}