export const PER_PAGE = 20;

export const repoID = (owner, name) => { return `${owner}/${name}` };

export const getHocDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
