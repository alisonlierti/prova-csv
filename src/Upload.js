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
    const textStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                style={{
                  width: '98vw',
                  height: '98vh',
                  borderWidth: 2,
                  borderColor: '#666',
                  borderStyle: 'dashed',
                  borderRadius: 5,
                  marginLeft: '1vw',
                  marginTop: '1vh'
                }}
                {...getRootProps()}
                className={
                  ('dropzone',
                  {
                    'dropzone--isActive': isDragActive
                  })
                }>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div style={textStyle}>Arraste os arquivos aqui...</div>
                ) : (
                  <div style={textStyle}>
                    Arraste seu arquivo csv aqui, ou clique em qualquer ponto da
                    tela para fazer o upload do mesmo.
                  </div>
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
