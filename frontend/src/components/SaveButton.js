import React from 'react';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import './SaveButton.css';

const SaveButton = ({saved, isSaved, handleSaveRecipe, handleUnsaveRecipe}) => {
    

  return (
    <div className='gap-6'>
      <div className='mt-4 flex-col flex justify-center cursor-pointer items-center'>
          <div className="save-button" onClick={handleSaveRecipe}  >
            <FavoriteBorderRoundedIcon className="save-icon" />
        </div>
      </div>
    </div>
  )
}

export default SaveButton
