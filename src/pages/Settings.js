import React, { useEffect, useState, } from 'react';
import { useQuery, } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { Add as AddIcon, GridView as GridViewIcon, Reorder as ReorderIcon, } from '@mui/icons-material';
import { GET_PROFILE, GET_USERS, GET_TASK_TAGS, GET_TASK_POINTS, GET_TASK_STATUS, GET_TASKS } from '../graphql/queries/queries';
import { DELETE_TASK_MUTATION } from '../graphql/queries/mutations';
import { TASK_TAGS, TASK_POINTS, TASK_STATUS } from '../graphql/constants/constants';
import { searchData } from '../utils/functions';
import SearchActionBar from '../components/Frame/SearchActionBar';
import Spinner from '../components/Frame/Spinner';
import TaskCard from '../components/Dashboard/TaskCard';
import Lanes from '../components/Dashboard/Lanes';
import AddTask from '../components/Dashboard/AddTask';
import _ from 'lodash';
import UserCard from '../components/Settings/UserCard';

const Settings = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data: users, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
    const { data: profiles, loading: profilesLoading, error: profilesError } = useQuery(GET_PROFILE);

    const [isLoading, setIsLoading] = useState(false);
    const usersData = users?.users || [];
    const profileData = profiles?.profile || [];

    useEffect(() => {
        if (usersLoading || profilesLoading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [usersLoading, profilesLoading]);


    return (
        <div>
            <Spinner loading={isLoading} />
            <h1>Profile</h1>
            <div className='main-content'>
                <UserCard user={profileData} />

            </div>
            <br />
            <h1>Users</h1>
            <div className='main-content user-content'>

                {usersData?.map((user) => {
                    return (
                        <UserCard user={user} />
                    )
                })}
            </div>
        </div>
    )
}

export default Settings