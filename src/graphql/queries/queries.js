// src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;

export const GET_TASK_TAGS = gql`
  query GetTaskTags {
    __type(name: "TaskTag") {
      enumValues {
        name
      }
    }
  }
`;

export const GET_TASK_POINTS = gql`
  query GetPointEstimate {
    __type(name: "PointEstimate") {
      enumValues {
        name
      }
    }
  }
`;

export const GET_TASK_STATUS = gql`
  query GetStatus  {
    __type(name: "Status") {
      enumValues {
        name
      }
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      id
      name
      dueDate
      status
      assignee {
        avatar
        fullName
        id
      }
      createdAt
      creator {
        avatar
        fullName
        id
      }
      pointEstimate
      position
      tags
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;