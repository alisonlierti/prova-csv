import React, { Component } from 'react';
import Upload from './Upload';
import RenderGrid from './RenderGrid';
import 'bootstrap/dist/css/bootstrap.css';
import Papa from 'papaparse';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';

class App extends Component {
  constructor(props) {
    super(props);
    const data = window.localStorage.getItem('csv');
    this.state = { rows: data ? JSON.parse(data) : null, loading: false };
    this.changeFile = this.changeFile.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.onCompleteConvertFile = this.onCompleteConvertFile.bind(this);
  }

  onCompleteConvertFile(file) {
    this.setState({ rows: file.data, loading: false });
    window.localStorage.setItem('csv', JSON.stringify(file.data));
  }

  changeFile(file) {
    if (file) {
      this.setState({ rows: null, loading: true });
      Papa.parse(file, {
        dynamicTyping: true,
        complete: this.onCompleteConvertFile
      });
    } else {
      this.setState({ rows: null });
    }
  }

  renderContent() {
    if (this.state.loading) {
      return <Spinner />;
    }
    if (this.state.rows) {
      return <RenderGrid data={this.state.rows} changeFile={this.changeFile} />;
    }
    return <Upload changeFile={this.changeFile} />;
  }

  render() {
    return <div className="content">{this.renderContent()}}</div>;
  }
}

export default App;
