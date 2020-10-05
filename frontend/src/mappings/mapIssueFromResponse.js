export default (issue) => {
  return {
    id: issue.id,
    title: issue.title,
    number: issue.number,
    author: issue.author,
    createdAt: new Date(issue.created_at),
    body: issue.body,
    state: issue.state
  };
}
