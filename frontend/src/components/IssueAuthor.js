import React from 'react';
import { formatDateTime } from '../utils/datetime';

export default function IssueAuthor(props) {
  return (
    <>
      <span>opened on </span>
      <strong>{ formatDateTime(props.issue.createdAt) }</strong>
      <span> by </span>
      <strong>{ props.issue.author }</strong>
    </>
  );
}
