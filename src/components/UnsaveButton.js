import React from 'react'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

const UnsaveButton = ({saved, isSaved, handleSaveRecipe, handleUnsaveRecipe}) => {
    

  return (
    <div className='gap-6'>
      <div className='mt-4 flex-col ssName="unsave-recipe-button"flex justify-center cursor-pointer items-center'>
          <div onClick={handleUnsaveRecipe}  >
            <FavoriteRoundedIcon style={{ color: 'red'}} />
        </div>
            </div>
            </div>
  )
}

export default UnsaveButton
