import { h } from 'preact';
import IngredientPreview from './IngredientPreview';

export default function RecipePreview({ recipe }) {
  const ingredients = recipe.ingredients;

  return (
    <article class='flex flex-wrap w-full justify-center'>
      <header class='mb-4 text-center w-full flex-grow'>
        {recipe.thumbnail && (
          <img src={recipe.thumbnail} alt={recipe.title} class='inline-block mb-4' loading='lazy' />
        )}
        <a href={recipe.url} class='text-orange-900 hover:underline hover:text-orange-800'>
          <h2 class='font-bold text-xl'>{recipe.title}</h2>
        </a>
      </header>
      <ul class='list-none'>
        {ingredients.map((item) => (
          <li>
            <IngredientPreview ingredient={item} />
          </li>
        ))}
      </ul>
    </article>
  );
}
