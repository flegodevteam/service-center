import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

const JobCardsContext = createContext();

export const JobCardsProvider = ({ children }) => {
  const [jobCards, setJobCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch job cards from backend
  const fetchJobCards = async (page = 1, limit = 5) => {
    try {
      const res = await axios.get(
        `${API_URL}/jobcards?page=${page}&limit=${limit}`
      );
      setJobCards(res.data.jobCards);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Job cards fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobCards();
  }, []);

  
  // Add job card via API
  const addJobCard = async (jobCardData) => {
    // services string-aa irundha array-aa convert pannu
    if (typeof jobCardData.services === "string") {
      jobCardData.services = jobCardData.services
        .split(",")
        .map((s) => s.trim());
    }
    jobCardData.totalAmount = parseFloat(jobCardData.totalAmount);
    const res = await axios.post(`${API_URL}/jobcards`, jobCardData);
    setJobCards((prev) => [...prev, res.data.jobCard]);
  };

  return (
    <JobCardsContext.Provider
      value={{
        jobCards,
        addJobCard,
        loading,
        fetchJobCards,
        total,
        totalPages,
      }}
    >
      {children}
    </JobCardsContext.Provider>
  );
};

export default JobCardsContext;
