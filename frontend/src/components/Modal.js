import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    const element = document.createElement('div');
    element.id = 'modal';
    this.el = element;
  }

  componentDidMount() {
    this.modalRoot = document.getElementById('modal-root');
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}
