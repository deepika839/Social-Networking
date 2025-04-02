import React from 'react'
import { Link } from 'react-router-dom';
import Wall from '../molecules/wall.component';
import Postlike from '../molecules/postlike';
export default function HomePage(){
 
    return(
        <div>
            <div>
                <Wall></Wall>
            </div>
            <div>
                <Postlike></Postlike>
            </div>
        </div>

       
    )}