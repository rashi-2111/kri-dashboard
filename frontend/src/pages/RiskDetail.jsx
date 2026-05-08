import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Skeleton from "../components/Skeleton";
import EmptyState from "../components/EmptyState";

import { risks, aiResponse } from "../data/mockData";

export default function RiskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🤖 AI STATES
  const [aiLoading, setAiLoading] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [aiError, setAiError] = useState(false);

  // ✅ FETCH RISK
  useEffect(() => {
    fetchRisk();
  }, [id]);

  const fetchRisk = () => {
    setLoading(true);

    setTimeout(() => {
      const found = risks.find(
        (r) => r.id === Number(id)
      );

      setRisk(found);
      setLoading(false);
    }, 500);
  };

  // 🤖 AI ANALYSIS
  const handleAskAI = () => {
    setAiLoading(true);
    setAiError(false);

    setTimeout(() => {
      try {
        setAiData(aiResponse);
        setAiLoading(false);
      } catch (err) {
        setAiError(true);
        setAiLoading(false);
      }
    }, 1200);
  };

  // ❌ DELETE
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this risk?"
    );

    if (!confirmDelete) return;

    alert("Risk deleted successfully (Demo Mode)");
    navigate("/risks");
  };

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="bg-[#E3F2FD] min-h-screen">
        <Navbar />

        <div className="p-6">
          <Skeleton rows={6} />
        </div>
      </div>
    );
  }

  // 📭 EMPTY
  if (!risk) {
    return (
      <div className="bg-[#E3F2FD] min-h-screen">
        <Navbar />

        <div className="p-6">
          <EmptyState message="Risk not found" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#E3F2FD] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 pb-12">

        {/* HEADER */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-6">

          <div>
            <h2 className="text-3xl font-bold text-[#1B4F8A]">
              Risk Details
            </h2>

            <p className="text-gray-500 mt-1">
              Detailed overview and AI-powered analysis
            </p>
          </div>

          <button
            onClick={() => navigate("/risks")}
            className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-blue-50"
          >
            ← Back to Risks
          </button>
        </div>

        {/* MAIN VERTICAL LAYOUT */}
        <div className="space-y-6">

          {/* RISK DETAILS CARD */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">

            {/* TOP */}
            <div className="flex justify-between items-center flex-wrap gap-4 mb-6">

              <div>
                <h3 className="text-2xl font-bold text-[#1B4F8A]">
                  {risk.name}
                </h3>

                <p className="text-gray-500 mt-1">
                  Risk ID: #{risk.id}
                </p>
              </div>

              {/* STATUS */}
              <span
                className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${
                  risk.status === "High"
                    ? "bg-red-500"
                    : risk.status === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {risk.status} Risk
              </span>
            </div>

            {/* DETAILS GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="bg-blue-50 rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Risk Score
                </p>

                <h4 className="text-3xl font-bold text-[#1B4F8A] mt-2">
                  {risk.score}
                </h4>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Created Date
                </p>

                <h4 className="text-lg font-semibold text-[#1B4F8A] mt-2">
                  {risk.date}
                </h4>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Severity Level
                </p>

                <h4 className="text-lg font-semibold text-[#1B4F8A] mt-2">
                  {risk.status}
                </h4>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <p className="text-sm text-gray-500">
                  Monitoring Status
                </p>

                <h4 className="text-lg font-semibold text-green-600 mt-2">
                  Active Monitoring
                </h4>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="mt-6 bg-blue-50 rounded-xl p-5">

              <h4 className="font-semibold text-[#1B4F8A] mb-2">
                Risk Description
              </h4>

              <p className="text-gray-700 leading-relaxed">
                The <strong>{risk.name}</strong> risk may impact
                system security, operational stability, user access,
                or application performance if not mitigated properly.
                Immediate monitoring and preventive action are recommended.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 flex-wrap mt-8">

              <button
                onClick={() => navigate(`/edit-risk/${risk.id}`)}
                className="bg-[#1B4F8A] text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Edit Risk
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600"
              >
                Delete
              </button>

              <button
                onClick={handleAskAI}
                className="bg-purple-500 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-600"
              >
                Ask AI
              </button>

            </div>
          </div>

          {/* AI ANALYSIS CARD */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">

            <h3 className="text-2xl font-bold text-[#1B4F8A] mb-5">
              🤖 AI Analysis
            </h3>

            {!aiData && !aiLoading && (
              <div className="text-center">

                <p className="text-gray-500 mb-5">
                  Generate AI-powered insights and mitigation strategies.
                </p>

                <button
                  onClick={handleAskAI}
                  className="bg-[#1B4F8A] text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
                >
                  Generate Analysis
                </button>
              </div>
            )}

            {/* LOADING */}
            {aiLoading && (
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            )}

            {/* ERROR */}
            {aiError && (
              <p className="text-red-500">
                Failed to generate AI response
              </p>
            )}

            {/* AI RESULT */}
            {aiData && (
              <div className="space-y-5">

                <div>
                  <h4 className="font-semibold text-[#1B4F8A] mb-2">
                    Description
                  </h4>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    {aiData.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1B4F8A] mb-2">
                    Impact
                  </h4>

                  <p className="text-gray-700 text-sm">
                    {aiData.impact}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1B4F8A] mb-2">
                    Likelihood
                  </h4>

                  <p className="text-gray-700 text-sm">
                    {aiData.likelihood}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1B4F8A] mb-2">
                    Recommendations
                  </h4>

                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    {aiData.recommendation.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    AI Confidence
                  </p>

                  <h4 className="text-xl font-bold text-[#1B4F8A] mt-1">
                    {aiData.aiConfidence}
                  </h4>

                </div>

              </div>
            )}
          </div>

          {/* OTHER RISKS */}
          <div>

            <h3 className="text-2xl font-bold text-[#1B4F8A] mb-5">
              Other Risks
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {risks
                .filter((r) => r.id !== risk.id)
                .map((r) => (

                  <div
                    key={r.id}
                    onClick={() => navigate(`/risks/${r.id}`)}
                    className="bg-white p-5 rounded-2xl shadow border border-blue-100 hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
                  >

                    <div className="flex justify-between items-center mb-3">

                      <h4 className="font-bold text-[#1B4F8A]">
                        {r.name}
                      </h4>

                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          r.status === "High"
                            ? "bg-red-500"
                            : r.status === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        {r.status}
                      </span>

                    </div>

                    <p className="text-gray-500 text-sm mb-2">
                      Score: {r.score}
                    </p>

                    <p className="text-gray-500 text-sm">
                      Date: {r.date}
                    </p>

                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}