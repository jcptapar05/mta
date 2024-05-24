"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./tables/DataTable";
import { columns } from "./tables/columns";
import getURL from "@/middleware/getUrl";

const Survey = () => {
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurveyData = async () => {
      const response = await fetch(getURL("/api/v1/admin/survey"), {
        next: {
          revalidate: 0,
        },
      });
      const data = await response.json();
      setSurvey(data.surveyRes);
    };

    fetchSurveyData();
  }, []);

  return (
    <>
      {survey && (
        <DataTable
          columns={columns}
          data={survey}
        />
      )}
    </>
  );
};

export default Survey;
