import React from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";

const NotFoundPage = () => {
  return (
    <SiteLayout>
      <main className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-xl w-full text-center rounded-3xl border border-slate-800 bg-slate-900/70 light:bg-white p-8 sm:p-10 shadow-2xl shadow-slate-950/20">
          <p className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-4">
            404 Error
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Page not found
          </h1>
          <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
            The page you’re looking for doesn’t exist or may have moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-black dark:text-white hover:bg-blue-500 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </main>
    </SiteLayout>
  );
};

export default NotFoundPage;
