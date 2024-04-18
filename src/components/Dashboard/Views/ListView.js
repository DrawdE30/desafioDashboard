import React from 'react'
import { valueFromColumnPath, customDateFormat, POINTS_MAP } from '../../../utils/functions';
import ActionsButton from '../TaskCard/ActionsButton';

const columns = [
    { id: 'name', label: "Name", width: 150, align: 'left', type: "text" },
    { id: 'dueDate', label: "Due Date", width: 100, align: 'center', type: "text", format: (value) => customDateFormat({ date: value }) },
    { id: 'status', label: "Status", width: 50, align: 'center', type: "text", },
    { id: 'assignee', label: "Assignee", width: 20, align: 'center', type: "img", },
    { id: 'pointEstimate', label: "Points", width: 20, align: 'center', type: "text", format: (value) => POINTS_MAP[value] },
    { id: 'tags', label: "Tags", width: 250, align: 'left', type: "array", },
    { id: 'actions', label: "Actions", width: 20, align: 'center', type: "actions", },
];

const columnsMap = {
    assignee: "assignee.avatar",
    fullName: "assignee.fullName",
};

const ListView = ({ data, handleTaskDelete, handleTaskEdit, }) => {
    return (
        <table className="table list-task">
            <thead>
                <tr>
                    {columns?.map((col) => {
                        return (
                            <th
                                key={col.id}
                                scope="col"
                                style={{ width: `${col.width}px`, textAlign: `${col.align}`, }}
                            >{col.label}</th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {data?.map((row, idxRow) => {
                    return (
                        <tr key={`row-${idxRow}`}>
                            {columns.map((col, idxCol) => {
                                const value = col.id in columnsMap ? valueFromColumnPath(row, columnsMap[col.id]) : row[col.id];
                                return (
                                    <td
                                        key={`col-${idxCol}`}
                                        style={{ width: `${col.width}px`, textAlign: `${col.align}`, }}
                                    >
                                        {col.type === "text" ?
                                            (col.format ? col.format(value) : value)
                                            : col.type === "img" ?
                                                <img src={value} alt={row.assignee.fullName} title={row.assignee.fullName} className="avatar" />
                                                : col.type === "array" ?
                                                    <div className="task-tags">
                                                        {value?.map((tag) => {
                                                            return (
                                                                <span key={`tag-${tag}`} className={`tag ${tag}`}>{tag}</span>
                                                            )
                                                        })}
                                                    </div>
                                                    : col.type === "actions" ?
                                                        <ActionsButton
                                                            task={row}
                                                            handleTaskDelete={handleTaskDelete}
                                                            handleTaskEdit={handleTaskEdit}
                                                        />
                                                        : null
                                        }</td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default ListView