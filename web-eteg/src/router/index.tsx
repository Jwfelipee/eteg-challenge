import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormPage, HomePage } from "../pages";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}
