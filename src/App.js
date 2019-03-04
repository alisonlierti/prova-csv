import React, { Component } from 'react';
import Upload from './Upload';
import RenderGrid from './RenderGrid';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Papa from 'papaparse';

class App extends Component {
  constructor(props) {
    super(props);
    const data = window.localStorage.getItem('csv');
    this.state = { rows: data ? JSON.parse(data) : null };
    // this.state = { file: null };
    this.changeFile = this.changeFile.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.onCompleteConvertFile = this.onCompleteConvertFile.bind(this);
  }

  onCompleteConvertFile(file) {
    this.setState({ rows: file.data });
    window.localStorage.setItem('csv', JSON.stringify(file.data));
  }

  changeFile(file) {
    Papa.parse(file, {
      dynamicTyping: true,
      complete: this.onCompleteConvertFile
    });
    console.log(file);
  }

  renderContent() {
    if (this.state.rows) {
      return <RenderGrid data={this.state.rows} />;
    }
    return <Upload changeFile={this.changeFile} />;
  }

  render() {
    return (
      <div className="content">
        {/* <StepWizard> */}
        {this.renderContent()}
        {/* <Upload changeFile={this.changeFile} /> */}
        {/* <div>
            <h1>xablau</h1>
          </div>
        </StepWizard> */}
      </div>
    );
  }
}

export default App;
