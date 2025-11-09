import React, {useEffect, useState} from 'react';
import profileIcon from '../assets/profile.svg';
import '../text.css';

function ProfileFinal() {
    return (
      <div className="edit-profile-structure">
        <img src={profileIcon} alt="Person"/>

        <div>
          <h1>About me</h1>

          
         <p id="templateText">  Hello! I am a passionate concert listener. <button className="template-button" id="template">Edit</button>   </p>   

          <p>
            Taylor Swift and The Weeknd <button className="artist-button">Edit</button>
          </p>

          
       </div>
        
      </div>

      
    );
}

