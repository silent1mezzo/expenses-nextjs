import React from "react";
import Router from "next/router";

export type ReportProps = {
  id: string;
  title: string;
};

const Report: React.FC<{ report: ReportProps }> = ({ report }) => {
  return (
    <div>
      <h2>{report.title}</h2>
    </div>
  );
};

export default Report;