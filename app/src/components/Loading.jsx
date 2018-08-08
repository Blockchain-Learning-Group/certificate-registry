import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';

const Loading = (props) => {
    const { open } = props;

    return (
        <Modal open={open} style={{position: "absolute", textAlign: "center"}}>
            <CircularProgress style={{margin: "auto"}} size={100} thickness={8} />
        </Modal>
    );
}

export default Loading;