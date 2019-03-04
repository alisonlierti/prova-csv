import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';

import Papa from 'papaparse';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { rows: [] };
    this.renderContent = this.renderContent.bind(this);
    // this.onCompleteConvertFile = this.onCompleteConvertFile.bind(this);
    this.convertForShow = this.convertForShow.bind(this);
    this.save = this.save.bind(this);
  }

  //   onCompleteConvertFile(file) {
  //     this.setState({ rows: file.data });
  //   }

  save() {
    const data = this.convertForShow();
    data.rows.forEach(row => {
      console.log(row);
      axios.post(
        'https://webhook.site/f8142832-4b5f-4f2b-9f9d-9a4ed996e9c5',
        row,
        { 'Access-Control-Allow-Origin': '*' }
      );
    });
  }

  convertForShow() {
    let columns;
    const rows = this.props.data.map((row, index) => {
      if (!index) {
        columns = row.map((element, i) => {
          return {
            key: element,
            name: element
          };
        });
      } else {
        return row.reduce((data, value, currentIndex) => {
          return (data[columns[currentIndex].key] = value) && data;
        }, {});
      }
    });
    rows.shift();
    return {
      columns,
      rows
    };
  }

  renderContent() {
    if (this.props.data && this.props.data[0]) {
      const data = this.convertForShow();

      return (
        <div>
          <ReactDataGrid
            columns={data.columns}
            rowGetter={i => data.rows[i]}
            rowsCount={data.rows.length}
          />

          <button onClick={() => this.save()}>Salvar</button>
        </div>
      );
    }
    // else {
    //   Papa.parse(this.props.file, {
    //     dynamicTyping: true,
    //     complete: this.onCompleteConvertFile
    //   });
    // }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
        <ToastContainer autoClose={8000} />
      </div>
    );
  }
}
