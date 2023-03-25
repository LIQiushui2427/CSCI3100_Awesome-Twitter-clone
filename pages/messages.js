import React from 'react';
import LeftPane from '@/components/leftPane/leftPane';
import MsgLeftPane from '@/components/messages/msgLeftPane';
import MsgContent from '@/components/messages/msgContent';

const Messages = () => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <LeftPane/>
                </div>

                <div className="col-md-4">
                    <MsgLeftPane/>
                </div>

                <div className='col-md-8'>
                    <MsgContent/>
                </div>
            </div>
        </div> 
    )
}

export default Messages;