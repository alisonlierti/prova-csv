import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { EditingState } from '@devexpress/dx-react-grid';
import axios from 'axios';
import Spinner from './Spinner';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from '@devexpress/dx-react-grid-bootstrap4';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      rows: [],
      columns: [],
      tableColumnExtensions: [{ columnName: 'id', width: 60 }],
      editingRowIds: [],
      rowChanges: {}
    };

    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.getRowId = this.getRowId.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.convertForShow = this.convertForShow.bind(this);
    this.changeRowChanges = this.changeRowChanges.bind(this);
    this.changeEditingRowIds = this.changeEditingRowIds.bind(this);
  }

  componentDidMount() {
    this.convertForShow();
  }

  save() {
    this.state.rows.forEach(row => {
      axios
        .post('/f8142832-4b5f-4f2b-9f9d-9a4ed996e9c5', row, {
          'Access-Control-Allow-Origin': '*'
        })
        .then(
          () => {
            toast('Sucesso ao salvar os registros!', {
              autoClose: 5000,
              pauseOnFocusLoss: true,
              type: toast.TYPE.SUCCESS
            });
          },
          () => {
            toast(
              'Houve uma falha ao salvar o registro, favor tentar novamente!',
              {
                autoClose: 5000,
                pauseOnFocusLoss: true,
                type: toast.TYPE.ERROR
              }
            );
          }
        );
    });
  }

  cancel() {
    window.localStorage.setItem('csv', null);
    this.props.changeFile();
  }

  convertForShow() {
    try {
      let columns;
      const rows = this.props.data.map((row, index) => {
        if (!index) {
          columns = row.map((element, i) => {
            return {
              name: element,
              title: element
            };
          });
        }
        return row.reduce((data, value, currentIndex) => {
          return (data[columns[currentIndex].name] = value) && data;
        }, {});
      });

      rows.shift();
      this.setState({ rows, columns });
    } catch (err) {
      toast(
        'Houve uma falha ao converter o arquivo, favor verifique seu arquivo e tente novamente!',
        {
          autoClose: 5000,
          pauseOnFocusLoss: true,
          type: toast.TYPE.ERROR
        }
      );
      this.cancel();
    }
  }

  changeEditingRowIds(editingRowIds) {
    this.setState({ editingRowIds });
  }

  changeRowChanges(rowChanges) {
    this.setState({ rowChanges });
  }

  commitChanges({ changed, deleted }) {
    let { rows } = this.state;
    if (changed) {
      rows = rows.map(row =>
        changed[this.getRowId(row)]
          ? { ...row, ...changed[this.getRowId(row)] }
          : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(this.getRowId(row)));
    }
    this.setState({ rows });
  }

  getRowId(row) {
    return row[this.state.columns[0].name];
  }

  renderContent() {
    if (this.state.rows && this.state.rows[0]) {
      return (
        <div style={{ margin: '10px' }}>
          <h2 className="display-4">Listagem dos Registros</h2>
          <Grid
            rows={this.state.rows}
            columns={this.state.columns}
            getRowId={this.getRowId}>
            <EditingState
              editingRowIds={this.editingRowIds}
              onEditingRowIdsChange={this.changeEditingRowIds}
              rowChanges={this.rowChanges}
              onRowChangesChange={this.changeRowChanges}
              onCommitChanges={this.commitChanges}
            />
            <Table columnExtensions={this.tableColumnExtensions} />
            <TableHeaderRow />
            <TableEditRow />
            <TableEditColumn showEditCommand showDeleteCommand />
          </Grid>

          <button
            style={{ float: 'right', marginTop: '15px' }}
            className="btn btn-primary"
            onClick={() => this.save()}>
            Salvar
          </button>

          <button
            style={{ float: 'right', marginTop: '15px', marginRight: '15px' }}
            className="btn btn-danger"
            onClick={() => this.cancel()}>
            Cancelar
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <ToastContainer autoClose={8000} />
        {this.renderContent() || <Spinner />}
      </div>
    );
  }
}
