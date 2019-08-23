import React, {Component} from 'react';
import axios from 'axios';

export default class EditEvent extends Component {

constructor(props){
    super(props);

}


render(){

    return(
        <div>
            
            <h3>Delete the event</h3>

            <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } />

        </div>
    );
}

}




