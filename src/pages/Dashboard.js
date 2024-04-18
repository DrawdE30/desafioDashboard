import React, { useEffect, useState, } from 'react';
import { useQuery, } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { Add as AddIcon, GridView as GridViewIcon, Reorder as ReorderIcon, } from '@mui/icons-material';
import { GET_USERS, GET_TASK_TAGS, GET_TASK_POINTS, GET_TASK_STATUS, GET_TASKS } from '../graphql/queries/queries';
import { DELETE_TASK_MUTATION } from '../graphql/queries/mutations';
import { TASK_TAGS, TASK_POINTS, TASK_STATUS } from '../graphql/constants/constants';
import { searchData } from '../utils/functions';
import SearchActionBar from '../components/Frame/SearchActionBar';
import Spinner from '../components/Frame/Spinner';
import TaskCard from '../components/Dashboard/TaskCard';
import Lanes from '../components/Dashboard/Lanes';
import AddTask from '../components/Dashboard/AddTask';
import _ from 'lodash';
const searchFields = ['name', 'assignee.fullName'];

const lanesFixed = [
  { id: 1, name: "Working", },
  { id: 2, name: "In Progress", },
  { id: 3, name: "Completed", },
];
const tasksFixed = [
  {
    idLane: 1, id: 1, name: "Tarea 1", pointEstimate: 4,
    createdAt: new Date(), dueDate: new Date("2024-04-14T00:00:00"),
    tags: [{ name: "IOS APP", key: "ios", }, { name: "ANDROID", key: "android", },],
    assignee:
    {
      avatar: "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg",
      email: "avatar1@correo.com",
      fullName: "avatar1",
      id: 1,
    }
  },
  {
    idLane: 1, id: 2, name: "Tarea 2", pointEstimate: 1,
    createdAt: new Date(), dueDate: new Date("2024-03-14T00:00:00"),
    tags: [{ name: "IOS APP", key: "ios", }, { name: "ANDROID", key: "android", },],
    assignee:
    {
      avatar: "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon-thumbnail.png",
      email: "avatar1@correo.com",
      fullName: "avatar1",
      id: 1,
    }
  },
  {
    idLane: 1, id: 3, name: "Tarea 3", pointEstimate: 5,
    createdAt: new Date(), dueDate: new Date(),
    tags: [{ name: "IOS APP", key: "ios", }],
    assignee:
    {
      avatar: "https://w7.pngwing.com/pngs/78/788/png-transparent-computer-icons-avatar-business-computer-software-user-avatar-child-face-hand-thumbnail.png",
      email: "avatar1@correo.com",
      fullName: "avatar1",
      id: 1,
    }
  },


  {
    idLane: 2, id: 4, name: "Tarea 10", pointEstimate: 4,
    createdAt: new Date(), dueDate: new Date("2024-06-14T00:00:00"),
    tags: [{ name: "IOS APP", key: "ios", }, { name: "ANDROID", key: "android", },],
    assignee:
    {
      avatar: "https://w7.pngwing.com/pngs/555/703/png-transparent-computer-icons-avatar-woman-user-avatar-face-heroes-service-thumbnail.png",
      email: "avatare@correo.com",
      fullName: "avatare",
      id: 1,
    }
  },
  {
    idLane: 2, id: 5, name: "Tarea 5", pointEstimate: 10,
    createdAt: new Date(), dueDate: new Date(),
    tags: [{ name: "ANDROID", key: "android", },],
    assignee:
    {
      avatar: "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon-thumbnail.png",
      email: "avatar1@correo.com",
      fullName: "avatar1",
      id: 1,
    }
  },
  {
    idLane: 2, id: 6, name: "Tarea 8", pointEstimate: 4,
    createdAt: new Date(), dueDate: new Date(),
    tags: [{ name: "IOS APP", key: "ios", }],
    assignee:
    {
      avatar: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
      email: "avatar4@correo.com",
      fullName: "avatar4",
      id: 4,
    }
  },
  {
    idLane: 2, id: 7, name: "Tarea 9", pointEstimate: 4,
    createdAt: new Date(), dueDate: new Date(),
    tags: [{ name: "IOS APP", key: "ios", }, { name: "ANDROID", key: "android", },],
    assignee:
    {
      avatar: "https://w7.pngwing.com/pngs/555/703/png-transparent-computer-icons-avatar-woman-user-avatar-face-heroes-service-thumbnail.png",
      email: "avatare@correo.com",
      fullName: "avatare",
      id: 1,
    }
  },
  {
    idLane: 2, id: 8, name: "Tarea 25", pointEstimate: 1,
    createdAt: new Date(), dueDate: new Date(),
    tags: [{ name: "IOS APP", key: "ios", }, { name: "ANDROID", key: "android", },],
    assignee:
    {
      avatar: "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg",
      email: "avatar1@correo.com",
      fullName: "avatar1",
      id: 1,
    }
  },
  {
    idLane: 2, id: 9, name: "Tarea 7", pointEstimate: 0,
    createdAt: new Date(), dueDate: new Date(),
    tags: [{ name: "IOS APP", key: "ios", }, { name: "ANDROID", key: "android", },],
    assignee:
    {
      avatar: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
      email: "avatar4@correo.com",
      fullName: "avatar4",
      id: 4,
    }
  },
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: users, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
  // const { data: tagsData, loading: tagsLoading, error: tagsError } = useQuery(GET_TASK_TAGS);
  // const { data: pointsData, loading: pointsLoading, error: pointsError } = useQuery(GET_TASK_POINTS);
  const { data: status, loading: statusLoading, error: statusError } = useQuery(GET_TASK_STATUS);
  const { data: tasks, loading: taskLoading, error: taskError } = useQuery(GET_TASKS, { variables: { input: {} } });

  const [isLoading, setIsLoading] = useState(false);
  const tagsData = TASK_TAGS;
  const pointsData = TASK_POINTS;
  const statusData = status?.__type?.enumValues || TASK_STATUS;
  const usersData = users?.users || [];
  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    if (tasks?.tasks) {
      setTasksData(tasks?.tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (usersLoading || taskLoading || statusLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [usersLoading, taskLoading, statusLoading]);

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
  const resultSearch = searchData(tasksData, search, searchFields);

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
          <ReorderIcon fontSize='small' className='buttom-icon view' />
          <GridViewIcon fontSize='small' className='buttom-icon view active' />
        </div>
        <div>
          <AddIcon fontSize='small' className='buttom-icon add-task' onClick={handleOpen} />
        </div>
      </div>

      <div className='main-content'>
        {statusData?.map((lane) => {
          const tasksLane = resultSearch?.filter(task => task.status === lane.name);
          const countLine = tasksLane?.length;
          return (
            <Lanes
              key={`lane-${lane.name}`}
              name={lane.name}
              countTasks={countLine}
            >
              {tasksLane?.map((task) => {
                return (
                  <TaskCard key={`task-${task.id}`} task={task} handleTaskDelete={handleTaskDelete} handleTaskEdit={handleTaskEdit} />
                )
              })}
            </Lanes>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
