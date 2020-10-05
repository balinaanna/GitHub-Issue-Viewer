import React from 'react';
import { PER_PAGE, getHocDisplayName } from '../utils/constants';
import { withData } from './withData';

export function withListableData(WrappedComponent) {
  class WithListableData extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        pagesCount: 0
      }
      this.wrappedRef = React.createRef();
    }

    componentDidMount() {
      const {
        data: { items, canLoadMore } = {items:{}, canLoadMore: true},
        fetchData,
        fetchParams,
        shouldFetchOnMount = true
      } = this.props;

      const listableItems = this.listableItems(Object.values(items))
      const items_count = listableItems.length;

      const pagesCount = parseInt(items_count / PER_PAGE);

      if (shouldFetchOnMount && canLoadMore && pagesCount == 0) {
        fetchData(fetchParams);
      } else {
        this.setState({ pagesCount });
      }
    }

    onFetchSuccess(result) {
      this.setState({
        pagesCount: result.page
      });
    }

    listableItems = (data = []) => {
      return data
        .filter(item => { return item.isListable; })
        .sort((i1, i2) => i2.createdAt - i1.createdAt);
    }

    render() {
      return <WrappedComponent
        { ...this.props }
        ref={ this.wrappedRef }
        pagination={ this.state }
        listableItems={ this.listableItems } />;
    }
  }

  WithListableData.displayName = `WithListableData(${getHocDisplayName(WrappedComponent)})`;

  return withData({ shouldFetchOnMount: false })(WithListableData);
}
