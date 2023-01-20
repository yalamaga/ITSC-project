import React, { useEffect, useState } from 'react';
import { useMemo, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';
export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList(`/client/services/AssessmentService.js`));
    };
    fetchAssessments(assessments);
  }, [ assessments ]);
  const columns = useMemo(
    () => [
      {
        Header: `Cat Assessment`,
        columns: [
          {
            Header: `ID`,
            accessor: `assessment.id`,
          },
          {
            Header: `Cat Name`,
            accessor: `assessment.name`,
          },
          {
            Header: `Cat Date of birth`,
            accessor: `assessment.date`,
          },
          {
            Header: `Score`,
            accessor: `assessment.points`,
          },
          {
            Header: `Risk level`,
            accessor: `assessment.riskLevel`,
          },
        ],
      },
    ]
  );

  return (
    <div>
      {
      }
    </div>
  );
};
