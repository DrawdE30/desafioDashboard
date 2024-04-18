// mutations.js

import { gql } from '@apollo/client';

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      name
      createdAt
      dueDate
      pointEstimate
      status
      tags
      position
      assignee {
        avatar
        fullName
        id
      }
      creator {
        avatar
        fullName
        id
      }
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input:$input){
      id
      name
      createdAt
      dueDate
      pointEstimate
      status
      tags
      assignee {
        id
        fullName
      }
      creator {
        id
        fullName
      }
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTaskInput($input: UpdateTaskInput!) {
    updateTask(input:$input){
      id
      name
      createdAt
      dueDate
      pointEstimate
      status
      tags
      position
      assignee {
        avatar
        fullName
        id
      }
      creator {
        avatar
        fullName
        id
      }
    }
  }
`;