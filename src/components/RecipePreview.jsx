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
    <article class='flex flex-wrap w-full justify-center'>
      <header class='mb-4 text-center w-full flex-grow'>
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
    </article>
  );
}
