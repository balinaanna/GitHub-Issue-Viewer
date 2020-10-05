export default (repo) => {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    isPrivate: repo.private,
    url: repo.url,
    description: repo.description,
    owner: repo.owner,
    createdAt: new Date(repo.created_at),
    hasIssues: repo.has_issues
  };
}
