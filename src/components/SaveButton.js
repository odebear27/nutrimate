import React from 'react'
import { useState, useEffect } from 'react'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

const SaveButton = ({saved, isSaved, handleSaveRecipe, handleUnsaveRecipe}) => {
    

  return (
    <div className='gap-6'>
      <div className='mt-4 flex-col flex justify-center cursor-pointer items-center'>
          <div className="unsave-recipe-button" onClick={handleSaveRecipe}  >
            <FavoriteBorderRoundedIcon className="unsave-icon" />
        </div>
  
      </div>
    </div>
  )
}

export default SaveButton
