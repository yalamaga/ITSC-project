import React, { useEffect, useState } from 'react';
import { useMemo, useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';
export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  const columns = useMemo(
    () => [
      {
        Header: `Cat Assessment`,
        columns: [
          {
            Header: `ID`,
            accessor: `id`,
          },
          {
            Header: `Cat Name`,
            accessor: `catName`,
          },
          {
            Header: `Cat Date of birth`,
            accessor: `catDateOfBirth`,
          },
          {
            Header: `Score`,
            accessor: `score`,
          },
          {
            Header: `Risk level`,
            accessor: `riskLevel`,
          },
        ],
      },
    ]
  );
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, [ ]);
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments }, useSortBy);
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render(`Header`)}
                  <span>
                    {column.isSorted ?
                      column.isSortedDesc ?
                        `🔽` :
                        `🔼` :
                      ``}
                  </span>
                </th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell =>
                  <td
                    {...cell.getCellProps()}
                  >
                    {cell.render(`Cell`)}
                  </td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
