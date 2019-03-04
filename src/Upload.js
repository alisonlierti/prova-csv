import React from 'react';
import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      console.log(acceptedFiles);
      this.props.changeFile(acceptedFiles[0]);
      toast('Sucesso ao carregar o arquivo!', {
        autoClose: 5000,
        pauseOnFocusLoss: true,
        type: toast.TYPE.SUCCESS
      });
    } else {
      toast('Houve uma falha ao carregar o arquivo, favor tentar novamente!', {
        autoClose: 5000,
        pauseOnFocusLoss: true,
        type: toast.TYPE.ERROR
      });
    }
  };

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                {...getRootProps()}
                className={
                  ('dropzone',
                  {
                    'dropzone--isActive': isDragActive
                  })
                }>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Arraste os arquivos aqui...</p>
                ) : (
                  <p>
                    Arraste seu arquivo csv aqui para fazer o upload do mesmo.
                  </p>
                )}
              </div>
            );
          }}
        </Dropzone>
        <ToastContainer autoClose={8000} />
      </div>
    );
  }
}
