import React, { useEffect, useState, } from 'react';
import { useQuery, } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { Add as AddIcon, GridView as GridViewIcon, Reorder as ReorderIcon, } from '@mui/icons-material';
import { GET_USERS, GET_TASK_TAGS, GET_TASK_POINTS, GET_TASK_STATUS, GET_TASKS } from '../graphql/queries/queries';
import { DELETE_TASK_MUTATION, } from '../graphql/queries/mutations';
import { TASK_TAGS, TASK_POINTS, TASK_STATUS } from '../graphql/constants/constants';
import { searchData } from '../utils/functions';
import SearchActionBar from '../components/Frame/SearchActionBar';
import Spinner from '../components/Frame/Spinner';
import AddTask from '../components/Dashboard/AddTask';
import CardView from '../components/Dashboard/Views/CardView';
import ListView from '../components/Dashboard/Views/ListView';
import _ from 'lodash';

const searchFields = ['name', 'assignee.fullName'];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: users, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
  const { data: tags, loading: tagsLoading, error: tagsError } = useQuery(GET_TASK_TAGS);
  const { data: points, loading: pointsLoading, error: pointsError } = useQuery(GET_TASK_POINTS);
  const { data: status, loading: statusLoading, error: statusError } = useQuery(GET_TASK_STATUS);
  const { data: tasks, loading: taskLoading, error: taskError } = useQuery(GET_TASKS, { variables: { input: {} } });

  const [isLoading, setIsLoading] = useState(false);
  const tagsData = tags?.__type?.enumValues || TASK_TAGS;
  const pointsData = points?.__type?.enumValues || TASK_POINTS;
  const statusData = status?.__type?.enumValues || TASK_STATUS;
  const usersData = users?.users || [];
  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    if (tasks?.tasks) {
      setTasksData(tasks?.tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (usersLoading || tagsLoading || pointsLoading || taskLoading || statusLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [usersLoading, tagsLoading, pointsLoading, taskLoading, statusLoading]);

  // const [tasks, setTasks] = useState(tasksFixed);
  // const [lanes, setLanes] = useState(lanesFixed);
  const [infoEdit, setInfoEdit] = useState(null);

  const [deleteTask, { dataDelete, loadingDelete, errorDelete }] = useMutation(DELETE_TASK_MUTATION);
  const handleTaskDelete = async ({ id }) => {
    try {
      setIsLoading(true);
      const body = {
        variables: {
          input: { id: id }
        }
      };
      const response = await deleteTask(body);

      if (errorDelete) {
        alert("Error during task deletion");
      } else {
        alert("Task deleted successfully!");
        let updData = _.cloneDeep(tasksData);
        updData = updData?.filter((e) => e.id !== response.data.deleteTask.id);
        setTasksData(updData);
      }
    } catch (err) {
      alert(`Error during task deletion (${err})`);
      console.error('Error deleting task:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleTaskEdit = async ({ info }) => {
    setInfoEdit(info);
    handleOpen();
  }

  const [search, setSearch] = useState("");
  const [resultSearch, setResultSearch] = useState(null);
  useEffect(() => {
    setResultSearch(searchData(tasksData, search, searchFields));
  }, [search, tasksData])

  const [viewType, setViewType] = useState(2);

  return (
    <div>
      <Spinner loading={isLoading} />
      <AddTask
        open={open}
        handleClose={handleClose}
        setIsLoading={setIsLoading}
        infoEdit={infoEdit}
        tagsData={tagsData}
        pointsData={pointsData}
        statusData={statusData}
        usersData={usersData}
        tasksData={tasksData}
        setTasksData={setTasksData}
      />

      <SearchActionBar
        search={search}
        setSearch={setSearch}
      />

      <div className='bar-view'>
        <div>
          <ReorderIcon fontSize='small' className={`buttom-icon view ${viewType === 1 ? 'active' : ''}`} onClick={() => setViewType(1)} />
          <GridViewIcon fontSize='small' className={`buttom-icon view ${viewType === 2 ? 'active' : ''}`} onClick={() => setViewType(2)} />
        </div>
        <div>
          <AddIcon fontSize='small' className='buttom-icon add-task' onClick={handleOpen} />
        </div>
      </div>

      <div className='main-content'>
        {viewType === 1 &&
          <ListView
            data={resultSearch}
            handleTaskDelete={handleTaskDelete}
            handleTaskEdit={handleTaskEdit}
          />
        }
        {viewType === 2 &&
          <CardView
            statusData={statusData}
            data={resultSearch}
            setData={setResultSearch}
            handleTaskDelete={handleTaskDelete}
            handleTaskEdit={handleTaskEdit}
          />
        }
      </div>
    </div>
  )
}

export default Dashboard
