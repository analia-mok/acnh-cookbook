import { h } from 'preact';
import { getIngredient } from '../utils/ingredientMap';
import IngredientPreview from './IngredientPreview';

export default function RecipePreview({ recipe }) {
  const ingredients = recipe.ingredients;
  let ingredientAriaDescription = recipe.title + ' requires ';
  const totalIngredients = ingredients.length;
  const lastIngredient = ingredients[totalIngredients - 1];
  let lastIngredientTitle = lastIngredient.name || '';

  if (lastIngredient.type !== 'fish') {
    const lastIngredientInfo = getIngredient(lastIngredient.id, lastIngredient.type);
    lastIngredientTitle = lastIngredientInfo.title;
  }

  if (totalIngredients === 1) {
    ingredientAriaDescription += lastIngredient.quantity + ' ' + lastIngredientTitle;
  } else {
    for (var i = 0; i < totalIngredients - 1; i++) {
      let ingredient = ingredients[i];
      let title = ingredient.name || '';

      if (ingredient.type !== 'fish') {
        const info = getIngredient(ingredient.id, ingredient.type);
        title = info.title;
      }

      ingredientAriaDescription += `${ingredient.quantity} ${title}, `;
    }

    ingredientAriaDescription += `and ${lastIngredient.quantity} ${lastIngredientTitle}`;
  }

  return (
    <article class='flex flex-wrap w-full justify-center relative px-6 pt-10 pb-8 bg-orange-50 border-8 border-white rounded-md shadow-md items-center h-full'>
      {recipe.type === 'savory' && (
        <img
          className='w-8 absolute right-4 top-4'
          src='https://acnhcdn.com/2.0/MenuIcon/DishesCropped.png'
          alt='A covered dish icon'
          title='Savory'
        />
      )}
      {recipe.type === 'sweet' && (
        <img
          className='w-8 absolute right-4 top-4'
          src='https://acnhcdn.com/2.0/MenuIcon/CandyCropped.png'
          alt='A piece of round candy in an orange wrapper'
          title='Sweet'
        />
      )}
      <div className='flex flex-wrap justify-center'>
        <header class='mt-6 md:mt-4 mb-6 text-center w-full flex-grow'>
          {recipe.thumbnail && (
            <img
              src={recipe.thumbnail}
              alt={recipe.title}
              className='inline-block mb-4'
              loading='lazy'
            />
          )}
          <a href={recipe.url} className='text-orange-900 hover:underline hover:text-orange-800'>
            <h2 className='font-bold text-xl'>{recipe.title}</h2>
          </a>
        </header>
        <span className='sr-only'>{ingredientAriaDescription}</span>
        <ul className='list-none'>
          {ingredients.map((item) => (
            <li>
              <IngredientPreview ingredient={item} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
